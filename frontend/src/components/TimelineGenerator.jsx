import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, CheckCircle, Target, Loader, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const TimelineGenerator = () => {
  const [formData, setFormData] = useState({
    targetIntake: 'Fall (September)',
    currentMonth: new Date().toLocaleString('default', { month: 'long' }),
    testsTaken: 'None'
  });
  const [timeline, setTimeline] = useState(null);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const timelineContentRef = useRef(null);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  
  const intakes = ['Fall (September)', 'Spring (January)', 'Summer (May)'];
  const testOptions = ['None', 'IELTS', 'TOEFL', 'GRE', 'GMAT'];

  // Mock timeline data generator
  const getMockTimeline = (targetIntake, currentMonth, testsTaken) => {
    const currentIndex = months.indexOf(currentMonth);
    const intakeMap = {
      'Fall (September)': 8,
      'Spring (January)': 0,
      'Summer (May)': 4
    };
    const targetIndex = intakeMap[targetIntake];
    
    let monthsNeeded = targetIndex - currentIndex;
    if (monthsNeeded < 0) monthsNeeded += 12;
    
    const timelineData = [];
    let currentIdx = currentIndex;
    const needsTests = testsTaken === 'None';
    
    for (let i = 0; i <= Math.min(monthsNeeded, 8); i++) {
      const monthName = months[currentIdx % 12];
      const tasks = [];
      
      if (i === 0) {
        tasks.push('📝 Research universities and programs');
        if (needsTests) tasks.push('📚 Start preparing for standardized tests');
        tasks.push('💰 Estimate budget and expenses');
      }
      
      if (i === 1) {
        if (needsTests) tasks.push('📖 Register for IELTS/TOEFL/GRE');
        tasks.push('🏦 Start building your academic profile');
        tasks.push('📋 Prepare initial documents list');
      }
      
      if (i === 2) {
        if (needsTests) tasks.push('✅ Take standardized tests');
        tasks.push('📝 Draft Statement of Purpose');
        tasks.push('👨‍🏫 Request recommendation letters');
      }
      
      if (i === 3) {
        tasks.push('📄 Finalize Statement of Purpose');
        tasks.push('🎯 Shortlist 5-8 universities');
        tasks.push('📊 Check application deadlines');
      }
      
      if (i === 4) {
        tasks.push('📝 Start filling applications');
        tasks.push('💳 Pay application fees');
        tasks.push('📎 Upload required documents');
      }
      
      if (i === 5) {
        tasks.push('✅ Submit applications');
        tasks.push('💰 Apply for scholarships');
        tasks.push('📧 Follow up with recommenders');
      }
      
      if (i === 6) {
        tasks.push('⏳ Wait for admission decisions');
        tasks.push('🎓 Apply for housing');
        tasks.push('🛂 Start visa process if accepted');
      }
      
      if (i === 7) {
        tasks.push('📊 Compare offers');
        tasks.push('✅ Accept best offer');
        tasks.push('🏦 Arrange for education loan');
      }
      
      if (i === 8) {
        tasks.push('🛫 Apply for student visa');
        tasks.push('✈️ Book flight tickets');
        tasks.push('🎒 Pack and prepare for departure');
      }
      
      if (tasks.length > 0) {
        timelineData.push({
          month: monthName,
          tasks: tasks
        });
      }
      
      currentIdx++;
    }
    
    return timelineData;
  };

  const generateTimeline = async () => {
    setLoading(true);
    
    setTimeout(() => {
      const timelineData = getMockTimeline(
        formData.targetIntake,
        formData.currentMonth,
        formData.testsTaken
      );
      
      if (timelineData.length === 0) {
        toast.error('Error generating timeline');
        setTimeline(null);
      } else {
        setTimeline(timelineData);
        toast.success('Timeline generated successfully!');
      }
      
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (timeline && timelineContentRef.current) {
      timelineContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [timeline]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-8">
        
        {/* Header - Matching CareerNavigator */}
        <div className="relative rounded-2xl p-6 md:p-8 bg-white shadow-lg border border-slate-100 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-2 rounded-2xl shadow-md">
                <Calendar size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                  Application Timeline Generator
                </h1>
                <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Smart Planning Tool</span>
              </div>
            </div>
            <p className="text-slate-600 text-base max-w-2xl">
              Plan your study abroad journey month by month with AI-powered recommendations
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-blue-50 px-3 py-1.5 rounded-full text-xs flex items-center gap-1 text-blue-700">
                <Calendar size={12} /> Month-by-Month
              </span>
              <span className="bg-blue-50 px-3 py-1.5 rounded-full text-xs flex items-center gap-1 text-blue-700">
                <Target size={12} /> Deadline Tracking
              </span>
              <span className="bg-blue-50 px-3 py-1.5 rounded-full text-xs flex items-center gap-1 text-blue-700">
                <CheckCircle size={12} /> Task Management
              </span>
              <span className="bg-blue-50 px-3 py-1.5 rounded-full text-xs flex items-center gap-1 text-blue-700">
                <Clock size={12} /> Smart Reminders
              </span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-white px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock size={18} className="text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Your Timeline Preferences</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <Target size={14} className="text-blue-600" />
                    Target Intake
                  </label>
                  <div className={`relative transition-all duration-200 ${focusedField === 'targetIntake' ? 'transform scale-[1.01]' : ''}`}>
                    <select
                      onFocus={() => setFocusedField('targetIntake')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full p-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition bg-white"
                      value={formData.targetIntake}
                      onChange={(e) => setFormData({...formData, targetIntake: e.target.value})}
                    >
                      {intakes.map(intake => (
                        <option key={intake} value={intake}>{intake}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <Calendar size={14} className="text-blue-600" />
                    Current Month
                  </label>
                  <div className={`relative transition-all duration-200 ${focusedField === 'currentMonth' ? 'transform scale-[1.01]' : ''}`}>
                    <select
                      onFocus={() => setFocusedField('currentMonth')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full p-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition bg-white"
                      value={formData.currentMonth}
                      onChange={(e) => setFormData({...formData, currentMonth: e.target.value})}
                    >
                      {months.map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <AlertCircle size={14} className="text-blue-600" />
                    Tests Already Taken
                  </label>
                  <div className={`relative transition-all duration-200 ${focusedField === 'testsTaken' ? 'transform scale-[1.01]' : ''}`}>
                    <select
                      onFocus={() => setFocusedField('testsTaken')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full p-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition bg-white"
                      value={formData.testsTaken}
                      onChange={(e) => setFormData({...formData, testsTaken: e.target.value})}
                    >
                      {testOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={generateTimeline}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-lg disabled:opacity-50 transition-all hover:shadow-xl group"
                >
                  {loading ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} className="group-hover:rotate-12 transition" />
                      Generate Timeline
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Timeline Results */}
          <div ref={timelineContentRef}>
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 flex flex-col h-[600px] overflow-hidden">
              {/* Fixed Header */}
              <div className="bg-gradient-to-r from-slate-50 to-white px-6 py-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target size={18} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">Your Application Timeline</h2>
                </div>
              </div>
              
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 pt-4 custom-scroll">
                {loading ? (
                  <div className="flex items-center justify-center h-full min-h-[400px]">
                    <div className="text-center">
                      <div className="spinner"></div>
                      <div className="text-blue-600 font-semibold mt-4">Generating your personalized timeline...</div>
                    </div>
                  </div>
                ) : !timeline ? (
                  <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <Calendar size={32} className="text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">No Timeline Generated Yet</h3>
                    <p className="text-slate-500 text-sm max-w-sm">
                      Fill in your preferences and click "Generate Timeline"
                    </p>
                    <div className="mt-6 flex gap-2 flex-wrap justify-center">
                      <span className="text-xs bg-slate-100 px-3 py-1 rounded-full">📝 Research</span>
                      <span className="text-xs bg-slate-100 px-3 py-1 rounded-full">📚 Tests</span>
                      <span className="text-xs bg-slate-100 px-3 py-1 rounded-full">📄 Applications</span>
                      <span className="text-xs bg-slate-100 px-3 py-1 rounded-full">🛫 Visa</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {timeline.map((phase, idx) => (
                      <div key={idx} className="timeline-item">
                        {idx < timeline.length - 1 && <div className="timeline-connector"></div>}
                        <div className="flex gap-4">
                          <div className="timeline-badge">
                            {idx + 1}
                          </div>
                          <div className="flex-1 bg-slate-50 rounded-xl p-5 border border-slate-100 hover:shadow-md transition-all hover:translate-x-1">
                            <div className="flex items-center gap-2 mb-3">
                              <Calendar size={18} className="text-blue-600" />
                              <h3 className="text-lg font-bold text-blue-800">{phase.month}</h3>
                            </div>
                            <ul className="space-y-2">
                              {phase.tasks.map((task, taskIdx) => (
                                <li key={taskIdx} className="flex items-center gap-2 text-sm text-slate-600 py-1 border-b border-slate-100 last:border-0">
                                  <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />
                                  <span>{task}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .timeline-item {
          position: relative;
        }
        
        .timeline-connector {
          position: absolute;
          left: 20px;
          top: 48px;
          bottom: -24px;
          width: 2px;
          background: linear-gradient(to bottom, #3b82f6, #93c5fd);
        }
        
        .timeline-badge {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #3b82f6 0%, #14b8a6 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 14px;
          flex-shrink: 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .custom-scroll::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scroll::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        
        .custom-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #3b82f6, #14b8a6);
          border-radius: 4px;
        }
        
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #2563eb, #0d9488);
        }
        
        .spinner {
          display: inline-block;
          width: 48px;
          height: 48px;
          border: 3px solid #e2e8f0;
          border-radius: 50%;
          border-top-color: #3b82f6;
          animation: spin 0.6s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default TimelineGenerator;