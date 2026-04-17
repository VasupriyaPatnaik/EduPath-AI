import React, { useState } from 'react';
import { 
  Compass, Calculator, DollarSign, MessageCircle, 
  Target, Calendar, GraduationCap, ChevronRight, 
  Sparkles, Brain, TrendingUp, Award, Users, Clock
} from 'lucide-react';

const Dashboard = ({ onNavigate }) => {
  const navItems = [
    { id: 'navigator', icon: Compass, label: 'Career Navigator', color: 'from-blue-500 to-cyan-500', description: 'AI-powered university matching' },
    { id: 'roi', icon: Calculator, label: 'ROI Calculator', color: 'from-emerald-500 to-teal-500', description: 'Calculate education returns' },
    { id: 'loan', icon: DollarSign, label: 'Loan Eligibility', color: 'from-purple-500 to-pink-500', description: 'Check loan approval chances' },
    { id: 'chatbot', icon: MessageCircle, label: 'AI Mentor', color: 'from-indigo-500 to-purple-500', description: '24/7 study abroad assistant' },
    { id: 'admission', icon: Target, label: 'Admission Predictor', color: 'from-orange-500 to-red-500', description: 'Predict admission chances' },
    { id: 'timeline', icon: Calendar, label: 'Timeline', color: 'from-rose-500 to-pink-500', description: 'Plan your application journey' }
  ];

  const stats = [
    { value: '10,000+', label: 'Students Guided', icon: Users },
    { value: '98%', label: 'Success Rate', icon: TrendingUp },
    { value: '24/7', label: 'AI Support', icon: Clock },
    { value: '500+', label: 'Partner Colleges', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex flex-col items-center text-center">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl mb-6">
              <GraduationCap size={48} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">EduNexus</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mb-8">
              Your AI-powered companion for higher education planning. Discover, compare, and achieve your academic dreams.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <Sparkles size={16} className="text-yellow-400" />
                <span className="text-sm">AI-Powered Insights</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <Brain size={16} className="text-purple-400" />
                <span className="text-sm">Smart Recommendations</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <TrendingUp size={16} className="text-green-400" />
                <span className="text-sm">ROI Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-xl p-5 text-center shadow-lg hover:shadow-xl transition-all">
                <div className="flex justify-center mb-2">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <Icon size={20} className="text-indigo-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-indigo-900">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tools Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Smart Tools for Your Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our AI-powered tools designed to help you make informed decisions about your education
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate && onNavigate(item.id)}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-left"
              >
                <div className={`bg-gradient-to-r ${item.color} p-4 flex items-center justify-between`}>
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Icon size={24} className="text-white" />
                  </div>
                  <ChevronRight size={20} className="text-white/70 group-hover:text-white transition" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{item.label}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* AI Mentor Insight Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 md:p-8 border border-gray-700 shadow-xl">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-16 h-16 rounded-xl bg-indigo-600/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Brain size={32} className="text-indigo-400" />
            </div>
            <div className="flex-1">
              <p className="text-indigo-300 font-bold mb-2 text-sm tracking-wide flex items-center gap-2">
                <Sparkles size={14} /> AI MENTOR INSIGHT
              </p>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                "Your educational journey is unique. Use these tools to explore possibilities and make confident decisions. 
                I'm here to guide you 24/7 with personalized recommendations and insights."
              </p>
              <div className="mt-4 flex gap-3">
                <span className="text-xs text-gray-500">✨ Powered by Groq AI</span>
                <span className="text-xs text-gray-500">🎓 500+ Universities Analyzed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap size={20} className="text-indigo-600" />
            <span className="font-bold text-gray-800">EduNexus</span>
          </div>
          <p className="text-gray-400 text-xs">
            © 2026 EduNexus — Premium AI Smart Study Assistant. Empowering students to achieve their global education dreams.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
