/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { useAtom } from 'jotai';

import cn from 'classnames';

import useSelectFile from '../hooks/useSelectFile';

import { imagesToSave } from '../JotaiAtoms';

export interface FileUploadType {
  quality?: number
  Content?: React.ReactNode;
  className?: string;
  deleteIcon?: React.ReactNode

}

const ImageUpload: React.FC<FileUploadType> = ({ className, quality, Content, deleteIcon }) => {
  const {selectedImages, handleFileSelected, setSelectedImages} =
    useSelectFile();
  const [imgsToSave, setImgsToSave] = useAtom(imagesToSave);

  const handleDeleteSelectedImage = (image: string) => {
    const blobIndex = selectedImages.indexOf(image);
    const filteredImgs = selectedImages.filter((img) => img !== image);
    const filteredBlobs = [...imgsToSave].filter((_, i) => i !== blobIndex);
    setSelectedImages(filteredImgs);
    setImgsToSave(filteredBlobs);
  };

  return (
    <>
      <input
        hidden
        multiple
        type='file'
        id='fileUpload'
        className='w-52'
        name='fileUpload'
        onChange={(e) => handleFileSelected(e, quality)}
      />
      <label htmlFor='fileUpload'>{Content || "Upload"}</label>

      {selectedImages.length > 0 && (
        <div className='w-full h-full pt-2'>
          <div className='flex items-start gap-2'>
            {selectedImages.map((image: string, index:number) => (
              <div
                key={image}
                className='relative w-20 h-15 md:w-28 md:h-20 border rounded-md overflow-hidden'
              >
                <img className='w-full h-full object-fill' src={image} alt='' />

                <button
                  type='button'
                  onClick={() => handleDeleteSelectedImage(image)}
                  className='absolute top-0 right-0 bg-gray-200 hover:bg-gray-200 rounded-full p-2 opacity-50 hover:opacity-100 transition'
                >
                  {deleteIcon || "X"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageUpload;
