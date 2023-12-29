import ImageUpload from '@/components/ImageUpload';
import useSelectFile from './hooks/useSelectFile';

function App() {
  const {error, imgsToSave, selectedImages} = useSelectFile()
  console.log({imgsToSave, selectedImages})
  console.log(imgsToSave)
  return (
    <>
    <h1>{error.message}</h1>
      <ImageUpload quality={1}
        Content={<p>UPLOAD</p>}
        deleteIcon={<p>DEL</p>}
      />
    </>
  );
}

export default App;
