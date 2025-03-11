import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../UploadImage.css";

const UploadImage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!selectedImage) {
      alert("Please upload an image before proceeding.");
      return;
    }
    navigate("/analysis");
  };

  return (
    <div className="upload-container">
      <h2 className="upload-title">UPLOAD YOUR IMAGE</h2>

      <div
        className={`diamond-container ${dragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleFileChange}
          hidden
        />
        <label htmlFor="fileInput" className="upload-label">
          {selectedImage ? (
            <img src={selectedImage} alt="Preview" className="image-preview" />
          ) : (
            <span className="upload-text">
              {dragging ? "Drop image here" : "Click or Drag to Upload"}
            </span>
          )}
        </label>
      </div>

      <div className="button-group">
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
        <button className="back-button" onClick={() => navigate("/")}>
          Back
        </button>
      </div>
    </div>
  );
};

export default UploadImage;
