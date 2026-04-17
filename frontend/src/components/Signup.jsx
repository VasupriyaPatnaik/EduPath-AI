import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, GraduationCap, ArrowRight, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userName', formData.name);
      toast.success('Account created successfully!');
      navigate('/app');
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F2B3D] via-[#1A4A6F] to-[#0F2B3D] flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8 animate-fadeInUp">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-2xl mb-4">
            <UserPlus className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-indigo-200">Start your journey with EduPath AI</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 animate-fadeInUp animation-delay-200">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-indigo-200 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-indigo-300" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder:text-indigo-300/50"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-300">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-indigo-200 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-indigo-300" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder:text-indigo-300/50"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-300">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-indigo-200 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-indigo-300" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder:text-indigo-300/50"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-indigo-300" /> : <Eye className="h-5 w-5 text-indigo-300" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-300">{errors.password}</p>}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-semibold text-indigo-200 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-indigo-300" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder:text-indigo-300/50"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5 text-indigo-300" /> : <Eye className="h-5 w-5 text-indigo-300" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-300">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>Create Account <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-indigo-200">
              Already have an account?{" "}
              <Link to="/login" className="text-white font-semibold hover:text-indigo-200 transition">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .animation-delay-200 { animation-delay: 0.2s; opacity: 0; }
      `}</style>
    </div>
  );
};

export default Signup;