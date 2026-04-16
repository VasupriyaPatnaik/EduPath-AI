import React from 'react';
import { Compass, Calculator, DollarSign, MessageCircle, Target, Calendar, GraduationCap } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'navigator', icon: Compass, label: 'Career Navigator' },
    { id: 'roi', icon: Calculator, label: 'ROI Calculator' },
    { id: 'loan', icon: DollarSign, label: 'Loan Eligibility' },
    { id: 'chatbot', icon: MessageCircle, label: 'AI Mentor' },
    { id: 'admission', icon: Target, label: 'Admission Predictor' },
    { id: 'timeline', icon: Calendar, label: 'Timeline' }
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3 py-3">
            <div className="bg-gradient-to-br from-indigo-900 to-blue-900 p-2 rounded-xl shadow-md">
              <GraduationCap size={20} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-xl text-gray-800">EduNexus</span>
              <span className="text-xs text-gray-400 block -mt-1">Premium Study Assistant</span>
            </div>
          </div>
          
          {/* Desktop Navigation - Scrollable on mobile */}
          <div className="flex overflow-x-auto hide-scrollbar gap-1 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`group flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-indigo-900 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon size={16} className="transition-transform group-hover:scale-105" />
                  <span className="text-xs md:text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
          
          {/* User Menu */}
          <div className="relative">
            <button className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-indigo-900 to-blue-900 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold shadow-md cursor-pointer transition-transform hover:scale-105">
              JD
            </button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;