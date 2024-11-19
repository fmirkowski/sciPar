import urllib.request
import sqlite3
from typing import List, Dict
import xml.etree.ElementTree as ET

def create_empty_database():
    conn = sqlite3.connect('arxiv_papers.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS papers
                      (arxiv_id TEXT PRIMARY KEY, title TEXT, author TEXT, 
                      coauthors TEXT, citation_number INTEGER, abstract TEXT)''')
    conn.commit()
    conn.close()

def save_database_to_file(filename: str = 'arxiv_papers_backup.db'):
    """
    Saves a copy of the current database to a backup file
    """
    with sqlite3.connect('arxiv_papers.db') as source:
        backup = sqlite3.connect(filename)
        source.backup(backup)
        backup.close()

def extract_paper_info(xml_data: str) -> Dict[str, str]:
    root = ET.fromstring(xml_data)
    ns = {'atom': 'http://www.w3.org/2005/Atom', 'arxiv': 'http://arxiv.org/schemas/atom'}
    
    entry = root.find('atom:entry', ns)
    
    title = entry.find('atom:title', ns).text.strip()
    
    authors = entry.findall('atom:author', ns)
    author = authors[0].find('atom:name', ns).text if authors else ''
    coauthors = ', '.join([a.find('atom:name', ns).text for a in authors[1:]]) if len(authors) > 1 else ''
    
    abstract = entry.find('atom:summary', ns).text.strip()
    
    # Citation number is not typically available in the arXiv API response
    citation_number = 0  # Default to 0 as it's not available
    
    return {
        'title': title,
        'author': author,
        'coauthors': coauthors,
        'citation_number': citation_number,
        'abstract': abstract
    }

def fetch_arxiv_papers(arxiv_ids: List[str]) -> Dict[str, Dict[str, str]]:
    create_empty_database()
    results = {}
    conn = sqlite3.connect('arxiv_papers.db')
    cursor = conn.cursor()

    for arxiv_id in arxiv_ids:
        # Check if paper already exists in database
        cursor.execute("SELECT * FROM papers WHERE arxiv_id = ?", (arxiv_id,))
        existing_data = cursor.fetchone()
        if existing_data:
            xml_data = existing_data[1]
            paper_info = extract_paper_info(xml_data)
            if paper_info:
                results[arxiv_id] = paper_info
        else:
            # Format URL for specific arxiv ID
            url = f'http://export.arxiv.org/api/query?id_list={arxiv_id}'
            
            try:
                with urllib.request.urlopen(url) as response:
                    data = response.read().decode('utf-8')
                    paper_info = extract_paper_info(data)
                    if paper_info:
                        results[arxiv_id] = paper_info
                        # Insert new paper into database
                        cursor.execute("""
                            INSERT INTO papers 
                            (arxiv_id, title, author, coauthors, citation_number, abstract) 
                            VALUES (?, ?, ?, ?, ?, ?)
                        """, (arxiv_id, paper_info['title'], paper_info['author'], 
                              paper_info['coauthors'], paper_info['citation_number'], 
                              paper_info['abstract']))
                        conn.commit()
            except urllib.error.URLError as e:
                print(f"Error fetching arxiv ID {arxiv_id}: {e}")
    
    conn.close()
    return results

# Example usage:
if __name__ == "__main__":
    sample_ids = [
        "2307.09288", "2307.09289"
    ]  # Example arxiv IDs
    papers = fetch_arxiv_papers(sample_ids)
    for arxiv_id, paper in papers.items():
        print(arxiv_id)
        if isinstance(paper, str) and paper.startswith("Error"):
            print(f"Search for {arxiv_id} was unsuccessful: {paper}")
        else:
            print(f"Paper {arxiv_id}:")
            print(f"Title: {paper['title']}")
            print(f"Author: {paper['author']}")
            print(f"Co-authors: {paper['coauthors']}")
            print(f"Citation number: {paper['citation_number']}")
            print(f"Abstract: {paper['abstract']}")
        print("-" * 80)  # Separator between papers
    save_database_to_file()
