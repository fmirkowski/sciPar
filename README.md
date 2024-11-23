# Research Paper Discovery Platform

# Start Here!
[Visit SciPar](https://scipar.vercel.app)

A platform designed to bridge the gap between academic research and business innovation. This application helps business professionals and industry experts discover relevant research papers and connect directly with researchers.

## Features

- 🔍 Natural language paper search
- 👥 Direct researcher communication
- 📊 Paper relevance scoring
- 💼 Business-focused paper summaries
- 🎯 Personalized recommendations

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Axios for API calls

### Backend
- FastAPI (Python)
- SQLite for paper database
- OpenAI integration
- Sentence Transformers

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

This project is currently in development. Feel free to submit issues and pull requests, I encourage it!

Drop a star if you like the project!
## License

MIT Licensee