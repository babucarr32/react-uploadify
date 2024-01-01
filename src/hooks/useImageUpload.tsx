import { UseImageUploadType } from "types";
import useSelectFile from "./useSelectFile";

const useImageUpload = (): UseImageUploadType => {
  const { blobImage, details, error, images, isDraggedOver } = useSelectFile();
  return { blobImage, details, error, images, isDraggedOver };
};

export default useImageUpload;
