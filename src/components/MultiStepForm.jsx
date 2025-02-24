import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState(localStorage.getItem("userName") || "");
  const [location, setLocation] = useState(localStorage.getItem("userLocation") || "");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isValidInput = (text) => /^[A-Za-z\s]+$/.test(text.trim());

  const handleNextStep = () => {
    setError("");

    if (step === 1) {
      if (!isValidInput(name)) {
        setError("Please enter a valid name (letters only).");
        return;
      }
      localStorage.setItem("userName", name); // Store in local storage
      setStep(2);
    } else if (step === 2) {
      if (!isValidInput(location)) {
        setError("Please enter a valid location (letters only).");
        return;
      }
      localStorage.setItem("userLocation", location); // Store in local storage
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, location }),
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      // Move to the next page after successful API call
      navigate("/upload-photo");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Submission failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>{step === 1 ? "Enter Your Name" : "Enter Your Location"}</h2>
      <input
        type="text"
        value={step === 1 ? name : location}
        onChange={(e) => (step === 1 ? setName(e.target.value) : setLocation(e.target.value))}
        placeholder={step === 1 ? "Introduce Yourself" : "Where are you from?"}
        disabled={isLoading}
      />
      {error && <p className="error-message">{error}</p>}

      <div className="button-group">
        {step === 2 && <button onClick={() => setStep(1)}>Back</button>}
        <button onClick={handleNextStep} disabled={isLoading}>
          {step === 1 ? "Next" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default MultiStepForm;
