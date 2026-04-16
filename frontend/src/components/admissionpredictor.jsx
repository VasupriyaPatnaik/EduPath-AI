import React, { useState } from 'react';
import { Target, TrendingUp, Loader } from 'lucide-react';
import { api } from '../utils/api';
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

  const predictProbability = async () => {
    if (!formData.gpa || !formData.university) {
      toast.error('Please fill GPA and University name');
      return;
    }

    setLoading(true);
    try {
      const response = await api.predictAdmission({
        gpa: parseFloat(formData.gpa),
        testScore: formData.testScore || 'Not taken',
        internships: parseInt(formData.internships) || 0,
        university: formData.university,
        course: formData.course || 'Graduate Program'
      });
      setResult(response.data);
      toast.success('Prediction complete!');
    } catch (error) {
      toast.error('Error predicting admission');
      console.error(error);
    }
    setLoading(false);
  };

  const getProbabilityColor = (prob) => {
    if (prob >= 70) return 'bg-green-100 text-green-800';
    if (prob >= 50) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl font-bold mb-2">🎯 Admission Probability Predictor</h1>
        <p className="text-orange-100">AI-powered prediction of your admission chances</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Target className="text-orange-600" />
            Your Profile
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GPA/Percentage (out of 10) *
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g., 8.5"
                className="w-full p-3 border rounded-lg"
                value={formData.gpa}
                onChange={(e) => setFormData({...formData, gpa: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Test Score (GRE/GMAT/IELTS)
              </label>
              <input
                type="text"
                placeholder="e.g., GRE 320"
                className="w-full p-3 border rounded-lg"
                value={formData.testScore}
                onChange={(e) => setFormData({...formData, testScore: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Internships
              </label>
              <input
                type="number"
                placeholder="e.g., 2"
                className="w-full p-3 border rounded-lg"
                value={formData.internships}
                onChange={(e) => setFormData({...formData, internships: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                University Name *
              </label>
              <input
                type="text"
                placeholder="e.g., Stanford University"
                className="w-full p-3 border rounded-lg"
                value={formData.university}
                onChange={(e) => setFormData({...formData, university: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Name
              </label>
              <input
                type="text"
                placeholder="e.g., MS in CS"
                className="w-full p-3 border rounded-lg"
                value={formData.course}
                onChange={(e) => setFormData({...formData, course: e.target.value})}
              />
            </div>

            <button
              onClick={predictProbability}
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader className="animate-spin" size={20} /> : <TrendingUp size={20} />}
              {loading ? 'Predicting...' : 'Predict Admission Chance'}
            </button>
          </div>
        </div>

        {result && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">📊 Prediction Results</h2>
            
            <div className="text-center mb-6">
              <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${getProbabilityColor(result.probability)}`}>
                <span className="text-2xl font-bold">{result.probability}%</span>
                <span>Admission Chance</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">{result.reasoning}</p>
              </div>

              {result.strengths && result.strengths.length > 0 && (
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-semibold text-sm mb-2">✅ Strengths</p>
                  <ul className="text-sm space-y-1">
                    {result.strengths.map((s, i) => <li key={i}>• {s}</li>)}
                  </ul>
                </div>
              )}

              {result.weaknesses && result.weaknesses.length > 0 && (
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="font-semibold text-sm mb-2">⚠️ Areas to Improve</p>
                  <ul className="text-sm space-y-1">
                    {result.weaknesses.map((w, i) => <li key={i}>• {w}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmissionPredictor;