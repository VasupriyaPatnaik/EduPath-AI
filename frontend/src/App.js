import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import CareerNavigator from './components/CareerNavigator';
import ROICalculator from './components/ROICalculator';
import LoanEligibility from './components/LoanEligibility';
import Chatbot from './components/Chatbot';
import AdmissionPredictor from './components/AdmissionPredictor';
import TimelineGenerator from './components/TimelineGenerator';

function App() {
  const [activeTab, setActiveTab] = useState('navigator');

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
      {renderContent()}
    </div>
  );
}

export default App;