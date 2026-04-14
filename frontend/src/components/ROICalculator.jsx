import React, { useState } from 'react';
import { Calculator, TrendingUp, AlertCircle, Loader } from 'lucide-react';
import { api } from '../utils/api';
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

    setLoading(true);
    try {
      const response = await api.calculateROI({
        totalCost: parseFloat(formData.totalCost),
        annualSalary: parseFloat(formData.annualSalary),
        loanAmount: parseFloat(formData.loanAmount),
        interestRate: parseFloat(formData.interestRate),
        loanTenure: parseInt(formData.loanTenure),
        course: formData.course || 'Graduate Program',
        country: formData.country
      });
      setResult(response.data);
      toast.success('ROI calculation complete!');
    } catch (error) {
      toast.error('Error calculating ROI');
      console.error(error);
    }
    setLoading(false);
  };

  const getRiskColor = (risk) => {
    if (risk === 'Low') return 'text-green-600 bg-green-50';
    if (risk === 'High') return 'text-red-600 bg-red-50';
    return 'text-yellow-600 bg-yellow-50';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl font-bold mb-2">💰 Education ROI Calculator</h1>
        <p className="text-green-100">Calculate your return on investment before committing to education</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Calculator className="text-green-600" />
            Enter Your Details
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Course Cost (USD) *
              </label>
              <input
                type="number"
                placeholder="e.g., 50000"
                className="w-full p-3 border rounded-lg"
                value={formData.totalCost}
                onChange={(e) => setFormData({...formData, totalCost: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expected Annual Salary (USD) *
              </label>
              <input
                type="number"
                placeholder="e.g., 80000"
                className="w-full p-3 border rounded-lg"
                value={formData.annualSalary}
                onChange={(e) => setFormData({...formData, annualSalary: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loan Amount Needed (USD) *
              </label>
              <input
                type="number"
                placeholder="e.g., 40000"
                className="w-full p-3 border rounded-lg"
                value={formData.loanAmount}
                onChange={(e) => setFormData({...formData, loanAmount: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.5"
                  className="w-full p-3 border rounded-lg"
                  value={formData.interestRate}
                  onChange={(e) => setFormData({...formData, interestRate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Tenure (Years)
                </label>
                <input
                  type="number"
                  className="w-full p-3 border rounded-lg"
                  value={formData.loanTenure}
                  onChange={(e) => setFormData({...formData, loanTenure: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Name
              </label>
              <input
                type="text"
                placeholder="e.g., MS in Computer Science"
                className="w-full p-3 border rounded-lg"
                value={formData.course}
                onChange={(e) => setFormData({...formData, course: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                className="w-full p-3 border rounded-lg"
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
              >
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <button
              onClick={calculateROI}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader className="animate-spin" size={20} /> : <TrendingUp size={20} />}
              {loading ? 'Calculating...' : 'Calculate ROI'}
            </button>
          </div>
        </div>

        {/* Results Display */}
        {result && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">📊 Your ROI Analysis</h2>
            
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Monthly EMI</p>
                <p className="text-2xl font-bold text-blue-600">${result.monthlyEmi?.toLocaleString()}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total Interest</p>
                  <p className="text-lg font-bold text-purple-600">${result.totalInterest?.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Break-even Period</p>
                  <p className="text-lg font-bold text-green-600">{result.breakEvenYears} years</p>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${getRiskColor(result.riskLevel)}`}>
                <p className="font-semibold flex items-center gap-2">
                  <AlertCircle size={16} />
                  Risk Level: {result.riskLevel}
                </p>
                <p className="text-sm mt-2">{result.insights}</p>
              </div>

              {result.alternativeAdvice && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-1">💡 Suggestion</p>
                  <p className="text-sm">{result.alternativeAdvice}</p>
                </div>
              )}

              <div className="border-t pt-4 mt-4">
                <p className="text-xs text-gray-500">
                  Monthly after-tax salary: ${result.monthlySalaryAfterTax?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ROICalculator;