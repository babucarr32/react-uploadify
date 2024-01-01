import { UseImageUploadType } from "types";
import useSelectFile from "./useSelectFile"

const useImageUpload = (): UseImageUploadType => {
  const { blobImage, details, error, images } =useSelectFile();
  return { blobImage, details, error, images }
}

export default useImageUpload