import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import TestTake from "./components/TakeTest";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/take-test" element={<TestTake />} />
      </Routes>
    </Router>
  );
}

export default App;
