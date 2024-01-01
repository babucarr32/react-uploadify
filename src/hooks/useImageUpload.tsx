import { UseImageUploadType } from "types";
import useSelectFile from "./useSelectFile";

const useImageUpload = (): UseImageUploadType => {
  const { blobImages, details, error, images, isDraggedOver } = useSelectFile();
  return { blobImages, details, error, images, isDraggedOver };
};

export default useImageUpload;
