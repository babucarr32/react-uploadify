import React from 'react' 
import useSelectFile from '@/hooks/useSelectFile'

import cn from "classnames"

import Images from './Images'
import ImageInput from './ImageInput'
import DragAndDrop from './DragAndDrop'

import { ImageUploadType } from 'types'

const Content: React.FC<ImageUploadType> = ({ errorMessageClassName, text, quality, limit, fileSizeLimit }) => {
  const {error, details} = useSelectFile()
  console.log({details})
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-center">
        {text ? <p>{text}</p> : <p className="text-xl text-gray-700">Drag and Drop image(s) here.</p>}
        <p className={cn("text-red-500 text-sm py-1", errorMessageClassName)}>{error.message}</p>
      </div>
      <ImageInput
        limit={limit}
        quality={quality}
        fileSizeLimit={fileSizeLimit}
        content={
          <div className='cursor-pointer px-[16px] py-[4px] bg-gray-500 hover:bg-gray-700 transition rounded-md text-white'>Browse</div>
        }/>
    </div>
  )
}

const DeleteIcon = () => {
  return (
    <svg
      width="24"
      fill="none"
      height="24"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 6 6 18"/>
      <path d="m6 6 12 12"/>
    </svg>
  )
}

const alignItems =  {
  end: "justify-end",
  start: "justify-start",
  center: "justify-center",

}

const ImageUpload: React.FC<ImageUploadType> = ({ align, className, deleteIcon, errorMessageClassName, imagesClassName, hideImages, limit, text, quality, fileSizeLimit }) => {
  return (
    <>
      <div className={cn("border border-dashed h-72 rounded-md p-4 m-4 relative text-gray-700 flex flex-col justify-center items-center", className)} >
        <DragAndDrop className="w-full h-full border flex justify-center items-center"
          quality={quality}
          limit={limit}
          content={
            <Content
              text={text}
              limit={limit}
              quality={quality} 
              fileSizeLimit={fileSizeLimit} 
              errorMessageClassName={errorMessageClassName}
            />}
        />
      </div>
      {!hideImages &&  <Images deleteIcon={deleteIcon || <DeleteIcon />} className={cn(align && alignItems[align], imagesClassName, "px-5")} imageClassName="w-52"/>}
    </>
  )
}

export default ImageUpload