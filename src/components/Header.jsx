import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Header() {
  return (
    <header className="header">
      <div className="logo"><a href="/">skinstric</a></div>
      <button className="code-btn">enter code</button>
    </header>
  );
}

export default Header;
