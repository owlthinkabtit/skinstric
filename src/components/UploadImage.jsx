import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result.split(",")[1]);
        setSelectedImage(URL.createObjectURL(file));
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

      await response.json();
      alert("Upload successful!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-page">
      <h2>UPLOAD YOUR IMAGE</h2>
      <div className="diamond">
        <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isLoading} />
      </div>
      {selectedImage && <img src={selectedImage} alt="Preview" className="image-preview" />}
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Uploading..." : "Submit"}
      </button>
      <button onClick={() => navigate("/upload-photo")}>Back</button>
    </div>
  );
};

export default UploadImage;
