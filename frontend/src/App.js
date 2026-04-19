import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Sparkles, X } from 'lucide-react';
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
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';

const getAuthState = () => ({
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  userName: localStorage.getItem('userName') || ''
});

// Protected Route wrapper component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const PublicLanding = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userName } = getAuthState();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <Navbar isLoggedIn={isLoggedIn} userName={userName} showTools={false} />
      <LandingPage onNavigate={() => navigate(isLoggedIn ? '/app' : '/login')} />
    </div>
  );
};

// Main App Content (only shown when logged in)
const AppContent = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('navigator');
  const [userJourneyStage, setUserJourneyStage] = useState('exploration');
  const [showFeedPopup, setShowFeedPopup] = useState(false);
  const [pointsNotification, setPointsNotification] = useState(null);
  const isLoggedIn = true;
  const userName = localStorage.getItem('userName') || '';

  useEffect(() => {
    const handleAction = (e) => {
      if (e.detail?.type === 'get_recommendations') setUserJourneyStage('exploration');
      else if (e.detail?.type === 'calculate_roi') setUserJourneyStage('application');
      else if (e.detail?.type === 'check_loan') setUserJourneyStage('loan');
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

  const handleNavigateToTool = (tabId) => {
    setActiveTab(tabId);
    setCurrentView('tool');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const renderContent = () => {
    if (currentView === 'dashboard') {
      return <LandingPage onNavigate={handleNavigateToTool} />;
    }

    switch(activeTab) {
      case 'navigator': return <CareerNavigator />;
      case 'roi': return <ROICalculator />;
      case 'loan': return <LoanEligibility />;
      case 'chatbot': return <Chatbot />;
      case 'admission': return <AdmissionPredictor />;
      case 'timeline': return <TimelineGenerator />;
      default: return <CareerNavigator />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Unified Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isLoggedIn={isLoggedIn}
        userName={userName}
        showTools={currentView === 'tool'}
      />
      
      {currentView === 'tool' && (
        <button
          onClick={handleBackToDashboard}
          className="fixed bottom-6 left-4 z-40 bg-gradient-to-r from-blue-600 to-teal-500 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm font-medium"
        >
          ← Back to Home
        </button>
      )}
      
      <div className="flex">
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
      
      {/* Gamification - Bottom Right */}
      <Gamification />
      
      {/* SmartNudges - Bottom Left (Floating) */}
      <SmartNudges 
        userJourneyStage={userJourneyStage} 
        onNavigate={handleNavigateToTool}
      />

      {/* PersonalizedFeed - Gamification-style Floating Button */}
      <button
        onClick={() => setShowFeedPopup(!showFeedPopup)}
        className="fixed left-4 bottom-4 z-40 bg-gradient-to-r from-blue-600 to-teal-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
        aria-label="Toggle Personalized Feed"
      >
        <Sparkles size={20} />
      </button>

      {/* PersonalizedFeed - Floating Popup */}
      {showFeedPopup && (
        <div className="fixed left-4 bottom-16 z-50 w-80 max-w-[calc(100vw-1rem)]">
          <div className="relative">
            <button
              onClick={() => setShowFeedPopup(false)}
              className="absolute -top-2 -left-2 bg-white rounded-full p-1 shadow-md z-10"
              aria-label="Close Personalized Feed"
            >
              <X size={14} className="text-slate-500" />
            </button>
            <PersonalizedFeed userProfile={{ interest: 'Computer Science' }} />
          </div>
        </div>
      )}
      
      {/* Points Notification */}
      {pointsNotification && (
        <div className="fixed top-20 right-4 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-slide-in">
          +{pointsNotification.points} XP! {pointsNotification.reason}
        </div>
      )}
      
    </div>
  );
};

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<PublicLanding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/app/*"
          element={
            <ProtectedRoute>
              <AppContent />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;