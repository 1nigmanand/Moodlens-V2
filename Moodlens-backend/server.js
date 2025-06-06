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

        // Robust Text Normalization
        // 1. Remove BOM (Byte Order Mark)
        text = text.replace(/^\\uFEFF/, '');

        // 2. Standardize Newlines (convert all to \\n)
        text = text.replace(/\\r\\n/g, '\\n').replace(/\\r/g, '\\n');

        // 3. Trim Overall Whitespace (from the entire text block)
        text = text.trim();

        // 4. Per-Line Processing
        text = text.split('\\n') // Split into lines
            .map(line => {
                let cleanedLine = line.trim(); // Initial trim
                // Remove common list markers (e.g., "1. ", "a. ", "- ", "• ")
                cleanedLine = cleanedLine.replace(/^\\s*([0-9]+\\.|[a-zA-Z]\\.|[•*-])\\s*/, '');
                cleanedLine = cleanedLine.trim(); // Trim after marker removal to clean up spaces left by marker
                // Replace multiple consecutive spaces or tabs within the line with a single space
                cleanedLine = cleanedLine.replace(/[ \\t]{2,}/g, ' ');
                return cleanedLine;
            })
            .filter(line => line !== '') // Filter out lines that became empty
            .join('\\n'); // Join cleaned, non-empty lines back with a single \\n


        console.log("Normalized text on backend (length " + text.length + "):", JSON.stringify(text));

        if (!text) {
            return res.status(400).json({ error: "Text input is required." });
        }

        const prompt = `Analyze the emotional content of the provided text. Identify all distinct emotions expressed.
Return your analysis exclusively in a single, valid JSON object. Do NOT include any explanatory text or markdown formatting (like \\\`\\\`\\\`json) before or after the JSON.

The root of the JSON object should have keys representing the detected emotions (e.g., "Happy", "Sad", "Angry").
For each emotion, the value should be an object with the following structure:
{
    "color": "<A hex color code (e.g., \\"#FFD700\\") that visually represents this emotion. Choose distinct and appropriate colors for each emotion.>",
    "borderColor": "<A hex color code (e.g., \\"#FFC107\\") for a border, contrasting or complementing the main color.>",
    "emoji": "<A single emoji character that best represents this emotion (e.g., \\"😊\\").>",
    "count": <An integer representing the number of distinct situations or mentions identified for this emotion in the text. This should match the number of objects in the 'situation' array.>,
    "situation": [ // An array of objects, each detailing a specific instance of the emotion.
        {
            "name_of_person": "<The name of the person expressing or associated with this emotion, if mentioned. If not mentioned or not applicable, use \\"Unknown\\".>",
            "reason": "<Quote the exact phrase or sentence from the text that indicates this emotion. Be precise.>"
        }
        // Add more objects to this array if multiple distinct situations for this emotion are found.
    ]
}

Important guidelines for the output:
1.  Emotion Keys: Use capitalized emotion names as keys (e.g., "Happy", "Anxious", "Excited").
2.  Completeness: Identify ALL discernible emotions. If no emotions are clearly present, return an empty JSON object: {}.
3.  Accuracy: Ensure \`color\`, \`borderColor\`, and \`emoji\` are fitting for the emotion.
4.  \`count\` Field: The \`count\` must accurately reflect the number of entries in the \`situation\` array for that emotion.
5.  \`situation.reason\`: Provide direct quotes from the text.
6.  Strict JSON: The entire output must be a single JSON object, with double quotes for all keys and string values. No trailing commas.

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
