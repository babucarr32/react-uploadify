/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";

import { useAtom } from "jotai";

import {
  handleDragAndDropFileUpload,
  handleFileInputUpload,
} from "../../lib/uploadedFileHandlers";

import {
  imagesToSave,
  jotaiDetails,
  jotaiError,
  jotaiFileLimit,
  jotaiLimitCount,
  jotaiImages,
  jotaiIsDraggedOver,
} from "../JotaiAtoms";

import { DetailsType, UseSelectFileReturnType, DataType } from "../types";

const useSelectFile = (): UseSelectFileReturnType => {
  const [fileLimit] = useAtom(jotaiFileLimit);
  const [error, setError] = useAtom(jotaiError);
  const [images, setImages] = useAtom(jotaiImages);
  const [details, setDetails] = useAtom(jotaiDetails);
  const [blobImages, setBlobImages] = useAtom(imagesToSave);
  const [limitCount, setLimitCount] = useAtom(jotaiLimitCount);
  const [isDraggedOver, setIsDraggedOver] = useAtom(jotaiIsDraggedOver);

  useEffect(() => {
    const handleSetDetails = () => {
      const detailsArray = blobImages.map(
        ({ size, type }: Blob): DetailsType => ({ size, type })
      );
      setDetails(detailsArray);
    };
    handleSetDetails();
  }, [blobImages]);

  const handleSetErrorMessageAndImagesAndBlobs = (data: DataType) => {
    if (data) {
      setError({ message: "" });
      const { images, reducedImageQuality } = data as any;
      setImages((imgs: any) => [...imgs, ...images]);
      setBlobImages((imgs: any) => [...imgs, ...reducedImageQuality]);
    } else setError({ message: data });
  };

  const handleSetErrorMessageAndLimitCount = (
    limit: number,
    message?: string
  ) => {
    if (message) {
      setError({ message: message });
      setLimitCount((limitCount) => limitCount - 1);
    } else {
      setError({ message: `A maximum of ${limit} images required.` });
      if (images.length) setLimitCount(images.length + 1);
      else setLimitCount(1);
    }
  };

  const handleSelectFile = async (
    event: React.ChangeEvent<HTMLInputElement>,
    quality?: number,
    limit: number = fileLimit,
    fileSizeLimit: string = ""
  ) => {
    const fileCount = event?.target?.files?.length;
    // React not re-rendering instantly to update fileCount
    setLimitCount((limitCount) => limitCount + (fileCount as number));
    if (limitCount + (fileCount as number) - 1 <= limit) {
      const result = await handleFileInputUpload(
        event,
        quality,
        limit,
        fileSizeLimit
      );
      if (typeof result === "string")
        handleSetErrorMessageAndLimitCount(limit, result);
      else handleSetErrorMessageAndImagesAndBlobs(result);
    } else handleSetErrorMessageAndLimitCount(limit);
  };

  const handleDropFile = async (
    ev: any,
    quality?: number,
    limit: number = fileLimit,
    fileSizeLimit: string = ""
  ) => {
    const fileCount = [...ev.dataTransfer.items].length;
    setLimitCount((limitCount) => limitCount + fileCount);
    // React not re-rendering instantly to update fileCount
    if (limitCount + (fileCount as number) - 1 <= limit) {
      const result = await handleDragAndDropFileUpload(
        ev,
        quality,
        fileLimit,
        fileSizeLimit
      );
      if (typeof result === "string")
        handleSetErrorMessageAndLimitCount(limit, result);
      else handleSetErrorMessageAndImagesAndBlobs(result);
    } else handleSetErrorMessageAndLimitCount(limit);
  };

  const handleDeleteImage = (index: number) => {
    const filteredImages = images.filter((_, idx) => idx !== index);
    const newImage = blobImages;
    newImage.splice(index, 1);
    setBlobImages(newImage);
    setIsDraggedOver(false);
    setError({ message: "" });
    setLimitCount(limitCount - 1);
    setImages([...filteredImages]);
  };

  const reset = () => {
    setImages([]);
    setLimitCount(0);
    setBlobImages([]);
    setIsDraggedOver(false);
    setError({ message: "" });
    setDetails([{ type: "", size: 0 }]);
  };

  return {
    error,
    reset,
    images,
    details,
    setImages,
    blobImages,
    setBlobImages,
    isDraggedOver,
    handleDropFile,
    handleSelectFile,
    handleDeleteImage,
  };
};

export default useSelectFile;
