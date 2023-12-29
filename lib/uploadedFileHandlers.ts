/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from 'react';

function handleImageValidation(selectedFile: any) {
  return new Promise((resolve) => {
    if (selectedFile) {
      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        const arrayBuffer = fileReader.result;
        const fileBytes = new Uint8Array(arrayBuffer).subarray(0, 4);
        const header = Array.from(fileBytes)
          .map((byte) => byte.toString(16))
          .join("")
          .toUpperCase();

        if (header === "89504E47") {
          resolve(true);
        } else if (header === "47494638") {
          resolve(true);
        } else if (header.startsWith("FFD8")) {
          resolve(true);
        } else {
          resolve(false);
        }
      };

      fileReader.readAsArrayBuffer(selectedFile);
    } else {
      resolve(false);
    }
  });
}

function handleReduceImageQuality(file: Blob, quality: number): Promise<Blob> {
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
          (blob) => {
            if (blob) {
              resolve(blob);
            }
          },
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

export async function handleFileInputUpload(
  event: ChangeEvent<HTMLInputElement>,
  quality?: number
): Promise<{
  images: (string | ArrayBuffer | null | undefined)[]
  reducedImageQuality: Blob[] | []
} | boolean> {
  const fileList = event.target.files;
  if (fileList) {
    const reducedImgQlty: Blob[] = [];
    const validatedImageResult = Array.from(fileList).map(async (file) => {
      return await handleImageValidation(file);
  
      
    })
    const isSomeImageInvalid = Array.from(await Promise.all(validatedImageResult)).some((image)=> !image)
    if(isSomeImageInvalid) return false

    const newFiles = Array.from(fileList).map(async (file) => {
      const reducedQlty = await handleReduceImageQuality(file, (quality as number) / 100);
      reducedImgQlty.push(reducedQlty as Blob);

      return new Promise<string | ArrayBuffer | null | undefined>((resolve) => {
        if (reducedQlty) {
          const reader = new FileReader();
          reader.onload = function (e) {
            resolve(e?.target?.result);
          };
          reader.readAsDataURL(reducedQlty as Blob);
        } else {
          resolve(null);
        }
      });
    });
    return {
      images: await Promise.all(newFiles),
      reducedImageQuality: reducedImgQlty,
    };
  } else {
    return {
      images: [],
      reducedImageQuality: [],
    };
  }
}
