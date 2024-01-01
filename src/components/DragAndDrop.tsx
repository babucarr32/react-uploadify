/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect } from "react";

import { useAtom } from "jotai";

import useSelectFile from "@/hooks/useSelectFile";
import { jotaiFileLimit, jotaiFileSizeLimit } from "@/JotaiAtoms";

import { FileUploadType } from "../../types";

export const UploadContext = createContext(null);

const DragAndDrop: React.FC<FileUploadType> = ({ quality, content, className, limit, fileSizeLimit }) => {
  const { handleDropFile} = useSelectFile()
  const [fileLimit, setFileLimit] = useAtom(jotaiFileLimit)
  const [, setMaxFileSize] = useAtom(jotaiFileSizeLimit)


  useEffect(() => {
    const handleSetFileLimit = () => limit && setFileLimit(limit)
    handleSetFileLimit()
  }, [])

  useEffect(() => {
    const handleSetFileSizeLimit = () => fileSizeLimit && setMaxFileSize(fileSizeLimit)
    handleSetFileSizeLimit()
  }, [])

  return (
    <>
      <div
        className={className}
        id="drop_zone"
        onDrop={(e) => (
          handleDropFile(e, quality, fileLimit),
          e.preventDefault()
        )}
        onDragOver={(e) => (
          e.preventDefault()
        )}
        onDragExit={() => {}}
      >{
          content ||
          <div><p>Drag and Drop image(s) here.</p></div>
        }
      </div>
    </>
  );
}

export default DragAndDrop;
