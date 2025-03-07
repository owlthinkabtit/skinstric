import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Demographics.css";

const Demographics = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState({
    race: {},
    age: {},
    gender: {},
  });

  const [selectedCategory, setSelectedCategory] = useState("race");
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    try {
      const storedResults = localStorage.getItem("aiResults");
      if (storedResults) {
        const parsedResults = JSON.parse(storedResults);
        setResults(parsedResults);

        setSelectedValue({
          race: parsedResults.race
            ? Object.keys(parsedResults.race).reduce((a, b) =>
                parsedResults.race[a] > parsedResults.race[b] ? a : b
              )
            : "Not available",
          age: parsedResults.age
            ? Object.keys(parsedResults.age).reduce((a, b) =>
                parsedResults.age[a] > parsedResults.age[b] ? a : b
              )
            : "Not available",
          gender: parsedResults.gender
            ? parsedResults.gender.female > parsedResults.gender.male
              ? "Female"
              : "Male"
            : "Not available",
        });
      } else {
        console.warn("No AI results found in localStorage.");
      }
    } catch (error) {
      console.error("Error parsing stored AI results:", error);
    }
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="demographics-container">
      <h2 className="demographics-title">DEMOGRAPHICS</h2>

      {results ? (
        <div className="demographics-content">
          <div className="sidebar">
            <button
              className={selectedCategory === "race" ? "active" : ""}
              onClick={() => handleCategoryClick("race")}
            >
              RACE
            </button>
            <button
              className={selectedCategory === "age" ? "active" : ""}
              onClick={() => handleCategoryClick("age")}
            >
              AGE
            </button>
            <button
              className={selectedCategory === "gender" ? "active" : ""}
              onClick={() => handleCategoryClick("gender")}
            >
              GENDER
            </button>
          </div>

          <div className="results-display">
            {selectedCategory === "race" && (
              <>
                <h3>{selectedValue?.race || "Not available"}</h3>
                <p className="percentage">
                  {results?.race?.[selectedValue?.race]
                    ? (results.race[selectedValue.race] * 100).toFixed(2)
                    : "0"}
                  %
                </p>

                <div className="circle-chart"></div>
              </>
            )}
            {selectedCategory === "age" && (
              <>
                <h3>
                  {selectedValue?.age
                    ? `${selectedValue.age} y.o.`
                    : "Not available"}
                </h3>
                <p className="percentage">
                  {results?.age?.[selectedValue?.age]
                    ? (results.age[selectedValue.age] * 100).toFixed(2)
                    : "0"}
                  %
                </p>

                <div className="circle-chart"></div>
              </>
            )}
            {selectedCategory === "gender" && (
              <>
                <h3>{selectedValue?.gender || "Not available"}</h3>
                <p className="percentage">
                  {results?.gender?.female && results?.gender?.male
                    ? selectedValue.gender === "Female"
                      ? (results.gender.female * 100).toFixed(2)
                      : (results.gender.male * 100).toFixed(2)
                    : "0"}
                  %
                </p>

                <div className="circle-chart"></div>
              </>
            )}
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
