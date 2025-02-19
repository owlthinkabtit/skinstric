import React, { useState } from "react";


const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (step === 1 && name.trim() !== "") {
        setStep(2);
      } else if (step === 2 && location.trim() !== "") {
        console.log("Form Submitted:", { name, location });
      }
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
            placeholder={step === 1 ? "Introduce Yourself" : "Where are you from?"}
          />
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
