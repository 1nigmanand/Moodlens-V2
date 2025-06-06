import Dashboard from "./components/Dashboard";
import ResultPage from "./components/ResultPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles/Global.css';

function App() {
  return (
    <Router>
      <header className="header">Moodlens Dashboard</header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

