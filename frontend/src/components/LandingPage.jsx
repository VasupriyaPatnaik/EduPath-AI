import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, Calculator, DollarSign, MessageCircle, 
  Target, Calendar, GraduationCap, ChevronRight, 
  Sparkles, Brain, TrendingUp, Award, Users, Clock,
  ArrowRight, CheckCircle, Shield, Globe,
  Zap, BarChart3, Briefcase, BookOpen, Eye, 
  Heart, Mail, Phone, MapPin, Star,
  Layers, Rocket, Coffee, Smile, Quote,
  GraduationCap as CapIcon
} from 'lucide-react';

const LandingPage = ({ onNavigate }) => {
  const navItems = [
    { id: 'navigator', icon: Compass, label: 'Career Navigator', description: 'AI-powered university matching with budget analysis', bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50', iconBg: 'from-blue-500 to-indigo-600' },
    { id: 'roi', icon: BarChart3, label: 'ROI Calculator', description: 'Calculate education returns with EMI & break-even analysis', bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-50', iconBg: 'from-emerald-500 to-teal-600' },
    { id: 'loan', icon: Briefcase, label: 'Loan Eligibility', description: 'Check loan approval chances with bank-style underwriting', bgColor: 'bg-gradient-to-br from-violet-50 to-purple-50', iconBg: 'from-violet-500 to-purple-600' },
    { id: 'chatbot', icon: MessageCircle, label: 'AI Mentor', description: '24/7 study abroad assistant powered by Groq LLM', bgColor: 'bg-gradient-to-br from-orange-50 to-amber-50', iconBg: 'from-orange-500 to-amber-600' },
    { id: 'admission', icon: Target, label: 'Admission Predictor', description: 'Predict admission chances using AI probability engine', bgColor: 'bg-gradient-to-br from-rose-50 to-pink-50', iconBg: 'from-rose-500 to-pink-600' },
    { id: 'timeline', icon: Calendar, label: 'Timeline', description: 'Plan your application journey month by month', bgColor: 'bg-gradient-to-br from-indigo-50 to-blue-50', iconBg: 'from-indigo-500 to-blue-600' }
  ];

  const features = [
    { icon: Brain, title: 'AI-Powered Insights', description: 'Personalized recommendations based on your unique profile', color: 'from-blue-500 to-cyan-400' },
    { icon: TrendingUp, title: 'ROI Analysis', description: 'Smart calculations for your education investment', color: 'from-emerald-500 to-teal-400' },
    { icon: Shield, title: 'Secure & Private', description: 'Your data is encrypted and protected', color: 'from-violet-500 to-purple-400' },
    { icon: Globe, title: 'Global Universities', description: 'Access 500+ universities worldwide', color: 'from-indigo-500 to-blue-400' },
    { icon: Zap, title: 'Real-time Updates', description: 'Latest admission trends and deadlines', color: 'from-amber-500 to-orange-400' },
    { icon: BookOpen, title: 'Expert Guidance', description: 'AI-powered mentorship 24/7', color: 'from-rose-500 to-pink-400' }
  ];

  const stats = [
    { value: '10,000+', label: 'Students Guided', icon: Users, trend: '+25%' },
    { value: '98%', label: 'Success Rate', icon: TrendingUp, trend: '+12%' },
    { value: '24/7', label: 'AI Support', icon: Clock, trend: 'Always' },
    { value: '500+', label: 'Partner Colleges', icon: Award, trend: '+50' }
  ];

  const roadmapMilestones = [
    { quarter: 'Q3 2026', title: 'Mobile App Launch', description: 'iOS & Android apps with full feature parity', icon: Rocket, color: 'from-blue-500 to-cyan-400' },
    { quarter: 'Q4 2026', title: 'NBFC Integration', description: 'Live loan processing with 5+ partners', icon: Briefcase, color: 'from-emerald-500 to-teal-400' },
    { quarter: 'Q1 2027', title: 'Visa Assistant', description: 'AI-powered visa documentation & interview prep', icon: Globe, color: 'from-violet-500 to-purple-400' },
    { quarter: 'Q2 2027', title: 'Alumni Network', description: 'Connect with successful study abroad graduates', icon: Users, color: 'from-rose-500 to-pink-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      
      {/* Premium Background Pattern */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-teal-100/20 rounded-full blur-3xl"></div>
      </div>

      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-1.5 rounded-xl shadow-lg group-hover:shadow-xl transition">
                <GraduationCap size={22} className="text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">EduPath AI</span>
            </Link>
            <div className="hidden md:flex items-center space-x-7">
              {['About', 'Vision', 'Features', 'Tools', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-slate-600 hover:text-blue-600 transition font-medium text-sm relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/login" className="px-4 py-2 text-slate-600 hover:text-blue-600 transition font-medium text-sm">Sign In</Link>
              <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-5 py-2 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 text-sm shadow-md">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-blue-200 shadow-sm">
              <Sparkles size={16} className="text-blue-500" />
              <span className="text-sm text-blue-700 font-medium">✨ AI-Powered Study Abroad Platform</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-slate-800">Your AI Companion for</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-400">Global Education</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
              Discover, compare, and achieve your dream of studying abroad with AI-powered insights, personalized recommendations, and end-to-end guidance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2 shadow-lg group">
                Get Started Free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
              </Link>
              <a href="#tools" className="bg-white border-2 border-slate-200 px-8 py-3 rounded-xl font-semibold hover:border-blue-300 hover:shadow-md transition text-slate-700">Explore Tools</a>
            </div>
            <div className="mt-12 flex flex-wrap gap-8 justify-center">
              {['No Credit Card Required', 'Free Forever Plan', '24/7 AI Support'].map((text, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-600 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                  <CheckCircle size={16} className="text-emerald-500" />
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="group relative bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition"></div>
                <div className="relative">
                  <div className="flex justify-center mb-3">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-xl group-hover:scale-110 transition">
                      <Icon size={22} className="text-blue-600" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-slate-800">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-1 uppercase tracking-wide">{stat.label}</div>
                  <div className="mt-2 text-xs font-semibold text-emerald-600 bg-emerald-50 inline-block px-2 py-0.5 rounded-full">{stat.trend}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">About Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2 mb-4">Transforming Global Education Access</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">We're on a mission to democratize global education access for every Indian student</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Eye, title: 'Our Vision', desc: 'Empower every Indian student to make confident, informed decisions about their global education journey.', color: 'from-blue-500 to-cyan-400' },
            { icon: Heart, title: 'Our Mission', desc: 'Build an AI-first ecosystem that guides students from university discovery to education financing.', color: 'from-rose-500 to-pink-400' },
            { icon: Users, title: 'Our Community', desc: '10,000+ students guided, 500+ partner colleges, and a growing community of achievers.', color: 'from-emerald-500 to-teal-400' }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="group bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100 relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition duration-300`}></div>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-5 shadow-md group-hover:scale-110 transition`}>
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="font-bold text-xl text-slate-800 mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Vision Section - Timeline */}
      <div id="vision" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">Our Roadmap</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2 mb-4">Vision for the Future</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Creating a world where every student has equal access to quality global education</p>
        </div>
        
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 via-teal-400 to-blue-400 rounded-full hidden md:block"></div>
          
          <div className="space-y-12 md:space-y-0">
            {roadmapMilestones.map((milestone, idx) => {
              const Icon = milestone.icon;
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`relative md:flex md:items-center md:gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} mb-12 md:mb-16`}>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-md hidden md:block"></div>
                  <div className={`md:w-1/2 ${isEven ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                    <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
                      <div className={`inline-flex w-12 h-12 rounded-xl bg-gradient-to-br ${milestone.color} items-center justify-center mb-4 shadow-md group-hover:scale-110 transition`}>
                        <Icon size={22} className="text-white" />
                      </div>
                      <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-3">{milestone.quarter}</div>
                      <h3 className="font-bold text-xl text-slate-800 mb-2">{milestone.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2"></div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl p-8 text-center text-white shadow-xl">
          <Quote size={40} className="mx-auto mb-4 opacity-50" />
          <p className="text-xl md:text-2xl font-medium italic max-w-3xl mx-auto">
            "By 2028, we envision EduPath AI as India's most trusted platform for study abroad guidance, 
            helping 100,000+ students annually achieve their global education dreams."
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <CapIcon size={24} className="text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold">EduPath AI Team</p>
              <p className="text-sm text-blue-100">Founders & Visionaries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Clean minimal cards */}
      <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2 mb-4">Built for Student Success</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">We combine cutting-edge AI technology with deep educational expertise</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-slate-100">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tools Section - Distinct style with light backgrounds */}
      <div id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">AI-Powered Tools</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2 mb-4">Your Complete Study Abroad Toolkit</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Six powerful AI tools to guide you from university discovery to education financing</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate && onNavigate(item.id)}
                className={`group relative ${item.bgColor} rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-left p-6 border border-white/50`}
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition"></div>
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 transition shadow-lg`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <ChevronRight size={20} className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-800 mb-2">{item.label}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                    Launch Tool <ArrowRight size={14} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-blue-50 mb-8 max-w-md mx-auto">Join thousands of students who have transformed their study abroad dreams into reality</p>
            <Link to="/signup" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all hover:scale-105 group">
              Get Started Free 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
            </Link>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">Get in Touch</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2 mb-4">We're Here to Help</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Have questions? Our team is ready to assist you on your journey</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Mail, title: 'Email Us', details: ['support@edupath.ai'], color: 'from-blue-500 to-cyan-400' },
            { icon: Phone, title: 'Call Us', details: ['+91 98765 43210', 'Mon-Fri, 10 AM - 7 PM'], color: 'from-emerald-500 to-teal-400' },
            { icon: MapPin, title: 'Visit Us', details: ['Visakhapatnam, Andhra Pradesh, India'], color: 'from-violet-500 to-purple-400' }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="group bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-lg text-slate-800 mb-2">{item.title}</h3>
                {item.details.map((detail, i) => (
                  <p key={i} className="text-slate-500 text-sm">{detail}</p>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap size={24} className="text-blue-400" />
                <span className="font-bold text-white text-lg">EduPath AI</span>
              </div>
              <p className="text-sm">Your AI-powered companion for global education success.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-white transition">About</a></li>
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#tools" className="hover:text-white transition">Tools</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Study Abroad Guide</a></li>
                <li><a href="#" className="hover:text-white transition">Scholarship Directory</a></li>
                <li><a href="#" className="hover:text-white transition">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-xs">
            <p>© 2026 EduPath AI. All rights reserved. Empowering students worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;