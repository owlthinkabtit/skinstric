import React, { useState } from "react";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidInput = (text) => /^[A-Za-z\s]+$/.test(text.trim());

  const handleNextStep = () => {
    if (step === 1 && isValidInput(name)) {
      setStep(2);
      localStorage.setItem("userName", name);
    } else if (step === 2 && isValidInput(location)) {
      handleSubmit();
    } else {
      alert("Please enter a valid input (letters only).");
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const userData = { Name: name, Location: location };

    try {
      const response = await fetch(
        "https://wk7wmfz7x8.execute-api.us-east-2.amazonaws.com/live/FES_Virtual_Internship_1/level1",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Name: "John Doe", Location: "New York" }),
        }
      );

      const data = await response.json();
      alert(data.SUCCESS);
      localStorage.setItem("userLocation", location);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
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
            onChange={(e) =>
              step === 1 ? setName(e.target.value) : setLocation(e.target.value)
            }
            onKeyDown={handleKeyPress}
            placeholder={
              step === 1 ? "Introduce Yourself" : "Where are you from?"
            }
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
