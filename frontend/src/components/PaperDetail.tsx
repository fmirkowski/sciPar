import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PaperDetailProps } from '../types';
import { Mail, Calendar, Globe, Twitter, Linkedin, Download, MessageSquare, Video, Eye } from 'lucide-react';
import ChatInterface from './ChatInterface';

const PaperDetail: React.FC<PaperDetailProps> = ({ paper, onClose }) => {
  const [showChat, setShowChat] = useState(false);

  const handleContactClick = () => {
    setShowChat(true);
  };

  const handleViewPaper = () => {
    window.open(`https://arxiv.org/pdf/${paper.id}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white/95 z-50 overflow-y-auto p-6"
    >
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-8">
            <h1 className="text-4xl font-bold text-gray-900">{paper.title}</h1>
            
            <div className="flex space-x-4">
              <button 
                onClick={handleViewPaper}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Eye className="w-4 h-4" />
                <span>View Paper</span>
              </button>
            </div>

            <div className="prose max-w-none">
              <h2>Technical Overview</h2>
              <p>{paper.abstract}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl sticky top-6">
              <div className="text-center mb-6">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                  alt="Researcher"
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">Dr. {paper.authors.split(',')[0]}</h3>
                <p className="text-gray-600">AI Research Lead</p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <span className="text-sm text-gray-500">Citations:</span>
                  <span className="text-sm font-semibold text-blue-600">1,381</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Globe className="w-5 h-5" />
                  <span className="text-lg font-semibold">Stanford University</span>
                </div>
                <button
                  onClick={handleContactClick}
                  className="flex items-center justify-center space-x-3 w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md hover:shadow-xl"
                >
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">Contact Researcher</span>
                </button>
                <button 
                  onClick={() => {/* Add your scheduling logic here */}} 
                  className="flex items-center justify-center space-x-3 w-full p-3 mt-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md hover:shadow-xl group"
                >
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 group-hover:animate-pulse" />
                    <Video className="w-5 h-5 group-hover:animate-pulse" />
                  </div>
                  <span className="font-medium">Schedule Meeting</span>
                </button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium mb-3">Research Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {['Machine Learning', 'NLP', 'Computer Vision', 'AI Ethics'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-center space-x-4">
                <Twitter className="w-5 h-5 text-gray-600 hover:text-blue-400 cursor-pointer" />
                <Linkedin className="w-5 h-5 text-gray-600 hover:text-blue-700 cursor-pointer" />
                <Globe className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showChat && (
        <ChatInterface
          researcherName={`Dr. ${paper.authors.split(',')[0]}`}
          onClose={() => setShowChat(false)}
        />
      )}
    </motion.div>
  );
};

export default PaperDetail;