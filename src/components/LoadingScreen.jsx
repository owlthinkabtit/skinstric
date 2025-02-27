import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const LoadingScreen = () => {
  const navigate = useNavigate();
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoadingComplete(true);
      navigate("/analysis");
    }, 5000);
  }, [navigate]);

  return (
    <div className="loading-container">
      <div className="rotating-diamond">
        <p>PREPARING YOUR ANALYSIS ...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
