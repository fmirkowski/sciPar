

if __name__ == "__main__":
    from fastapi.testclient import TestClient
    import asyncio
    from pydantic import BaseModel
    
    # Create test client
    client = TestClient(app)
    
    # Example query
    test_query = QueryRequest(
        natural_language="Find papers about category theory"
    )
    
    # Run the async function
    async def test_match_papers():
        response = await match_papers(test_query)
        
        print("\nMatched Papers:\n")
        for i, paper in enumerate(response.papers, 1):
            print(f"Paper {i}:")
            print(f"Title: {paper.title}")
            print(f"ID: {paper.id}") 
            print(f"Main Author: {paper.main_author}")
            print(f"Co-Authors: {', '.join(paper.co_authors)}")
            print(f"Simplified Abstract: {paper.simplified_abstract}")
            print("\n---\n")

    # Run the test
    asyncio.run(test_match_papers())