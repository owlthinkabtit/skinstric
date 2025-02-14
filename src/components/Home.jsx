import React from 'react';
import { Link } from "react-router-dom";
import "../App.css";
import Header from './Header';

function Home() {
  return (
    <div className="App">
    <Header />
     <main className="main-content">
       <h1 className="headline">Sophisticated 
         <br></br>skincare</h1>
         <div className="nav-left">
           <a href="#" className="nav-link">
             <button>&larr;</button> DISCOVER A.I.
           </a>
         </div>
         <div className="nav-right">
           <Link to="/take-test" className="nav-link">
             TAKE TEST<button>&rarr;</button>
           </Link>
         </div>
     </main>
   </div>
  )
}

export default Home
