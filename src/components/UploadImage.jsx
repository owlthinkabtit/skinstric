import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        const base64String = reader.result.split(",")[1]; 
        console.log("Base64 Encoded Image:", base64String); 
        setBase64Image(base64String);
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
      // Add MIME type (assuming JPEG)
      const requestData = { Image: `data:image/jpeg;base64,${base64Image}` };
      console.log("Sending to API:", requestData); // Debugging
  
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );
  
      const data = await response.json();
      console.log("API Response:", data); // Debugging
  
      if (!data || !data.data) {
        console.error("Invalid API response:", data);
        alert("Invalid response from AI. Please try again.");
        return;
      }
  
      localStorage.setItem("aiResults", JSON.stringify(data.data));
      navigate("/loading");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  
  
  

  return (
    <div className="upload-container">
      <h2>UPLOAD YOUR IMAGE</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isLoading} />
      {selectedImage && <img src={selectedImage} alt="Preview" className="image-preview" />}
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Uploading..." : "Submit"}
      </button>
      <button onClick={() => navigate("/upload-photo")}>Back</button>
    </div>
  );
};

export default UploadImage;
