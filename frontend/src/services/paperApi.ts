import axios from 'axios';
import { Paper } from '../types';

const API_BASE_URL = 'http://localhost:8080'; // Updated to include the full URL with port

interface ApiPaperResponse {
  papers: {
    title: string;
    id: string;
    main_author: string;
    co_authors: string[];
    simplified_abstract: string;
  }[];
}

export const searchPapers = async (query: string): Promise<Paper[]> => {
  try {
    console.log('Sending query to backend:', query);
    
    const response = await axios.post<ApiPaperResponse>(`${API_BASE_URL}/api/match-papers`, {
      natural_language: query
    });
    
    if (!response.data.papers || response.data.papers.length === 0) {
      console.warn('No papers returned from backend');
      return [];
    }
    
    return response.data.papers.map(paper => ({
      id: paper.id,
      title: paper.title,
      authors: `${paper.main_author}, ${paper.co_authors.join(', ')}`,
      abstract: paper.simplified_abstract,
      businessImpact: "Analysis in progress...",
      discussions: Math.floor(Math.random() * 30),
      implementations: Math.floor(Math.random() * 10),
      stars: Math.floor(Math.random() * 200)
    }));
  } catch (error) {
    console.error('Error searching papers:', error);
    throw error;
  }
};