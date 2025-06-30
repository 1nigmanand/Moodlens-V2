# Moodlens Backend

This is the backend service for Moodlens, an emotion analysis application powered by Google's Generative AI.

## Features

- Emotion analysis using Google Gemini AI
- Text preprocessing and normalization
- RESTful API endpoints
- CORS enabled for frontend integration

## Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google AI API Key

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
GOOGLE_API_KEY=your_google_api_key_here
PORT=3000
NODE_ENV=development
```

3. Get your Google AI API Key:
   - Go to [Google AI Studio](https://aistudio.google.com/)
   - Create an API key
   - Replace `your_google_api_key_here` with your actual API key

### Running the Server

#### Development Mode (with auto-restart)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your .env file).

## API Endpoints

### POST /process

Analyzes text for emotions and returns structured emotion data.

**Request:**
```json
{
  "text": "Your text to analyze"
}
```

**Response:**
```json
{
  "response": {
    "Happy": {
      "color": "#FFD700",
      "borderColor": "#FFA500",
      "emoji": "😊",
      "count": 1,
      "situation": [
        {
          "name_of_person": "Unknown",
          "reason": "exact quote from text"
        }
      ]
    }
  }
}
```

## Project Structure

```
Moodlens-backend/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── .env               # Environment variables (not in git)
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## Environment Variables

- `GOOGLE_API_KEY`: Your Google Generative AI API key
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)

## Dependencies

- **express**: Web framework
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **@google/generative-ai**: Google Generative AI SDK
- **multer**: File upload handling
- **pdf-parse**: PDF text extraction
