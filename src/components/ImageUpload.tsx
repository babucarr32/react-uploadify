import React from "react";

import cn from "classnames";

import Images from "./Images";
import ImageSelect from "./ImageSelect";
import DragAndDrop from "./DragAndDrop";

import useSelectFile from "@/hooks/useSelectFile";

import { ContentType, ImageUploadType } from "../types";

const Content: React.FC<ContentType> = ({
  text,
  limit,
  quality,
  selectText,
  fileSizeLimit,
  selectClassName,
  errorMessageClassName,
}) => {
  const { error } = useSelectFile();
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-center">
        {text ? (
          <p>{text}</p>
        ) : (
          <p className="text-xl text-gray-700">Drag and Drop image(s) here.</p>
        )}
        <p className={cn("text-red-500 text-sm py-1", errorMessageClassName)}>
          {error.message}
        </p>
      </div>
      <ImageSelect
        limit={limit}
        quality={quality}
        fileSizeLimit={fileSizeLimit}
        content={
          <div
            className={cn(
              "cursor-pointer px-[16px] py-[4px] bg-gray-500 hover:bg-gray-700 transition rounded-md text-white",
              selectClassName
            )}
          >
            {selectText || "Browse"}
          </div>
        }
      />
    </div>
  );
};

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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
};

const alignItems = {
  end: "justify-end",
  start: "justify-start",
  center: "justify-center",
};

const ImageUpload: React.FC<ImageUploadType> = ({
  text,
  align,
  limit,
  quality,
  className,
  selectText,
  deleteIcon,
  hideImages,
  fileSizeLimit,
  imageClassName,
  imagesClassName,
  selectClassName,
  errorMessageClassName,
  deleteButtonClassName,
}) => {
  const { isDraggedOver } = useSelectFile();
  return (
    <>
      <div
        className={cn(
          "border-2 border-dashed h-72 rounded-md p-4 m-4 relative text-gray-700 flex flex-col justify-center items-center",
          className,
          isDraggedOver && "border-red-500 transition"
        )}
      >
        <DragAndDrop
          className="w-full h-full flex justify-center items-center"
          quality={quality}
          limit={limit}
          content={
            <Content
              text={text}
              limit={limit}
              quality={quality}
              selectText={selectText}
              fileSizeLimit={fileSizeLimit}
              selectClassName={selectClassName}
              errorMessageClassName={errorMessageClassName}
            />
          }
        />
      </div>
      {!hideImages && (
        <Images
          imageClassName={imageClassName}
          deleteIcon={deleteIcon || <DeleteIcon />}
          deleteButtonClassName={deleteButtonClassName}
          className={cn(align && alignItems[align], imagesClassName, "px-5")}
        />
      )}
    </>
  );
};

export default ImageUpload;
