import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../App.css';

export default function Dashboard() {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const response = await axios.post("https://moodlens-v2.onrender.com/process", { text: inputText });
      navigate("/result", { state: { emotionData: response.data.response } });
    } catch (err) {
      console.error("Error:", err);
    }
    setLoading(false);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Student Emotion Dashboard</h1>
        <label className="dashboard-label">Enter text for emotional analysis</label>
        <textarea
          className="dashboard-textarea"
          rows={4}
          placeholder="Paste your text here to discover the emotional insights hidden within..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="character-counter">
          <span>{inputText.length} characters</span>
        </div>
        <button
          onClick={handleAnalyze}
          className={`dashboard-button ${loading || !inputText.trim() ? 'disabled' : ''}`}
          disabled={loading || !inputText.trim()}
        >
          {loading ? "Analyzing..." : "Analyze Emotions"}
        </button>
      </div>
    </div>
  );
}