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
import Dashboard from './components/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'tool'
  const [activeTab, setActiveTab] = useState('navigator');
  const [userJourneyStage, setUserJourneyStage] = useState('exploration');
  const [showSidebar, setShowSidebar] = useState(false); // Changed to false by default for mobile
  const [pointsNotification, setPointsNotification] = useState(null);

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
      window.removeEventListener('pointsEarned', () => {});
    };
  }, []);

  const handleNavigateToTool = (tabId) => {
    setActiveTab(tabId);
    setCurrentView('tool');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const renderContent = () => {
    if (currentView === 'dashboard') {
      return <Dashboard onNavigate={handleNavigateToTool} />;
    }

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
      
      {currentView === 'tool' && (
        <>
          <Navbar activeTab={activeTab} setActiveTab={(tab) => {
            setActiveTab(tab);
          }} />
          <button
            onClick={handleBackToDashboard}
            className="fixed bottom-6 left-4 z-40 bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2 text-sm font-medium"
          >
            ← Back to Dashboard
          </button>
        </>
      )}
      
      <div className="flex">
        {/* Main Content */}
        <div className={`flex-1 ${currentView === 'tool' && showSidebar ? 'lg:mr-96' : ''}`}>
          {renderContent()}
        </div>
        
        {/* Sidebar with Personalized Feed - Only in tool view */}
        {currentView === 'tool' && showSidebar && (
          <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-30 overflow-y-auto lg:relative lg:translate-x-0 transition-transform duration-300">
            <div className="p-4">
              <button 
                onClick={() => setShowSidebar(false)}
                className="lg:hidden float-right p-2 hover:bg-gray-100 rounded-lg"
              >
                ✕
              </button>
              <PersonalizedFeed userProfile={{ interest: 'Computer Science' }} />
            </div>
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
      
      {/* Toggle Sidebar Button - Only in tool view */}
      {currentView === 'tool' && (
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="fixed right-4 bottom-20 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-all z-40 lg:hidden"
        >
          {showSidebar ? '✕' : '📋'}
        </button>
      )}
    </div>
  );
}

export default App;