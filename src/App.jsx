import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import MultiStepForm from './components/MultiStepForm';
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <nav><Header /></nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/take-test" element={<MultiStepForm />} />
      </Routes>
    </Router>
  );
}

export default App;
