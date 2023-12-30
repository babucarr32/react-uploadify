/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FileUploadType {
  limit?: number
  quality?: number
  className?: string;
  fileSizeLimit?: string
  content?: React.ReactNode;
}

export interface ImagesType extends FileUploadType{
  imageClassName?: string
  deleteIcon?: React.ReactNode
  deleteButtonClassName?: string
}

export interface DragAndDropType {
  quality?: number
}

export interface ErrorType {
  message: string
}

export interface DetailsType {
  size: number
  type: string
}

export interface UseSelectFileReturnType{
  setImages: any;
  images: string[]; 
  error: ErrorType;
  blobImage: Blob[];
  setBlobImage: any;
  details: DetailsType[]
  handleDropFile: (ev: any, quality?: number, limit?: number, fileSizeLimit?: string) => void
  deleteImage: (index: number) => void
  handleSelectFile: (event: React.ChangeEvent<HTMLInputElement>, quality?: number, limit?:number, fileSizeLimit?: string) => void, 
}

export interface ImageUploadType {
  text?: string
  limit?: number
  quality?: number
  className?: string
  hideImages?: boolean
  fileSizeLimit?: string
  imagesClassName?: string
  deleteIcon?: React.ReactNode;
  errorMessageClassName?: string
  align?: "start" | "center" | "end"
}