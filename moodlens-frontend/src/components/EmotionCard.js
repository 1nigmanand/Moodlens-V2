import { useState } from "react";
import EmotionSentencesPage from "./EmotionSentencesPage";




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
  const bgStyle = details.color ? { background: details.color } : {};
  const borderColor = details.borderColor || borderColors[normalizeEmotion(emotion)] || borderColors['Disappointment'];
  const emoji = details.emoji || emojis[normalizeEmotion(emotion)] || '😐';

  const cardStyle = {
    ...bgStyle,
    border: `4px solid ${borderColor}`,
    display: showSentences ? 'none' : 'flex',
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
        className={
          'w-full max-w-xs h-64 rounded-1xl shadow-2xl text-white p-6 flex flex-col justify-center items-center hover:scale-105 hover:shadow-3xl transition-all duration-300 cursor-pointer bg-white/10 backdrop-blur-lg border'
        }
        onClick={handleCardClick}
        style={cardStyle}
      >
        <div className="flex flex-col items-center w-full h-full">
          <div className="text-5xl mb-2 drop-shadow-lg">{emoji}</div>
          <h2 className="text-2xl font-bold mb-1 text-center drop-shadow">{emotion}</h2>
          <div className="bg-white/30 rounded-full px-4 py-2 mt-2 mb-2 shadow-inner">
            <p className="text-lg font-semibold text-gray-900">Count: {details.count}</p>
          </div>
          <div className="flex-1 flex items-end w-full">
            <p className="text-xs opacity-80 text-center w-full">Click to see details</p>
          </div>
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
