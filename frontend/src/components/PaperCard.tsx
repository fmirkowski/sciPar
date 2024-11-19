import React, { useState } from 'react';
import { MessageSquare, Share2, Star } from 'lucide-react';
import PaperDetail from './PaperDetail';
import { PaperCardProps, MetricButtonProps } from '../types';

const PaperCard: React.FC<PaperCardProps> = ({ paper }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsDetailOpen(true)}
        className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
      >
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors">
              {paper.title}
            </h3>
            <p className="text-sm text-gray-600">{paper.authors}</p>
          </div>

          <p className="text-gray-700 text-sm line-clamp-3">{paper.abstract}</p>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex space-x-6">
              <MetricButton icon={MessageSquare} count={paper.discussions} />
              <MetricButton icon={Share2} count={paper.implementations} />
              <MetricButton icon={Star} count={paper.stars} isStarred />
            </div>
            <button className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              Read More
            </button>
          </div>
        </div>
      </div>

      {isDetailOpen && (
        <PaperDetail 
          paper={paper} 
          onClose={() => setIsDetailOpen(false)} 
        />
      )}
    </>
  );
};

const MetricButton: React.FC<MetricButtonProps> = ({ icon: Icon, count, isStarred }) => (
  <button className="flex items-center space-x-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors">
    <Icon className={`w-4 h-4 ${isStarred ? 'text-yellow-400' : ''}`} />
    <span>{count}</span>
  </button>
);

export default PaperCard;