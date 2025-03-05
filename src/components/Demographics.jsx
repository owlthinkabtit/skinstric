import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Demographics = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);

  useEffect(() => {
    try {
      const storedResults = localStorage.getItem("aiResults");
      if (storedResults) {
        const parsedResults = JSON.parse(storedResults);

        if (
          parsedResults &&
          parsedResults.race &&
          parsedResults.age &&
          parsedResults.gender
        ) {
          setResults(parsedResults);
        } else {
          console.warn(
            "AI response is missing expected fields:",
            parsedResults
          );
        }
      } else {
        console.warn("No AI results found in localStorage.");
      }
    } catch (error) {
      console.error("Error parsing stored AI results:", error);
    }
  }, []);


  const calculatePercentages = (data, type) => {
    if (!data || Object.keys(data).length === 0) return "0"; 

    switch (type) {
      case "age":
        const ageTop = Object.keys(data).reduce(
          (a, b) => (data[a] > data[b] ? a : b),
          "N/A"
        );
        return `${ageTop} (${(data[ageTop] * 100).toFixed(2)}%)`;
      case "gender":
        if (!data.female && !data.male) return "N/A (0%)";
        return data.female > data.male
          ? `Female (${(data.female * 100).toFixed(2)}%)`
          : `Male (${(data.male * 100).toFixed(2)}%)`;
      case "race":
        const raceTop = Object.keys(data).reduce(
          (a, b) => (data[a] > data[b] ? a : b),
          "N/A"
        );
        return `${raceTop} (${(data[raceTop] * 100).toFixed(2)}%)`;
      default:
        return "N/A (0%)";
    }
  };

  return (
    <div className="demographics-container">
      <h2 className="demographics-title">DEMOGRAPHICS</h2>

      {results ? (
        <div className="demographics-details">
          <div className="result-category">
            <h3>Race</h3>
            <p>{calculatePercentages(results.race, "race")}</p>
          </div>
          <div className="result-category">
            <h3>Age</h3>
            <p>{calculatePercentages(results.age, "age")}</p>
          </div>
          <div className="result-category">
            <h3>Gender</h3>
            <p>{calculatePercentages(results.gender, "gender")}</p>
          </div>
        </div>
      ) : (
        <p>Loading results...</p>
      )}

      <button className="back-button" onClick={() => navigate("/analysis")}>
        BACK
      </button>
    </div>
  );
};

export default Demographics;
