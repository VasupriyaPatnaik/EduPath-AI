import React, { useState } from 'react';
import { 
  Calculator, TrendingUp, DollarSign, Clock, 
  AlertCircle, Briefcase, MapPin, BookOpen,
  Loader, Target, BarChart3, LineChart, Sparkles,
  ArrowRight, GraduationCap, Shield, Zap
} from 'lucide-react';
import toast from 'react-hot-toast';

const ROICalculator = () => {
  const [formData, setFormData] = useState({
    totalCost: '',
    annualSalary: '',
    loanAmount: '',
    interestRate: '10.5',
    loanTenure: '10',
    course: '',
    country: 'USA'
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const countries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'India'];

  const calculateROI = async () => {
    if (!formData.totalCost || !formData.annualSalary || !formData.loanAmount) {
      toast.error('Please fill all required fields');
      return;
    }

    const totalCost = parseFloat(formData.totalCost);
    const annualSalary = parseFloat(formData.annualSalary);
    const loanAmount = parseFloat(formData.loanAmount);
    const interestRate = parseFloat(formData.interestRate);
    const loanTenure = parseInt(formData.loanTenure);
    const course = formData.course || 'Graduate Program';
    const country = formData.country;

    setLoading(true);
    
    setTimeout(() => {
      const monthlyRate = interestRate / 100 / 12;
      const months = loanTenure * 12;
      let emi = 0;
      
      if (monthlyRate > 0) {
        emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
      } else {
        emi = loanAmount / months;
      }
      
      const totalInterest = (emi * months) - loanAmount;
      const annualAfterTax = annualSalary * 0.7;
      const breakEvenYears = (totalCost / annualAfterTax).toFixed(1);
      const roiRatio = annualSalary / totalCost;
      
      let riskLevel = 'Medium';
      let insights = '';
      let alternativeAdvice = null;
      
      if (roiRatio > 1.5) {
        riskLevel = 'Low';
        insights = '✅ Excellent ROI! Your expected salary significantly exceeds the course cost.';
      } else if (roiRatio > 1) {
        riskLevel = 'Medium';
        insights = '📈 Good ROI. The investment should pay off within reasonable time.';
      } else {
        riskLevel = 'High';
        insights = '⚠️ Consider alternatives or negotiate better salary/scholarships.';
        alternativeAdvice = '💡 Consider scholarships, part-time work, or lower-cost alternatives';
      }
      
      const monthlySalaryAfterTax = Math.round(annualSalary * 0.7 / 12);
      
      setResult({
        monthlyEmi: Math.round(emi),
        totalInterest: Math.round(totalInterest),
        breakEvenYears: breakEvenYears,
        monthlySalaryAfterTax: monthlySalaryAfterTax,
        riskLevel: riskLevel,
        insights: insights,
        alternativeAdvice: alternativeAdvice,
        roiRatio: roiRatio.toFixed(2)
      });
      
      setLoading(false);
      toast.success('ROI calculation complete!');
    }, 800);
  };

  const getRiskStyles = (riskLevel) => {
    switch(riskLevel) {
      case 'Low':
        return {
          bg: 'bg-emerald-50',
          border: 'border-l-4 border-emerald-500',
          text: 'text-emerald-800'
        };
      case 'Medium':
        return {
          bg: 'bg-amber-50',
          border: 'border-l-4 border-amber-500',
          text: 'text-amber-800'
        };
      case 'High':
        return {
          bg: 'bg-rose-50',
          border: 'border-l-4 border-rose-500',
          text: 'text-rose-800'
        };
      default:
        return {
          bg: 'bg-slate-50',
          border: 'border-l-4 border-slate-500',
          text: 'text-slate-800'
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-8">
        
        {/* Header - Matching CareerNavigator */}
        <div className="relative rounded-2xl p-6 md:p-8 bg-white shadow-lg border border-slate-100 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-2 rounded-2xl shadow-md">
                <Calculator size={28} className="text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Education ROI Calculator
              </h1>
            </div>
            <p className="text-slate-600 text-base max-w-2xl">
              Calculate your return on investment before committing to education
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-blue-50 px-3 py-1.5 rounded-full text-xs flex items-center gap-1 text-blue-700">
                <TrendingUp size={12} /> ROI Analysis
              </span>
              <span className="bg-blue-50 px-3 py-1.5 rounded-full text-xs flex items-center gap-1 text-blue-700">
                <DollarSign size={12} /> EMI Calculator
              </span>
              <span className="bg-blue-50 px-3 py-1.5 rounded-full text-xs flex items-center gap-1 text-blue-700">
                <Clock size={12} /> Break-even
              </span>
              <span className="bg-blue-50 px-3 py-1.5 rounded-full text-xs flex items-center gap-1 text-blue-700">
                <Shield size={12} /> Risk Assessment
              </span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Input Form - Matching CareerNavigator style */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-white px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calculator size={18} className="text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Enter Your Details</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <DollarSign size={14} className="text-blue-600" />
                    Total Course Cost (USD) *
                  </label>
                  <div className={`relative transition-all duration-200 ${focusedField === 'totalCost' ? 'transform scale-[1.01]' : ''}`}>
                    <input
                      type="number"
                      placeholder="e.g., 50000"
                      onFocus={() => setFocusedField('totalCost')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full p-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                      value={formData.totalCost}
                      onChange={(e) => setFormData({...formData, totalCost: e.target.value})}
                      onKeyPress={(e) => e.key === 'Enter' && calculateROI()}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <TrendingUp size={14} className="text-blue-600" />
                    Expected Annual Salary (USD) *
                  </label>
                  <div className={`relative transition-all duration-200 ${focusedField === 'annualSalary' ? 'transform scale-[1.01]' : ''}`}>
                    <input
                      type="number"
                      placeholder="e.g., 80000"
                      onFocus={() => setFocusedField('annualSalary')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full p-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                      value={formData.annualSalary}
                      onChange={(e) => setFormData({...formData, annualSalary: e.target.value})}
                      onKeyPress={(e) => e.key === 'Enter' && calculateROI()}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <Briefcase size={14} className="text-blue-600" />
                    Loan Amount Needed (USD) *
                  </label>
                  <div className={`relative transition-all duration-200 ${focusedField === 'loanAmount' ? 'transform scale-[1.01]' : ''}`}>
                    <input
                      type="number"
                      placeholder="e.g., 40000"
                      onFocus={() => setFocusedField('loanAmount')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full p-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                      value={formData.loanAmount}
                      onChange={(e) => setFormData({...formData, loanAmount: e.target.value})}
                      onKeyPress={(e) => e.key === 'Enter' && calculateROI()}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      className="w-full p-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                      value={formData.interestRate}
                      onChange={(e) => setFormData({...formData, interestRate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Loan Tenure (Years)
                    </label>
                    <input
                      type="number"
                      className="w-full p-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                      value={formData.loanTenure}
                      onChange={(e) => setFormData({...formData, loanTenure: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <BookOpen size={14} className="text-blue-600" />
                    Course Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., MS in Computer Science"
                    className="w-full p-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                    value={formData.course}
                    onChange={(e) => setFormData({...formData, course: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <MapPin size={14} className="text-blue-600" />
                    Country
                  </label>
                  <select
                    className="w-full p-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition bg-white"
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                  >
                    {countries.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={calculateROI}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-lg disabled:opacity-50 transition-all hover:shadow-xl group"
                >
                  {loading ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      Calculating ROI...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} className="group-hover:rotate-12 transition" />
                      Calculate ROI
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Results Display - Matching CareerNavigator style */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-white px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 size={18} className="text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Your ROI Analysis</h2>
              </div>
            </div>
            <div className="p-6">
              {!result ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Target size={32} className="text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Ready to Calculate</h3>
                  <p className="text-slate-500 text-sm max-w-sm">
                    Fill in your education costs, expected salary, and loan details to see your ROI analysis
                  </p>
                  <div className="mt-6 flex gap-2 flex-wrap justify-center">
                    <span className="text-xs bg-slate-100 px-3 py-1 rounded-full">💰 Cost Analysis</span>
                    <span className="text-xs bg-slate-100 px-3 py-1 rounded-full">📈 Salary Projections</span>
                    <span className="text-xs bg-slate-100 px-3 py-1 rounded-full">🏦 Loan Planning</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* EMI Box */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100">
                    <div className="text-sm text-slate-600 mb-1">Monthly EMI</div>
                    <div className="text-3xl font-bold text-blue-700">
                      ${result.monthlyEmi.toLocaleString()}
                    </div>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                      <div className="text-xs text-slate-600 mb-1">Total Interest</div>
                      <div className="text-lg font-bold text-purple-700">
                        ${result.totalInterest.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                      <div className="text-xs text-slate-600 mb-1">Break-even Period</div>
                      <div className="text-lg font-bold text-emerald-700">
                        {result.breakEvenYears} years
                      </div>
                    </div>
                  </div>
                  
                  {/* Risk Level */}
                  <div className={`${getRiskStyles(result.riskLevel).bg} ${getRiskStyles(result.riskLevel).border} p-4 rounded-xl`}>
                    <div className="font-semibold mb-2 flex items-center gap-2">
                      <AlertCircle size={16} />
                      Risk Level: {result.riskLevel}
                    </div>
                    <div className="text-sm">{result.insights}</div>
                  </div>
                  
                  {/* Suggestion */}
                  {result.alternativeAdvice && (
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-xl">
                      <div className="font-semibold mb-2 flex items-center gap-2">
                        <span>💡</span>
                        Suggestion
                      </div>
                      <div className="text-sm">{result.alternativeAdvice}</div>
                    </div>
                  )}
                  
                  {/* Footer Note */}
                  <div className="border-t border-slate-200 pt-4 mt-2">
                    <div className="text-xs text-slate-500">
                      Monthly after-tax salary: ${result.monthlySalaryAfterTax.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-400 mt-2">
                      ROI Ratio: {result.roiRatio}x (Salary/Cost)
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ROICalculator;