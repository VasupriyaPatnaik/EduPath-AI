import React from 'react';
import { Compass, Calculator, DollarSign, MessageCircle, Target, Calendar, User } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'navigator', icon: Compass, label: 'Career Navigator', color: 'text-blue-600' },
    { id: 'roi', icon: Calculator, label: 'ROI Calculator', color: 'text-green-600' },
    { id: 'loan', icon: DollarSign, label: 'Loan Eligibility', color: 'text-purple-600' },
    { id: 'chatbot', icon: MessageCircle, label: 'AI Mentor', color: 'text-indigo-600' },
    { id: 'admission', icon: Target, label: 'Admission Predictor', color: 'text-orange-600' },
    { id: 'timeline', icon: Calendar, label: 'Timeline', color: 'text-red-600' }
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 py-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-2 rounded-lg">
              <User size={20} />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              EduNexus
            </span>
          </div>
          
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon size={18} className={activeTab === item.id ? item.color : ''} />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
              👤
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;