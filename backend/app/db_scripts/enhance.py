import urllib.request
import json
import xml.etree.ElementTree as ET
import time
from datetime import datetime, timedelta
import random
from typing import List, Dict, Optional
import re
import requests
from bs4 import BeautifulSoup
import os
from urllib.parse import quote

class PaperScraper:
    def __init__(self):
        self.base_url = "http://export.arxiv.org/api/query?"
        self.papers_data = []
        # Keep only categories
        self.categories = [
            'cs.AI',    # Artificial Intelligence for business applications
            'cs.LG',    # Machine Learning for business solutions
            'cs.CL',    # Natural Language Processing for customer service
            'cs.IR',    # Information Retrieval for business intelligence
            'cs.SE',    # Software Engineering best practices
            'cs.DB',    # Database and data management solutions
            'cs.CR',    # Cybersecurity for business
            'cs.HC',    # UX/UI and customer experience
            'cs.EC',    # E-commerce and online marketplaces
            'q-fin.PM', # Portfolio Management
            'q-fin.TR', # Trading and Market Analysis
            'q-fin.RM', # Risk Management
            'econ.EM',  # Business Economics and Econometrics
            'stat.ML',  # Applied Machine Learning
            'cs.CY'     # Computers and Society (Business Impact)
        ]
        
        # Ensure the data directory exists
        self.data_dir = os.path.join(os.path.dirname(__file__), 'data')
        os.makedirs(self.data_dir, exist_ok=True)

    def fetch_recent_papers(self, max_results: int = 100) -> List[Dict]:
        """Fetch recent papers from arXiv"""
        for category in self.categories:
            query = quote(f"cat:{category}")
            url = f"{self.base_url}search_query={query}&sortBy=lastUpdatedDate&sortOrder=descending&max_results={max_results}"
            
            try:
                print(f"Fetching papers from URL: {url}")
                with urllib.request.urlopen(url) as response:
                    response_data = response.read().decode('utf-8')
                root = ET.fromstring(response_data)
                
                entries = root.findall('.//{http://www.w3.org/2005/Atom}entry')
                print(f"Found {len(entries)} entries for category {category}")
                
                for entry in entries:
                    paper_data = self._parse_entry(entry)
                    if paper_data:
                        self.papers_data.append(paper_data)
                        print(f"Added paper: {paper_data['title']}")
                
                time.sleep(3)  # Respect rate limits
                
            except Exception as e:
                print(f"Error fetching papers for category {category}: {str(e)}")
                continue
        
        return self.papers_data

    def _parse_entry(self, entry) -> Dict:
        """Parse individual paper entry"""
        try:
            ns = {
                'atom': 'http://www.w3.org/2005/Atom',
                'arxiv': 'http://arxiv.org/schemas/atom'
            }
            
            title = entry.find('.//atom:title', ns).text.strip()
            abstract = entry.find('.//atom:summary', ns).text.strip()
            
            authors = entry.findall('.//atom:author', ns)
            main_author = authors[0].find('atom:name', ns).text if authors else "Unknown"
            coauthors = [a.find('atom:name', ns).text for a in authors[1:]]
            
            id_url = entry.find('.//atom:id', ns).text
            arxiv_id = id_url.split('/')[-1]
            
            return {
                'id': arxiv_id,
                'title': title,
                'author': main_author,
                'coauthors': coauthors,
                'abstract': abstract
            }
            
        except Exception as e:
            print(f"Error parsing entry: {str(e)}")
            return None

    def save_to_json(self, filename: str = 'papers.json'):
        """Save scraped papers to JSON file"""
        try:
            # Create full path for the file
            file_path = os.path.join(self.data_dir, filename)
            
            # Prepare the data structure
            data_to_save = {
                'last_updated': datetime.now().isoformat(),
                'paper_count': len(self.papers_data),
                'papers': self.papers_data
            }
            
            # Save the file
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data_to_save, f, ensure_ascii=False, indent=2)
            
            print(f"\nFile saved successfully:")
            print(f"- Location: {file_path}")
            print(f"- Papers saved: {len(self.papers_data)}")
            if self.papers_data:
                print(f"- First paper: {self.papers_data[0]['title']}")
            
            # Verify the file was created
            if os.path.exists(file_path):
                print(f"- File size: {os.path.getsize(file_path)} bytes")
            
            return file_path
            
        except Exception as e:
            print(f"Error saving to JSON: {str(e)}")
            return None

def main():
    scraper = PaperScraper()
    
    print("Starting paper scraping...")
    papers = scraper.fetch_recent_papers(max_results=10)
    
    print(f"\nScraped {len(papers)} papers")
    print("\nSample titles:")
    for i, paper in enumerate(papers[:3], 1):
        print(f"{i}. {paper['title']}")
    
    saved_path = scraper.save_to_json()
    
    if saved_path:
        print("\nTo verify the saved data, you can find the file at:")
        print(saved_path)
        
        # Read and print first few lines of the saved file
        try:
            with open(saved_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                print("\nFile content verification:")
                print(f"Total papers in file: {data['paper_count']}")
                print(f"Last updated: {data['last_updated']}")
        except Exception as e:
            print(f"\nError verifying file: {str(e)}")

if __name__ == "__main__":
    main()