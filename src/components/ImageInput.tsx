/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';

import { useAtom } from 'jotai';

import useSelectFile from '../hooks/useSelectFile';
import { jotaiFileLimit, jotaiFileSizeLimit } from '@/JotaiAtoms';

import { FileUploadType } from "../../types";

const ImageInput: React.FC<FileUploadType> = ({ quality, content, limit, fileSizeLimit }) => {
  const {handleSelectFile} = useSelectFile();
  const [fileLimit, setFileLimit] = useAtom(jotaiFileLimit)
  const [maxFileSize, setMaxFileSize] = useAtom(jotaiFileSizeLimit)

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
      <input
        hidden
        multiple
        type='file'
        id='fileUpload'
        className='w-52'
        name='fileUpload'
        onClick={(e: any) => e.target.value = ""}
        onChange={(e) => handleSelectFile(e, quality, fileLimit, maxFileSize)}
      />
      <label htmlFor='fileUpload'>{content || "Upload"}</label>
    </>
  );
};

export default ImageInput;
