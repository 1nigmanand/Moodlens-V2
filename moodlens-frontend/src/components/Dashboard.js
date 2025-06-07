import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../App.css';

export default function Dashboard() {
  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      // Optionally, clear inputText if a file is selected
      // setInputText(""); 
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    let textToAnalyze = inputText;

    if (selectedFile) {
      try {
        textToAnalyze = await selectedFile.text();
      } catch (error) {
        console.error("Error reading file:", error);
        setLoading(false);
        // Handle file reading error (e.g., show a message to the user)
        alert("Error reading file. Please ensure it is a valid text file.");
        return;
      }
    }

    if (!textToAnalyze.trim()) {
      alert("Please enter text or select a file to analyze.");
      setLoading(false);
      return;
    }

    // console.log("Text being sent to backend:", JSON.stringify(textToAnalyze)); // Log the exact text

    try {
      const response = await axios.post("https://moodlens-v2.onrender.com/process", { text: textToAnalyze });
      navigate("/result", { state: { emotionData: response.data.response } });
    } catch (err) {
      console.error("Error analyzing text:", err);
      alert("An error occurred during analysis. Please try again.");
    }
    setLoading(false);
  };

  const canAnalyze = () => (inputText.trim() !== "" || selectedFile !== null) && !loading;

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Student Emotion Dashboard</h1>
        
        {/* Text Area Input */}
        <label className="dashboard-label" htmlFor="text-input">Enter text for emotional analysis</label>
        <textarea
          id="text-input"
          className="dashboard-textarea"
          rows={4}
          placeholder="Paste your text here..."
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            // Optionally, clear selectedFile if text is entered
            // setSelectedFile(null);
            // setFileName("");
          }}
          disabled={!!selectedFile} // Disable textarea if a file is selected
        />
        <div className="character-counter">
          <span>{inputText.length} characters</span>
        </div>

        <div className="or-divider">OR</div>

        {/* File Input */}
        <label className="dashboard-label" htmlFor="file-input">Upload a text file (.txt)</label>
        <div className="file-input-container">
          <input 
            type="file" 
            id="file-input" 
            className="dashboard-file-input"
            accept=".txt" 
            onChange={handleFileChange} 
            disabled={inputText.trim() !== ""} // Disable file input if text is entered
          />
          <label htmlFor="file-input" className="dashboard-file-label">
            {fileName || "Choose a file..."}
          </label>
        </div>
        {selectedFile && (
          <button 
            onClick={() => {
              setSelectedFile(null);
              setFileName("");
              // Manually reset the file input value if needed
              const fileInput = document.getElementById('file-input');
              if(fileInput) fileInput.value = null;
            }}
            className="clear-file-button"
          >
            Clear File
          </button>
        )}

        <button
          onClick={handleAnalyze}
          className={`dashboard-button ${!canAnalyze() ? 'disabled' : ''}`}
          disabled={!canAnalyze()}
        >
          {loading ? "Analyzing..." : "Analyze Emotions"}
        </button>
      </div>
    </div>
  );
}