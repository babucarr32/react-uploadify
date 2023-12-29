/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { atom, useAtom } from 'jotai';

import { handleFileInputUpload } from '../../lib/uploadedFileHandlers';

import { imagesToSave, uploadedPostImg } from '../JotaiAtoms';

interface ErrorType {
  message: string
}

interface DetailsType {
  size: number
  type: string
}

interface UseSelectFileReturnType{
  error: ErrorType;
  imgsToSave: Blob[];
  details: DetailsType[]
  setSelectedImages: any;
  selectedImages: string[]; 
  handleFileSelected: (event: React.ChangeEvent<HTMLInputElement>, quality?: number) => void, 
}

const jotaiError = atom<ErrorType>({message: ""})
const jotaiDetails = atom<any>({})

const useSelectFile = (): UseSelectFileReturnType => {
  const [imgsToSave, setImgsToSave] = useAtom(imagesToSave);
  const [selectedImages, setSelectedImages] = useAtom(uploadedPostImg);
  const [error, setError] = useAtom<ErrorType>(jotaiError)
  const [details, setDetails] = useAtom<DetailsType[]>(jotaiDetails)


  useEffect(()=> {
    const handleSetDetails = () => {
      const detailsArray = imgsToSave.map((img: Blob): DetailsType => {
        return({size: img.size, type:img.type})
      })
      setDetails(detailsArray);
    } 
    handleSetDetails()
  }, [imgsToSave]);

  async function handleFileSelected(
    event: React.ChangeEvent<HTMLInputElement>,
    quality?: number
  ) {
    const result = await handleFileInputUpload(event, quality);
    if (!result) setError({message: "Invalid image detected..."});

    if (result) {
      setError({message: ""})
      const { images, reducedImageQuality } = result as any;
      const newImage: string[] = [];
 
      setImgsToSave((imgs: any) => [...imgs, ...reducedImageQuality]);

      if (Array.isArray(images)) {
        const resultArray = Array.from(images) as string[];
        newImage.push(...resultArray);
      }
      setSelectedImages((imgs) => [...imgs, ...newImage]);
    }
  }
  return {selectedImages, handleFileSelected, setSelectedImages, error, imgsToSave, details};
};

export default useSelectFile;
