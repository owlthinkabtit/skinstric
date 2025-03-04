import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const AnalysisPage = () => {
  const navigate = useNavigate();

  return (
    <div className="analysis-container">
      <h2 className="analysis-title">A.I. ANALYSIS</h2>
      <p className="analysis-subtext">A.I. has estimated the following. Fix estimated information if needed.</p>

      <div className="diamond-grid">
        <div className="diamond clickable highlight" onClick={() => navigate("/demographics")}>
          <p>DEMOGRAPHICS</p>
        </div>
        <div className="diamond inactive"><p>SKIN TYPE DETAILS</p></div>
        <div className="diamond inactive"><p>COSMETIC CONCERNS</p></div>
        <div className="diamond inactive"><p>WEATHER</p></div>
      </div>

      <button className="back-button" onClick={() => navigate(-1)}>BACK</button>
    </div>
  );
};

export default AnalysisPage;
