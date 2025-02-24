import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      setBase64Image(imageSrc.split(",")[1]); // Extract only Base64 data
    }
  };

  const handleSubmit = async () => {
    if (!base64Image) {
      alert("Please take a photo.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Image: base64Image }),
        }
      );

      const data = await response.json();
      setSuccessMessage(data.message);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="webcam-container">
      <h2>Take a Selfie</h2>
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={capturePhoto}>Capture Photo</button>
      {capturedImage && <img src={capturedImage} alt="Captured" className="image-preview" />}
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Uploading..." : "Submit"}
      </button>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <button onClick={() => navigate("/upload-photo")}>Back</button>
    </div>
  );
};

export default WebcamCapture;
