import React, { useState } from 'react';
import { 
  FileText, CheckCircle, XCircle, DollarSign, 
  TrendingUp, Shield, Award, Building, Calendar,
  AlertCircle, CreditCard, Users, BookOpen, Globe,
  Sparkles, ArrowRight, Loader, HandHelping, Lightbulb
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
  const [focusedField, setFocusedField] = useState(null);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-8">
        
        {/* Header - Matching CareerNavigator */}
        <div className="relative rounded-2xl p-6 md:p-8 bg-white shadow-lg border border-slate-100 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-2 rounded-2xl shadow-md">
                <Shield size={28} className="text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Education Loan Eligibility
              </h1>
            </div>
            <p className="text-slate-600 text-base max-w-2xl">
              Professional underwriting analysis • Real-time eligibility • Personalized loan offers for global education
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-blue-50 px-3 py-1.5 rounded-full text-xs flex items-center gap-1 text-blue-700">
                <TrendingUp size={12} /> Underwriting Analysis
              </span>
              <span className="bg-blue-50 px-3 py-1.5 rounded-full text-xs flex items-center gap-1 text-blue-700">
                <DollarSign size={12} /> Real-time Eligibility
              </span>
              <span className="bg-blue-50 px-3 py-1.5 rounded-full text-xs flex items-center gap-1 text-blue-700">
                <Shield size={12} /> Secure & Confidential
              </span>
              <span className="bg-blue-50 px-3 py-1.5 rounded-full text-xs flex items-center gap-1 text-blue-700">
                <Award size={12} /> Personalized Offers
              </span>
            </div>
          </div>
        </div>

        {/* Two Column Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left Card: Application Details */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-white px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText size={18} className="text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Application Details</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-5">
                {/* Course Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <BookOpen size={14} className="text-blue-600" />
                    Course / Program Name
                  </label>
                  <div className={`relative transition-all duration-200 ${focusedField === 'course' ? 'transform scale-[1.01]' : ''}`}>
                    <input
                      type="text"
                      placeholder="e.g., MSc in Finance, MBA Tech, MS Data Science"
                      onFocus={() => setFocusedField('course')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full p-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                      value={formData.course}
                      onChange={(e) => setFormData({...formData, course: e.target.value})}
                    />
                  </div>
                </div>

                {/* Co-applicant Income */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <Users size={14} className="text-blue-600" />
                    Co-applicant Annual Income <span className="text-blue-600">(INR lakhs)</span> <span className="text-red-500">*</span>
                  </label>
                  <div className={`relative transition-all duration-200 ${focusedField === 'income' ? 'transform scale-[1.01]' : ''}`}>
                    <span className="absolute left-3 top-3 text-slate-500 font-medium">₹</span>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="e.g., 12.5"
                      onFocus={() => setFocusedField('income')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full p-3 pl-8 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                      value={formData.coApplicantIncome}
                      onChange={(e) => setFormData({...formData, coApplicantIncome: e.target.value})}
                    />
                  </div>
                </div>

                {/* Loan Amount Required */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <DollarSign size={14} className="text-blue-600" />
                    Loan Amount Required <span className="text-blue-600">(INR lakhs)</span> <span className="text-red-500">*</span>
                  </label>
                  <div className={`relative transition-all duration-200 ${focusedField === 'loan' ? 'transform scale-[1.01]' : ''}`}>
                    <span className="absolute left-3 top-3 text-slate-500 font-medium">₹</span>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="e.g., 40"
                      onFocus={() => setFocusedField('loan')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full p-3 pl-8 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                      value={formData.loanAmount}
                      onChange={(e) => setFormData({...formData, loanAmount: e.target.value})}
                    />
                  </div>
                </div>

                {/* Two Column: Duration & University Tier */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                      <Calendar size={14} className="text-blue-600" />
                      Course Duration
                    </label>
                    <select
                      className="w-full p-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition bg-white"
                      value={formData.courseDuration}
                      onChange={(e) => setFormData({...formData, courseDuration: e.target.value})}
                    >
                      <option value="1">1 Year</option>
                      <option value="2">2 Years</option>
                      <option value="3">3+ Years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                      <Building size={14} className="text-blue-600" />
                      University Tier
                    </label>
                    <select
                      className="w-full p-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition bg-white"
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
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-lg disabled:opacity-50 transition-all hover:shadow-xl group"
                >
                  {loading ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} className="group-hover:rotate-12 transition" />
                      Check Eligibility
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                    </>
                  )}
                </button>
                <p className="text-xs text-slate-500 text-center pt-1">
                  *Fields with asterisk are mandatory for accurate AI underwriting
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel: Dynamic Eligibility Result */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-white px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Award size={18} className="text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">🎯 Eligibility Verdict</h2>
              </div>
            </div>
            <div className="p-6">
              {!eligibility ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <CreditCard size={32} className="text-blue-600" />
                  </div>
                  <p className="text-slate-600 font-medium">Awaiting assessment</p>
                  <p className="text-sm text-slate-400 mt-1 max-w-xs">
                    Complete the loan application form and click "Check Eligibility" to receive a professional underwriting analysis.
                  </p>
                  <div className="mt-6 flex gap-2 flex-wrap justify-center">
                    <span className="text-xs bg-slate-100 px-3 py-1 rounded-full">🏦 Income Analysis</span>
                    <span className="text-xs bg-slate-100 px-3 py-1 rounded-full">📊 Tier Assessment</span>
                    <span className="text-xs bg-slate-100 px-3 py-1 rounded-full">💰 Loan Calculation</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Eligibility Badge */}
                  <div className="text-center">
                    {eligibility.eligible ? (
                      <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-5 py-2.5 rounded-full shadow-sm border border-emerald-200">
                        <CheckCircle size={20} className="text-emerald-600" />
                        <span className="font-bold">Pre-Approved</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-800 px-5 py-2.5 rounded-full shadow-sm border border-rose-200">
                        <XCircle size={20} className="text-rose-600" />
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
                      <span className="font-extrabold text-blue-700 text-xl">
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
                  <div>
                    <p className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                      <FileText size={16} className="text-blue-600" />
                      Required Documentation
                    </p>
                    <ul className="text-sm space-y-2 ml-1">
                      {eligibility.requiredDocuments.map((doc, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-600">
                          <span className="text-blue-500 text-base">▹</span> {doc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Suggestions */}
                  <div className="bg-blue-50/50 rounded-xl border-l-4 border-blue-500 p-4">
                    <p className="text-sm text-blue-900 font-medium flex gap-2 items-start">
                      <Lightbulb size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>{eligibility.suggestions}</span>
                    </p>
                  </div>

                  {/* Apply Button for eligible cases */}
                  {eligibility.eligible && (
                    <button
                      onClick={handleApplyNow}
                      className="mt-4 w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 group"
                    >
                      ✨ Proceed to Application
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer brand note */}
        <div className="text-center border-t border-slate-200 pt-6 mt-4">
          <p className="text-slate-500 text-sm">
            🔍 <span className="font-semibold text-blue-600">EduPath AI Study Assistant</span> — Intelligent loan eligibility with real-time margin & document insights. Secure & confidential.
          </p>
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

export default LoanEligibility;