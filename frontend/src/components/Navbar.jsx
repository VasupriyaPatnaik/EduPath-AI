import React, { useState } from 'react';
import { 
  Compass, Calculator, DollarSign, MessageCircle, 
  Target, Calendar, GraduationCap, User, LogOut,
  Settings, ChevronRight, Sparkles, TrendingUp,
  Award, Clock, CheckCircle, Star, Brain
} from 'lucide-react';

const Dashboard = ({ onNavigate, activeTab: externalActiveTab }) => {
  const [activeTab, setActiveTab] = useState(externalActiveTab || 'navigator');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { id: 'navigator', icon: Compass, label: 'Career Navigator' },
    { id: 'roi', icon: Calculator, label: 'ROI Calculator' },
    { id: 'loan', icon: DollarSign, label: 'Loan Eligibility' },
    { id: 'chatbot', icon: MessageCircle, label: 'AI Mentor' },
    { id: 'admission', icon: Target, label: 'Admission Predictor' },
    { id: 'timeline', icon: Calendar, label: 'Timeline' }
  ];

  const contentMap = {
    navigator: {
      title: "Career Navigator",
      description: "AI-powered guidance to discover your ideal professional journey",
      cards: [
        { icon: "🎯", title: "Personalized Career Paths", desc: "Custom roadmaps tailored to your unique skills, interests, and career aspirations", detail: "AI-powered matching" },
        { icon: "📊", title: "Skill Gap Analysis", desc: "Identify strengths and areas for improvement with detailed competency mapping", detail: "Actionable insights" },
        { icon: "📈", title: "Industry Demand Insights", desc: "Real-time market trends and emerging opportunities in your field", detail: "Live data updates" },
        { icon: "💰", title: "Salary Projections", desc: "10-year earning potential forecasts based on current market data", detail: "Accurate predictions" }
      ]
    },
    roi: {
      title: "ROI Calculator",
      description: "Make informed decisions about your education investment",
      cards: [
        { icon: "💵", title: "Tuition vs Earnings", desc: "Comprehensive comparison of education costs with future income potential", detail: "Detailed analysis" },
        { icon: "📉", title: "Break-even Analysis", desc: "Know exactly when you'll recover your educational investment", detail: "Timeline planning" },
        { icon: "🔄", title: "Course Comparison", desc: "Side-by-side analysis of different programs and their value", detail: "Smart comparisons" },
        { icon: "📅", title: "Long-term Projections", desc: "10-year financial outlook based on your chosen career path", detail: "Future planning" }
      ]
    },
    loan: {
      title: "Loan Eligibility",
      description: "Smart tools to plan your education financing",
      cards: [
        { icon: "🏦", title: "EMI Calculator", desc: "Monthly installment planning with multiple tenure options", detail: "Flexible terms" },
        { icon: "📊", title: "Bank Comparison", desc: "Compare interest rates and terms across leading banks", detail: "Best rates" },
        { icon: "📈", title: "Rate Forecasts", desc: "Future interest rate predictions to plan your borrowing", detail: "Market insights" },
        { icon: "🎓", title: "Scholarship Finder", desc: "Discover and apply for relevant funding opportunities", detail: "Save money" }
      ]
    },
    chatbot: {
      title: "AI Mentor",
      description: "Your 24/7 intelligent companion for academic success",
      cards: [
        { icon: "💬", title: "Instant Responses", desc: "Get immediate answers to your study and career questions", detail: "24/7 available" },
        { icon: "📚", title: "Study Recommendations", desc: "Personalized learning resources based on your progress", detail: "Smart suggestions" },
        { icon: "❓", title: "Doubt Clarification", desc: "Clear explanations for complex topics and concepts", detail: "Deep understanding" },
        { icon: "🎤", title: "Mock Interviews", desc: "Practice interviews with realistic AI-powered conversations", detail: "Build confidence" }
      ]
    },
    admission: {
      title: "Admission Predictor",
      description: "Data-driven insights for your college applications",
      cards: [
        { icon: "🏛️", title: "College Comparison", desc: "Detailed analysis of rankings, fees, and placement records", detail: "Find your fit" },
        { icon: "📊", title: "Cutoff Trends", desc: "Historical cutoff data to predict your admission chances", detail: "Smart predictions" },
        { icon: "📅", title: "Deadline Tracker", desc: "Never miss important application dates and requirements", detail: "Stay on track" },
        { icon: "📋", title: "Document Checklist", desc: "Complete list of required documents for each college", detail: "Be prepared" }
      ]
    },
    timeline: {
      title: "Smart Timeline",
      description: "Your personalized roadmap to academic success",
      cards: [
        { icon: "📝", title: "Exam Schedules", desc: "All important exam dates organized in one place", detail: "Never miss" },
        { icon: "⏰", title: "Smart Reminders", desc: "Automated notifications for deadlines and milestones", detail: "Stay informed" },
        { icon: "📖", title: "Study Plan Generator", desc: "AI-crafted study schedules based on your pace", detail: "Personalized" },
        { icon: "📈", title: "Progress Tracking", desc: "Visual dashboards to monitor your achievements", detail: "Track growth" }
      ]
    }
  };

  const premiumCardClasses = [
    'bg-gradient-to-br from-[#1B2A4A] to-[#1E3A5F]',
    'bg-gradient-to-br from-[#16213E] to-[#1A2D4C]',
    'bg-gradient-to-br from-[#1E3A5F] to-[#0F3460]',
    'bg-gradient-to-br from-[#0F2027] to-[#1B2A4A]'
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (onNavigate) {
      onNavigate(tabId);
    }
  };

  const currentContent = contentMap[activeTab];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3 py-3">
              <div className="bg-gradient-to-br from-indigo-900 to-blue-900 p-2 rounded-xl shadow-md">
                <GraduationCap size={20} className="text-white" />
              </div>
              <div>
                <span className="font-bold text-xl text-gray-800">EduNexus</span>
                <span className="text-xs text-gray-400 block -mt-1">Premium Study Assistant</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-indigo-900 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={18} className="transition-transform group-hover:scale-105" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
            
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-9 h-9 bg-gradient-to-br from-indigo-900 to-blue-900 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md cursor-pointer transition-transform hover:scale-105"
              >
                JD
              </button>
              
              {showUserMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 border border-gray-100">
                    <div className="p-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">John Doe</p>
                      <p className="text-xs text-gray-500">john@edunexus.com</p>
                    </div>
                    <div className="p-2">
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-900 rounded-lg transition flex items-center gap-2">
                        <User size={14} /> My Profile
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-900 rounded-lg transition flex items-center gap-2">
                        <Settings size={14} /> Settings
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition flex items-center gap-2">
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeInUp">
        {/* Hero Section */}
        <div className="hero-premium rounded-2xl p-10 text-white mb-10 shadow-xl bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364]">
          <h1 className="text-3xl font-bold mb-3 tracking-tight">{currentContent.title}</h1>
          <p className="text-blue-100 text-base max-w-2xl">{currentContent.description}</p>
        </div>
        
        {/* Cards Grid - 2 per row */}
        <div className="grid md:grid-cols-2 gap-6">
          {currentContent.cards.map((card, index) => (
            <div
              key={index}
              className={`${premiumCardClasses[index % 4]} rounded-xl p-7 cursor-pointer group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
            >
              {/* Premium accent line */}
              <div className="absolute top-0 left-0 w-1 h-full bg-white/20 group-hover:bg-white/40 transition"></div>
              
              <div className="flex items-start gap-5">
                {/* Icon Circle */}
                <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">{card.icon}</span>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg mb-2">{card.title}</h3>
                  <p className="text-blue-100 text-sm leading-relaxed mb-3">{card.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-200/80 tracking-wide uppercase">{card.detail}</span>
                    <ChevronRight size={16} className="text-white/50 group-hover:text-white/80 transition" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* AI Mentor Premium Card */}
        <div className="mt-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Brain size={24} className="text-indigo-400" />
            </div>
            <div className="flex-1">
              <p className="text-indigo-300 font-bold mb-1 text-sm tracking-wide flex items-center gap-2">
                <Sparkles size={14} /> AI MENTOR INSIGHT
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                "Your educational journey is unique. Use these tools to explore possibilities and make confident decisions. I'm here to guide you 24/7."
              </p>
            </div>
          </div>
        </div>
        
        {/* Stats Section - Premium */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-5">
          <div className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="text-2xl font-bold text-indigo-900">10,000+</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Students Guided</div>
          </div>
          <div className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="text-2xl font-bold text-indigo-900">98%</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Success Rate</div>
          </div>
          <div className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="text-2xl font-bold text-indigo-900">24/7</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">AI Support</div>
          </div>
          <div className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="text-2xl font-bold text-indigo-900">500+</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Partner Colleges</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-400 text-xs border-t border-gray-200 mt-8 bg-white">
        <p>© 2024 EduNexus — Premium AI Smart Study Assistant</p>
      </footer>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out;
        }
        
        .hero-premium {
          background: linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%);
        }
      `}</style>
    </div>
  );
};

export default Dashboard;