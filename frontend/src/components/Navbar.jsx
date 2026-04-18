import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Compass, Calculator, DollarSign, MessageCircle, 
  Target, Calendar, GraduationCap, LogOut, 
  Menu, X, LogIn, UserPlus, User, ChevronDown,
  Sparkles, Home, Settings, HelpCircle, Bell
} from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = ({ activeTab, setActiveTab, isLoggedIn, userName, showTools = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  const tools = [
    { id: 'navigator', icon: Compass, label: 'Career Navigator', description: 'AI-powered university matching' },
    { id: 'roi', icon: Calculator, label: 'ROI Calculator', description: 'Calculate education returns' },
    { id: 'loan', icon: DollarSign, label: 'Loan Eligibility', description: 'Check loan approval chances' },
    { id: 'chatbot', icon: MessageCircle, label: 'AI Mentor', description: '24/7 study abroad assistant' },
    { id: 'admission', icon: Target, label: 'Admission Predictor', description: 'Predict admission chances' },
    { id: 'timeline', icon: Calendar, label: 'Timeline', description: 'Plan your application journey' }
  ];

  const marketingLinks = [
    { href: '#about', label: 'About' },
    { href: '#vision', label: 'Vision' },
    { href: '#features', label: 'Features' },
    { href: '#tools', label: 'Tools' },
    { href: '#contact', label: 'Contact Us' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200' 
        : 'bg-white/80 backdrop-blur-sm border-b border-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-1.5 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300">
              <GraduationCap size={22} className="text-white" />
            </div>
            <div>
              <span className="font-bold text-xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                EduPath AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {showTools ? (
              // Tools Navigation
              <div className="flex items-center space-x-1 bg-slate-50/50 rounded-xl p-1">
                {tools.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab && setActiveTab(item.id)}
                      className={`group relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-slate-600 hover:bg-white/60 hover:text-blue-600'
                      }`}
                    >
                      <Icon size={18} className="transition-transform group-hover:scale-105" />
                      <span className="text-sm font-medium">{item.label}</span>
                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-blue-500 rounded-full"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              // Marketing Navigation
              <div className="flex items-center space-x-8">
                {marketingLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-slate-600 hover:text-blue-600 transition font-medium text-sm relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 border border-blue-100"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 flex items-center justify-center text-white text-sm font-bold shadow-md">
                    {getInitials(userName)}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-slate-700 max-w-[100px] truncate">
                      {userName || 'Account'}
                    </p>
                    <p className="text-xs text-slate-400">Student</p>
                  </div>
                  <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-fadeIn">
                      <div className="p-3 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                        <p className="text-sm font-semibold text-slate-800">{userName || 'Student'}</p>
                        <p className="text-xs text-slate-500">Student Account</p>
                      </div>
                      <div className="p-2">
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">
                          <User size={16} /> My Profile
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">
                          <Settings size={16} /> Settings
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">
                          <HelpCircle size={16} /> Help Center
                        </button>
                        <div className="border-t border-slate-100 my-1"></div>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-slate-600 hover:text-blue-600 transition font-medium text-sm"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-5 py-2 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 text-sm shadow-md"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition text-slate-600"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 py-4 px-4 shadow-lg animate-slideDown">
          <div className="flex flex-col space-y-2">
            {/* User Info for Mobile */}
            {isLoggedIn && (
              <div className="flex items-center gap-3 p-3 mb-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 flex items-center justify-center text-white font-bold shadow-md">
                  {getInitials(userName)}
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{userName || 'Account'}</p>
                  <p className="text-xs text-slate-500">Student Account</p>
                </div>
              </div>
            )}
            
            {showTools ? (
              // Mobile Tools Navigation
              tools.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab && setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-semibold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon size={20} />
                    <div className="flex-1 text-left">
                      <span className="text-sm font-medium">{item.label}</span>
                      <p className="text-xs text-slate-400">{item.description}</p>
                    </div>
                    {isActive && <div className="w-1 h-8 bg-blue-500 rounded-full"></div>}
                  </button>
                );
              })
            ) : (
              // Mobile Marketing Links
              <>
                {marketingLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-slate-600 hover:text-blue-600 hover:bg-slate-50 px-3 py-2.5 rounded-xl transition font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </>
            )}
            
            {/* Mobile Auth Buttons */}
            <div className="pt-3 mt-2 border-t border-slate-100">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-red-50 text-red-600 rounded-xl font-medium"
                >
                  <LogOut size={18} /> Logout
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LogIn size={18} /> Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-4 py-3 rounded-xl font-semibold text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;