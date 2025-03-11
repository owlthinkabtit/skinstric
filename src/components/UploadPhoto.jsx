import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineCamera } from "react-icons/md";
import { BsImage } from "react-icons/bs";
import "../App.css";

const UploadPhoto = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("userName") || "User";
  const location = localStorage.getItem("userLocation") || "Unknown Location";

  return (
    <div className="upload-photo-container">
      <h2 className="upload-heading">TO START ANALYSIS</h2>

      <div className="options-wrapper">
        <div className="upload-option" onClick={() => navigate("/take-photo")}>
          <div className="diamond">
            <MdOutlineCamera className="upload-icon" />
          </div>
          <span><p className="upload-label">ALLOW A.I. TO SCAN YOUR FACE</p></span>
        </div>

      
        <div className="upload-option" onClick={() => navigate("/upload-gallery")}>
          <div className="diamond">
            <BsImage className="upload-icon" />
          </div>
          <span><p className="upload-label">ALLOW A.I. TO ACCESS GALLERY</p></span>
        </div>
      </div>

      
      <button className="back-button" onClick={() => navigate(-1)}>BACK</button>
    </div>
  );
};

export default UploadPhoto;
