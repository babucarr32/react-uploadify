import React from 'react'

import cn from "classnames"

import useSelectFile from '@/hooks/useSelectFile'

import { ImagesType } from 'types'

const Images: React.FC<ImagesType> = ({ className, deleteIcon, deleteButtonClassName, imageClassName }) => {
  const {images, deleteImage} = useSelectFile()

  return (
    <div className={cn("mt-3 flex gap-2 w-full", className)}>
      {images &&
        images.map((image: string, index: number) => (
          <div key={index} className="relative">
            <img className={cn("w-20", imageClassName)} src={image} />
            <button
              onClick={() => deleteImage(index)}
              className={cn("absolute top-0 right-0 bg-white opacity-50 hover:opacity-100 transition", deleteButtonClassName)}
            >
              {deleteIcon || "X"}
            </button>
          </div>
        ))}
    </div>
  )
}

export default Images