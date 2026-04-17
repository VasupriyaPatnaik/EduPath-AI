import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";

// Components
import Navbar from "./components/Navbar";
import CareerNavigator from "./components/CareerNavigator";
import ROICalculator from "./components/ROICalculator";
import LoanEligibility from "./components/LoanEligibility";
import Chatbot from "./components/Chatbot";
import AdmissionPredictor from "./components/AdmissionPredictor";
import TimelineGenerator from "./components/TimelineGenerator";
import Gamification from "./components/Gamification";
import PersonalizedFeed from "./components/PersonalizedFeed";
import SmartNudges from "./components/SmartNudges";


// 🔐 Temporary auth (later connect with store)
const isAuthenticated = () => {
  return true; // change to false to test login redirect
};

// 🔐 Protected Route
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

// 👉 MAIN APP CONTENT (your old logic moved here)
function MainApp() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [activeTab, setActiveTab] = useState("navigator");
  const [userJourneyStage, setUserJourneyStage] = useState("exploration");
  const [showSidebar, setShowSidebar] = useState(false);
  const [pointsNotification, setPointsNotification] = useState(null);

  useEffect(() => {
    const handleAction = (e) => {
      if (e.detail?.type === "get_recommendations") {
        setUserJourneyStage("exploration");
      } else if (e.detail?.type === "calculate_roi") {
        setUserJourneyStage("application");
      } else if (e.detail?.type === "check_loan") {
        setUserJourneyStage("loan");
      }
    };

    const handlePoints = (e) => {
      setPointsNotification(e.detail);
      setTimeout(() => setPointsNotification(null), 3000);
    };

    window.addEventListener("userAction", handleAction);
    window.addEventListener("pointsEarned", handlePoints);

    return () => {
      window.removeEventListener("userAction", handleAction);
      window.removeEventListener("pointsEarned", handlePoints);
    };
  }, []);

  const handleNavigateToTool = (tabId) => {
    setActiveTab(tabId);
    setCurrentView("tool");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
  };

  const renderContent = () => {
    if (currentView === "dashboard") {
      return <Dashboard onNavigate={handleNavigateToTool} />;
    }

    switch (activeTab) {
      case "navigator":
        return <CareerNavigator />;
      case "roi":
        return <ROICalculator />;
      case "loan":
        return <LoanEligibility />;
      case "chatbot":
        return <Chatbot />;
      case "admission":
        return <AdmissionPredictor />;
      case "timeline":
        return <TimelineGenerator />;
      default:
        return <CareerNavigator />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {currentView === "tool" && (
        <>
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
          <button
            onClick={handleBackToDashboard}
            className="fixed bottom-6 left-4 z-40 bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition-all"
          >
            ← Back to Dashboard
          </button>
        </>
      )}

      <div className="flex">
        <div className={`flex-1 ${currentView === "tool" && showSidebar ? "lg:mr-96" : ""}`}>
          {renderContent()}
        </div>

        {currentView === "tool" && showSidebar && (
          <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-30 overflow-y-auto">
            <div className="p-4">
              <button
                onClick={() => setShowSidebar(false)}
                className="float-right p-2 hover:bg-gray-100 rounded-lg"
              >
                ✕
              </button>
              <PersonalizedFeed userProfile={{ interest: "Computer Science" }} />
            </div>
          </div>
        )}
      </div>

      <Gamification />
      <SmartNudges userJourneyStage={userJourneyStage} />

      {pointsNotification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          +{pointsNotification.points} XP! {pointsNotification.reason}
        </div>
      )}

      {currentView === "tool" && (
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="fixed right-4 bottom-20 bg-gray-800 text-white p-3 rounded-full shadow-lg"
        >
          {showSidebar ? "✕" : "📋"}
        </button>
      )}
    </div>
  );
}

// 👉 ROOT APP (Routing layer)
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login first */}
        <Route path="/" element={<Login />} />

        {/* Signup */}
        <Route path="/signup" element={<Signup />} />

        {/* Main App */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainApp />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;