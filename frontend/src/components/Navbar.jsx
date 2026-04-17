import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Compass, Calculator, DollarSign, MessageCircle, 
  Target, Calendar, GraduationCap, LogOut, 
  Menu, X, LogIn, UserPlus
} from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = ({ activeTab, setActiveTab, isLoggedIn, showTools = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const displayName =
    localStorage.getItem('userName') ||
    localStorage.getItem('userEmail')?.split('@')[0] ||
    'User';

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
    navigate('/');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-1.5 rounded-lg">
              <GraduationCap size={22} className="text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              EduPath AI
            </span>
          </Link>

          {/* Desktop Navigation - Show Tools or Marketing Links */}
          <div className="hidden md:flex items-center space-x-1">
            {showTools ? (
              // Show Tools Navigation when in tools view
              tools.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab && setActiveTab(item.id)}
                    className={`group flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-indigo-900 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={16} className="transition-transform group-hover:scale-105" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })
            ) : (
              // Show Marketing Links when on landing page
              <div className="flex items-center space-x-8">
                {marketingLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-gray-600 hover:text-indigo-600 transition font-medium"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="px-3 py-2 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 font-semibold text-sm max-w-[12rem] truncate">
                  {displayName}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                >
                  <LogOut size={16} />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            ) : (
              // Not logged in - Show Sign In / Sign Up buttons
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-indigo-600 transition font-medium"
                >
                  <LogIn size={18} />
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2"
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
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 py-4 px-4">
          <div className="flex flex-col space-y-3">
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
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                      isActive
                        ? 'bg-indigo-900 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{item.label}</span>
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
                    className="text-gray-600 hover:text-indigo-600 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </>
            )}
            
            <div className="pt-3 border-t border-gray-100">
              {isLoggedIn ? (
                <div className="flex flex-col gap-2">
                  <div className="px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 font-semibold text-center">
                    {displayName}
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LogIn size={18} /> Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold text-center"
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