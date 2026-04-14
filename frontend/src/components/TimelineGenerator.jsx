import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, Loader } from 'lucide-react';
import { api } from '../utils/api';
import toast from 'react-hot-toast';

const TimelineGenerator = () => {
  const [formData, setFormData] = useState({
    targetIntake: 'Fall',
    currentMonth: new Date().toLocaleString('default', { month: 'long' }),
    testsTaken: 'None'
  });
  const [timeline, setTimeline] = useState(null);
  const [loading, setLoading] = useState(false);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  const intakes = ['Fall (September)', 'Spring (January)', 'Summer (May)'];
  const testOptions = ['IELTS', 'TOEFL', 'GRE', 'GMAT', 'None'];

  const generateTimeline = async () => {
    setLoading(true);
    try {
      const response = await api.generateTimeline({
        targetIntake: formData.targetIntake,
        currentMonth: formData.currentMonth,
        testsTaken: formData.testsTaken
      });
      setTimeline(response.data);
      toast.success('Timeline generated!');
    } catch (error) {
      toast.error('Error generating timeline');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl font-bold mb-2">📅 Application Timeline Generator</h1>
        <p className="text-red-100">Plan your study abroad journey month by month</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="text-red-600" />
            Your Timeline Preferences
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Intake
              </label>
              <select
                className="w-full p-3 border rounded-lg"
                value={formData.targetIntake}
                onChange={(e) => setFormData({...formData, targetIntake: e.target.value})}
              >
                {intakes.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Month
              </label>
              <select
                className="w-full p-3 border rounded-lg"
                value={formData.currentMonth}
                onChange={(e) => setFormData({...formData, currentMonth: e.target.value})}
              >
                {months.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tests Already Taken
              </label>
              <select
                className="w-full p-3 border rounded-lg"
                value={formData.testsTaken}
                onChange={(e) => setFormData({...formData, testsTaken: e.target.value})}
              >
                {testOptions.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <button
              onClick={generateTimeline}
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader className="animate-spin" size={20} /> : <Clock size={20} />}
              {loading ? 'Generating...' : 'Generate Timeline'}
            </button>
          </div>
        </div>

        {timeline && timeline.timeline && (
          <div className="bg-white rounded-xl shadow-lg p-6 overflow-y-auto max-h-[500px]">
            <h2 className="text-xl font-bold mb-4">🎯 Your Application Timeline</h2>
            <div className="space-y-4">
              {timeline.timeline.map((phase, idx) => (
                <div key={idx} className="relative">
                  {idx < timeline.timeline.length - 1 && (
                    <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                  )}
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-red-600 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">{phase.month}</h3>
                      <ul className="space-y-2">
                        {phase.tasks.map((task, taskIdx) => (
                          <li key={taskIdx} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle size={14} className="text-green-500" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineGenerator;