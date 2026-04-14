import React, { useState } from 'react';
import { Sparkles, TrendingUp, Calendar as CalendarIcon, Loader } from 'lucide-react';
import { api } from '../utils/api';
import toast from 'react-hot-toast';

const CareerNavigator = () => {
  const [interest, setInterest] = useState('');
  const [budget, setBudget] = useState('');
  const [academicScore, setAcademicScore] = useState('70');
  const [preferredCountry, setPreferredCountry] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUni, setSelectedUni] = useState(null);

  const countries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Any'];

  const getRecommendations = async () => {
    if (!interest) {
      toast.error('Please enter your field of interest');
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.getRecommendations({
        interest,
        budget: budget || '30',
        academicScore,
        preferredCountry: preferredCountry || 'Any'
      });
      setRecommendations(response.data);
      toast.success('Recommendations ready!');
    } catch (error) {
      toast.error('Error getting recommendations');
      console.error(error);
    }
    setLoading(false);
  };

  const getProbabilityColor = (prob) => {
    if (prob === 'High') return 'bg-green-100 text-green-800';
    if (prob === 'Medium') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl font-bold mb-2">🎓 AI Career Navigator</h1>
        <p className="text-blue-100">Discover your perfect university match using AI-powered recommendations</p>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Field of Interest *
            </label>
            <input
              type="text"
              placeholder="e.g., Computer Science, MBA, Data Science"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Budget (INR Lakhs)
            </label>
            <input
              type="number"
              placeholder="e.g., 40"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Country
            </label>
            <select
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={preferredCountry}
              onChange={(e) => setPreferredCountry(e.target.value)}
            >
              {countries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Academic Score: {academicScore}%
            </label>
            <input
              type="range"
              min="50"
              max="100"
              value={academicScore}
              onChange={(e) => setAcademicScore(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        
        <button
          onClick={getRecommendations}
          disabled={loading}
          className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader className="animate-spin" size={20} />
              Analyzing your profile...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Get AI Recommendations
            </>
          )}
        </button>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="text-blue-600" />
            Your Matches
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.map((uni, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
                onClick={() => setSelectedUni(uni)}
              >
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4">
                  <h3 className="font-bold text-lg mb-1">{uni.university}</h3>
                  <p className="text-sm text-gray-600">{uni.country}</p>
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium mb-2">{uni.course}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getProbabilityColor(uni.admissionProbability)}`}>
                      {uni.admissionProbability} Chance
                    </span>
                    <span className="text-sm font-bold text-green-600">{uni.estAnnualCost}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{uni.roiNotes}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <CalendarIcon size={12} />
                    Deadline: {uni.deadline}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for University Details */}
      {selectedUni && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedUni(null)}>
          <div className="bg-white rounded-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-2">{selectedUni.university}</h3>
            <p className="text-gray-600 mb-4">{selectedUni.country}</p>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Course:</span>
                <span>{selectedUni.course}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Admission Chance:</span>
                <span className={getProbabilityColor(selectedUni.admissionProbability)}>{selectedUni.admissionProbability}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Annual Cost:</span>
                <span>{selectedUni.estAnnualCost}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Application Deadline:</span>
                <span>{selectedUni.deadline}</span>
              </div>
              <div className="pt-3">
                <p className="text-sm text-gray-600">{selectedUni.roiNotes}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedUni(null)}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerNavigator;