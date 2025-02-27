import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Demographics = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("aiResults"));
    setResults(data);
  }, []);

  return (
    <div className="demographics-container">
      <h2>DEMOGRAPHICS</h2>

      {results ? (
        <div className="demographics-details">
          <h3>{results.race_top} ({(results.race[results.race_top] * 100).toFixed(2)}%)</h3>
          <h3>{results.age_top} ({(results.age[results.age_top] * 100).toFixed(2)}%)</h3>
          <h3>{results.gender_top} ({(results.gender[results.gender_top] * 100).toFixed(2)}%)</h3>
        </div>
      ) : (
        <p>Loading results...</p>
      )}

      <button className="back-button" onClick={() => navigate("/analysis")}>BACK</button>
    </div>
  );
};

export default Demographics;
