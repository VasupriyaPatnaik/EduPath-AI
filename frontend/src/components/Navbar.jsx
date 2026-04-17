import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Compass, Calculator, DollarSign, MessageCircle, 
  Target, Calendar, GraduationCap, LogOut, 
  Menu, X, LogIn, UserPlus, User
} from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = ({ activeTab, setActiveTab, isLoggedIn, userName, showTools = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const tools = [
    { id: 'navigator', icon: Compass, label: 'Career Navigator' },
    { id: 'roi', icon: Calculator, label: 'ROI Calculator' },
    { id: 'loan', icon: DollarSign, label: 'Loan Eligibility' },
    { id: 'chatbot', icon: MessageCircle, label: 'AI Mentor' },
    { id: 'admission', icon: Target, label: 'Admission Predictor' },
    { id: 'timeline', icon: Calendar, label: 'Timeline' }
  ];

  const marketingLinks = [
    { href: '#features', label: 'Features' },
    { href: '#tools', label: 'Tools' },
    { href: '#testimonials', label: 'Success Stories' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="bg-[#0A1628]/90 backdrop-blur-md sticky top-0 z-50 border-b border-indigo-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-1.5 rounded-lg">
              <GraduationCap size={22} className="text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              EduPath AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {showTools ? (
              tools.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab && setActiveTab(item.id)}
                    className={`group flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-indigo-500/20 text-white border border-indigo-400/30'
                        : 'text-indigo-200 hover:bg-indigo-500/10 hover:text-white'
                    }`}
                  >
                    <Icon size={18} className="transition-transform group-hover:scale-105" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })
            ) : (
              <div className="flex items-center space-x-6">
                {marketingLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-indigo-200 hover:text-white transition font-medium"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-500/10 border border-indigo-400/20 text-indigo-100">
                  <User size={16} className="text-indigo-300" />
                  <span className="text-sm font-medium max-w-[12rem] truncate">{userName || 'Account'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition border border-red-400/30"
                >
                  <LogOut size={16} />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 text-indigo-200 hover:text-white transition font-medium"
                >
                  <LogIn size={18} />
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2"
                >
                  <UserPlus size={18} />
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-indigo-500/10 transition text-indigo-200"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A1628] border-b border-indigo-500/20 py-4 px-4">
          <div className="flex flex-col space-y-3">
            {showTools ? (
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
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                      isActive
                        ? 'bg-indigo-500/20 text-white'
                        : 'text-indigo-200 hover:bg-indigo-500/10'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })
            ) : (
              <>
                {marketingLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-indigo-200 hover:text-white py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </>
            )}
            
            <div className="pt-3 border-t border-indigo-500/20">
              {isLoggedIn ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/10 border border-indigo-400/20 text-indigo-100">
                    <User size={16} className="text-indigo-300" />
                    <span className="text-sm font-medium truncate">{userName || 'Account'}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-red-500/20 text-red-300 rounded-lg"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-indigo-400/30 rounded-lg hover:bg-indigo-500/10 text-indigo-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LogIn size={18} /> Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;