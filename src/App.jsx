import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import MultiStepForm from './components/MultiStepForm';
import Header from "./components/Header";
import UploadPhoto from "./components/UploadPhoto";
import UploadImage from "./components/UploadImage";
import WebcamCapture from "./components/WebcamCapture";
import LoadingScreen from "./components/LoadingScreen"; // New
import AnalysisPage from "./components/AnalysisPage"; // New
import Demographics from "./components/Demographics"; // New

function App() {
  return (
    <Router>
      <nav><Header /></nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/take-test" element={<MultiStepForm />} />
        <Route path="/upload-photo" element={<UploadPhoto />} />
        <Route path="/upload-gallery" element={<UploadImage />} />
        <Route path="/take-photo" element={<WebcamCapture />} />
        <Route path="/loading" element={<LoadingScreen />} /> 
        <Route path="/analysis" element={<AnalysisPage />} /> 
        <Route path="/demographics" element={<Demographics />} />
      </Routes>
    </Router>
  );
}

export default App;
