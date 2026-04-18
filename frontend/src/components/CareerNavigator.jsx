import React, { useState } from 'react';
import { 
  Compass, TrendingUp, Award, Calendar as CalendarIcon, Loader,
  MapPin, Tag, CheckCircle, HandHelping, Lightbulb, Gift, 
  User, Briefcase, Globe, Target, PlayCircle, Brain, 
  Trophy, Info, X, Clock, Sparkles, Star, GraduationCap,
  DollarSign, Heart, ArrowRight, Zap, Shield, BookOpen
} from 'lucide-react';
import toast from 'react-hot-toast';

// Expanded University Database
const universitiesDB = [
  { name: "Massachusetts Institute of Technology (MIT)", country: "USA", costLakhs: 55, minScore: 88, deadline: "Dec 15", roi: "$130k avg starting salary", scholarships: "Need-blind, up to 100%", partTimeWork: "$15-25/hr" },
  { name: "Stanford University", country: "USA", costLakhs: 58, minScore: 86, deadline: "Jan 5", roi: "$145k avg starting salary", scholarships: "Knight-Hennessy, need-based", partTimeWork: "$18-30/hr" },
  { name: "Harvard University", country: "USA", costLakhs: 56, minScore: 89, deadline: "Jan 1", roi: "$140k avg starting salary", scholarships: "Generous need-based aid", partTimeWork: "$15-25/hr" },
  { name: "University of Cambridge", country: "UK", costLakhs: 45, minScore: 85, deadline: "Mar 31", roi: "£65k avg salary", scholarships: "Gates Cambridge, Commonwealth", partTimeWork: "£12-18/hr" },
  { name: "University of Oxford", country: "UK", costLakhs: 48, minScore: 87, deadline: "Jan 19", roi: "£68k avg salary", scholarships: "Rhodes, Clarendon", partTimeWork: "£12-18/hr" },
  { name: "Imperial College London", country: "UK", costLakhs: 50, minScore: 86, deadline: "Jan 31", roi: "£70k avg salary", scholarships: "President's Scholarships", partTimeWork: "£14-20/hr" },
  { name: "University of Toronto", country: "Canada", costLakhs: 32, minScore: 82, deadline: "Feb 1", roi: "CAD $85k avg salary", scholarships: "Lester B. Pearson", partTimeWork: "CAD $16-22/hr" },
  { name: "University of British Columbia", country: "Canada", costLakhs: 30, minScore: 80, deadline: "Jan 31", roi: "CAD $80k avg salary", scholarships: "International Scholars Program", partTimeWork: "CAD $15-20/hr" },
  { name: "McGill University", country: "Canada", costLakhs: 28, minScore: 81, deadline: "Feb 15", roi: "CAD $78k avg salary", scholarships: "McGill Entrance Scholarship", partTimeWork: "CAD $15-20/hr" },
  { name: "University of Melbourne", country: "Australia", costLakhs: 35, minScore: 78, deadline: "Apr 30", roi: "AUD $90k avg salary", scholarships: "Melbourne International", partTimeWork: "AUD $21-28/hr" },
  { name: "Australian National University", country: "Australia", costLakhs: 34, minScore: 80, deadline: "May 15", roi: "AUD $88k avg salary", scholarships: "ANU Chancellor's", partTimeWork: "AUD $21-28/hr" },
  { name: "Technical University of Munich", country: "Germany", costLakhs: 12, minScore: 75, deadline: "Mar 15", roi: "€65k avg salary", scholarships: "DAAD, Deutschlandstipendium", partTimeWork: "€12-18/hr" },
  { name: "LMU Munich", country: "Germany", costLakhs: 10, minScore: 73, deadline: "Jul 1", roi: "€62k avg salary", scholarships: "DAAD scholarships", partTimeWork: "€12-16/hr" },
  { name: "Heidelberg University", country: "Germany", costLakhs: 11, minScore: 74, deadline: "Jun 15", roi: "€60k avg salary", scholarships: "Heidelberg Excellence", partTimeWork: "€11-15/hr" },
  { name: "RWTH Aachen", country: "Germany", costLakhs: 11, minScore: 74, deadline: "Mar 1", roi: "€63k avg salary", scholarships: "RWTH International", partTimeWork: "€12-17/hr" },
  { name: "National University of Singapore", country: "Singapore", costLakhs: 42, minScore: 84, deadline: "Dec 30", roi: "SGD $85k avg salary", scholarships: "NUS Global Merit", partTimeWork: "SGD $12-18/hr" },
  { name: "Nanyang Technological University", country: "Singapore", costLakhs: 40, minScore: 83, deadline: "Jan 15", roi: "SGD $82k avg salary", scholarships: "NTU Scholarship", partTimeWork: "SGD $12-18/hr" },
  { name: "University of Amsterdam", country: "Netherlands", costLakhs: 18, minScore: 76, deadline: "Apr 1", roi: "€55k avg salary", scholarships: "Amsterdam Merit", partTimeWork: "€12-16/hr" },
  { name: "KU Leuven", country: "Belgium", costLakhs: 8, minScore: 72, deadline: "Mar 1", roi: "€58k avg salary", scholarships: "Science@Leuven", partTimeWork: "€11-15/hr" },
  { name: "University of Copenhagen", country: "Denmark", costLakhs: 9, minScore: 73, deadline: "Mar 15", roi: "€60k avg salary", scholarships: "Danish Government Scholarships", partTimeWork: "€13-18/hr" }
];

