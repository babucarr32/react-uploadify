/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from 'react';

const validateHeader = (header: string) => {
  if (header === "89504E47") {
    return true;
  } else if (header === "47494638") {
    return true;
  } else if (header.startsWith("FFD8")) {
    return true;
  } else {
    return false;
  }
}

const handleImageValidation = (selectedFile: any) => {
  return new Promise((resolve) => {
    if (selectedFile) {
      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        const arrayBuffer = fileReader.result;
        const fileBytes = new Uint8Array(arrayBuffer as any).subarray(0, 4);
        const header = Array.from(fileBytes)
          .map((byte) => byte.toString(16))
          .join("")
          .toUpperCase();
          resolve(validateHeader(header))
      };
      fileReader.readAsArrayBuffer(selectedFile);
    } else {
      resolve(false);
    }
  });
}

export const handleReduceImageQuality = async (file: Blob, quality?: number): Promise<Blob | boolean> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (event: ProgressEvent<FileReader>) {
      const image = new Image();
      
      image.src = event?.target?.result as string;
      image.onload = function () {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        context?.drawImage(image, 0, 0);
        canvas.toBlob(
          (blob) => blob && resolve(blob),
          'image/jpeg',
          quality
          );
      };
    };
    reader.onerror = function (error) {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}

interface SizeType { kb: number; mb: number}
interface HandleValidateSizeReturnType {
  number: number;
  letters: "kb" | "mb"
}

const size:SizeType = {
  kb: 1024,
  mb: 1048576
}

const handleValidateSize = (value: string): HandleValidateSizeReturnType | boolean => {
  const regexPattern = /^(\d+(\.\d+)?)([km]b)$/;
  const match = value.match(regexPattern);
  if (match) {
    const number = match[1]; 
    const letters = match[3].toLowerCase() as "kb" | "mb"; 
    return {number: +number, letters}
  }
  return false
}

const handleConvertSize = (value: string): number | any  => {
  if(value){
    const result = handleValidateSize(value)
    if (result){
      const {number, letters} = result as HandleValidateSizeReturnType
      return size[letters] * number
    }
  }
  return
}

export const handleFileInputUpload = async (
  event: ChangeEvent<HTMLInputElement>,
  quality?: number,
  fileLimit: number = 100,
  fileSizeLimit: string = ""
  ): Promise<{
    images: (string | ArrayBuffer | null | undefined)[]
    reducedImageQuality: Blob[] | []
  } | string> => {
    const fileList = event.target.files;
    if (fileList) {
    const reducedImageQuality: Blob[] = [];
    const validatedImageResult = Array.from(fileList).map(async (file) => {
      return await handleImageValidation(file);
    })
    const isSomeImageInvalid = Array.from(await Promise.all(validatedImageResult)).some((image)=> !image)
    if(isSomeImageInvalid) return "Invalid image detected..."

    const newFileList = Array.from(fileList);
    let isSomeImageTooLarge = false
    if (newFileList.length <= fileLimit){
      const images = newFileList.map(async (file) => {
        const result = handleConvertSize(fileSizeLimit)
        if(fileSizeLimit){
          if(file.size > result) {
            isSomeImageTooLarge = true
          }
        }
        
        if(!isSomeImageTooLarge){
          const reducedImageQualityResult = await handleReduceImageQuality(file, (quality as number) / 100);
          reducedImageQuality.push(reducedImageQualityResult as Blob);
          
          return new Promise<string | ArrayBuffer | null | undefined>((resolve) => {
          if (reducedImageQualityResult) {
            const reader = new FileReader();
            reader.onload = function (e) {
              resolve(e?.target?.result);
            };
            reader.readAsDataURL(reducedImageQualityResult as Blob);
          } else {
            resolve(null);
          }
        });
      }
    });
    if (isSomeImageTooLarge) return `Maximum image size is ${fileSizeLimit}`
    return {
      images: await Promise.all(images) as any,
      reducedImageQuality: reducedImageQuality,
    };
  }
  return `A maximum of ${fileLimit} images required.`
  } else {
    return {
      images: [],
      reducedImageQuality: [],
    };
  }
}


export const handleDragAndDropFileUpload = async(ev: any, quality?: number) => {
  ev.preventDefault();
  const files: Blob[] = [];
  const filePromises = [...ev.dataTransfer.items].map((item, i) => {
    return new Promise((resolve, reject) => {
      if (item.kind === "file") {
        const file = item.getAsFile();
        handleImageValidation(file).then((result) => !result && resolve(false));
        handleReduceImageQuality(file, (quality as number) / 100).then((reducedImageQuality: any)=> {

          files.push(reducedImageQuality);
          const reader = new FileReader();
          reader.onload = function (e) {
            resolve(e?.target?.result);
          };
          reader.readAsDataURL(reducedImageQuality);
        }).catch((error) => (
          reject(error)
        ))
      }
    });
  });
  const images = await Promise.all(filePromises);
  const isSomeImageInvalid = images.some((image) => !image)
  if(!isSomeImageInvalid){
    const reducedImageQuality = await Promise.all(files); 
    return { images, reducedImageQuality };
  }
  return "Invalid image detected...";
}