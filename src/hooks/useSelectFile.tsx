/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';

import { handleDragAndDropFileUpload, handleFileInputUpload } from '../../lib/uploadedFileHandlers';

import { imagesToSave, jotaiDetails, jotaiError, jotaiFileLimit, jotaiLimitCount, jotaiImages } from '../JotaiAtoms';
import { DetailsType, UseSelectFileReturnType } from 'types';



const useSelectFile = (): UseSelectFileReturnType => {
  const [fileLimit] = useAtom(jotaiFileLimit)
  const [error, setError] = useAtom(jotaiError)
  const [details, setDetails] = useAtom(jotaiDetails)
  const [images, setImages] = useAtom(jotaiImages);
  const [blobImage, setBlobImage] = useAtom(imagesToSave);
  const [limitCount, setLimitCount] = useAtom(jotaiLimitCount)
  const ref = useRef(0)
  

  useEffect(()=> {
    const handleSetDetails = () => {
      const detailsArray = blobImage.map((img: Blob): DetailsType => {
        return({size: img.size, type:img.type})
      })
      setDetails(detailsArray);
    } 
    handleSetDetails()
  }, [blobImage]);

  const handleSelectFile = async (
    event: React.ChangeEvent<HTMLInputElement>,
    quality?: number,
    limit: number = fileLimit,
    fileSizeLimit: string = ""
  ) => {
      setLimitCount(limitCount + 1)
      console.log(limitCount, limit)
      if (limitCount <= limit){
        const result = await handleFileInputUpload(event, quality, limit, fileSizeLimit);
        if (typeof result == "string"){
          setError({message: result});
        }
        else{
          if (result) {
        setError({message: ""})
        const { images, reducedImageQuality } = result as any;
        const newImage: string[] = [];
        
        setBlobImage((imgs: any) => [...imgs, ...reducedImageQuality]);
        
        if (Array.isArray(images)) {
          const resultArray = Array.from(images) as string[];
          newImage.push(...resultArray);
        }
        setImages((imgs) => [...imgs, ...newImage]);
        }
      }
    }else{
      setError({message: `A maximum of ${limit} images required.`});
      if(images.length){
        setLimitCount(images.length + 1)
      }else{
        setLimitCount(1)
      }
    }
  }

  const handleDropFile = async(ev: any, quality?: number, limit: number = fileLimit) => {
    const fileCount = [...ev.dataTransfer.items].length
    console.log(limitCount, {fileCount})
    setLimitCount(limitCount + fileCount)
    if (Math.max(limitCount, fileCount) <= limit){
      const result = await handleDragAndDropFileUpload(ev, quality);
      if (result){
        setError({message: ""})
        const { images, reducedImageQuality } = result as any;
        setImages((imgs: any) => [...imgs, ...images]);
        setBlobImage((imgs: any) => [...imgs, ...reducedImageQuality]);
      }
      else{
        setError({message: result})
      }
    }else{
      setError({message: `A maximum of ${limit} images required.`});
      if(images.length){
        setLimitCount(images.length + 1)
      }else{
        setLimitCount(1)
      }
    }
  }

  function deleteImage(index: number) {
    const filteredImages = images.filter((_, idx) => idx !== index);
    const newImage = blobImage;
    newImage.splice(index, 1);
    setBlobImage(newImage);
    setImages([...filteredImages]);
    setLimitCount(limitCount - 1)
    setError({message: ""})
  }

  return {images, handleSelectFile, setImages, error, blobImage, setBlobImage, details, deleteImage, handleDropFile};
};

export default useSelectFile;
