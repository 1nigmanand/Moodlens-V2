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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60" style={{backdropFilter: 'blur(2px)'}}>
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full relative animate-fade-in" onClick={e => e.stopPropagation()}>
        <button className="absolute top-4 right-6 text-3xl text-gray-400 hover:text-gray-700 font-bold" onClick={onClose}>&times;</button>
        <div className="flex items-center gap-3 mb-4"> {/* Increased gap for emoji */}
          {details?.emoji && <span className="text-2xl">{details.emoji}</span>}
          <h3 className="text-xl font-bold text-gray-800">{emotion} Details</h3>
        </div>
        <div className="space-y-3 max-h-80 overflow-y-auto pr-2"> {/* Added pr-2 for scrollbar spacing */}
          {details.situation.map((s, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-lg p-3 border-l-4" /* Changed to border-l-4 for emphasis */
              style={{ borderColor: details?.borderColor || getBorderColor(emotion), borderStyle: 'solid' }}
            >
              <p className="font-medium text-gray-700 text-sm mb-1">
                {s.name_of_person}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {s.reason}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
