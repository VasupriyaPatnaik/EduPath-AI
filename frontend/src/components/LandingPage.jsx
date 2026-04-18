import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, Calculator, DollarSign, MessageCircle, 
  Target, Calendar, GraduationCap, ChevronRight, 
  Sparkles, Brain, TrendingUp, Award, Users, Clock,
  ArrowRight, CheckCircle, Star, Shield, Globe,
  Zap, BarChart3, Briefcase, BookOpen
} from 'lucide-react';

const LandingPage = ({ onNavigate }) => {
  const navItems = [
    { id: 'navigator', icon: Compass, label: 'Career Navigator', description: 'AI-powered university matching' },
    { id: 'roi', icon: BarChart3, label: 'ROI Calculator', description: 'Calculate education returns' },
    { id: 'loan', icon: Briefcase, label: 'Loan Eligibility', description: 'Check loan approval chances' },
    { id: 'chatbot', icon: MessageCircle, label: 'AI Mentor', description: '24/7 study abroad assistant' },
    { id: 'admission', icon: Target, label: 'Admission Predictor', description: 'Predict admission chances' },
    { id: 'timeline', icon: Calendar, label: 'Timeline', description: 'Plan your application journey' }
  ];

  const features = [
    { icon: Brain, title: 'AI-Powered Insights', description: 'Personalized recommendations based on your unique profile' },
    { icon: TrendingUp, title: 'ROI Analysis', description: 'Smart calculations for your education investment' },
    { icon: Shield, title: 'Secure & Private', description: 'Your data is encrypted and protected' },
    { icon: Globe, title: 'Global Universities', description: 'Access 500+ universities worldwide' },
    { icon: Zap, title: 'Real-time Updates', description: 'Latest admission trends and deadlines' },
    { icon: BookOpen, title: 'Expert Guidance', description: 'AI-powered mentorship 24/7' }
  ];

  const stats = [
    { value: '10,000+', label: 'Students Guided', icon: Users },
    { value: '98%', label: 'Success Rate', icon: TrendingUp },
    { value: '24/7', label: 'AI Support', icon: Clock },
    { value: '500+', label: 'Partner Colleges', icon: Award }
  ];

  const testimonials = [
    { name: 'Priya Sharma', country: 'India', destination: 'Stanford University', text: 'EduPath AI helped me find the perfect university and secure a scholarship!', rating: 5 },
    { name: 'Rahul Mehta', country: 'India', destination: 'University of Toronto', text: 'The ROI calculator gave me confidence in my education investment decision.', rating: 5 },
    { name: 'Anjali Patel', country: 'India', destination: 'University of Melbourne', text: 'AI Mentor answered all my questions about visas and applications.', rating: 5 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0F1F3A] to-[#1A2A4A]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-indigo-400/30">
              <Sparkles size={16} className="text-yellow-400" />
              <span className="text-sm text-indigo-200">AI-Powered Study Abroad Platform</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-white">Your AI Companion for</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400">
                Global Education
              </span>
            </h1>
            <p className="text-xl text-indigo-200 max-w-2xl mb-10">
              Discover, compare, and achieve your dream of studying abroad with AI-powered insights, personalized recommendations, and end-to-end guidance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-2 shadow-lg"
              >
                Get Started Free
                <ArrowRight size={18} />
              </Link>
              <a
                href="#tools"
                className="bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition text-white"
              >
                Explore Tools
              </a>
            </div>
            <div className="mt-12 flex flex-wrap gap-6 justify-center">
              <div className="flex items-center gap-2 text-indigo-200">
                <CheckCircle size={18} className="text-emerald-400" />
                <span className="text-sm">No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2 text-indigo-200">
                <CheckCircle size={18} className="text-emerald-400" />
                <span className="text-sm">Free Forever Plan</span>
              </div>
              <div className="flex items-center gap-2 text-indigo-200">
                <CheckCircle size={18} className="text-emerald-400" />
                <span className="text-sm">24/7 AI Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-[#1A2A4A]/80 backdrop-blur-sm rounded-xl p-5 text-center hover:bg-[#1E3060] transition-all border border-indigo-500/20">
                <div className="flex justify-center mb-2">
                  <div className="bg-indigo-500/20 p-2 rounded-full">
                    <Icon size={20} className="text-indigo-400" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-indigo-300 mt-1 uppercase tracking-wide">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose EduPath AI?</h2>
          <p className="text-indigo-300 max-w-2xl mx-auto">
            We combine cutting-edge AI technology with deep educational expertise to help you succeed
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="bg-[#1A2A4A]/60 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-[#1E3060] transition-all border border-indigo-500/20 group">
                <div className="bg-indigo-500/20 p-3 rounded-xl inline-flex mb-4 group-hover:scale-110 transition">
                  <Icon size={28} className="text-indigo-400" />
                </div>
                <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-indigo-300">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tools Section - Unified Colors */}
      <div id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Smart Tools for Your Journey</h2>
          <p className="text-indigo-300 max-w-2xl mx-auto">
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
                className="group bg-[#1A2A4A]/80 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-[#1E3060] transition-all duration-300 hover:-translate-y-1 text-left border border-indigo-500/20"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="bg-indigo-500/20 p-2 rounded-lg group-hover:bg-indigo-500/30 transition">
                      <Icon size={24} className="text-indigo-400" />
                    </div>
                    <ChevronRight size={20} className="text-indigo-400/50 group-hover:text-indigo-300 transition" />
                  </div>
                  <h3 className="font-bold text-lg text-white mb-1">{item.label}</h3>
                  <p className="text-sm text-indigo-300">{item.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Success Stories</h2>
          <p className="text-indigo-300 max-w-2xl mx-auto">
            Join thousands of students who achieved their study abroad dreams with EduPath AI
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-[#1A2A4A]/60 backdrop-blur-sm rounded-xl p-6 hover:bg-[#1E3060] transition border border-indigo-500/20">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-indigo-200 text-sm mb-4">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{testimonial.name}</p>
                  <p className="text-xs text-indigo-400">{testimonial.country} → {testimonial.destination}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-12 text-center border border-indigo-500/30">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-indigo-300 mb-8 max-w-md mx-auto">
            Join thousands of students who have transformed their study abroad dreams into reality
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-2xl transition-all hover:scale-105"
          >
            Get Started Free
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0A1628] border-t border-indigo-500/20 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap size={24} className="text-indigo-400" />
                <span className="font-bold text-white text-lg">EduPath AI</span>
              </div>
              <p className="text-sm text-indigo-300">Your AI-powered companion for global education success.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="text-indigo-300 hover:text-white transition">Features</a></li>
                <li><a href="#tools" className="text-indigo-300 hover:text-white transition">Tools</a></li>
                <li><a href="#" className="text-indigo-300 hover:text-white transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-indigo-300 hover:text-white transition">About Us</a></li>
                <li><a href="#" className="text-indigo-300 hover:text-white transition">Contact</a></li>
                <li><a href="#" className="text-indigo-300 hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-indigo-300 hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="text-indigo-300 hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-indigo-500/20 mt-8 pt-8 text-center text-xs text-indigo-400">
            <p>© 2026 EduPath AI. All rights reserved. Empowering students worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;