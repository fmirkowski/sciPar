import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import NavigationTabs from './NavigationTabs';
import PaperCard from './PaperCard';
import { motion } from 'framer-motion';
import Onboarding from './Onboarding';
import WelcomeScreen from './WelcomeScreen';
import { ContactInfo, Paper } from '../types';

const samplePapers: Paper[] = [
  {
    id: "2307.00001",
    title: "Large Language Models in Business Applications",
    authors: "Smith J., Johnson M., et al.",
    abstract: "This paper explores practical applications of LLMs in enterprise settings...",
    discussions: 24,
    implementations: 5,
    stars: 156
  },
  {
    id: "2307.00002",
    title: "Neural Networks for Predictive Maintenance",
    authors: "Chen L., Patel R., et al.",
    abstract: "A novel approach to equipment maintenance scheduling using deep learning algorithms. This research demonstrates how AI can predict equipment failures before they occur.",
    discussions: 18,
    implementations: 3,
    stars: 89
  },
  {
    id: "2307.00003",
    title: "AI-Driven Supply Chain Optimization",
    authors: "Zhang W., Anderson K., et al.",
    abstract: "This research presents innovative approaches to supply chain management using artificial intelligence and machine learning algorithms.",
    discussions: 31,
    implementations: 7,
    stars: 203
  },
  {
    id: "2307.00004",
    title: "Computer Vision in Quality Control",
    authors: "Brown T., Garcia M., et al.",
    abstract: "An examination of how computer vision technologies can revolutionize manufacturing quality control processes through automated defect detection.",
    discussions: 15,
    implementations: 4,
    stars: 127
  }
];

const mockTrendingPapers = [
  {
    id: "2307.00005",
    title: "Using AI to Create Better Customer Experiences",
    authors: "Wilson R., Lee K., et al.",
    abstract: "A study showing how AI can help businesses better serve their customers. The research looks at ways to personalize experiences, understand customer feedback, and provide automated support - leading to happier, more loyal customers.",
    discussions: 45,
    implementations: 12,
    stars: 278
  },
  {
    id: "2307.00006",
    title: "Making Supply Chains More Transparent with Blockchain",
    authors: "Thompson E., Davis M., et al.", 
    abstract: "Looking at how blockchain technology can help businesses track products better and build trust. The study includes real examples from major retailers using blockchain, showing how it helps prevent fraud and improve product tracking.",
    discussions: 38,
    implementations: 8,
    stars: 192
  },
  {
    id: "2307.00007",
    title: "Understanding Business Data with AI",
    authors: "Roberts S., Kim J., et al.",
    abstract: "A new way to use AI to understand business information better. The study shows how to get useful insights from customer feedback, company documents, and market reports to help make better business decisions.",
    discussions: 56,
    implementations: 15,
    stars: 342
  },
  {
    id: "2307.00008",
    title: "Smart Automation in Manufacturing",
    authors: "Peterson M., Zhang Y., et al.",
    abstract: "A detailed look at how automated systems can improve modern manufacturing. The study covers smart robots, quality checking, and production planning, with real examples showing how companies saved money and worked more efficiently.",
    discussions: 41,
    implementations: 9,
    stars: 245
  },
  {
    id: "2307.00009",
    title: "Better Financial Risk Assessment with AI",
    authors: "Goldman A., Patel V., et al.",
    abstract: "New ways to assess financial risks using AI. The study shows how banks and financial companies can better evaluate credit scores, spot fraud, and understand market risks using real-time data analysis.",
    discussions: 62,
    implementations: 18,
    stars: 405
  }
];

const mockRecentPapers = [
  {
    id: "2307.00010",
    title: "Making IoT Devices Work Better",
    authors: "Martinez A., Kumar S., et al.",
    abstract: "Recent improvements in how smart devices process data. The study looks at ways to make connected devices work faster and more efficiently, with examples from smart factories and city management.",
    discussions: 12,
    implementations: 3,
    stars: 89
  },
  {
    id: "2307.00011",
    title: "How Businesses Can Use Quantum Computing",
    authors: "Chang H., Miller P., et al.",
    abstract: "A look at how businesses can start using quantum computers today. The study explores practical uses in financial planning, risk management, and delivery logistics, comparing them with current solutions.",
    discussions: 27,
    implementations: 2,
    stars: 156
  },
  {
    id: "2307.00012",
    title: "Safer Ways to Share Data and Train AI",
    authors: "Anderson B., Zhao L., et al.",
    abstract: "New ways for companies to work together on AI while keeping their data private. The study shows how banks and healthcare organizations can better detect threats while protecting sensitive information.",
    discussions: 34,
    implementations: 7,
    stars: 198
  },
  {
    id: "2307.00013",
    title: "Digital Copies of Cities for Better Planning",
    authors: "Ramirez C., Foster T., et al.",
    abstract: "Research on creating digital models of cities to help manage them better. The study looks at ways to monitor city systems and predict maintenance needs, with examples from major cities showing better resource management.",
    discussions: 29,
    implementations: 5,
    stars: 167
  },
  {
    id: "2307.00014",
    title: "Using AI to Save Energy",
    authors: "Bennett K., Yamamoto H., et al.",
    abstract: "New research on how AI can help manage energy use better. The study shows ways to predict energy needs, balance power grids, and use renewable energy more effectively, with real examples of cost savings.",
    discussions: 23,
    implementations: 6,
    stars: 145
  }
];

