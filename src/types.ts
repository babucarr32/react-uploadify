/* eslint-disable @typescript-eslint/no-explicit-any */

interface CommonType {
  limit?: number;
  quality?: number;
  fileSizeLimit?: string;
}
export interface ImageSelectType extends CommonType {
  content?: React.ReactNode;
}

export interface DragAndDropType extends ImageSelectType {
  className?: string;
}
export interface ImagesType {
  className?: string;
  imageClassName?: string;
  deleteIcon?: React.ReactNode;
  deleteButtonClassName?: string;
}

export interface ErrorType {
  message: string;
}

export interface DetailsType {
  size: number;
  type: string;
}

export interface UseSelectFileReturnType extends UseImageUploadType {
  setImages: any;
  reset: () => void;
  setBlobImages: any;
  handleDropFile: (
    ev: any,
    quality?: number,
    limit?: number,
    fileSizeLimit?: string
  ) => void;
  handleDeleteImage: (index: number) => void;
  handleSelectFile: (
    event: React.ChangeEvent<HTMLInputElement>,
    quality?: number,
    limit?: number,
    fileSizeLimit?: string
  ) => void;
}

export interface UseImageUploadType {
  images: string[];
  error: ErrorType;
  reset: () => void;
  blobImages: Blob[];
  isDraggedOver: boolean;
  details: DetailsType[];
}

export interface ContentType extends CommonType {
  text?: string;
  selectText?: string;
  selectClassName?: string;
  errorMessageClassName?: string;
}
export interface ImageUploadType
  extends DragAndDropType,
    ImagesType,
    ImageSelectType {
  text?: string;
  limit?: number;
  selectText?: string;
  hideImages?: boolean;
  selectClassName?: string;
  imagesClassName?: string;
  errorMessageClassName?: string;
  align?: "start" | "center" | "end";
}

export type DataType =
  | string
  | {
      reducedImageQuality: Blob[] | [];
      images: (string | ArrayBuffer | null | undefined)[];
    };

export interface SizeType {
  kb: number;
  mb: number;
}

export interface HandleValidateSizeReturnType {
  number: number;
  letters: keyof SizeType;
}
