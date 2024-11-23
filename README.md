# SciPar - Bridge Academic Research & Business Innovation

[Visit SciPar](https://scipar.vercel.app)

## What is SciPar?

SciPar is a platform that makes academic research accessible and actionable for business professionals. We eliminate the barriers between groundbreaking research and practical business applications by translating complex academic papers into clear, business-focused insights.

## Why SciPar?

- 🎯 **Save Time**: Stop spending hours searching through academic databases and decoding complex research papers
- 💡 **Find Innovation**: Discover research-backed solutions that can give your business a competitive edge
- 🤝 **Expert Access**: Connect directly with researchers to get implementation guidance
- 📊 **Business Focus**: Get summaries and insights tailored for business applications
- 🔍 **Smart Search**: Use natural language to find relevant papers - just like talking to a colleague

## How It Works

1. **Discover**: Explain your business challenge in plain English
2. **Understand**: Get AI-powered summaries focused on practical applications
3. **Connect**: Reach out to researchers for expert implementation guidance

## Core Features

- 🧠 Intuitive natural language paper search
- 📝 Paper summaries adapted to your needs
- 👥 Researcher communication platform
- 💼 Industry-specific paper recommendations

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations

### Backend
- FastAPI (Python)
- SQLite for paper database
- OpenAI integration

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Python 3.9+
- Docker (optional, for containerization)

### Frontend Setup
cd frontend
npm install
npm start


### Backend Setup
cd backend
python -m venv venv
source venv/bin/activate # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8080



### Environment Variables
Create a `.env` file in the backend directory with:
OPENAI_API_KEY=your_openai_api_key to be able to use the OpenAI API and features we implemented.


### When running locally
Change the API_BASE_URL in the frontend/src/services/paperApi.ts file to http://localhost:8080

## Contributing

We welcome contributions! Feel free to submit issues and pull requests, believe that together we may find the best solutions to make research more accessible and actionable.

**If you find this project useful, please consider giving it a star ⭐**


This repository is a cleaner version of the original one, developed on a hackathon, because it was pretty messy :)