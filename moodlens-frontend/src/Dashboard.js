import { useState } from "react";
import axios from "axios";
import EmotionCard from "./components/EmotionCard";
import Chart from "./components/Chart";

export default function Dashboard() {
  const [inputText, setInputText] = useState("");
  const [emotionData, setEmotionData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const response = await axios.post("https://moodlens-v2.onrender.com/process", { text: inputText });
      setEmotionData(response.data.response);
    } catch (err) {
      console.error("Error:", err);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-2">Student Emotion Dashboard</h1>

      <textarea
        className="w-full p-2 border rounded"
        rows={4}
        placeholder="Paste text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <button
        onClick={handleAnalyze}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Emotions"}
      </button>

      {emotionData && Object.values(emotionData).some(({ count }) => count > 0) && (
      <>
        <Chart data={emotionData} />
        <div className="grid grid-cols-1 gap-4 mt-4 w-full md:w-1/2">
          {Object.entries(emotionData).map(([emotion, details]) => (
            <EmotionCard key={emotion} emotion={emotion} details={details} />
          ))}
        </div>
      </>
      )}
    </div>
  );
}

