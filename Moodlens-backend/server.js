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
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash", generationConfig: { temperature: 0,topP: 1} });

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
        console.log("Original text received on backend (length " + text.length + "):", JSON.stringify(text));

        // Normalize the text
        // 1. Replace Windows newlines with Unix newlines
        text = text.replace(/\r\n/g, '\n');
        // 2. Trim leading/trailing whitespace from the whole text
        text = text.trim();
        // 3. Trim leading/trailing whitespace from each line and ensure consistent newlines
        text = text.split('\n').map(line => line.trim()).join('\n');
        // 4. Optional: Replace multiple spaces with a single space (be cautious with this as it might alter intended formatting in some texts)
        // text = text.replace(/\s{2,}/g, ' ');

        console.log("Normalized text on backend (length " + text.length + "):", JSON.stringify(text));

        if (!text) {
            return res.status(400).json({ error: "Text input is required." });
        }

        const prompt = `Analyze all the emotions of students deeply mentioned in the text and return the result in strict JSON format. 
        The JSON format should include ALL emotions you can detect (e.g., Sad, Happy, Angry, Fear, Surprise, etc.).

        Expected JSON format:
        {
            "<emotion>": {
                "color": "<hex color code for reflecting this emotion>",
                "borderColor": "<hex border color code for reflecting this emotion>",
                "emoji": "<emoji representing this emotion>",
                "count": <number>,
                "situation": [
                    {
                        "name_of_person": "<name>",
                        "reason": "<which line of text indicates this emotion>"
                    }
                ]
            }
        }

        - List each emotion you detect as a separate key.
        - Ensure the response is valid JSON with double quotes around keys and values.
        - Do NOT include any markdown formatting like \`\`\`json.
        - Only return the JSON object, no extra explanation.

        Text Input: ${text}`;


        const result = await model.generateContent(prompt);

        const cleanResponse = result.response.text().replace(/```json|```/g, "").trim();

        let parsedResponse;
        try {
            parsedResponse = JSON.parse(cleanResponse);
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError);
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
