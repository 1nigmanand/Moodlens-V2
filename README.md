# Moodlens V2

An advanced emotion analysis application powered by Google's Generative AI. Moodlens analyzes text input and provides detailed emotion insights with beautiful visualizations.

## 🌟 Features

- **AI-Powered Emotion Analysis**: Uses Google Gemini AI for accurate emotion detection
- **Interactive Dashboard**: Modern, responsive interface built with React
- **Real-time Processing**: Instant emotion analysis and visualization
- **Detailed Insights**: Person-specific emotion contexts and reasons
- **Beautiful Charts**: Visual representation of emotions using Chart.js
- **Text Preprocessing**: Robust text normalization and cleaning

## 🏗️ Architecture

```
Moodlens-V2/
├── Moodlens-backend/     # Node.js Express API server
│   ├── server.js         # Main server file
│   ├── .env              # Environment variables
│   └── package.json      # Backend dependencies
└── moodlens-frontend/    # React application
    ├── src/
    │   ├── components/   # React components
    │   └── styles/       # CSS styles
    ├── .env              # Frontend environment variables
    └── package.json      # Frontend dependencies
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Google AI API Key ([Get one here](https://aistudio.google.com/))

### 1. Clone and Setup
```bash
git clone <repository-url>
cd Moodlens-V2
```

### 2. Backend Setup
```bash
cd Moodlens-backend
npm install

# Create .env file
echo "GOOGLE_API_KEY=your_api_key_here" > .env
echo "PORT=3000" >> .env
echo "NODE_ENV=development" >> .env

# Start backend
npm start
```

### 3. Frontend Setup (in a new terminal)
```bash
cd moodlens-frontend
npm install

# Create .env file
echo "REACT_APP_BACKEND_URL=http://localhost:3000" > .env

# Start frontend
npm start
```

### 4. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:3000

## 🔧 Development

### Backend Development
```bash
cd Moodlens-backend
npm run dev  # Auto-restart on changes
```

### Frontend Development
```bash
cd moodlens-frontend
npm start    # Hot reload enabled
```

### Production Build
```bash
# Backend
cd Moodlens-backend
npm start

# Frontend
cd moodlens-frontend
npm run build
```

## 📡 API Reference

### POST /process
Analyze text for emotions.

**Request:**
```json
{
  "text": "I am so excited about this new project! It makes me really happy."
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
          "reason": "It makes me really happy"
        }
      ]
    },
    "Excited": {
      "color": "#FF6B6B",
      "borderColor": "#FF5252",
      "emoji": "🎉",
      "count": 1,
      "situation": [
        {
          "name_of_person": "Unknown", 
          "reason": "I am so excited about this new project"
        }
      ]
    }
  }
}
```

## 🛠️ Technology Stack

### Backend
- **Node.js & Express**: Server framework
- **Google Generative AI**: Emotion analysis
- **CORS**: Cross-origin support
- **dotenv**: Environment management

### Frontend
- **React 19**: UI framework
- **Tailwind CSS**: Styling
- **Chart.js**: Data visualization
- **React Router**: Navigation
- **Axios**: HTTP client
- **Lucide React**: Icons

## 📝 Environment Variables

### Backend (.env)
```env
GOOGLE_API_KEY=your_google_api_key
PORT=3000
NODE_ENV=development
```

### Frontend (.env)
```env
REACT_APP_BACKEND_URL=http://localhost:3000
NODE_ENV=development
```

## 🔍 Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   - Change PORT in backend .env file
   - Update REACT_APP_BACKEND_URL in frontend .env

2. **Google API Key errors**
   - Verify API key is correct
   - Check API quotas and limits
   - Ensure Generative AI API is enabled

3. **Build failures**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support, please open an issue in the repository or contact the development team.
