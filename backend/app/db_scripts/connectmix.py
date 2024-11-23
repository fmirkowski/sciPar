import json

def standardize_coauthors(paper):
    # Convert paper to dict if it's a string
    if isinstance(paper, str):
        try:
            paper = json.loads(paper)
        except json.JSONDecodeError:
            return {"coauthors": [], "original_text": paper}
    
    # If coauthors is a string, convert to list
    if isinstance(paper.get('coauthors', ''), str):
        if not paper['coauthors']:
            paper['coauthors'] = []
        else:
            paper['coauthors'] = [author.strip() for author in paper['coauthors'].split(',')]
    return paper

# Read and standardize papers from both files
papers1 = []
papers2 = []

# Read papers.json
with open('../papers.json', 'r', encoding='utf-8') as f:
    papers_data = json.load(f)
    papers1 = [standardize_coauthors(paper) for paper in papers_data['papers']]

# Read papers4.json
with open('../papers4.json', 'r', encoding='utf-8') as f:
    papers4_data = json.load(f)
    papers2 = [standardize_coauthors(paper) for paper in papers4_data['papers']]

# Mix papers in alternating fashion
combined_papers = []
max_len = max(len(papers1), len(papers2))

for i in range(max_len):
    if i < len(papers1):
        combined_papers.append(papers1[i])
    if i < len(papers2):
        combined_papers.append(papers2[i])

# Write combined and mixed results
with open('../combined_papers.json', 'w', encoding='utf-8') as f:
    json.dump({"papers": combined_papers}, f, indent=2)