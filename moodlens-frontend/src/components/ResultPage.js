import { useLocation, useNavigate } from "react-router-dom";
import Chart from "./Chart";
import EmotionCard from "./EmotionCard";
import "../styles/Global.css";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const emotionData = location.state?.emotionData;

  // Add color if missing for backward compatibility
  const getColor = (emotion) => {
    const colorMap = {
      Happy: "rgba(255, 206, 86, 0.7)",
      Sad: "rgba(54, 162, 235, 0.7)",
      Angry: "rgba(255, 99, 132, 0.7)",
      Fear: "rgba(153, 102, 255, 0.7)",
      Surprise: "rgba(255, 159, 64, 0.7)",
      Neutral: "rgba(201, 203, 207, 0.7)",
    };
    return colorMap[emotion] || "rgba(75, 192, 192, 0.7)";
  };

  // Ensure emotionData has color for each emotion
  const chartData = emotionData
    ? Object.fromEntries(
        Object.entries(emotionData).map(([emotion, details]) => [
          emotion,
          {
            ...details,
            color: details.color || getColor(emotion),
          },
        ])
      )
    : null;

  if (!emotionData) {
    return (
      <div className="result-page">
        <div className="no-data-container fade-in">
          <div className="no-data-icon">📊</div>
          <h2 className="no-data-title">No Analysis Data Found</h2>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
            It seems like you haven't performed an emotion analysis yet.
          </p>
          <button className="btn-primary" onClick={() => navigate("/")}>Start Analysis</button>
        </div>
      </div>
    );
  }

  return (
    <div className="result-page">
      <div className="result-container fade-in">
        <h1 className="result-title">Emotion Analysis Report</h1>
        <div className="chart-section">
          <Chart data={chartData} />
        </div>
        <div className="emotions-grid">
          {Object.entries(emotionData).map(([emotion, details]) => (
            <EmotionCard key={emotion} emotion={emotion} details={details} />
          ))}
        </div>
        <div className="action-buttons">
          <button className="btn-primary" onClick={() => navigate("/")}>📝 Analyze New Text</button>
        </div>
      </div>
    </div>
  );
}
