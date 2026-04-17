import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, Calculator, DollarSign, MessageCircle, 
  Target, Calendar, GraduationCap, ChevronRight, 
  Sparkles, Brain, TrendingUp, Award, Users, Clock,
  ArrowRight, CheckCircle, Star, Shield, Globe
} from 'lucide-react';

const LandingPage = ({ onNavigate }) => {
  const navItems = [
    { id: 'navigator', icon: Compass, label: 'Career Navigator', color: 'from-blue-500 to-cyan-500', description: 'AI-powered university matching' },
    { id: 'roi', icon: Calculator, label: 'ROI Calculator', color: 'from-emerald-500 to-teal-500', description: 'Calculate education returns' },
    { id: 'loan', icon: DollarSign, label: 'Loan Eligibility', color: 'from-purple-500 to-pink-500', description: 'Check loan approval chances' },
    { id: 'chatbot', icon: MessageCircle, label: 'AI Mentor', color: 'from-indigo-500 to-purple-500', description: '24/7 study abroad assistant' },
    { id: 'admission', icon: Target, label: 'Admission Predictor', color: 'from-orange-500 to-red-500', description: 'Predict admission chances' },
    { id: 'timeline', icon: Calendar, label: 'Timeline', color: 'from-rose-500 to-pink-500', description: 'Plan your application journey' }
  ];

  const features = [
    { icon: Brain, title: 'AI-Powered Insights', description: 'Get personalized recommendations based on your profile' },
    { icon: TrendingUp, title: 'ROI Analysis', description: 'Calculate returns on your education investment' },
    { icon: Shield, title: 'Secure & Private', description: 'Your data is encrypted and protected' },
    { icon: Globe, title: 'Global Universities', description: 'Access 500+ universities worldwide' }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0F2B3D] via-[#1A4A6F] to-[#0F2B3D] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles size={16} className="text-yellow-400" />
              <span className="text-sm">AI-Powered Study Abroad Platform</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Your AI Companion for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Global Education
              </span>
            </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mb-10">
              Discover, compare, and achieve your dream of studying abroad with AI-powered insights, personalized recommendations, and end-to-end guidance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/login"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-2"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>
              <a
                href="#tools"
                className="bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition"
              >
                Explore Tools
              </a>
            </div>
            <div className="mt-12 flex flex-wrap gap-6 justify-center">
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-400" />
                <span className="text-sm">No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-400" />
                <span className="text-sm">Free Forever Plan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-400" />
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
              <div key={idx} className="bg-white rounded-xl p-5 text-center shadow-lg hover:shadow-xl transition-all border border-gray-100">
                <div className="flex justify-center mb-2">
                  <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-2 rounded-full">
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

      {/* Features Section */}
      <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose EduPath AI?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We combine cutting-edge AI technology with deep educational expertise to help you succeed
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all border border-gray-100 group">
                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-3 rounded-xl inline-flex mb-4 group-hover:scale-110 transition">
                  <Icon size={28} className="text-indigo-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tools Section */}
      <div id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white rounded-3xl my-8 shadow-sm">
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
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-left border border-gray-100"
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

      {/* Testimonials Section */}
      <div id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Success Stories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of students who achieved their study abroad dreams with EduPath AI
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm mb-4">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{testimonial.name}</p>
                  <p className="text-xs text-gray-500">{testimonial.country} → {testimonial.destination}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-indigo-100 mb-8 max-w-md mx-auto">
            Join thousands of students who have transformed their study abroad dreams into reality
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all hover:scale-105"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap size={24} className="text-indigo-400" />
                <span className="font-bold text-white text-lg">EduPath AI</span>
              </div>
              <p className="text-sm">Your AI-powered companion for global education success.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#tools" className="hover:text-white transition">Tools</a></li>
                <li><a href="/#pricing" className="hover:text-white transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/#about" className="hover:text-white transition">About Us</a></li>
                <li><a href="mailto:support@edupath.ai" className="hover:text-white transition">Contact</a></li>
                <li><a href="/#careers" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs">
            <p>© 2026 EduPath AI. All rights reserved. Empowering students worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;