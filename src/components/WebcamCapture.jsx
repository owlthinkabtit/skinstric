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

      localStorage.removeItem("aiResults");

      localStorage.setItem("capturedImage", imageSrc);

      sendToAPI(imageSrc);
    }
  };

  const sendToAPI = async (imageSrc) => {
    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: imageSrc }),
        }
      );
  
      const data = await response.json();
      
      if (data && data.success && data.data) {
        localStorage.setItem("aiResults", JSON.stringify(data.data));
        console.log("✅ AI Results successfully stored:", data.data);
        navigate("/analysis");
      } else {
        console.error("❌ AI processing failed:", data.message || "Unknown error");
        alert("AI processing failed. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error sending image:", error);
      alert("There was an error processing your image. Please try again.");
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
