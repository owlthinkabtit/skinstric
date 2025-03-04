import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const LoadingScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/analysis");
    }, 5000);
  }, [navigate]);

  return (
    <div className="loading-container">
      <div className="loading-wrapper">
        <div className="diamond rotating fast"></div>
        <div className="diamond rotating medium"></div>
        <div className="diamond rotating slow"></div>
        <p className="loading-text">PREPARING YOUR ANALYSIS ...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
