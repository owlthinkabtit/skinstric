import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Demographics = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem("aiResults"));
    setResults(storedResults);
  }, []);

  return (
    <div className="demographics-container">
      <h2 className="demographics-title">DEMOGRAPHICS</h2>

      {results ? (
        <div className="demographics-details">
          <div className="result-category">
            <h3>Race</h3>
            <p>{results.race_top} ({(results.race[results.race_top] * 100).toFixed(2)}%)</p>
          </div>
          <div className="result-category">
            <h3>Age</h3>
            <p>{results.age_top} ({(results.age[results.age_top] * 100).toFixed(2)}%)</p>
          </div>
          <div className="result-category">
            <h3>Gender</h3>
            <p>{results.gender_top} ({(results.gender[results.gender_top] * 100).toFixed(2)}%)</p>
          </div>
        </div>
      ) : (
        <p>Loading results...</p>
      )}

      <button className="back-button" onClick={() => navigate("/analysis")}>BACK</button>
    </div>
  );
};

export default Demographics;
