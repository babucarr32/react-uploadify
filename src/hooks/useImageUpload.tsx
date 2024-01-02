import { UseImageUploadType } from "../types";
import useSelectFile from "./useSelectFile";

const useImageUpload = (): UseImageUploadType => {
  const { blobImages, details, error, images, isDraggedOver, reset } =
    useSelectFile();
  return { blobImages, details, error, images, isDraggedOver, reset };
};

export default useImageUpload;
