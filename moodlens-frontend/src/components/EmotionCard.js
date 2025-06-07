import { useState } from "react";
import EmotionSentencesPage from "./EmotionSentencesPage";
import "../styles/Global.css";

const borderColors = {
  'Happy': '#10b981',
  'Sad': '#3b82f6',
  'Angry': '#ef4444',
  'Excited': '#f59e0b',
  'Calm': '#8b5cf6',
  'Anxious': '#ec4899',
  'Frustration': '#ea580c',
  'Disappointment': '#6b7280',
  'Fear': '#6366f1',
  'Joy': '#eab308',
  'Love': '#f43f5e',
  'Surprise': '#06b6d4'
};
const emojis = {
  'Happy': '😊',
  'Sad': '😢',
  'Angry': '😠',
  'Excited': '🤩',
  'Calm': '😌',
  'Anxious': '😰',
  'Frustration': '😤',
  'Disappointment': '😞',
  'Fear': '😨',
  'Joy': '😄',
  'Love': '❤️',
  'Surprise': '😲'
};

// Utility to normalize emotion keys
function normalizeEmotion(emotion) {
  if (!emotion) return '';
  const trimmed = emotion.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

export default function EmotionCard({ emotion, details }) {
  const [showSentences, setShowSentences] = useState(false);

  // Use backend-provided values, fallback to frontend defaults if missing
  const bgStyle = details.color ? { background: details.color } : { background: '#4A5568' }; // Added a default bg
  const borderColorFromDetails = details.borderColor || borderColors[normalizeEmotion(emotion)] || borderColors['Disappointment'];
  const emoji = details.emoji || emojis[normalizeEmotion(emotion)] || '😐';

  const cardStyle = {
    ...bgStyle,
    border: `4px solid ${borderColorFromDetails}`,
    // Removed: display: showSentences ? 'none' : 'flex',
  };

  const handleCardClick = () => setShowSentences(true);
  const handleCloseSentences = (e) => {
    e.stopPropagation();
    setShowSentences(false);
  };

  return (
    <>
      {/* Card */}
      <div
        className="emotion-card" // Simplified to use a single class for Global.css
        onClick={handleCardClick}
        style={cardStyle}
      >
        {/* Removed inner full-height/width div, .emotion-card handles layout */}
        <div className="emotion-card-emoji">{emoji}</div>
        <h2 className="emotion-card-title">{emotion}</h2>
        <div className="emotion-card-count-wrapper">
          <p className="emotion-card-count">Count: {details.count}</p>
        </div>
        <div className="emotion-card-footer">
          <p>Click to see details</p>
        </div>
      </div>
      {/* Fullscreen Sentences Page */}
      {showSentences && (
        <EmotionSentencesPage
          emotion={emotion}
          details={details}
          onClose={handleCloseSentences}
        />
      )}
    </>
  );
}