const CareerNavigator = () => {
  const [interest, setInterest] = useState('Computer Science');
  const [budget, setBudget] = useState('30');
  const [academicScore, setAcademicScore] = useState('70');
  const [preferredCountry, setPreferredCountry] = useState('Any');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUni, setSelectedUni] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const countries = ['Any', 'USA', 'UK', 'Canada', 'Australia', 'Germany', 'Singapore', 'Netherlands', 'Belgium', 'Denmark'];

  const assessFinancialSituation = (costLakhs, userBudgetLakhs) => {
    const gap = costLakhs - userBudgetLakhs;
    
    if (userBudgetLakhs >= costLakhs) {
      return {
        status: 'within_budget',
        badge: 'Within Budget',
        badgeClass: 'bg-emerald-100 text-emerald-800',
        message: `Your budget covers the full estimated cost. No loan needed!`,
        loanRequired: 0,
        monthlyEmi: 0,
        recommendation: 'Direct admission - financially comfortable'
      };
    } else if (gap <= 15) {
      return {
        status: 'small_gap',
        badge: 'Small Gap - Easy Loan',
        badgeClass: 'bg-amber-100 text-amber-800',
        message: `Only ₹${gap}L additional needed. High approval chance for education loan.`,
        loanRequired: gap,
        monthlyEmi: Math.round(gap * 1100),
        recommendation: 'Education loan easily approved'
      };
    } else if (gap <= 35) {
      return {
        status: 'medium_gap',
        badge: 'Loan + Part-time Work',
        badgeClass: 'bg-blue-100 text-blue-800',
        message: `₹${gap}L loan needed. Part-time work can help with living expenses.`,
        loanRequired: gap,
        monthlyEmi: Math.round(gap * 1100),
        recommendation: 'Combine education loan with part-time work'
      };
    } else {
      return {
        status: 'large_gap',
        badge: 'Scholarship Opportunity',
        badgeClass: 'bg-purple-100 text-purple-800',
        message: `₹${gap}L gap. Many students get 20-50% scholarships at this university.`,
        loanRequired: gap,
        monthlyEmi: Math.round(gap * 1100),
        recommendation: 'Apply for scholarships first'
      };
    }
  };

  const getCardClass = (financial) => {
    if (financial.status === 'within_budget') return 'border-l-4 border-emerald-500 hover:shadow-emerald-100/50';
    if (financial.status === 'small_gap' || financial.status === 'medium_gap') return 'border-l-4 border-blue-500 hover:shadow-blue-100/50';
    return 'border-l-4 border-purple-500 hover:shadow-purple-100/50';
  };

  const getProbClass = (prob) => {
    if (prob === 'High') return 'bg-emerald-100 text-emerald-700';
    if (prob === 'Medium') return 'bg-amber-100 text-amber-700';
    return 'bg-rose-100 text-rose-700';
  };

  const getProbText = (prob) => {
    if (prob === 'High') return 'High Chance';
    if (prob === 'Medium') return 'Medium Chance';
    return 'Low Chance';
  };

  const getRecommendations = async () => {
    if (!interest.trim()) {
      toast.error('Please enter your field of interest');
      return;
    }
    
    setLoading(true);
    setRecommendations([]);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const scoreNum = parseFloat(academicScore) || 70;
    const budgetNum = parseFloat(budget) || 30;
    const interestLower = interest.toLowerCase();
    
    let filtered = [...universitiesDB];
    
    if (preferredCountry && preferredCountry !== 'Any') {
      filtered = filtered.filter(uni => uni.country === preferredCountry);
    }
    
    const recommendationsList = filtered.map(uni => {
      let admissionProb = '';
      if (scoreNum >= uni.minScore) admissionProb = 'High';
      else if (scoreNum >= uni.minScore - 10) admissionProb = 'Medium';
      else admissionProb = 'Low';
      
      const financial = assessFinancialSituation(uni.costLakhs, budgetNum);
      
      let bestCourse = "Graduate Program";
      if (interestLower.includes('computer') || interestLower.includes('cs') || interestLower.includes('data')) {
        bestCourse = "Computer Science / Data Science";
      } else if (interestLower.includes('business') || interestLower.includes('mba')) {
        bestCourse = "MBA / Business Analytics";
      } else if (interestLower.includes('engineer')) {
        bestCourse = "Engineering / Robotics";
      } else if (interestLower.includes('finance')) {
        bestCourse = "Finance / Economics";
      }
      
      return {
        name: uni.name,
        country: uni.country,
        costLakhs: uni.costLakhs,
        minScore: uni.minScore,
        deadline: uni.deadline,
        roi: uni.roi,
        scholarships: uni.scholarships,
        partTimeWork: uni.partTimeWork,
        course: bestCourse,
        admissionProbability: admissionProb,
        financial: financial,
        matchScore: scoreNum >= uni.minScore ? 100 : (scoreNum / uni.minScore) * 100
      };
    });
    
    recommendationsList.sort((a, b) => {
      const probOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
      const probDiff = probOrder[b.admissionProbability] - probOrder[a.admissionProbability];
      if (probDiff !== 0) return probDiff;
      return a.costLakhs - b.costLakhs;
    });
    
    setRecommendations(recommendationsList);
    setLoading(false);
    toast.success(`Found ${recommendationsList.length} universities matching your profile!`);
  };

  const affordableUnis = recommendations.filter(u => u.financial.status === 'within_budget');
  const manageableUnis = recommendations.filter(u => u.financial.status === 'small_gap' || u.financial.status === 'medium_gap');
  const scholarshipUnis = recommendations.filter(u => u.financial.status === 'large_gap');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-8">
        {/* Header - Premium Light Theme */}
        <div className="relative rounded-2xl p-6 md:p-8 bg-white shadow-lg border border-slate-100 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-2 rounded-2xl shadow-md">
                <GraduationCap size={28} className="text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                AI Career Navigator
              </h1>
            </div>
            <p className="text-slate-600 text-base max-w-2xl">
              Smart university matching with budget analysis, scholarship info & part-time work estimates
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-blue-50 px-3 py-1.5 rounded-full text-xs flex items-center gap-1 text-blue-700">
                <TrendingUp size={12} /> ML Predictions
              </span>
              <span className="bg-blue-50 px-3 py-1.5 rounded-full text-xs flex items-center gap-1 text-blue-700">
                <DollarSign size={12} /> Budget Analysis
              </span>
              <span className="bg-blue-50 px-3 py-1.5 rounded-full text-xs flex items-center gap-1 text-blue-700">
                <HandHelping size={12} /> Loan Assessment
              </span>
              <span className="bg-blue-50 px-3 py-1.5 rounded-full text-xs flex items-center gap-1 text-blue-700">
                <Briefcase size={12} /> Part-time Work
              </span>
            </div>
          </div>
        </div>

        {/* Budget Info Banner - Enhanced */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-5 rounded-r-xl shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Lightbulb size={16} className="text-blue-600" />
            </div>
            <div className="text-sm">
              <p className="font-semibold text-blue-900">💡 Understanding Your Budget of ₹{budget} Lakhs</p>
              <p className="text-blue-800 mt-1 leading-relaxed">
                This is your upfront amount for 1st year fees + living expenses. Many students cover gaps through:
                <span className="font-semibold"> education loans, scholarships (20-100% tuition), and part-time work </span>
                <span className="font-bold text-blue-900">(₹8-15 Lakhs/year)</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Input Form - Enhanced */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-50 to-white px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <User size={18} className="text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Your Profile</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1">
                  <Heart size={14} className="text-rose-500" /> Field of Interest *
                </label>
                <div className={`relative transition-all duration-200 ${focusedField === 'interest' ? 'transform scale-[1.01]' : ''}`}>
                  <input
                    type="text"
                    placeholder="e.g., Computer Science, MBA, Data Science"
                    onFocus={() => setFocusedField('interest')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full p-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1">
                  <DollarSign size={14} className="text-emerald-600" /> Your Budget (INR Lakhs) - 1st Year
                </label>
                <div className={`relative transition-all duration-200 ${focusedField === 'budget' ? 'transform scale-[1.01]' : ''}`}>
                  <input
                    type="number"
                    onFocus={() => setFocusedField('budget')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full p-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">*Your available funds for tuition + living expenses (1st year)</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1">
                  <Globe size={14} className="text-sky-600" /> Preferred Country
                </label>
                <select
                  className="w-full p-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition bg-white"
                  value={preferredCountry}
                  onChange={(e) => setPreferredCountry(e.target.value)}
                >
                  {countries.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1">
                  <Target size={14} className="text-blue-600" /> Academic Score: <span className="font-bold text-blue-700">{academicScore}</span>%
                </label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  step="1"
                  value={academicScore}
                  onChange={(e) => setAcademicScore(e.target.value)}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>

            <div className="mt-8 mb-2">
              <button
                onClick={getRecommendations}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-lg disabled:opacity-50 transition-all hover:shadow-xl group"
              >
                {loading ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    Analyzing {universitiesDB.length}+ universities...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} className="group-hover:rotate-12 transition" />
                    Run AI Recommendation Engine
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {loading && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-slate-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Brain size={32} className="text-blue-600 animate-pulse" />
            </div>
            <p className="text-slate-600 font-medium">AI is analyzing {universitiesDB.length} universities based on your profile...</p>
          </div>
        )}

        {recommendations.length > 0 && !loading && (
          <div>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
              <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Trophy size={18} className="text-amber-600" />
                </div>
                Your Matches ({recommendations.length} Universities)
              </h2>
              <span className="text-sm text-slate-500 flex items-center gap-1">
                <Info size={14} /> Click any card for details
              </span>
            </div>

            {affordableUnis.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle size={14} className="text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-emerald-700">Within Your Budget ({affordableUnis.length})</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {affordableUnis.map((uni, idx) => (
                    <UniversityCard
                      key={idx}
                      uni={uni}
                      onClick={() => setSelectedUni(uni)}
                      getCardClass={getCardClass}
                      getProbClass={getProbClass}
                      getProbText={getProbText}
                    />
                  ))}
                </div>
              </div>
            )}

            {manageableUnis.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <HandHelping size={14} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-blue-700">Manageable with Loan + Part-time Work ({manageableUnis.length})</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {manageableUnis.map((uni, idx) => (
                    <UniversityCard
                      key={idx}
                      uni={uni}
                      onClick={() => setSelectedUni(uni)}
                      getCardClass={getCardClass}
                      getProbClass={getProbClass}
                      getProbText={getProbText}
                    />
                  ))}
                </div>
              </div>
            )}

            {scholarshipUnis.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <Award size={14} className="text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-purple-700">Scholarship Opportunities ({scholarshipUnis.length})</h3>
                </div>
                <p className="text-sm text-slate-600 mb-3 ml-8">
                  These universities offer generous scholarships. Many students get 20-100% tuition coverage!
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {scholarshipUnis.map((uni, idx) => (
                    <UniversityCard
                      key={idx}
                      uni={uni}
                      onClick={() => setSelectedUni(uni)}
                      getCardClass={getCardClass}
                      getProbClass={getProbClass}
                      getProbText={getProbText}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal */}
        {selectedUni && (
          <UniversityModal uni={selectedUni} onClose={() => setSelectedUni(null)} getProbClass={getProbClass} getProbText={getProbText} />
        )}
      </div>
    </div>
  );
};

// University Card Component - Premium
const UniversityCard = ({ uni, onClick, getCardClass, getProbClass, getProbText }) => {
  return (
    <div
      onClick={onClick}
      className={`group bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${getCardClass(uni.financial)}`}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{uni.name}</h3>
            <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
              <MapPin size={12} /> {uni.country}
            </p>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getProbClass(uni.admissionProbability)}`}>
            {getProbText(uni.admissionProbability)}
          </span>
        </div>
        <div className="flex justify-between text-sm mb-3">
          <span className="flex items-center gap-1 text-slate-600"><Tag size={12} className="text-emerald-600" />₹{uni.costLakhs}L/year</span>
          <span className="flex items-center gap-1 text-slate-600"><CalendarIcon size={12} />{uni.deadline}</span>
        </div>
        <div className={`p-2 rounded-lg text-xs font-semibold ${uni.financial.badgeClass} mb-2 inline-block`}>
          {uni.financial.status === 'within_budget' ? '✓ ' : '📊 '}{uni.financial.badge}
        </div>
        <p className="text-xs text-slate-500 mt-2">{uni.financial.message.substring(0, 80)}...</p>
        <div className="mt-3 flex items-center gap-1 text-blue-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition">
          View Details <ArrowRight size={12} />
        </div>
      </div>
    </div>
  );
};

// University Modal Component - Premium
const UniversityModal = ({ uni, onClose, getProbClass, getProbText }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn" onClick={(e) => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 rounded-t-2xl border-b border-slate-100 flex justify-between items-center sticky top-0">
          <h3 className="text-xl font-bold text-slate-800">{uni.name}</h3>
          <button onClick={onClose} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 transition shadow-sm">
            <X size={16} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><span className="font-semibold text-slate-600">Country:</span></div><div className="text-slate-800 font-medium">{uni.country}</div>
            <div><span className="font-semibold text-slate-600">Course:</span></div><div className="text-slate-800 font-medium">{uni.course}</div>
            <div><span className="font-semibold text-slate-600">Admission Chance:</span></div>
            <div><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getProbClass(uni.admissionProbability)}`}>{getProbText(uni.admissionProbability)}</span></div>
            <div><span className="font-semibold text-slate-600">Annual Cost:</span></div><div className="text-slate-800 font-medium">₹{uni.costLakhs} Lakhs</div>
            <div><span className="font-semibold text-slate-600">Deadline:</span></div><div className="text-slate-800 font-medium">{uni.deadline}</div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
            <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
              <HandHelping size={16} /> Financial Assessment
            </h4>
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold text-slate-600">Status:</span> <span className={`px-2 py-0.5 rounded text-xs font-semibold ${uni.financial.badgeClass}`}>{uni.financial.badge}</span></p>
              <p className="text-slate-700">{uni.financial.message}</p>
              {uni.financial.loanRequired > 0 && (
                <>
                  <p className="text-slate-700"><span className="font-semibold text-slate-600">Loan Required:</span> ₹{uni.financial.loanRequired} Lakhs</p>
                  <p className="text-slate-700"><span className="font-semibold text-slate-600">Monthly EMI (5 years):</span> ~₹{uni.financial.monthlyEmi.toLocaleString()}</p>
                </>
              )}
              <p className="text-slate-700"><span className="font-semibold text-slate-600">Part-time Work:</span> {uni.partTimeWork}</p>
              <p className="text-emerald-700 font-semibold mt-2">💡 {uni.financial.recommendation}</p>
            </div>
          </div>

          <div className="bg-amber-50 p-3 rounded-xl">
            <p className="text-sm flex items-start gap-2 text-amber-800">
              <Gift size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <span><span className="font-semibold">Scholarships:</span> {uni.scholarships}</span>
            </p>
          </div>

          <div className="bg-emerald-50 p-3 rounded-xl">
            <p className="text-sm flex items-start gap-2 text-emerald-800">
              <TrendingUp size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><span className="font-semibold">Expected ROI:</span> {uni.roi}</span>
            </p>
          </div>
        </div>
        <div className="px-6 pb-6">
          <button onClick={onClose} className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-[1.02]">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerNavigator;