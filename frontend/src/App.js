import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, Calculator, MessageCircle, DollarSign, Target, Calendar } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [activeTab, setActiveTab] = useState('navigator');
  const [backendStatus, setBackendStatus] = useState('Checking...');
  
  // Career Navigator State
  const [interest, setInterest] = useState('');
  const [budget, setBudget] = useState('');
  const [academicScore, setAcademicScore] = useState('70');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Loan Eligibility State
  const [loanData, setLoanData] = useState({
    course: '',
    coApplicantIncome: '',
    loanAmount: '',
    courseDuration: '2'
  });
  const [eligibility, setEligibility] = useState(null);
  
  // Chatbot State
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  
  // ROI Calculator State
  const [roiData, setRoiData] = useState({
    totalCost: '',
    annualSalary: '',
    loanAmount: '',
    interestRate: '10.5',
    loanTenure: '10'
  });
  const [roiResult, setRoiResult] = useState(null);

  // Check backend connection
  useEffect(() => {
    checkBackend();
  }, []);

  const checkBackend = async () => {
    try {
      const res = await axios.get(`${API_URL}/health`);
      setBackendStatus('✅ Connected with Groq');
    } catch (error) {
      setBackendStatus('❌ Backend not running');
    }
  };

  // Get AI Recommendations
  const getRecommendations = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/recommend`, {
        interest,
        budget,
        academicScore,
        preferredCountry: 'Any'
      });
      setRecommendations(res.data);
    } catch (error) {
      alert('Error getting recommendations. Make sure backend is running.');
    }
    setLoading(false);
  };

  // Check Loan Eligibility
  const checkEligibility = async () => {
    try {
      const res = await axios.post(`${API_URL}/loan-eligibility`, {
        course: loanData.course,
        coApplicantIncome: parseFloat(loanData.coApplicantIncome),
        loanAmount: parseFloat(loanData.loanAmount),
        courseDuration: parseInt(loanData.courseDuration),
        universityTier: 'Tier 2'
      });
      setEligibility(res.data);
    } catch (error) {
      alert('Error checking eligibility');
    }
  };

  // Calculate ROI
  const calculateROI = async () => {
    try {
      const res = await axios.post(`${API_URL}/roi`, {
        totalCost: parseFloat(roiData.totalCost),
        annualSalary: parseFloat(roiData.annualSalary),
        loanAmount: parseFloat(roiData.loanAmount),
        interestRate: parseFloat(roiData.interestRate),
        loanTenure: parseInt(roiData.loanTenure),
        course: 'Graduate Program',
        country: 'USA'
      });
      setRoiResult(res.data);
    } catch (error) {
      alert('Error calculating ROI');
    }
  };

  // Send Chat Message
  const sendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = { role: 'user', content: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    
    try {
      const res = await axios.post(`${API_URL}/chat`, {
        message: chatInput,
        conversationHistory: chatMessages.slice(-5)
      });
      setChatMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, having trouble connecting. Please try again.' }]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-5 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">🎓 EduNexus</h1>
          <p className="text-sm opacity-90">AI-Powered Student Ecosystem for Higher Education</p>
          <div className="text-xs mt-2">{backendStatus}</div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="flex gap-2 flex-wrap border-b">
          {[
            { id: 'navigator', icon: Target, label: 'AI Career Navigator' },
            { id: 'roi', icon: Calculator, label: 'ROI Calculator' },
            { id: 'loan', icon: DollarSign, label: 'Loan Eligibility' },
            { id: 'chatbot', icon: MessageCircle, label: 'AI Mentor' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-t-lg transition ${
                activeTab === tab.id 
                  ? 'bg-white text-blue-600 border-t-2 border-l-2 border-r-2 border-blue-600 font-semibold'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-b-lg shadow-md p-6 min-h-[500px]">
          
          {/* AI Career Navigator Tab */}
          {activeTab === 'navigator' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">🤖 Find Your Perfect University</h2>
              <p className="text-gray-600 mb-6">AI-powered recommendations based on your profile</p>
              
              <div className="space-y-4 max-w-md">
                <input
                  type="text"
                  placeholder="Field of interest (e.g., Computer Science, MBA)"
                  className="w-full p-3 border rounded-lg"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Total budget (INR lakhs)"
                  className="w-full p-3 border rounded-lg"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
                <div>
                  <label className="block text-sm font-medium mb-2">Academic Score: {academicScore}%</label>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={academicScore}
                    onChange={(e) => setAcademicScore(e.target.value)}
                    className="w-full"
                  />
                </div>
                <button
                  onClick={getRecommendations}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loading ? 'Getting Recommendations...' : 'Get AI Recommendations'}
                </button>
              </div>
              
              {/* Recommendations */}
              {recommendations.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-bold text-lg mb-4">🎯 Recommended Universities</h3>
                  <div className="space-y-4">
                    {recommendations.map((uni, idx) => (
                      <div key={idx} className="border-l-4 border-blue-500 pl-4 py-3 bg-gray-50 rounded">
                        <h4 className="font-bold text-lg">{uni.university}</h4>
                        <p className="text-gray-600">{uni.course} • {uni.country}</p>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          <span className="bg-yellow-100 px-2 py-1 rounded text-sm">📊 {uni.admissionProbability} Chance</span>
                          <span className="bg-green-100 px-2 py-1 rounded text-sm">💰 {uni.estAnnualCost}/year</span>
                          <span className="bg-purple-100 px-2 py-1 rounded text-sm">📅 Deadline: {uni.deadline}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{uni.roiNotes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ROI Calculator Tab */}
          {activeTab === 'roi' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">💰 Education ROI Calculator</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <input type="number" placeholder="Total Course Cost (USD)" className="w-full p-3 border rounded-lg" value={roiData.totalCost} onChange={(e) => setRoiData({...roiData, totalCost: e.target.value})} />
                  <input type="number" placeholder="Expected Annual Salary (USD)" className="w-full p-3 border rounded-lg" value={roiData.annualSalary} onChange={(e) => setRoiData({...roiData, annualSalary: e.target.value})} />
                  <input type="number" placeholder="Loan Amount Needed (USD)" className="w-full p-3 border rounded-lg" value={roiData.loanAmount} onChange={(e) => setRoiData({...roiData, loanAmount: e.target.value})} />
                  <input type="number" placeholder="Interest Rate (%)" className="w-full p-3 border rounded-lg" value={roiData.interestRate} onChange={(e) => setRoiData({...roiData, interestRate: e.target.value})} />
                  <button onClick={calculateROI} className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold">Calculate ROI</button>
                </div>
                {roiResult && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold mb-3">📊 Your ROI Analysis</h3>
                    <p><strong>Monthly EMI:</strong> ${roiResult.monthlyEmi}</p>
                    <p><strong>Total Interest:</strong> ${roiResult.totalInterest}</p>
                    <p><strong>Break-even Period:</strong> {roiResult.breakEvenYears} years</p>
                    <p className="mt-2 text-sm text-gray-700">{roiResult.insights}</p>
                    <span className={`inline-block mt-2 px-2 py-1 rounded text-sm ${roiResult.riskLevel === 'Low' ? 'bg-green-200' : roiResult.riskLevel === 'High' ? 'bg-red-200' : 'bg-yellow-200'}`}>Risk: {roiResult.riskLevel}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Loan Eligibility Tab */}
          {activeTab === 'loan' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">🏦 Education Loan Eligibility</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <input type="text" placeholder="Course Name" className="w-full p-3 border rounded-lg" value={loanData.course} onChange={(e) => setLoanData({...loanData, course: e.target.value})} />
                  <input type="number" placeholder="Co-applicant Annual Income (INR lakhs)" className="w-full p-3 border rounded-lg" value={loanData.coApplicantIncome} onChange={(e) => setLoanData({...loanData, coApplicantIncome: e.target.value})} />
                  <input type="number" placeholder="Loan Amount Required (INR lakhs)" className="w-full p-3 border rounded-lg" value={loanData.loanAmount} onChange={(e) => setLoanData({...loanData, loanAmount: e.target.value})} />
                  <button onClick={checkEligibility} className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold">Check Eligibility</button>
                </div>
                {eligibility && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold mb-3">🎯 Eligibility Result</h3>
                    <p className={`text-lg font-bold ${eligibility.eligible ? 'text-green-600' : 'text-red-600'}`}>{eligibility.eligible ? '✅ Eligible' : '❌ Not Eligible'}</p>
                    {eligibility.eligible && <p><strong>Max Loan:</strong> {eligibility.maxLoanAmount} lakhs INR</p>}
                    <p><strong>Interest Rate:</strong> {eligibility.interestRate}%</p>
                    <p><strong>Margin Money:</strong> {eligibility.marginMoney}%</p>
                    <p className="mt-2 text-sm"><strong>Required Documents:</strong></p>
                    <ul className="list-disc list-inside text-sm">
                      {eligibility.requiredDocuments?.map((doc, i) => <li key={i}>{doc}</li>)}
                    </ul>
                    <p className="mt-2 text-sm text-gray-700">{eligibility.suggestions}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* AI Chatbot Tab */}
          {activeTab === 'chatbot' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">💬 AI Study Abroad Mentor</h2>
              <div className="h-96 bg-gray-50 rounded-lg p-4 overflow-y-auto mb-4">
                {chatMessages.length === 0 && (
                  <div className="text-center text-gray-500 mt-32">
                    Ask me about universities, loans, visas, or applications!
                  </div>
                )}
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <span className={`inline-block p-2 rounded-lg max-w-[80%] ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                      {msg.content}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask anything about studying abroad..."
                  className="flex-1 p-3 border rounded-lg"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage} className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700">Send</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;