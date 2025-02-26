import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState(localStorage.getItem("userName") || "");
  const [location, setLocation] = useState(localStorage.getItem("userLocation") || "");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isValidInput = (text) => /^[A-Za-z\s]+$/.test(text.trim());

  const handleNextStep = () => {
    setError("");

    if (step === 1) {
      if (!isValidInput(name)) {
        setError("Please enter a valid name (letters only).");
        return;
      }
      localStorage.setItem("userName", name);
      setStep(2);
    } else if (step === 2) {
      if (!isValidInput(location)) {
        setError("Please enter a valid location (letters only).");
        return;
      }
      localStorage.setItem("userLocation", location);
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, location }),
        }
      );

      await response.json();
      navigate("/upload-photo");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Submission failed. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleNextStep();
    }
  };

  return (
    <div className="form-container">
      <div className="input-page">
        <div className="input-wrapper">
          <h4 className="input-header">Click to Type</h4>
          <input
            type="text"
            value={step === 1 ? name : location}
            onChange={(e) => (step === 1 ? setName(e.target.value) : setLocation(e.target.value))}
            onKeyDown={handleKeyPress}
            placeholder={step === 1 ? "Introduce Yourself" : "Where are you from?"}
            autoFocus
          />
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default MultiStepForm;
