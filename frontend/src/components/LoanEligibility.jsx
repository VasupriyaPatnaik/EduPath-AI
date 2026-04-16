import React, { useState } from 'react';
import { 
  FileText, CheckCircle, XCircle, DollarSign, 
  TrendingUp, Shield, Award, Building, Calendar,
  AlertCircle, CreditCard, Users, BookOpen, Globe
} from 'lucide-react';
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

  // Eligibility engine based on underwriting logic
  const computeEligibility = (course, coIncome, loanReq, durationYears, uniTier) => {
    let eligible = false;
    let maxLoanAmount = 0;
    let interestRate = 8.9;
    let marginMoney = 15;
    let requiredDocuments = [
      "Valid admission offer letter",
      "Co-applicant income proof (ITR / Form 16 / Salary slips)",
      "Academic transcripts (last degree)",
      "Government ID proof (PAN / Aadhaar / Passport)"
    ];
    let suggestions = "";
    
    // Income multiplier based on university tier
    let tierFactor = 1.0;
    if (uniTier === 'Tier 1') tierFactor = 6.2;
    else if (uniTier === 'Tier 2') tierFactor = 4.8;
    else tierFactor = 3.5;
    
    // Adjustment based on course duration
    let durationAdjust = 1.0;
    if (durationYears >= 3) durationAdjust = 0.88;
    else if (durationYears <= 1) durationAdjust = 1.05;
    else durationAdjust = 1.0;
    
    let rawCapacity = coIncome * tierFactor * durationAdjust;
    maxLoanAmount = Math.floor(rawCapacity * 10) / 10;
    if (maxLoanAmount < 4) maxLoanAmount = 4;
    if (maxLoanAmount > 150) maxLoanAmount = 150;
    
    const minIncomeThreshold = 3.5;
    
    if (coIncome >= minIncomeThreshold && loanReq <= maxLoanAmount && loanReq > 0) {
      eligible = true;
    } else if (coIncome < minIncomeThreshold) {
      suggestions = `Minimum co-applicant annual income should be at least ${minIncomeThreshold} Lakhs INR. Consider adding a joint co-applicant (parent/spouse) to strengthen profile.`;
    } else if (loanReq > maxLoanAmount) {
      suggestions = `Maximum eligible loan amount based on financial profile is ₹${maxLoanAmount} lakhs. You may reduce the loan requirement, increase down payment, or explore external scholarships.`;
    } else {
      suggestions = "Eligibility can be enhanced by providing additional collateral or including a co-applicant with higher stable income.";
    }
    
    // Dynamic interest rate and margin money for eligible cases
    if (eligible) {
      if (uniTier === 'Tier 1') {
        interestRate = 7.85;
        marginMoney = 10;
      } else if (uniTier === 'Tier 2') {
        interestRate = 8.65;
        marginMoney = 15;
      } else {
        interestRate = 9.45;
        marginMoney = 20;
      }
      if (loanReq <= maxLoanAmount * 0.6) marginMoney = Math.max(5, marginMoney - 5);
      suggestions = `✅ Pre-approved! You qualify for a loan up to ₹${maxLoanAmount} lakhs at ${interestRate}% p.a. based on income & university ranking. Speak to a loan advisor for faster processing.`;
    } else {
      if (coIncome < minIncomeThreshold) {
        suggestions = `Low co-applicant income (₹${coIncome} lakhs). Minimum requirement ₹${minIncomeThreshold} lakhs. Add another earning co-applicant or provide fixed deposit as security.`;
      } else if (loanReq > maxLoanAmount) {
        suggestions = `Requested loan ₹${loanReq} lakhs exceeds our max approval of ₹${maxLoanAmount} lakhs. Consider arranging margin money (${Math.round((loanReq - maxLoanAmount)/loanReq * 100)}% of total) or reduce loan by ${(loanReq - maxLoanAmount).toFixed(1)} lakhs.`;
      }
      interestRate = 10.2;
      marginMoney = 25;
      requiredDocuments.push("Collateral/Property valuation report (if applicable)");
    }
    
    if (uniTier === 'Tier 1' && eligible) requiredDocuments.push("Scholarship/Financial aid award letter (if any)");
    requiredDocuments = [...new Map(requiredDocuments.map(doc => [doc, doc])).values()].slice(0, 5);
    
    return {
      eligible: eligible,
      maxLoanAmount: maxLoanAmount.toFixed(1),
      interestRate: interestRate.toFixed(1),
      marginMoney: marginMoney,
      requiredDocuments: requiredDocuments,
      suggestions: suggestions
    };
  };

  const checkEligibility = async () => {
    if (!formData.coApplicantIncome || !formData.loanAmount) {
      toast.error('Please fill co-applicant income and loan amount');
      return;
    }

    const coIncome = parseFloat(formData.coApplicantIncome);
    const loanReq = parseFloat(formData.loanAmount);
    
    if (isNaN(coIncome) || isNaN(loanReq) || coIncome <= 0 || loanReq <= 0) {
      toast.error('Please enter valid positive numbers for income and loan amount');
      return;
    }

    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 750));
    
    const course = formData.course.trim() || "Higher Education Program";
    const duration = parseInt(formData.courseDuration);
    const uniTier = formData.universityTier;
    
    const result = computeEligibility(course, coIncome, loanReq, duration, uniTier);
    setEligibility(result);
    setLoading(false);
    toast.success('Eligibility analysis complete!');
  };

  const handleApplyNow = () => {
    toast.success('Redirecting to secure loan application portal (demo)');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Hero Section with navy/indigo professional gradient */}
      <div className="rounded-2xl shadow-xl overflow-hidden mb-8 relative bg-gradient-to-r from-[#0e1733] via-[#1f356e] to-[#2c4794]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="relative p-6 md:p-8 lg:p-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl drop-shadow-md">🏦</span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium tracking-wide text-indigo-100">
                  AI-Powered Assessment
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
                Education Loan Eligibility
              </h1>
              <p className="text-indigo-100 text-base md:text-lg max-w-xl leading-relaxed">
                Professional underwriting analysis • Real-time eligibility • Personalized loan offers for global education
              </p>
            </div>
            <div className="hidden md:flex bg-indigo-900/40 backdrop-blur-md rounded-xl px-5 py-2.5 border border-indigo-400/30 shadow-sm">
              <span className="text-indigo-200 text-sm font-medium">✨ EduSmart Study AI Assistant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Grid Layout */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Card: Application Details */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 duration-300">
          <div className="border-b border-slate-100 bg-slate-50/60 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <FileText size={22} className="text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Application Details</h2>
            </div>
          </div>
          <div className="p-6 md:p-7 space-y-5">
            {/* Course Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                🎓 Course / Program Name
              </label>
              <input
                type="text"
                placeholder="e.g., MSc in Finance, MBA Tech, MS Data Science"
                className="w-full p-3 border border-slate-200 rounded-xl focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 bg-slate-50/40 transition"
                value={formData.course}
                onChange={(e) => setFormData({...formData, course: e.target.value})}
              />
            </div>

            {/* Co-applicant Income */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Co-applicant Annual Income <span className="text-indigo-600">(INR lakhs)</span> <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-slate-500 font-medium">₹</span>
                <input
                  type="number"
                  step="0.1"
                  placeholder="e.g., 12.5"
                  className="w-full p-3 pl-8 border border-slate-200 rounded-xl focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 bg-slate-50/40"
                  value={formData.coApplicantIncome}
                  onChange={(e) => setFormData({...formData, coApplicantIncome: e.target.value})}
                />
              </div>
            </div>

            {/* Loan Amount Required */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Loan Amount Required <span className="text-indigo-600">(INR lakhs)</span> <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-slate-500 font-medium">₹</span>
                <input
                  type="number"
                  step="0.1"
                  placeholder="e.g., 40"
                  className="w-full p-3 pl-8 border border-slate-200 rounded-xl focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 bg-slate-50/40"
                  value={formData.loanAmount}
                  onChange={(e) => setFormData({...formData, loanAmount: e.target.value})}
                />
              </div>
            </div>

            {/* Two Column: Duration & University Tier */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  📅 Course Duration
                </label>
                <select
                  className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50/40 focus:border-indigo-400 focus:outline-none"
                  value={formData.courseDuration}
                  onChange={(e) => setFormData({...formData, courseDuration: e.target.value})}
                >
                  <option value="1">1 Year</option>
                  <option value="2">2 Years</option>
                  <option value="3">3+ Years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  🏛️ University Tier
                </label>
                <select
                  className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50/40 focus:border-indigo-400 focus:outline-none"
                  value={formData.universityTier}
                  onChange={(e) => setFormData({...formData, universityTier: e.target.value})}
                >
                  <option value="Tier 1">Tier 1 (Ivy / IIT / Top Global)</option>
                  <option value="Tier 2">Tier 2 (Reputed National/International)</option>
                  <option value="Tier 3">Tier 3 (Emerging / Regional)</option>
                </select>
              </div>
            </div>

            {/* Check Eligibility Button */}
            <button
              onClick={checkEligibility}
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-700 to-indigo-600 hover:from-indigo-800 hover:to-indigo-700 text-white py-3.5 rounded-xl font-bold text-lg shadow-md flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <DollarSign size={20} />
                  Check Eligibility
                </>
              )}
            </button>
            <p className="text-xs text-slate-400 text-center pt-1">
              *Fields with asterisk are mandatory for accurate AI underwriting
            </p>
          </div>
        </div>

        {/* Right Panel: Dynamic Eligibility Result */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 duration-300">
          <div className="border-b border-slate-100 bg-slate-50/60 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <Award size={22} className="text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">🎯 Eligibility Verdict</h2>
            </div>
          </div>
          <div className="p-6 md:p-7 transition-all duration-300">
            {!eligibility ? (
              // Placeholder state
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-indigo-50 rounded-full p-4 mb-4">
                  <CreditCard size={44} className="text-indigo-600" />
                </div>
                <p className="text-slate-500 font-medium">Awaiting assessment</p>
                <p className="text-sm text-slate-400 mt-1 max-w-xs">
                  Complete the loan application form and click "Check Eligibility" to receive a professional underwriting analysis.
                </p>
              </div>
            ) : (
              // Results Display
              <div>
                {/* Eligibility Badge */}
                <div className="text-center mb-6">
                  {eligibility.eligible ? (
                    <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-5 py-2.5 rounded-full shadow-sm border border-emerald-200">
                      <CheckCircle size={20} className="text-emerald-600" />
                      <span className="font-bold">Pre-Approved</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 bg-red-50 text-red-800 px-5 py-2.5 rounded-full shadow-sm border border-red-200">
                      <XCircle size={20} className="text-red-600" />
                      <span className="font-bold">Under Review / Not Eligible</span>
                    </div>
                  )}
                </div>

                {/* Financial Details */}
                <div className="bg-slate-50 rounded-xl p-5 space-y-3 border border-slate-100">
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="font-medium text-slate-700 flex items-center gap-2">
                      <Building size={16} /> Max Eligible Loan:
                    </span>
                    <span className="font-extrabold text-indigo-700 text-xl">
                      ₹{eligibility.maxLoanAmount} lakhs
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="font-medium text-slate-700 flex items-center gap-2">
                      <TrendingUp size={16} /> Interest Rate (p.a.):
                    </span>
                    <span className="font-bold text-slate-800">{eligibility.interestRate}%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="font-medium text-slate-700 flex items-center gap-2">
                      <Shield size={16} /> Margin Money:
                    </span>
                    <span className="font-semibold text-slate-800">{eligibility.marginMoney}%</span>
                  </div>
                </div>

                {/* Required Documents */}
                <div className="mt-5">
                  <p className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                    <FileText size={16} className="text-indigo-600" />
                    Required Documentation
                  </p>
                  <ul className="text-sm space-y-2 ml-1">
                    {eligibility.requiredDocuments.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-600">
                        <span className="text-indigo-500 text-base">▹</span> {doc}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suggestions */}
                <div className="mt-6 p-4 bg-indigo-50/50 rounded-xl border-l-4 border-indigo-500 shadow-sm">
                  <p className="text-sm text-indigo-900 font-medium flex gap-2 items-start">
                    <span className="text-indigo-600 mt-0.5">💡</span>
                    <span>{eligibility.suggestions}</span>
                  </p>
                </div>

                {/* Apply Button for eligible cases */}
                {eligibility.eligible && (
                  <button
                    onClick={handleApplyNow}
                    className="mt-6 w-full bg-indigo-700 hover:bg-indigo-800 text-white py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    ✨ Proceed to Application →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer brand note */}
      <div className="mt-12 text-center border-t border-slate-200/70 pt-6">
        <p className="text-slate-500 text-sm">
          🔍 <span className="font-semibold text-indigo-800">EduSmart AI Study Assistant</span> — Intelligent loan eligibility with real-time margin & document insights. Secure & confidential.
        </p>
      </div>
    </div>
  );
};

export default LoanEligibility;