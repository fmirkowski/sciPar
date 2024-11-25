import React from 'react';
import PaperDiscoveryPlatform from './components/PaperDiscoveryPlatform';
import './styles/App.css';
import { Analytics } from '@vercel/analytics/react';

const App: React.FC = () => {
  return (
    <div className="App">
      <PaperDiscoveryPlatform />
      <Analytics />
    </div>
  );
};

export default App;