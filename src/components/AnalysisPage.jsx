import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const AnalysisPage = () => {
  const navigate = useNavigate();
  const [aiResults, setAiResults] = useState(null);

  useEffect(() => {
    const fetchResults = () => {
      const storedResults = localStorage.getItem("aiResults");
      
      if (storedResults) {
        try {
          const parsedResults = JSON.parse(storedResults);
          if (parsedResults && Object.keys(parsedResults).length > 0) {
            setAiResults(parsedResults);
            console.log("✅ AI Results Loaded:", parsedResults);
          } else {
            console.warn("❌ AI results are empty.");
            setAiResults(null);
          }
        } catch (error) {
          console.error("❌ Error parsing AI results:", error);
          setAiResults(null);
        }
      } else {
        console.warn("❌ No AI results found in localStorage.");
        setAiResults(null);
      }
    };
  
    fetchResults();
    window.addEventListener("storage", fetchResults);
  
    return () => {
      window.removeEventListener("storage", fetchResults);
    };
  }, []);
  

  return (
    <div className="analysis-container">
      <h2 className="analysis-title">A.I. ANALYSIS</h2>
      <p className="analysis-subtext">
        A.I. has estimated the following. Fix estimated information if needed.
      </p>

      <div className="diamond-wrapper">
        <div className="main-diamond">
          <div
            className="small-diamond clickable highlight"
            onClick={() => navigate("/demographics")}
          >
            <p>DEMOGRAPHICS</p>
          </div>
          <div className="small-diamond inactive">
            <p>SKIN TYPE DETAILS</p>
          </div>
          <div className="small-diamond inactive">
            <p>COSMETIC CONCERNS</p>
          </div>
          <div className="small-diamond inactive">
            <p>WEATHER</p>
          </div>
        </div>
      </div>

      <button className="back-button" onClick={() => navigate(-1)}>
        BACK
      </button>
    </div>
  );
};

export default AnalysisPage;
