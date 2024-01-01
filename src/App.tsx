import "./index.css";
import ImageUpload from "./components/ImageUpload";

function App() {
  return (
    <ImageUpload align="start" quality={100} limit={3} fileSizeLimit="200mb" />
  );
}

export default App;
