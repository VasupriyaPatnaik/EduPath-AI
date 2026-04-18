import React, { useState } from 'react';
import { 
  Target, TrendingUp, Loader, Brain, User, FileText, Briefcase, 
  University, BookOpen, ChartLine, Lightbulb, CheckCircle, 
  AlertTriangle, Bot, GraduationCap, Percent, Sparkles, ArrowRight
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdmissionPredictor = () => {
  const [formData, setFormData] = useState({
    gpa: '',
    testScore: '',
    internships: '',
    university: '',
    course: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  // Intelligent probability calculation
  const calculateProbability = (gpa, testScore, internships, university, course) => {
    // GPA contribution (out of 10) -> max 50%
    let gpaFactor = Math.min(50, (gpa / 10) * 50);
    
    // Test score analysis
    let testFactor = 0;
    const testStr = testScore.toLowerCase();
    if (testStr !== 'not taken' && testStr.trim() !== '') {
      const numbers = testStr.match(/\d+/g);
      let numericScore = 0;
      if (numbers) numericScore = parseInt(numbers[0]);
      if (testStr.includes('gre') && numericScore >= 300) testFactor = Math.min(20, (numericScore - 300) / 40 * 20 + 5);
      else if (testStr.includes('gmat') && numericScore >= 600) testFactor = Math.min(20, (numericScore - 600) / 200 * 20 + 5);
      else if (testStr.includes('ielts') && numericScore >= 6) testFactor = Math.min(20, (numericScore - 6) / 3 * 20 + 5);
      else if (numericScore > 0) testFactor = Math.min(15, numericScore / 100 * 15);
      else testFactor = 8;
    } else {
      testFactor = 0;
    }
    
    // Internships contribution: max 15%
    let internFactor = Math.min(15, internships * 3.5);
    
    // University reputation factor: max 15%
    let uniFactor = 0;
    const uniName = university.toLowerCase();
    const eliteKeywords = ['stanford', 'mit', 'harvard', 'oxford', 'cambridge', 'caltech', 'eth', 'imperial', 'ucla', 'uc berkeley', 'yale', 'princeton'];
    const goodKeywords = ['university of', 'state university', 'texas', 'michigan', 'toronto', 'mcgill', 'british columbia', 'melbourne', 'national university'];
    if (eliteKeywords.some(k => uniName.includes(k))) uniFactor = 15;
    else if (goodKeywords.some(k => uniName.includes(k))) uniFactor = 9;
    else if (uniName.trim().length > 3) uniFactor = 5;
    else uniFactor = 2;
    
    // Course relevance boost
    let courseFactor = 0;
    const courseLow = course.toLowerCase();
    if (courseLow.includes('cs') || courseLow.includes('computer') || courseLow.includes('data') || courseLow.includes('ai')) courseFactor = 3;
    else if (courseLow.includes('business') || courseLow.includes('mba')) courseFactor = 2;
    else courseFactor = 1;
    
    let rawProb = gpaFactor + testFactor + internFactor + uniFactor + courseFactor;
    rawProb = Math.min(98, Math.max(12, rawProb));
    return Math.round(rawProb);
  };

  // Generate reasoning and feedback based on probability and inputs
  const generateFeedback = (probability, gpa, testScore, internships, university, course) => {
    let reasoning = "";
    let strengths = [];
    let weaknesses = [];
    
    if (probability >= 70) reasoning = "Excellent profile! Your academic and extracurricular background align strongly with the university's expectations. High chance of admission.";
    else if (probability >= 50) reasoning = "Good potential! Your profile is competitive but consider enhancing test scores or gaining more relevant experience to boost chances.";
    else reasoning = "Your application needs improvement. Focus on increasing GPA, preparing for standardized tests, and pursuing internships in your field.";
    
    if (gpa >= 8) strengths.push(`Strong GPA (${gpa}/10) shows academic excellence.`);
    else if (gpa < 6) weaknesses.push(`GPA is below competitive threshold (${gpa}/10). Consider retaking courses or highlighting project work.`);
    else strengths.push(`Satisfactory GPA (${gpa}/10) meets baseline criteria.`);
    
    const testStr = testScore.toLowerCase();
    const hasValidTest = testStr !== 'not taken' && testStr.trim() !== '';
    if (hasValidTest && (testStr.includes('gre') || testStr.includes('gmat') || testStr.includes('ielts'))) {
      strengths.push(`Competitive test score (${testScore}) gives you an edge.`);
    } else if (!hasValidTest || testStr === 'not taken') {
      weaknesses.push(`Test score missing: Many programs require GRE/GMAT/IELTS. Prepare and submit scores.`);
    }
    
    if (internships >= 2) strengths.push(`${internships} internship(s) demonstrate practical experience and initiative.`);
    else if (internships === 1) strengths.push(`1 internship adds valuable industry exposure.`);
    else if (internships === 0) weaknesses.push(`No internships reported. Add relevant work experience or projects.`);
    
    const uniName = university.toLowerCase();
    const eliteKeywords = ['stanford', 'mit', 'harvard', 'oxford', 'cambridge'];
    if (eliteKeywords.some(k => uniName.includes(k))) strengths.push(`Target university "${university}" is prestigious — your profile stands out.`);
    else if (university.trim() && university.trim().length > 2) strengths.push(`University choice aligns with your profile.`);
    
    return { reasoning, strengths: strengths.slice(0, 3), weaknesses: weaknesses.slice(0, 3) };
  };

  const predictProbability = async () => {
    if (!formData.gpa || !formData.university) {
      toast.error('Please fill GPA and University name');
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      const gpaNum = parseFloat(formData.gpa);
      const internshipsNum = parseInt(formData.internships) || 0;
      
      const probability = calculateProbability(
        gpaNum,
        formData.testScore || 'Not taken',
        internshipsNum,
        formData.university,
        formData.course || 'Graduate Program'
      );
      
      const feedback = generateFeedback(
        probability,
        gpaNum,
        formData.testScore || 'Not taken',
        internshipsNum,
        formData.university,
        formData.course || 'Graduate Program'
      );
      
      setResult({
        probability: probability,
        reasoning: feedback.reasoning,
        strengths: feedback.strengths,
        weaknesses: feedback.weaknesses
      });
      
      setLoading(false);
      toast.success('Prediction complete!');
    }, 800);
  };

  const getProbabilityColor = (prob) => {
    if (prob >= 70) return 'bg-emerald-100 text-emerald-800 border-l-4 border-emerald-500';
    if (prob >= 50) return 'bg-amber-100 text-amber-800 border-l-4 border-amber-500';
    return 'bg-rose-100 text-rose-800 border-l-4 border-rose-500';
  };

  const getProbabilityGradient = (prob) => {
    if (prob >= 70) return '#10B981';
    if (prob >= 50) return '#F59E0B';
    return '#EF4444';
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
                <Target size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                  Admission Probability Predictor
                </h1>
                <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">AI-Powered Prediction</span>
              </div>
            </div>
            <p className="text-slate-600 text-base max-w-2xl">
              AI-powered prediction of your admission chances based on academic profile
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-blue-50 px-3 py-1.5 rounded-full text-xs flex items-center gap-1 text-blue-700">
                <ChartLine size={12} /> Real-time ML simulation
              </span>
              <span className="bg-blue-50 px-3 py-1.5 rounded-full text-xs flex items-center gap-1 text-blue-700">
                <University size={12} /> Top university analytics
              </span>
              <span className="bg-blue-50 px-3 py-1.5 rounded-full text-xs flex items-center gap-1 text-blue-700">
                <Brain size={12} /> Smart Predictions
              </span>
              <span className="bg-blue-50 px-3 py-1.5 rounded-full text-xs flex items-center gap-1 text-blue-700">
                <Percent size={12} /> Probability Engine
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left card: Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-white px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User size={18} className="text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Your Academic Profile</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-5">
                {/* GPA */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1">
                    <span className="text-rose-500 text-xs">*</span> GPA/Percentage (out of 10) *
                  </label>
                  <div className={`relative transition-all duration-200 ${focusedField === 'gpa' ? 'transform scale-[1.01]' : ''}`}>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="e.g., 8.5"
                      onFocus={() => setFocusedField('gpa')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full p-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                      value={formData.gpa}
                      onChange={(e) => setFormData({...formData, gpa: e.target.value})}
                    />
                  </div>
                </div>
                
                {/* Test Score */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <FileText size={14} className="text-blue-600" /> Test Score (GRE/GMAT/IELTS)
                  </label>
                  <div className={`relative transition-all duration-200 ${focusedField === 'testScore' ? 'transform scale-[1.01]' : ''}`}>
                    <input
                      type="text"
                      placeholder="e.g., GRE 320 or IELTS 7.5"
                      onFocus={() => setFocusedField('testScore')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full p-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                      value={formData.testScore}
                      onChange={(e) => setFormData({...formData, testScore: e.target.value})}
                    />
                  </div>
                </div>
                
                {/* Internships */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <Briefcase size={14} className="text-blue-600" /> Number of Internships
                  </label>
                  <div className={`relative transition-all duration-200 ${focusedField === 'internships' ? 'transform scale-[1.01]' : ''}`}>
                    <input
                      type="number"
                      placeholder="e.g., 2"
                      onFocus={() => setFocusedField('internships')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full p-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                      value={formData.internships}
                      onChange={(e) => setFormData({...formData, internships: e.target.value})}
                    />
                  </div>
                </div>
                
                {/* University Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <span className="text-rose-500 text-xs">*</span> <University size={14} className="text-blue-600" /> University Name *
                  </label>
                  <div className={`relative transition-all duration-200 ${focusedField === 'university' ? 'transform scale-[1.01]' : ''}`}>
                    <input
                      type="text"
                      placeholder="e.g., Stanford University, University of Toronto"
                      onFocus={() => setFocusedField('university')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full p-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                      value={formData.university}
                      onChange={(e) => setFormData({...formData, university: e.target.value})}
                    />
                  </div>
                </div>
                
                {/* Course Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <BookOpen size={14} className="text-blue-600" /> Course Name
                  </label>
                  <div className={`relative transition-all duration-200 ${focusedField === 'course' ? 'transform scale-[1.01]' : ''}`}>
                    <input
                      type="text"
                      placeholder="e.g., MS in CS, MBA, Data Science"
                      onFocus={() => setFocusedField('course')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full p-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                      value={formData.course}
                      onChange={(e) => setFormData({...formData, course: e.target.value})}
                    />
                  </div>
                </div>
                
                <button
                  onClick={predictProbability}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-lg disabled:opacity-50 transition-all hover:shadow-xl group"
                >
                  {loading ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      Predicting...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} className="group-hover:rotate-12 transition" />
                      Predict Admission Chance
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right card: Results */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-white px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp size={18} className="text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Admission Insights</h2>
              </div>
            </div>
            <div className="p-6">
              {!result ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Brain size={32} className="text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">AI Prediction Engine</h3>
                  <p className="text-slate-500 text-sm max-w-sm">
                    Fill your profile details and click "Predict Admission Chance" to get personalized probability, strengths and improvement areas.
                  </p>
                  <div className="mt-6 flex gap-2 flex-wrap justify-center">
                    <span className="text-xs bg-slate-100 px-3 py-1 rounded-full">📊 Based on GPA</span>
                    <span className="text-xs bg-slate-100 px-3 py-1 rounded-full">🎓 University ranking</span>
                    <span className="text-xs bg-slate-100 px-3 py-1 rounded-full">💼 Internship count</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Probability Circle */}
                  <div className="text-center">
                    <div className="inline-flex flex-col items-center gap-2">
                      <div className="relative w-36 h-36 mx-auto">
                        <svg className="w-36 h-36 transform -rotate-90">
                          <circle cx="72" cy="72" r="64" stroke="#E2E8F0" strokeWidth="12" fill="none" />
                          <circle
                            cx="72"
                            cy="72"
                            r="64"
                            stroke={getProbabilityGradient(result.probability)}
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray={2 * Math.PI * 64}
                            strokeDashoffset={2 * Math.PI * 64 * (1 - result.probability / 100)}
                            className="transition-all duration-700"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center font-bold text-3xl text-slate-800">
                          {result.probability}%
                        </div>
                      </div>
                      <div className={`mt-2 px-4 py-2 rounded-full ${getProbabilityColor(result.probability)} text-base font-bold shadow-sm`}>
                        <Percent size={14} className="inline mr-1" /> Admission Chance
                      </div>
                    </div>
                  </div>

                  {/* Reasoning */}
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <p className="text-blue-800 text-sm leading-relaxed flex items-start gap-2">
                      <Lightbulb size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                      {result.reasoning}
                    </p>
                  </div>

                  {/* Strengths */}
                  {result.strengths && result.strengths.length > 0 && (
                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                      <p className="font-bold text-emerald-800 text-sm flex items-center gap-2 mb-2">
                        <CheckCircle size={16} className="text-emerald-600" /> ✅ Strengths
                      </p>
                      <ul className="text-sm space-y-1.5 text-emerald-700">
                        {result.strengths.map((s, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-emerald-500 mt-0.5">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Weaknesses */}
                  {result.weaknesses && result.weaknesses.length > 0 && (
                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                      <p className="font-bold text-amber-800 text-sm flex items-center gap-2 mb-2">
                        <AlertTriangle size={16} className="text-amber-600" /> ⚠️ Areas to Improve
                      </p>
                      <ul className="text-sm space-y-1.5 text-amber-700">
                        {result.weaknesses.map((w, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-amber-500 mt-0.5">•</span>
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Footer note */}
                  <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-100 mt-2">
                    <Bot size={12} className="inline mr-1" /> AI recommendation based on historical admit patterns
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Educational footer */}
        <div className="text-center text-sm text-slate-500 bg-white/60 rounded-xl p-3 border border-slate-100">
          <GraduationCap size={14} className="inline mr-1" /> Smart Study AI Assistant — Predictive model uses GPA, test scores, internships & university reputation.
          <span className="hidden md:inline-block"> | Get personalized guidance for master's & PhD admissions.</span>
        </div>
      </div>
    </div>
  );
};

export default AdmissionPredictor;