import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, CheckCircle, Target, Loader, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const TimelineGenerator = () => {
  const [formData, setFormData] = useState({
    targetIntake: 'Fall (September)',
    currentMonth: new Date().toLocaleString('default', { month: 'long' }),
    testsTaken: 'None'
  });
  const [timeline, setTimeline] = useState(null);
  const [loading, setLoading] = useState(false);
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
    
    // Simulate API call
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

  // Auto-scroll to timeline when generated
  useEffect(() => {
    if (timeline && timelineContentRef.current) {
      timelineContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [timeline]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e3a8a] via-[#4f46e5] to-[#172554] rounded-2xl p-8 text-white mb-8 shadow-xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
          <Calendar size={32} />
          Application Timeline Generator
        </h1>
        <p className="text-indigo-200 text-base">
          Plan your study abroad journey month by month
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-indigo-100">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Clock size={24} className="text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Your Timeline Preferences</h2>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Target size={16} className="text-indigo-600" />
                Target Intake
              </label>
              <select
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                value={formData.targetIntake}
                onChange={(e) => setFormData({...formData, targetIntake: e.target.value})}
              >
                {intakes.map(intake => (
                  <option key={intake} value={intake}>{intake}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Calendar size={16} className="text-indigo-600" />
                Current Month
              </label>
              <select
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                value={formData.currentMonth}
                onChange={(e) => setFormData({...formData, currentMonth: e.target.value})}
              >
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <AlertCircle size={16} className="text-indigo-600" />
                Tests Already Taken
              </label>
              <select
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                value={formData.testsTaken}
                onChange={(e) => setFormData({...formData, testsTaken: e.target.value})}
              >
                {testOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <button
              onClick={generateTimeline}
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Clock size={20} />
                  Generate Timeline
                </>
              )}
            </button>
          </div>
        </div>

        {/* Timeline Results */}
        <div ref={timelineContentRef}>
          <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 flex flex-col h-[600px] overflow-hidden">
            {/* Fixed Header */}
            <div className="bg-white p-6 pb-4 border-b-2 border-indigo-100">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <Target size={24} className="text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Your Application Timeline</h2>
              </div>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 pt-4 custom-scroll">
              {loading ? (
                <div className="flex items-center justify-center h-full min-h-[400px]">
                  <div className="text-center">
                    <div className="spinner"></div>
                    <div className="text-indigo-600 font-semibold mt-4">Generating your personalized timeline...</div>
                  </div>
                </div>
              ) : !timeline ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                  <div className="bg-indigo-50 rounded-full p-4 mb-4">
                    <Calendar size={48} className="text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Timeline Generated Yet</h3>
                  <p className="text-gray-500 text-sm max-w-sm">
                    Fill in your preferences and click "Generate Timeline"
                  </p>
                  <div className="mt-6 flex gap-2 flex-wrap justify-center">
                    <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">📝 Research</span>
                    <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">📚 Tests</span>
                    <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">📄 Applications</span>
                    <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">🛫 Visa</span>
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
                        <div className="flex-1 bg-gray-50 rounded-xl p-5 border border-gray-200 hover:shadow-md transition-all hover:translate-x-1">
                          <div className="flex items-center gap-2 mb-3">
                            <Calendar size={18} className="text-indigo-600" />
                            <h3 className="text-lg font-bold text-indigo-800">{phase.month}</h3>
                          </div>
                          <ul className="space-y-2">
                            {phase.tasks.map((task, taskIdx) => (
                              <li key={taskIdx} className="flex items-center gap-2 text-sm text-gray-700 py-1 border-b border-gray-100 last:border-0">
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
          background: linear-gradient(to bottom, #4f46e5, #c7d2fe);
        }
        
        .timeline-badge {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #4f46e5 0%, #1e3a8a 100%);
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
          background: linear-gradient(135deg, #4f46e5, #1e3a8a);
          border-radius: 4px;
        }
        
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #6366f1, #1e40af);
        }
        
        .spinner {
          display: inline-block;
          width: 48px;
          height: 48px;
          border: 3px solid #e0e7ff;
          border-radius: 50%;
          border-top-color: #4f46e5;
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