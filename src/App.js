import './App.css';

function App() {
  return (
    <div className="App">
     <header className="header">
      <div className="logo">skinstric</div>
      <button className="code-btn">enter code</button>
     </header>
      <main className="main-content">
        <h1 className="headline">Sophisticated 
          <br></br>skincare</h1>
          <div className="nav-left">
            <a href="#" className="nav-link">
              <button>&larr;</button> DISCOVER A.I.
            </a>
          </div>
          <div className="nav-right">
            <a href="#" className="nav-link">
              TAKE TEST<button>&rarr;</button>
            </a>
          </div>
      </main>
    </div>
  );
}

export default App;
