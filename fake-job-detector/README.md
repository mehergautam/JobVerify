# Fake Job Posting Detector 🕵️‍♂️💼

A Full-Stack web application that analyzes job postings using AI to detect potential scams, fake jobs, and suspicious opportunities. Build trust in your job search.

## Features ✨
- **AI-Powered Analysis**: Utilizes OpenAI's GPT models to scan job descriptions for common red flags, grammatical errors, and suspicious requests.
- **Trust Score Rating**: Provides a straightforward 0-100 Trust Score to instantly gauge legitimacy.
- **Detailed Reporting**: Breaks down exactly why a job might be fake with a list of specific red flags.
- **History Tracking**: Automatically saves your past searches in a database so you can reference them later.
- **Modern UI/UX**: Built with a beautiful, responsive, glassmorphism dark-mode interface using Tailwind CSS.

## Tech Stack 🛠️
- **Frontend**: React.js, Vite, Tailwind CSS, Lucide React, Axios, React Hot Toast
- **Backend**: Node.js, Express.js, Mongoose (MongoDB)
- **AI Integration**: OpenAI API (`gpt-4o-mini`)

## Getting Started 🚀

### Prerequisites
- Node.js (v16+)
- MongoDB running locally or a MongoDB Atlas URI
- OpenAI API Key

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env` and fill in your details:
   ```bash
   cp .env.example .env
   ```
   *Make sure to add your `OPENAI_API_KEY` and `MONGODB_URI`.*
4. Start the server:
   ```bash
   npm run dev
   ```
   *The server runs on `http://localhost:5000`.*

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *The app runs on `http://localhost:5173`.*

## Folder Structure 📁

```text
fake-job-detector/
├── backend/
│   ├── src/
│   │   ├── config/db.js           # Database connection
│   │   ├── controllers/jobController.js # API Controllers
│   │   ├── models/JobAnalysis.js        # Mongoose Schema
│   │   ├── routes/jobRoutes.js          # Express Routes
│   │   ├── services/aiService.js        # OpenAI integration
│   │   └── app.js                       # App setup
│   ├── server.js                  # Entry point
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/            # React UI components
    │   │   ├── AnalysisResult.jsx
    │   │   ├── HistoryList.jsx
    │   │   ├── JobForm.jsx
    │   │   └── Layout.jsx
    │   ├── App.jsx                # Main application logic
    │   ├── main.jsx               # Entry point
    │   └── index.css              # Tailwind Base
    ├── tailwind.config.js
    └── package.json
```

## Disclaimer ⚠️
This tool uses AI to predict the likelihood of a job being fake. It is not foolproof. Always exercise standard caution, do your own research, and never send money or sensitive personal information to unverified employers.

## License 📝
MIT License
