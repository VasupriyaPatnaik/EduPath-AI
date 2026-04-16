import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import CareerNavigator from './components/CareerNavigator';
import ROICalculator from './components/ROICalculator';
import LoanEligibility from './components/LoanEligibility';
import Chatbot from './components/Chatbot';
import AdmissionPredictor from './components/AdmissionPredictor';
import TimelineGenerator from './components/TimelineGenerator';
import Gamification from './components/Gamification';
import PersonalizedFeed from './components/PersonalizedFeed';
import SmartNudges from './components/SmartNudges';

function App() {
  const [activeTab, setActiveTab] = useState('navigator');
  const [userJourneyStage, setUserJourneyStage] = useState('exploration');
  const [showSidebar, setShowSidebar] = useState(true);
  const [pointsNotification, setPointsNotification] = useState(null);

  // Track user journey stage based on actions
  useEffect(() => {
    const handleAction = (e) => {
      if (e.detail?.type === 'get_recommendations') {
        setUserJourneyStage('exploration');
      } else if (e.detail?.type === 'calculate_roi') {
        setUserJourneyStage('application');
      } else if (e.detail?.type === 'check_loan') {
        setUserJourneyStage('loan');
      }
    };

    window.addEventListener('userAction', handleAction);
    window.addEventListener('pointsEarned', (e) => {
      setPointsNotification(e.detail);
      setTimeout(() => setPointsNotification(null), 3000);
    });

    return () => {
      window.removeEventListener('userAction', handleAction);
    };
  }, []);

  const renderContent = () => {
    switch(activeTab) {
      case 'navigator':
        return <CareerNavigator />;
      case 'roi':
        return <ROICalculator />;
      case 'loan':
        return <LoanEligibility />;
      case 'chatbot':
        return <Chatbot />;
      case 'admission':
        return <AdmissionPredictor />;
      case 'timeline':
        return <TimelineGenerator />;
      default:
        return <CareerNavigator />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1">
          {renderContent()}
        </div>
        
        {/* Sidebar with Personalized Feed */}
        {showSidebar && (
          <div className="w-96 p-4 hidden lg:block">
            <PersonalizedFeed userProfile={{ interest: 'Computer Science' }} />
          </div>
        )}
      </div>
      
      {/* Growth Features */}
      <Gamification />
      <SmartNudges userJourneyStage={userJourneyStage} />
      
      {/* Points Notification */}
      {pointsNotification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-slide-in">
          +{pointsNotification.points} XP! {pointsNotification.reason}
        </div>
      )}
      
      {/* Toggle Sidebar Button */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="fixed left-4 top-24 bg-gray-800 text-white p-2 rounded-lg shadow-lg lg:hidden"
      >
        {showSidebar ? 'Hide' : 'Show'} Feed
      </button>
    </div>
  );
}

export default App;