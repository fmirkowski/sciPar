import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Briefcase, GraduationCap, Beaker, Building2, Info } from 'lucide-react';
import { searchPapers } from '../services/paperApi';
import { Paper } from '../types';

interface OnboardingProps {
  onComplete: (data: { 
    role: string;
    interests: string;
    organization: string;
    contactInfo: {
      email: string;
      phone: string;
      linkedin: string;
      country: string;
    };
    papers: Paper[];
  }) => void;
}

type UserType = 'business' | 'academic' | 'researcher' | 'industry' | '';

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [userType, setUserType] = useState<UserType>('');
  const [interests, setInterests] = useState('');
  const [organization, setOrganization] = useState('');
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    linkedin: '',
    country: ''
  });
  const [step, setStep] = useState(1);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-bold text-gray-900">What best describes you?</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { 
                  type: 'business', 
                  icon: Briefcase, 
                  label: 'Business Professional', 
                  disabled: false 
                },
                { 
                  type: 'academic', 
                  icon: GraduationCap, 
                  label: 'Academic', 
                  disabled: true,
                  info: 'Dont worry we didnt forget about you! We are working on it, soon you will be able to publish your research, collaborate to finally bring your research to life.'
                },
                {
                  type: 'investor',
                  icon: Briefcase,
                  label: 'Investor',
                  disabled: true,
                  info: 'Coming soon! Simple, natural language way to discover opportunities, before they are mainstream.'
                },
                { 
                  type: 'industry', 
                  icon: Building2, 
                  label: 'Industry Expert', 
                  disabled: false 
                },
              ].map(({ type, icon: Icon, label, disabled, info }) => (
                <button
                  key={type}
                  onClick={() => !disabled && setUserType(type as UserType)}
                  className={`relative p-6 rounded-xl border-2 transition-all ${
                    disabled 
                      ? 'border-gray-200 opacity-50 cursor-not-allowed filter blur-[0.5px]' 
                      : userType === type
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                  disabled={disabled}
                >
                  <Icon className="w-8 h-8 mb-3" />
                  <div className="font-medium">
                    {label}
                    {info && (
                      <div className="group relative inline-block">
                        <span className="text-sm text-blue-600 ml-1 cursor-help">
                          (Coming Soon)
                        </span>
                        <div className="invisible group-hover:visible absolute z-10 w-64 p-3 mt-2 text-sm text-left text-white bg-gray-800 rounded-lg shadow-lg 
                          -translate-x-1/2 left-1/2 transform opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {info}
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-b-gray-800"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">What problem are you trying to solve?</h2>
            <p className="text-gray-600">
              Describe the business challenge or technical problem you're facing, in simple natural language as you would to a friend.
            </p>
            <textarea
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="E.g., I'm looking for AI applications in supply chain optimization, particularly focused on inventory management and demand forecasting..."
              className="w-full h-32 p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Professional Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your organization name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <select
                  value={contactInfo.country}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, country: e.target.value }))}
                  className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select your country</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="PL">Poland</option>
                  {/* Add more countries as needed */}
                </select>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Email
                </label>
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your.name@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn Profile (Optional)
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">linkedin.com/in/</span>
                  <input
                    type="text"
                    value={contactInfo.linkedin}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, linkedin: e.target.value }))}
                    className="flex-1 p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="your-profile"
                  />
                </div>
              </div>

              <div className="pt-4">
                <p className="text-sm text-gray-600">
                  Your contact information will be used to connect you with researchers and receive relevant updates. 
                  We respect your privacy and will never share your information without permission.
                </p>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    if (isLoading) return; // Prevent multiple submissions
    
    try {
      setIsLoading(true);
      const fetchedPapers = await searchPapers(interests);
      setPapers(fetchedPapers);
      
      onComplete({
        papers: fetchedPapers,
        role: userType,
        interests,
        organization,
        contactInfo: {
          email: contactInfo.email,
          phone: contactInfo.phone,
          linkedin: contactInfo.linkedin,
          country: contactInfo.country
        }
      });
    } catch (error) {
      console.error('Error during submission:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStepTwo = () => {
    if (interests.length > 0) {
      nextStep();
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">Step {step} of 4</div>
            <div className="text-sm text-gray-500">{Math.round((step / 4) * 100)}% Complete</div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back
            </button>
          )}
          <button
            onClick={step === 4 ? handleSubmit : step === 2 ? handleStepTwo : nextStep}
            disabled={isLoading}
            className={`ml-auto flex items-center px-6 py-3 ${
              isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white rounded-lg transition-colors`}
          >
            {isLoading ? (
              <>
                <span>Processing...</span>
                <div className="ml-2 animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              </>
            ) : (
              <>
                {step === 4 ? 'Get Started' : 'Continue'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>
      
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[60] flex items-center justify-center"
        >
          <div className="text-center space-y-6 max-w-md mx-auto p-6">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <motion.p
              key={step === 4 ? "final-loading" : "normal-loading"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg text-gray-600"
            >
              {step === 4 ? "Processing your research interests..." : "Loading..."}
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

export default Onboarding;