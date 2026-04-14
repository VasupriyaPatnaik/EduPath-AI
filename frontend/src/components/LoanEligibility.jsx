import React, { useState } from 'react';
import { DollarSign, CheckCircle, XCircle, FileText, Loader } from 'lucide-react';
import { api } from '../utils/api';
import toast from 'react-hot-toast';

const LoanEligibility = () => {
  const [formData, setFormData] = useState({
    course: '',
    coApplicantIncome: '',
    loanAmount: '',
    courseDuration: '2',
    universityTier: 'Tier 2'
  });
  const [eligibility, setEligibility] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkEligibility = async () => {
    if (!formData.coApplicantIncome || !formData.loanAmount) {
      toast.error('Please fill income and loan amount');
      return;
    }

    setLoading(true);
    try {
      const response = await api.checkLoanEligibility({
        course: formData.course || 'Graduate Program',
        coApplicantIncome: parseFloat(formData.coApplicantIncome),
        loanAmount: parseFloat(formData.loanAmount),
        courseDuration: parseInt(formData.courseDuration),
        universityTier: formData.universityTier
      });
      setEligibility(response.data);
      toast.success('Eligibility check complete!');
    } catch (error) {
      toast.error('Error checking eligibility');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl font-bold mb-2">🏦 Education Loan Eligibility</h1>
        <p className="text-purple-100">Check your loan eligibility and get personalized offers</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FileText className="text-purple-600" />
            Application Details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Name
              </label>
              <input
                type="text"
                placeholder="e.g., MS in Data Science"
                className="w-full p-3 border rounded-lg"
                value={formData.course}
                onChange={(e) => setFormData({...formData, course: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Co-applicant Annual Income (INR lakhs) *
              </label>
              <input
                type="number"
                placeholder="e.g., 12"
                className="w-full p-3 border rounded-lg"
                value={formData.coApplicantIncome}
                onChange={(e) => setFormData({...formData, coApplicantIncome: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loan Amount Required (INR lakhs) *
              </label>
              <input
                type="number"
                placeholder="e.g., 40"
                className="w-full p-3 border rounded-lg"
                value={formData.loanAmount}
                onChange={(e) => setFormData({...formData, loanAmount: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Duration (Years)
                </label>
                <select
                  className="w-full p-3 border rounded-lg"
                  value={formData.courseDuration}
                  onChange={(e) => setFormData({...formData, courseDuration: e.target.value})}
                >
                  <option value="1">1 Year</option>
                  <option value="2">2 Years</option>
                  <option value="3">3+ Years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  University Tier
                </label>
                <select
                  className="w-full p-3 border rounded-lg"
                  value={formData.universityTier}
                  onChange={(e) => setFormData({...formData, universityTier: e.target.value})}
                >
                  <option value="Tier 1">Tier 1 (Ivy/IIT)</option>
                  <option value="Tier 2">Tier 2 (Good)</option>
                  <option value="Tier 3">Tier 3 (Average)</option>
                </select>
              </div>
            </div>

            <button
              onClick={checkEligibility}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader className="animate-spin" size={20} /> : <DollarSign size={20} />}
              {loading ? 'Checking...' : 'Check Eligibility'}
            </button>
          </div>
        </div>

        {eligibility && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">🎯 Eligibility Result</h2>
            
            <div className="text-center mb-6">
              {eligibility.eligible ? (
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
                  <CheckCircle size={20} />
                  <span className="font-semibold">Pre-approved!</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full">
                  <XCircle size={20} />
                  <span className="font-semibold">Not Eligible Yet</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Max Loan Amount:</span>
                <span className="font-bold text-purple-600">{eligibility.maxLoanAmount} lakhs INR</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Interest Rate:</span>
                <span>{eligibility.interestRate}% per annum</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Margin Money:</span>
                <span>{eligibility.marginMoney}%</span>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm font-semibold mb-2">Required Documents:</p>
              <ul className="text-sm space-y-1">
                {eligibility.requiredDocuments?.map((doc, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <FileText size={14} className="text-gray-400" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">{eligibility.suggestions}</p>
            </div>

            {eligibility.eligible && (
              <button className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700">
                Apply for Loan Now →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanEligibility;