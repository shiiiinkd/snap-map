import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import ImageUploader from "./components/ImageUploader";
import SnapMapPage from "./components/SnapMapPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/imageUpload"
          element={
            <ImageUploader
              onFilesChange={() => {}}
              onResetPreview={() => {}}
              shouldResetPreview={false}
            />
          }
        />
        <Route path="/page" element={<SnapMapPage />} />
      </Routes>
    </>
  );
}

export default App;
