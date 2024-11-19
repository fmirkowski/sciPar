import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MinusCircle, Phone, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatInterfaceProps {
  researcherName: string;
  onClose: () => void;
}

interface Message {
  sender: 'system' | 'user' | 'researcher';
  text: string;
  timestamp: Date;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ researcherName, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'system',
      text: `You are now connected with ${researcherName}. They typically respond within 24 hours.`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      sender: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate researcher response
    setTimeout(() => {
      const responseMessage: Message = {
        sender: 'researcher',
        text: 'Hello! I am open for collaboration, lets schedule a call!',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`${
            isMinimized ? 'h-auto bottom-4 right-4 absolute' : 'w-[40rem] h-[45rem]'
          } bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden`}
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-700">
            <div className="flex items-center space-x-3">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${researcherName}`}
                alt="Researcher"
                className="w-10 h-10 rounded-full border-2 border-white/50"
              />
              <div>
                <h3 className="font-semibold text-white">{researcherName}</h3>
                <span className="text-xs text-blue-100">Active now</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-white/80 hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 text-white/80 hover:text-white transition-colors">
                <Video className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 text-white/80 hover:text-white transition-colors"
              >
                <MinusCircle className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Container */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
                {messages.map((msg, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={index}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                        msg.sender === 'system'
                          ? 'bg-yellow-50 text-yellow-800 mx-auto border border-yellow-200'
                          : msg.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-100'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <span className="text-xs opacity-75 mt-2 block">
                        {msg.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form onSubmit={handleSend} className="p-4 bg-white border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <span>Send</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatInterface;