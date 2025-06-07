import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Gemini AI setup
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash", 
    generationConfig: { 
        temperature: 0,
        topP: 1,
        topK: 1,
        maxOutputTokens: 8192,
        candidateCount: 1
    } 
});

// Utility to normalize and map emotion keys to canonical set
const emotionMap = {
  happiness: 'Happy',
  happy: 'Happy',
  sadness: 'Sad',
  sad: 'Sad',
  anger: 'Angry',
  angry: 'Angry',
  excitement: 'Excited',
  excited: 'Excited',
  calm: 'Calm',
  anxiety: 'Anxious',
  anxious: 'Anxious',
  frustration: 'Frustration',
  disappointment: 'Disappointment',
  fear: 'Fear',
  joy: 'Joy',
  love: 'Love',
  surprise: 'Surprise',
};
function normalizeEmotion(emotion) {
  if (!emotion) return '';
  const trimmed = emotion.trim().toLowerCase();
  return emotionMap[trimmed] || (trimmed.charAt(0).toUpperCase() + trimmed.slice(1));
}

app.post("/process", async (req, res) => {
    try {
        let text = req.body.text || ""; // Use let to allow reassignment
        // console.log("Original text received on backend (length " + text.length + "):", JSON.stringify(text));        // Robust Text Normalization
        // 1. Remove BOM (Byte Order Mark)
        text = text.replace(/^\uFEFF/, '');

        // 2. Standardize Newlines (convert all to \n)
        text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

        // 3. Trim Overall Whitespace (from the entire text block)
        text = text.trim();

        // 4. Per-Line Processing
        text = text.split('\n') // Split into lines
            .map(line => {
                let cleanedLine = line.trim(); // Initial trim
                // Remove common list markers (e.g., "1. ", "a. ", "- ", "• ")
                cleanedLine = cleanedLine.replace(/^\s*([0-9]+\.|[a-zA-Z]\.|[•*-])\s*/, '');
                cleanedLine = cleanedLine.trim(); // Trim after marker removal to clean up spaces left by marker
                // Replace multiple consecutive spaces or tabs within the line with a single space
                cleanedLine = cleanedLine.replace(/[ \t]{2,}/g, ' ');
                return cleanedLine;
            })
            .filter(line => line !== '') // Filter out lines that became empty
            .join('\n'); // Join cleaned, non-empty lines back with a single \n


        // console.log("Normalized text on backend (length " + text.length + "):", JSON.stringify(text));

        if (!text) {
            return res.status(400).json({ error: "Text input is required." });
        }        const prompt = `You are an emotion analysis AI. Analyze the emotional content of the provided text with absolute consistency.

CRITICAL: You must return ONLY a valid JSON object. No explanations, no markdown, no extra text.

Task: Identify ALL distinct emotions expressed in the text.

Required JSON Structure:
{
    "EmotionName": {
        "color": "#HEXCODE",
        "borderColor": "#HEXCODE", 
        "emoji": "🔄",
        "count": number,
        "situation": [
            {
                "name_of_person": "Name or Unknown",
                "reason": "Exact quote from text"
            }
        ]
    }
}

MANDATORY RULES:
1. Emotion keys: Use EXACT capitalized names (Happy, Sad, Angry, Frustrated, Excited, Calm, Anxious, Disappointed, Fearful, Joyful, Surprised, etc.)
2. Colors: Use appropriate hex codes that represent each emotion distinctly
3. BorderColor: Use complementary or contrasting hex codes  
4. Emoji: Single appropriate emoji for each emotion
5. Count: Must equal the number of objects in situation array
6. Name_of_person: Use actual names from text or "Unknown" if not mentioned
7. Reason: Quote exact phrases that indicate the emotion
8. Output: ONLY JSON object, no markdown blocks, no explanations
9. Consistency: Same input must produce identical output every time

If no clear emotions detected, return: {}

Text to analyze: ${text}`;        const result = await model.generateContent(prompt);

        let cleanResponse = result.response.text().replace(/```json|```/g, "").trim();
        
        // Additional cleaning to ensure pure JSON
        cleanResponse = cleanResponse.replace(/^[^{]*/, '').replace(/[^}]*$/, '');
        
        let parsedResponse;
        try {
            parsedResponse = JSON.parse(cleanResponse);
            
            // Validate the response structure
            if (typeof parsedResponse !== 'object' || parsedResponse === null) {
                throw new Error('Response is not a valid object');
            }
            
            // Ensure all emotion objects have required fields
            for (const emotion in parsedResponse) {
                const details = parsedResponse[emotion];
                if (!details.color || !details.borderColor || !details.emoji || 
                    typeof details.count !== 'number' || !Array.isArray(details.situation)) {
                    console.warn(`Invalid emotion structure for: ${emotion}`);
                }
            }
            
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError);
            console.error("Raw response:", cleanResponse);
            return res.status(500).json({ error: "Invalid JSON format received from Gemini" });
        }

        // Normalize all emotion keys in the response
        const normalizedResponse = {};
        for (const key in parsedResponse) {
            if (Object.hasOwnProperty.call(parsedResponse, key)) {
                normalizedResponse[normalizeEmotion(key)] = parsedResponse[key];
            }
        }

        res.json({ response: normalizedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
