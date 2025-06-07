import React from "react";

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
const getBorderColor = (emotion) => borderColors[emotion] || borderColors['Disappointment'];

export default function EmotionSentencesPage({ emotion, details, onClose }) {
  return (
    <div 
      className="emotion-modal-overlay" 
      onClick={onClose}
    >
      <div className="emotion-modal-content" onClick={e => e.stopPropagation()}>
        {/* Close Button */}
        <button className="emotion-modal-close" onClick={onClose}>
          ✕
        </button>
        
        {/* Header */}
        <div className="emotion-modal-header">
          {details?.emoji && <span className="emotion-modal-emoji">{details.emoji}</span>}
          <h3 className="emotion-modal-title">{emotion} Details</h3>
        </div>
        
        {/* Content */}
        <div className="emotion-modal-body">
          {details.situation.map((s, idx) => (
            <div
              key={idx}
              className="emotion-sentence-card"
              style={{ borderColor: details?.borderColor || getBorderColor(emotion) }}
            >
              <p className="emotion-sentence-person">
                {s.name_of_person}
              </p>
              <p className="emotion-sentence-reason">
                {s.reason}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
