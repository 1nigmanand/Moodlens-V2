# Moodlens Frontend

A modern React application for emotion analysis and visualization. This frontend provides an intuitive interface for analyzing text emotions using AI-powered backend services.

## Features

- **Emotion Analysis**: Submit text for AI-powered emotion detection
- **Interactive Dashboard**: Clean, modern interface for text input and analysis
- **Emotion Visualization**: Charts and visual representations of detected emotions
- **Responsive Design**: Works seamlessly across different screen sizes
- **Real-time Results**: Instant emotion analysis with detailed insights

## Tech Stack

- **React 19**: Latest React framework
- **Tailwind CSS**: Utility-first CSS framework
- **Chart.js**: Beautiful charts for emotion visualization
- **React Router**: Client-side routing
- **Axios**: HTTP client for API communication
- **Lucide React**: Modern icon library

## Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Moodlens Backend running on port 3000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
REACT_APP_BACKEND_URL=http://localhost:3000
NODE_ENV=development
```

3. Make sure the backend is running on port 3000

### Running the Application

#### Development Mode
```bash
npm start
```
Opens [http://localhost:3000](http://localhost:3000) in your browser.

#### Production Build
```bash
npm run build
```

#### Testing
```bash
npm test
```

## Project Structure

```
moodlens-frontend/
├── public/             # Static assets
├── src/
│   ├── components/     # React components
│   │   ├── Dashboard.js
│   │   ├── ResultPage.js
│   │   ├── Chart.js
│   │   └── EmotionCard.js
│   ├── styles/         # CSS files
│   │   └── Global.css
│   ├── App.js          # Main App component
│   └── index.js        # Entry point
├── tailwind.config.js  # Tailwind configuration
├── postcss.config.js   # PostCSS configuration
└── package.json        # Dependencies and scripts
```

## API Integration

The frontend communicates with the Moodlens backend API:

- **Endpoint**: `POST /process`
- **Payload**: `{ "text": "your text here" }`
- **Response**: Structured emotion data with colors, counts, and contexts

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
