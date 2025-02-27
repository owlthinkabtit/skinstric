import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const AnalysisPage = () => {
  const navigate = useNavigate();

  return (
    <div className="analysis-container">
      <h2>A.I. ANALYSIS</h2>
      <p>A.I. has estimated the following. Fix estimated information if needed.</p>

      <div className="diamond-grid">
        <div className="diamond clickable" onClick={() => navigate("/demographics")}>
          <p>DEMOGRAPHICS</p>
        </div>
        <div className="diamond"><p>SKIN TYPE DETAILS</p></div>
        <div className="diamond"><p>COSMETIC CONCERNS</p></div>
        <div className="diamond"><p>WEATHER</p></div>
      </div>

      <button className="back-button" onClick={() => navigate(-1)}>BACK</button>
    </div>
  );
};

export default AnalysisPage;
