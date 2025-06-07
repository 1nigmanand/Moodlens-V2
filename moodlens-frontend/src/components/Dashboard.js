import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../App.css';

export default function Dashboard() {
  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [selectedFolderFiles, setSelectedFolderFiles] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      setInputText(""); 
      setSelectedFolderFiles([]);
      setFolderName("");
    }
  };

  const handleFolderChange = async (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const textFiles = Array.from(files).filter(file => file.name.endsWith('.txt'));
      if (textFiles.length === 0) {
        alert("No .txt files found in the selected folder.");
        setFolderName("");
        setSelectedFolderFiles([]);
        return;
      }
      const firstFilePath = textFiles[0].webkitRelativePath;
      const folderPath = firstFilePath.substring(0, firstFilePath.lastIndexOf('/'));
      setFolderName(folderPath || "Selected Folder");
      setSelectedFolderFiles(textFiles);
      setInputText("");
      setSelectedFile(null);
      setFileName("");
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    let textToAnalyze = inputText;
    let source = "text input";

    if (selectedFolderFiles.length > 0) {
      source = `folder: ${folderName}`;
      let combinedText = "";
      for (const file of selectedFolderFiles) {
        try {
          const fileText = await file.text();
          combinedText += fileText + "\n\n";
        } catch (error) {
          console.error(`Error reading file ${file.name}:`, error);
          alert(`Error reading file ${file.name}. Skipping this file.`);
        }
      }
      textToAnalyze = combinedText.trim();
    } else if (selectedFile) {
      source = `file: ${fileName}`;
      try {
        textToAnalyze = await selectedFile.text();
      } catch (error) {
        console.error("Error reading file:", error);
        setLoading(false);
        alert("Error reading file. Please ensure it is a valid text file.");
        return;
      }
    }

    if (!textToAnalyze.trim()) {
      alert("Please enter text, select a file, or select a folder with .txt files to analyze.");
      setLoading(false);
      return;
    }

    console.log(`Analyzing content from ${source}`);

    try {
      const response = await axios.post("https://moodlens-v2.onrender.com/process", { text: textToAnalyze });
      navigate("/result", { state: { emotionData: response.data.response } });
    } catch (err) {
      console.error("Error analyzing text:", err);
      alert("An error occurred during analysis. Please try again.");
    }
    setLoading(false);
  };

  const clearSelection = () => {
    setInputText("");
    setSelectedFile(null);
    setFileName("");
    setSelectedFolderFiles([]);
    setFolderName("");
    const fileInput = document.getElementById('file-input');
    if(fileInput) fileInput.value = null;
    const folderInput = document.getElementById('folder-input');
    if(folderInput) folderInput.value = null;
  };

  const canAnalyze = () => (inputText.trim() !== "" || selectedFile !== null || selectedFolderFiles.length > 0) && !loading;
  const isInputDisabled = !!selectedFile || selectedFolderFiles.length > 0;
  const isFileInputDisabled = inputText.trim() !== "" || selectedFolderFiles.length > 0;
  const isFolderInputDisabled = inputText.trim() !== "" || !!selectedFile;

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Student Emotion Dashboard</h1>
        
        <label className="dashboard-label" htmlFor="text-input">Enter text for emotional analysis</label>
        <textarea
          id="text-input"
          className="dashboard-textarea"
          rows={4}
          placeholder="Paste your text here..."
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            if (e.target.value.trim() !== "") {
              setSelectedFile(null);
              setFileName("");
              setSelectedFolderFiles([]);
              setFolderName("");
            }
          }}
          disabled={isInputDisabled}
        />
        <div className="character-counter">
          <span>{inputText.length} characters</span>
        </div>

        <div className="or-divider">OR</div>

        {/* Container for side-by-side file/folder inputs */}
        <div className="upload-options-container">
          {/* Single File Upload Section */}
          <div className="upload-option">
            <label className="dashboard-label" htmlFor="file-input">Upload a single text file (.txt)</label>
            <div className="file-input-container">
              <input 
                type="file" 
                id="file-input" 
                className="dashboard-file-input"
                accept=".txt" 
                onChange={handleFileChange} 
                disabled={isFileInputDisabled}
              />
              <label htmlFor="file-input" className={`dashboard-file-label ${isFileInputDisabled ? 'disabled' : ''}`}>
                {fileName || "Choose a file..."}
              </label>
            </div>
            {selectedFile && (
              <button onClick={clearSelection} className="clear-file-button">
                Clear Selection
              </button>
            )}
          </div>

          {/* Vertical Divider - Optional, can be styled with CSS */}
          {/* <div className="vertical-or-divider">OR</div> */}

          {/* Folder Upload Section */}
          <div className="upload-option">
            <label className="dashboard-label" htmlFor="folder-input">Upload a folder with .txt files</label>
            <div className="file-input-container">
              <input 
                type="file" 
                id="folder-input" 
                className="dashboard-file-input"
                webkitdirectory="true"
                directory="true"
                multiple
                onChange={handleFolderChange} 
                disabled={isFolderInputDisabled}
              />
              <label htmlFor="folder-input" className={`dashboard-file-label ${isFolderInputDisabled ? 'disabled' : ''}`}>
                {folderName || "Choose a folder..."}
              </label>
            </div>
            {selectedFolderFiles.length > 0 && (
              <button onClick={clearSelection} className="clear-file-button">
                Clear Selection
              </button>
            )}
          </div>
        </div>

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