const PaperDiscoveryPlatform: React.FC = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [personalPapers, setPersonalPapers] = useState<Paper[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('personal');
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading your personalized dashboard...");
  const [loadingDuration, setLoadingDuration] = useState(0);
  const [extendedLoadingMessage, setExtendedLoadingMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      let filteredPapers;
      switch (activeTab) {
        case 'personal':
          filteredPapers = searchQuery
            ? personalPapers.filter(paper =>
                paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                paper.abstract.toLowerCase().includes(searchQuery.toLowerCase())
              )
            : personalPapers;
          break;
        case 'trending':
          filteredPapers = mockTrendingPapers;
          break;
        case 'recent':
          filteredPapers = mockRecentPapers;
          break;
        default:
          filteredPapers = personalPapers;
      }
      setPapers(filteredPapers);
      setIsLoading(false);
    }, 500);
  }, [searchQuery, activeTab, personalPapers]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingDuration(prev => prev + 1);
      }, 1000);
    } else {
      setLoadingDuration(0);
      setExtendedLoadingMessage('');
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isLoading]);

  useEffect(() => {
    if (loadingDuration > 3) {
      setExtendedLoadingMessage("Working hard to find the best papers for you...");
    }
    if (loadingDuration > 6) {
      setExtendedLoadingMessage("Still searching through the research database...");
    }
    if (loadingDuration > 10) {
      setExtendedLoadingMessage("This is taking longer than expected, but we're still looking!");
    }
  }, [loadingDuration]);

  const handleOnboardingComplete = async (data: {
    papers: Paper[];
    role: string;
    interests: string;
    organization: string;
    contactInfo: ContactInfo;
  }) => {
    setIsLoading(true);
    setPersonalPapers(data.papers);
    setPapers(data.papers);
    setShowOnboarding(false);
    
    // Set a timeout to update the loading message after 5 seconds
    setTimeout(() => {
      setLoadingMessage("We're making progress! Almost there...");
    }, 3000);

    // Add another timeout for additional reassurance if needed
    setTimeout(() => {
      setLoadingMessage("Final touches! Processing your research interests...");
    }, 10000);
    
    try {
      // Your existing logic
      setPapers(data.papers);
    } finally {
      setIsLoading(false);
      setLoadingMessage("Loading your personalized dashboard..."); // Reset message for next time
    }
  };

  if (showWelcome) {
    return <WelcomeScreen onGetStarted={() => {
      setShowWelcome(false);
      setShowOnboarding(true);
    }} />;
  }

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">What suits you the best</h1>
          <p className="text-gray-600">Explore cutting-edge research and contact scientists that can help you bring it to life.</p>
        </header>

        {/* Search Bar */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center space-x-4 bg-white rounded-xl p-4 shadow-lg"
        >
          <div className="flex-1 flex items-center space-x-3 border-2 rounded-lg px-4 py-2 focus-within:border-blue-500 transition-colors">
            <Search className="text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search papers by title or content..."
              className="flex-1 outline-none text-gray-700"
            />
          </div>
          <button className="flex items-center space-x-2 px-6 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </motion.div>

        {/* Loading Message */}
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-4"
          >
            <div className="text-gray-600">
              {extendedLoadingMessage || loadingMessage}
            </div>
          </motion.div>
        )}

        {/* Navigation Tabs */}
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Papers Grid */}
        <motion.div 
          layout
          className="grid gap-8 md:grid-cols-2"
        >
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-xl h-64" />
            ))
          ) : (
            papers.map(paper => <PaperCard key={paper.id} paper={paper} />)
          )}
        </motion.div>

        {/* Database Note */}
        {!isLoading && papers.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8 p-4 bg-blue-50 rounded-lg"
          >
            <p className="text-sm text-blue-600">
              Note: Our current database is limited. We're actively working on expanding our research paper collection to provide even more relevant results.
            </p>
          </motion.div>
        )}
      </div>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <div className="text-center space-y-6 max-w-md mx-auto p-6">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <motion.p
              key={loadingMessage} // This forces a re-render animation when message changes
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg text-gray-600"
            >
              {loadingMessage}
            </motion.p>
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 15, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PaperDiscoveryPlatform;