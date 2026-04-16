import React, { useState } from 'react';
import { 
  Calculator, TrendingUp, DollarSign, Clock, 
  AlertCircle, Briefcase, MapPin, BookOpen,
  Loader, Target, BarChart3, LineChart
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
    
    // Simulate API delay for realistic experience
    setTimeout(() => {
      // Calculate monthly EMI
      const monthlyRate = interestRate / 100 / 12;
      const months = loanTenure * 12;
      let emi = 0;
      
      if (monthlyRate > 0) {
        emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
      } else {
        emi = loanAmount / months;
      }
      
      // Calculate total interest
      const totalInterest = (emi * months) - loanAmount;
      
      // Calculate break-even years
      const annualAfterTax = annualSalary * 0.7;
      const breakEvenYears = (totalCost / annualAfterTax).toFixed(1);
      
      // Determine risk level
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
          bg: 'bg-indigo-50',
          border: 'border-l-4 border-indigo-600',
          text: 'text-indigo-900'
        };
      case 'Medium':
        return {
          bg: 'bg-amber-50',
          border: 'border-l-4 border-amber-500',
          text: 'text-amber-900'
        };
      case 'High':
        return {
          bg: 'bg-red-50',
          border: 'border-l-4 border-red-500',
          text: 'text-red-900'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-l-4 border-gray-500',
          text: 'text-gray-900'
        };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e3a8a] via-[#1e40af] to-[#172554] rounded-2xl p-8 text-white mb-8 shadow-xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2">
          <span>💰</span>
          Education ROI Calculator
        </h1>
        <p className="text-indigo-200 text-base">
          Calculate your return on investment before committing to education
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-indigo-100">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Calculator size={24} className="text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Enter Your Details</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <DollarSign size={16} className="text-indigo-600" />
                Total Course Cost (USD) *
              </label>
              <input
                type="number"
                placeholder="e.g., 50000"
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                value={formData.totalCost}
                onChange={(e) => setFormData({...formData, totalCost: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && calculateROI()}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <TrendingUp size={16} className="text-indigo-600" />
                Expected Annual Salary (USD) *
              </label>
              <input
                type="number"
                placeholder="e.g., 80000"
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                value={formData.annualSalary}
                onChange={(e) => setFormData({...formData, annualSalary: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && calculateROI()}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Briefcase size={16} className="text-indigo-600" />
                Loan Amount Needed (USD) *
              </label>
              <input
                type="number"
                placeholder="e.g., 40000"
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                value={formData.loanAmount}
                onChange={(e) => setFormData({...formData, loanAmount: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && calculateROI()}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.5"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.interestRate}
                  onChange={(e) => setFormData({...formData, interestRate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Loan Tenure (Years)
                </label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.loanTenure}
                  onChange={(e) => setFormData({...formData, loanTenure: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <BookOpen size={16} className="text-indigo-600" />
                Course Name
              </label>
              <input
                type="text"
                placeholder="e.g., MS in Computer Science"
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.course}
                onChange={(e) => setFormData({...formData, course: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <MapPin size={16} className="text-indigo-600" />
                Country
              </label>
              <select
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
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
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Calculating ROI...
                </>
              ) : (
                <>
                  <LineChart size={20} />
                  Calculate ROI
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Display */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-indigo-100 min-h-[500px]">
          {!result ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
              <div className="bg-indigo-50 rounded-full p-4 mb-4">
                <Target size={48} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready to Calculate</h3>
              <p className="text-gray-500 text-sm max-w-sm">
                Fill in your education costs, expected salary, and loan details to see your ROI analysis
              </p>
              <div className="mt-6 flex gap-2">
                <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">💰 Cost Analysis</span>
                <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">📈 Salary Projections</span>
                <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">🏦 Loan Planning</span>
              </div>
            </div>
          ) : (
            <div className="animate-fadeIn">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <BarChart3 size={24} className="text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Your ROI Analysis</h2>
              </div>
              
              {/* EMI Box */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-5 rounded-xl mb-4 border border-indigo-100">
                <div className="text-sm text-gray-600 mb-1">Monthly EMI</div>
                <div className="text-3xl font-bold text-indigo-700">
                  ${result.monthlyEmi.toLocaleString()}
                </div>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                  <div className="text-xs text-gray-600 mb-1">Total Interest</div>
                  <div className="text-lg font-bold text-purple-700">
                    ${result.totalInterest.toLocaleString()}
                  </div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                  <div className="text-xs text-gray-600 mb-1">Break-even Period</div>
                  <div className="text-lg font-bold text-emerald-700">
                    {result.breakEvenYears} years
                  </div>
                </div>
              </div>
              
              {/* Risk Level */}
              <div className={`${getRiskStyles(result.riskLevel).bg} ${getRiskStyles(result.riskLevel).border} p-4 rounded-xl mb-4`}>
                <div className="font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle size={16} />
                  Risk Level: {result.riskLevel}
                </div>
                <div className="text-sm">{result.insights}</div>
              </div>
              
              {/* Suggestion */}
              {result.alternativeAdvice && (
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-xl mb-4">
                  <div className="font-semibold mb-2 flex items-center gap-2">
                    <span>💡</span>
                    Suggestion
                  </div>
                  <div className="text-sm">{result.alternativeAdvice}</div>
                </div>
              )}
              
              {/* Footer Note */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="text-xs text-gray-500">
                  Monthly after-tax salary: ${result.monthlySalaryAfterTax.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  ROI Ratio: {result.roiRatio}x (Salary/Cost)
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ROICalculator;