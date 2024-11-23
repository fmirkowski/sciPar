import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Brain, Globe, Rocket } from 'lucide-react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6">
      <div className="max-w-5xl mx-auto text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Connect with Leading<br />
            <span className="text-blue-600">Academic Researchers</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Bridge the gap between academic research and business innovation through our 
            comprehensive platform connecting industry leaders with academic experts.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="py-8"
        >
          <p className="text-sm text-gray-500 mb-6">POWERED BY</p>
          <div className="flex justify-center items-center space-x-12 opacity-75">
            <img src="/arxiv1.png" alt="arXiv" width={120} height={40} />
            <img src="/scholar.png" alt="OpenAI" width={120} height={40} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4"
        >
          {[
            {
              icon: Brain,
              title: 'Smart Paper Discovery',
              description: 'Find relevant research papers using natural language search',
              highlight: 'AI-Powered Search',
              available: true
            },
            {
              icon: Globe,
              title: 'Research Network',
              description: 'Connect with researchers and experts in your field (Coming Soon)',
              highlight: 'In Development',
              available: false
            },
            {
              icon: Rocket,
              title: 'Paper Insights',
              description: 'Get quick summaries and business applications of research papers',
              highlight: 'Available Now',
              available: true
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`bg-white p-8 rounded-xl shadow-lg transition-all ${
                feature.available 
                  ? 'hover:shadow-xl' 
                  : 'opacity-75 cursor-not-allowed'
              }`}
            >
              <feature.icon className={`w-12 h-12 mx-auto mb-4 ${
                feature.available ? 'text-blue-500' : 'text-gray-400'
              }`} />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <div className={`font-semibold ${
                feature.available ? 'text-blue-600' : 'text-gray-400'
              }`}>
                {feature.highlight}
              </div>
              {!feature.available && (
                <div className="mt-2 text-xs text-gray-500">
                  This feature is currently in development
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-6"
        >
          <button
            onClick={onGetStarted}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
          >
            <span>Start Exploring Research</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            <motion.div
              className="absolute -inset-1 rounded-full opacity-20 bg-blue-600"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </button>
          <div className="flex flex-col items-center space-y-3">
            <p className="text-sm text-gray-500">Minimum Viable Product - Bugs may occur :)</p>
            <a 
              href="https://github.com/fmirkowski/sciPar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg font-medium text-blue-600 hover:text-blue-800 flex items-center space-x-2 bg-blue-50 px-6 py-3 rounded-lg transition-colors hover:bg-blue-100"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>View on GitHub</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomeScreen;