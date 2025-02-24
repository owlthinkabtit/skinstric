import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result.split(",")[1]); // Extract only Base64 data
        setSelectedImage(URL.createObjectURL(file)); // Show preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!base64Image) {
      alert("Please upload an image.");
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
    <div className="upload-container">
      <h2>Upload Your Image</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isLoading} />
      {selectedImage && <img src={selectedImage} alt="Preview" className="image-preview" />}
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Uploading..." : "Submit"}
      </button>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <button onClick={() => navigate("/upload-photo")}>Back</button>
    </div>
  );
};

export default UploadImage;
