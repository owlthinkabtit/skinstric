import React from "react";
import { useNavigate } from "react-router-dom";

const UploadPhoto = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("userName") || "User";
  const location = localStorage.getItem("userLocation") || "Unknown Location";

  return (
    <div className="upload-page">
      <h2>TO START ANALYSIS</h2>
      <p>Welcome, {name} from {location}!</p>

      <div className="options-container">
        {/* Take a Photo */}
        <div className="option" onClick={() => navigate("/take-photo")}>
          <div className="diamond">
            <img src="/camera-icon.svg" alt="Take Photo" />
          </div>
          <p>ALLOW A.I. TO SCAN YOUR FACE</p>
        </div>

        {/* Upload an Image */}
        <div className="option" onClick={() => navigate("/upload-gallery")}>
          <div className="diamond">
            <img src="/gallery-icon.svg" alt="Upload Photo" />
          </div>
          <p>ALLOW A.I. TO ACCESS GALLERY</p>
        </div>
      </div>

      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default UploadPhoto;
