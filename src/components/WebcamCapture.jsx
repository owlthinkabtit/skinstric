import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import "../WebcamCapture.css";
import { TbCapture } from "react-icons/tb";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPermissionPopup, setShowPermissionPopup] = useState(true);

 
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timeout);
  }, []);

  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);

      
      localStorage.setItem("capturedImage", imageSrc);
      navigate("/analysis");
    }
  };

  const handleAllowCamera = () => {
    setShowPermissionPopup(false);
  };

  return (
    <div className="webcam-container">
      {showPermissionPopup ? (
        <div className="popup">
          <p>ALLOW A.I. TO ACCESS YOUR CAMERA</p>
          <button onClick={() => setShowPermissionPopup(false)}>Deny</button>
          <button onClick={handleAllowCamera}>Allow</button>
        </div>
      ) : loading ? (
        <div className="loading-screen">
          <div className="rotating-diamond"></div>
          <p>SETTING UP CAMERA...</p>
          <p className="tips">Make sure to have:</p>
          <ul>
            <li>○ Neutral Expression</li>
            <li>○ Frontal Pose</li>
            <li>○ Adequate Lighting</li>
          </ul>
        </div>
      ) : !image ? (
        <>
          <Webcam
            ref={webcamRef}
            className="webcam-feed"
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
          />
          <div className="blur-overlay"></div> 
          <button className="capture-button" onClick={capturePhoto}>
            <TbCapture />
          </button>
        </>
      ) : (
        <img src={image} alt="Captured" className="webcam-feed" />
      )}
    </div>
  );
};

export default WebcamCapture;
