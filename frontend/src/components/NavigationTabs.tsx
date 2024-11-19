import React from 'react';
import { UserCircle, Flame, Clock } from 'lucide-react';
import { NavigationTabsProps } from '../types';

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'personal', label: 'Your Personal', icon: UserCircle },
    { id: 'trending', label: 'Trending', icon: Flame },
    { id: 'recent', label: 'Recent', icon: Clock }
  ];

  return (
    <div className="flex space-x-8 border-b">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`flex items-center space-x-2 pb-4 px-2 transition-colors relative
            ${activeTab === id ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
        >
          <Icon className="w-5 h-5" />
          <span className="font-medium">{label}</span>
          {activeTab === id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
};

export default NavigationTabs;