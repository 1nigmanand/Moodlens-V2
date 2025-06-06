import { useState } from "react";
import EmotionSentencesPage from "./EmotionSentencesPage";

// Centralized color and border color maps
export const colors = {
  'Happy': 'bg-gradient-to-br from-green-400 to-green-600',
  'Sad': 'bg-gradient-to-br from-blue-400 to-blue-600',
  'Angry': 'bg-gradient-to-br from-red-400 to-red-600',
  'Excited': 'bg-gradient-to-br from-yellow-400 to-orange-500',
  'Calm': 'bg-gradient-to-br from-purple-400 to-purple-600',
  'Anxious': 'bg-gradient-to-br from-pink-400 to-pink-600',
  'Frustration': 'bg-gradient-to-br from-orange-400 to-red-500',
  'Disappointment': 'bg-gradient-to-br from-gray-400 to-gray-600',
  'Fear': 'bg-gradient-to-br from-indigo-400 to-indigo-600',
  'Joy': 'bg-gradient-to-br from-yellow-300 to-yellow-500',
  'Love': 'bg-gradient-to-br from-rose-400 to-pink-500',
  'Surprise': 'bg-gradient-to-br from-cyan-400 to-blue-500'
};
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

const getEmotionColor = (emotion) => colors[normalizeEmotion(emotion)] || colors['Disappointment'];
const getBorderColor = (emotion) => borderColors[normalizeEmotion(emotion)] || borderColors['Disappointment'];
const getEmotionEmoji = (emotion) => emojis[normalizeEmotion(emotion)] || '😐';

export default function EmotionCard({ emotion, details }) {
  const [showSentences, setShowSentences] = useState(false);

  const handleCardClick = () => setShowSentences(true);
  const handleCloseSentences = (e) => {
    e.stopPropagation();
    setShowSentences(false);
  };

  return (
    <>
      {/* Card */}
      <div
        className={`w-full h-64 rounded-xl shadow-lg text-white p-6 flex flex-col justify-center items-center hover:shadow-xl transition-shadow duration-300 cursor-pointer ${getEmotionColor(emotion)}`}
        onClick={handleCardClick}
        style={{ display: showSentences ? 'none' : 'flex', border: `4px solid ${getBorderColor(emotion)}` }}
      >
        <div className="text-4xl mb-3">{getEmotionEmoji(emotion)}</div>
        <h2 className="text-2xl font-bold mb-2 text-center">{emotion}</h2>
        <div className="bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
          <p className="text-lg font-semibold">Count: {details.count}</p>
        </div>
        <p className="text-sm mt-4 opacity-80 text-center">Click to see details</p>
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
