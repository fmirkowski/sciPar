from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from openai import OpenAI
import os
import json
import re
import sqlite3
from dotenv import load_dotenv
from functools import partial
import asyncio

load_dotenv()

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    natural_language: str

class PaperResponse(BaseModel):
    title: str
    id: str
    main_author: str
    co_authors: List[str]
    simplified_abstract: str

class QueryResponse(BaseModel):
    papers: List[PaperResponse]

def get_papers_from_db(limit: int = 10) -> List[dict]:
    try:
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        db_path = os.path.join(BASE_DIR, 'arxiv_papers_q-fin.db')
        
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT arxiv_id, title, author, coauthors, abstract 
            FROM papers 
            LIMIT 15
        """)
        
        papers = []
        for row in cursor.fetchall():
            papers.append({
                "id": row[0],
                "title": row[1],
                "author": row[2],
                "coauthors": row[3].split(", ") if row[3] else [],
                "abstract": row[4]
            })
        
        conn.close()
        return papers
    except Exception as e:
        print(f"Database error: {str(e)}")
        return []

@app.post("/api/match-papers", response_model=QueryResponse)
async def match_papers(request: QueryRequest):
    try:
        # Get papers from database
        db_papers = get_papers_from_db(limit=10)
        if not db_papers:
            raise HTTPException(status_code=500, detail="Failed to fetch papers from database")

        # Format papers for the prompt
        papers_text = "\n\n".join([
            f"Paper ID: {paper['id']}\n"
            f"Title: {paper['title']}\n"
            f"Author: {paper['author']}\n"
            f"Co-authors: {', '.join(paper['coauthors'])}\n"
            f"Abstract: {paper['abstract']}"
            for paper in db_papers
        ])

        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        
        prompt = f"""Given this user query and list of available papers, select the most relevant ones:

        User Query: {request.natural_language}

        Available Papers:
        {papers_text}

        Return ONLY a JSON array containing the most relevant papers (maximum 5) in this exact format:
        [
            {{
                "title": "Very simplified version of the paper title from the list, no technical details",
                "id": "Exact Arxiv paper ID from the list (e.g. 2307.00001)",
                "main_author": "main author from the list",
                "co_authors": ["co-author 1", "co-author 2"],
                "simplified_abstract": "Simplified version of the paper's abstract (100 words max) that is relevant to the user query, focusing on how scientist that wrote this can help user solve this problem, and non scientifc, but business friendly. At the end always add a sentence about how the main_author could help user solve this problem to the user"
            }}
        ]

        Only include papers from the provided list that are somewhat relevant to the user query, try to provide a few, never provide nothing, always change the title and abstract to be more business friendly. Write like you would be directly talking to the user. Do not create fictional papers."""

        loop = asyncio.get_event_loop()
        response = await loop.run_in_executor(
            None,
            partial(
                client.chat.completions.create,
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are an API that returns only valid JSON arrays of paper information, using only papers from the provided list."},
                    {"role": "user", "content": prompt}
                ]
            )
        )

        # Get the response content
        content = response.choices[0].message.content.strip()
        
        # Try to find JSON array in the response
        json_match = re.search(r'\[.*\]', content, re.DOTALL)
        if not json_match:
            raise ValueError("No JSON array found in response")
            
        # Parse the JSON
        paper_data = json.loads(json_match.group(0))
        
        # Validate and convert to PaperResponse objects
        papers = [PaperResponse(**paper) for paper in paper_data]
        
        return QueryResponse(papers=papers)

    except json.JSONDecodeError as e:
        print(f"JSON Decode Error: {str(e)}")
        print(f"Raw content: {content}")
        raise HTTPException(status_code=500, detail="Failed to parse paper data")
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8080)
