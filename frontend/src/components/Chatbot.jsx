import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader, Sparkles, Globe, GraduationCap, Briefcase, Heart, MessageCircle, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '👋 Hi! I\'m your AI study abroad mentor. Ask me anything about universities, loans, visas, or applications! ✨'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const suggestedQuestions = [
    "Which country is best for MS in CS?",
    "How to get education loan without collateral?",
    "What's the visa process for USA?",
    "Scholarships for Indian students?",
    "What is the average salary after MS?",
    "How to write a good SOP?"
  ];

  // Mock AI reply generator - context aware for study abroad mentor
  const generateAIReply = (userMessage, conversationHistory = []) => {
    const msg = userMessage.toLowerCase();
    
    // Intelligent keyword mapping
    if (msg.includes('best country') || (msg.includes('country') && msg.includes('ms in cs'))) {
      return "🇺🇸 For MS in CS, top destinations are USA (Stanford, CMU, MIT), Canada (UoT, Waterloo), Germany (TUM, RWTH), and UK (Oxford, Cambridge). USA offers highest salary potential but higher costs. What's your budget range?";
    }
    if (msg.includes('loan without collateral') || (msg.includes('education loan') && msg.includes('collateral'))) {
      return "💸 Yes! Many Indian banks offer collateral-free loans up to ₹40-50 lakhs via NBFCs like Avanse, HDFC Credila, or MPOWER (for US/Canada). Eligibility depends on admit university ranking, co-applicant income, and course ROI. Want me to list top lenders?";
    }
    if (msg.includes('visa process') && (msg.includes('usa') || msg.includes('us'))) {
      return "🛂 US F1 Visa process: 1) Receive I-20 from university 2) Pay SEVIS fee 3) Fill DS-160 4) Pay visa fee 5) Schedule interview 6) Attend with financial docs. Approval rate ~75% for STEM. Need a visa interview checklist?";
    }
    if (msg.includes('scholarships') && msg.includes('indian')) {
      return "🏆 Top scholarships for Indian students: Inlaks Shivdasani (UK/Europe), JN Tata Endowment, Fulbright-Nehru (US), Commonwealth Scholarship (UK), Erasmus Mundus (Europe), and university-specific merit awards. Deadlines vary! Which country interests you?";
    }
    if (msg.includes('average salary') && msg.includes('ms')) {
      return "💰 Average post-MS salary in USA: $85k-$140k (CS $110k+), Canada: CAD 65k-95k, Germany: €55k-75k, UK: £45k-70k. Factors: university rank, internships, and location. ROI for top US unis is ~2-3 years. What's your target field?";
    }
    if (msg.includes('sop') || msg.includes('statement of purpose')) {
      return "✍️ A powerful SOP: 1) Hook with passion 2) Academic achievements + projects 3) Relevant work/internships 4) Why this university (specific professor/lab) 5) Future goals. Keep under 1000 words. Would you like a sample outline?";
    }
    if (msg.includes('gre') || msg.includes('gmat')) {
      return "📚 GRE: 320+ (Q:165+) for top CS unis. GMAT: 700+ for MBA. IELTS/TOEFL: 7.0+/100+. Many unis now waive GRE – check specific program. Need a 3-month study plan?";
    }
    if (msg.includes('application deadline')) {
      return "⏰ Fall 2026 deadlines: US (Nov-Jan), Canada (Dec-March), Germany (March-May), UK (rolling). Early bird applications boost scholarship chances! Which university are you targeting?";
    }
    if (msg.includes('accommodation') || msg.includes('housing')) {
      return "🏠 On-campus housing fills fast. Off-campus options: shared apartments, homestays. Budget monthly: US ($800-1500), UK (£600-1100), Germany (€400-800). Use platforms like Unilodgers, Zillow, WG-Gesucht. Need a pre-arrival checklist?";
    }
    if (msg.includes('part time') || msg.includes('work permit')) {
      return "💼 Part-time work rights: USA (20hrs/week CPT/OPT), Canada (20hrs off-campus), UK (20hrs), Australia (48hrs/fortnight), Germany (120 full days/240 half days). Earnings can cover 30-50% of living expenses!";
    }
    
    // Fallback responses
    const fallbacks = [
      "🎓 Great question! Could you tell me more about your preferred country or budget? I can give personalized advice.",
      "🌏 As your AI study mentor, I'd suggest exploring both scholarship portals and education loan options simultaneously. Would you like me to compare loan interest rates?",
      "📖 Many students also ask about part-time work rights. Need work permit details for a specific country?",
      "🧠 Remember to start visa process 4-6 months before intake. Keep financial documents, SOP, LORs ready. Want a document checklist?",
      "✨ Based on your profile, aim for 2-3 safe, 2-3 moderate, 2 ambitious unis. Share your CGPA and test scores for a personalized shortlist!"
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  // Simulate API call with delay
  const sendMessageToAI = async (userMessage, conversationHistory) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const replyText = generateAIReply(userMessage, conversationHistory);
        resolve({ data: { reply: replyText } });
      }, 800);
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    const conversationHistory = messages.slice(-5).map(m => ({ role: m.role, content: m.content }));

    try {
      const response = await sendMessageToAI(userMessage, conversationHistory);
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.reply }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '⚠️ Sorry, I\'m having trouble connecting. Please try again later.' 
      }]);
      toast.error('Failed to get response');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading && input.trim()) {
      sendMessage();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-8">
        
        {/* Header - Matching CareerNavigator */}
        <div className="relative rounded-2xl p-6 md:p-8 bg-white shadow-lg border border-slate-100 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-2 rounded-2xl shadow-md">
                <Bot size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                  AI Study Mentor
                </h1>
                <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Powered by Groq LLM</span>
              </div>
            </div>
            <p className="text-slate-600 text-base max-w-2xl">
              ✨ 24/7 AI assistant for universities, loans, visas, scholarships & SOPs
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-blue-50 px-3 py-1.5 rounded-full text-xs flex items-center gap-1 text-blue-700">
                <MessageCircle size={12} /> 24/7 Available
              </span>
              <span className="bg-blue-50 px-3 py-1.5 rounded-full text-xs flex items-center gap-1 text-blue-700">
                <Globe size={12} /> Study Abroad Expert
              </span>
              <span className="bg-blue-50 px-3 py-1.5 rounded-full text-xs flex items-center gap-1 text-blue-700">
                <Briefcase size={12} /> Loan Guidance
              </span>
              <span className="bg-blue-50 px-3 py-1.5 rounded-full text-xs flex items-center gap-1 text-blue-700">
                <Heart size={12} /> Personalized Advice
              </span>
            </div>
          </div>
        </div>

        {/* Chat Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Chat messages area */}
          <div className="h-[450px] overflow-y-auto p-5 bg-gradient-to-b from-slate-50 to-white custom-scroll">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-5 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} message-transition`}
              >
                <div className={`flex items-start gap-2.5 max-w-[80%] md:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-teal-500' 
                      : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                  }`}>
                    {msg.role === 'user' ? (
                      <User size={16} className="text-white" />
                    ) : (
                      <Bot size={16} className="text-white" />
                    )}
                  </div>
                  
                  {/* Message Bubble */}
                  <div className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-br-none' 
                      : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                  }`}>
                    <span className="whitespace-pre-wrap break-words">{msg.content}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {loading && (
              <div className="flex justify-start mb-4">
                <div className="flex items-center gap-2 bg-white border border-slate-200 p-3 rounded-2xl shadow-sm">
                  <Loader size={16} className="animate-spin text-blue-500" />
                  <span className="text-sm text-slate-500 font-medium">AI Mentor is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          <div className="border-t border-slate-100 px-5 py-3 bg-white">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2 flex items-center gap-1">
              <Sparkles size={12} /> QUICK ASK
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(question)}
                  className="text-xs md:text-sm bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 border border-slate-200 rounded-full px-4 py-1.5 transition-all duration-150 hover:border-blue-300 font-medium"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-200 bg-white p-4 md:p-5">
            <div className="flex gap-3 items-center">
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type your study abroad question..."
                  className="w-full p-3.5 pl-5 pr-12 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 text-slate-700 placeholder:text-slate-400 font-medium"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-6 py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold group"
              >
                <Send size={18} className="group-hover:rotate-12 transition" />
                Send
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 ml-1">Press Enter ↵ to send</p>
          </div>
        </div>

        {/* Footer Branding */}
        <div className="text-center text-xs text-slate-400 flex justify-center gap-4">
          <span className="flex items-center gap-1">🎓 Powered by Groq Llama 3.3</span>
          <span className="flex items-center gap-1">🌍 Study Abroad Specialist</span>
          <span className="flex items-center gap-1">💡 24/7 Available</span>
        </div>
      </div>

      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #94a3b8;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
        .message-transition {
          transition: all 0.2s ease;
        }
        @keyframes pulse-ring {
          0% { opacity: 0.5; transform: scale(0.98);}
          100% { opacity: 1; transform: scale(1);}
        }
        .typing-bubble {
          animation: pulse-ring 1.2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;