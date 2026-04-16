<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>EduSmart AI | Study Abroad Mentor</title>
    <!-- Google Fonts + Tailwind + Lucide Icons (simulated) -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Customize Tailwind theme for better colors -->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&display=swap');
        * {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        body {
            background: linear-gradient(135deg, #f0f4ff 0%, #e9eefa 100%);
            min-height: 100vh;
        }
        /* Custom scrollbar for messages */
        .chat-scroll::-webkit-scrollbar {
            width: 5px;
        }
        .chat-scroll::-webkit-scrollbar-track {
            background: #eef2ff;
            border-radius: 10px;
        }
        .chat-scroll::-webkit-scrollbar-thumb {
            background: #c7d2fe;
            border-radius: 10px;
        }
        /* subtle animation for loading dots */
        @keyframes pulse-ring {
            0% { opacity: 0.5; transform: scale(0.98);}
            100% { opacity: 1; transform: scale(1);}
        }
        .typing-bubble {
            animation: pulse-ring 1.2s infinite ease-in-out;
        }
        /* smooth transitions */
        .message-transition {
            transition: all 0.2s ease;
        }
    </style>
</head>
<body class="p-4 md:p-6 font-sans antialiased">

<div class="max-w-5xl mx-auto">
    <!-- Hero Header with refined gradient + fresh palette -->
    <div class="rounded-2xl p-6 md:p-8 mb-8 shadow-xl shadow-indigo-100/40"
         style="background: linear-gradient(105deg, #1E2A5E 0%, #2A3B7A 35%, #3E5A9C 100%);">
        <div class="flex items-center gap-3 flex-wrap">
            <div class="bg-white/20 backdrop-blur-sm p-2 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M12 2a10 10 0 0 0-9.7 7.2"/><path d="M12 2v20"/><path d="M12 12l-4-4"/><path d="M12 12l4-4"/><path d="M12 22a10 10 0 0 0 9.7-7.2"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <div>
                <h1 class="text-3xl md:text-4xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span>EduSmart AI</span>
                    <span class="text-sm bg-emerald-400/30 backdrop-blur-sm px-3 py-1 rounded-full text-emerald-100 text-base font-medium">Study Mentor</span>
                </h1>
                <p class="text-indigo-100 text-md mt-1 max-w-2xl">✨ 24/7 AI assistant for universities, loans, visas, scholarships & SOPs</p>
            </div>
        </div>
    </div>

    <!-- Chat Card with fresh palette -->
    <div class="bg-white rounded-2xl shadow-2xl shadow-gray-200/60 overflow-hidden border border-gray-100/80">
        <!-- Chat messages area -->
        <div class="h-[420px] overflow-y-auto p-5 bg-[#F9FAFF] chat-scroll" id="chatMessagesContainer">
            <!-- messages will be injected dynamically but we keep same structure as react component -->
            <div id="chatMessagesList">
                <!-- initial assistant message will be rendered via JS -->
            </div>
            <div id="loadingIndicator" class="hidden justify-start mb-4">
                <div class="flex items-center gap-2 bg-white border border-gray-200 p-3 rounded-2xl shadow-sm typing-bubble">
                    <svg class="animate-spin h-4 w-4 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span class="text-sm text-gray-500 font-medium">EduSmart is thinking...</span>
                </div>
            </div>
            <div id="scrollAnchor"></div>
        </div>

        <!-- Suggested questions - modern & clean -->
        <div class="border-t border-gray-100 px-5 py-3 bg-white/80 backdrop-blur-sm">
            <p class="text-xs font-semibold text-indigo-400 uppercase tracking-wide mb-2 flex items-center gap-1"><span>⚡</span> QUICK ASK</p>
            <div class="flex flex-wrap gap-2" id="suggestionsContainer">
                <!-- suggested chips injected via js but we will build static + dynamic -->
            </div>
        </div>

        <!-- Input area -->
        <div class="border-t border-gray-200 bg-white p-4 md:p-5">
            <div class="flex gap-3 items-center">
                <div class="relative flex-1">
                    <input type="text" id="chatInput" placeholder="Type your study abroad question..." 
                           class="w-full p-3.5 pl-5 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:border-indigo-300 transition-all bg-gray-50/50 text-gray-700 placeholder:text-gray-400 font-medium">
                </div>
                <button id="sendBtn" 
                        class="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-6 py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    Send
                </button>
            </div>
            <p class="text-[11px] text-gray-400 mt-2 ml-1">Press Enter ↵ to send</p>
        </div>
    </div>
    
    <!-- subtle footer branding -->
    <div class="text-center text-xs text-gray-400 mt-6 flex justify-center gap-4">
        <span>🎓 Smart AI for education</span>
        <span>🌍 Study abroad assistant</span>
    </div>
</div>

<script>
    // ------------------------------------------------------------------
    // MOCK API SIMULATION (replaces original api.sendMessage)
    // This mimics an intelligent AI mentor for study abroad context
    // with realistic responses based on conversation history.
    // ------------------------------------------------------------------
    
    // Mock AI reply generator - context aware and realistic for "study abroad mentor"
    function generateAIReply(userMessage, conversationHistory = []) {
        const msg = userMessage.toLowerCase();
        
        // intelligent keyword mapping
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
        
        // fallback: contextual replies for study abroad mentor vibe
        const fallbacks = [
            "🎓 Great question! Could you tell me more about your preferred country or budget? I can give personalized advice.",
            "🌏 As your AI study mentor, I'd suggest exploring both scholarship portals and education loan options simultaneously. Would you like me to compare loan interest rates?",
            "📖 Many students also ask about part-time work rights: In USA (20hrs/week CPT/OPT), Canada (20hrs off-campus), UK (20hrs), Australia (48hrs/fortnight). Need work permit details?",
            "🧠 Remember to start visa process 4-6 months before intake. Keep financial documents, SOP, LORs ready. Want a document checklist PDF template?",
            "✨ Based on your profile, aim for 2-3 safe, 2-3 moderate, 2 ambitious unis. Let me know your CGPA, IELTS/GRE score, and work experience for shortlist!"
        ];
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    // Simulate API call (delay + response)
    async function mockSendMessage(userMessage, conversationHistory = []) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const replyText = generateAIReply(userMessage, conversationHistory);
                resolve({ data: { reply: replyText } });
            }, 800); // realistic typing delay
        });
    }

    // ------------------------------
    // React-like state & DOM manipulation
    // ------------------------------
    let messages = [
        { role: 'assistant', content: '👋 Hi! I\'m your AI study abroad mentor. Ask me anything about universities, loans, visas, or applications! ✨' }
    ];
    let loading = false;
    
    // DOM elements
    const messagesContainer = document.getElementById('chatMessagesList');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const suggestionsContainer = document.getElementById('suggestionsContainer');
    const scrollAnchor = document.getElementById('scrollAnchor');
    
    // suggested questions array
    const suggestedQuestions = [
        "Which country is best for MS in CS?",
        "How to get education loan without collateral?",
        "What's the visa process for USA?",
        "Scholarships for Indian students?",
        "What is the average salary after MS?",
        "How to write a good SOP?"
    ];
    
    // Helper: scroll to bottom
    function scrollToBottom() {
        scrollAnchor?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    
    // Render all messages from array
    function renderMessages() {
        if (!messagesContainer) return;
        messagesContainer.innerHTML = '';
        messages.forEach((msg, idx) => {
            const isUser = msg.role === 'user';
            const messageDiv = document.createElement('div');
            messageDiv.className = `mb-5 flex ${isUser ? 'justify-end' : 'justify-start'} message-transition`;
            
            // bubble structure
            const bubbleWrapper = document.createElement('div');
            bubbleWrapper.className = `flex items-start gap-2.5 max-w-[80%] md:max-w-[70%] ${isUser ? 'flex-row-reverse' : ''}`;
            
            // avatar icon
            const avatarDiv = document.createElement('div');
            avatarDiv.className = `w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${isUser ? 'bg-indigo-600' : 'bg-gradient-to-br from-indigo-500 to-purple-600'}`;
            if (isUser) {
                avatarDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
            } else {
                avatarDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 0 0-9.7 7.2"/><path d="M12 2v20"/><path d="M12 12l-4-4"/><path d="M12 12l4-4"/><path d="M12 22a10 10 0 0 0 9.7-7.2"/><circle cx="12" cy="12" r="3"/></svg>`;
            }
            
            const bubbleText = document.createElement('div');
            bubbleText.className = `p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${isUser ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white border border-indigo-50 text-gray-800 rounded-bl-none shadow-sm'}`;
            bubbleText.innerHTML = `<span class="whitespace-pre-wrap break-words">${escapeHtml(msg.content)}</span>`;
            
            bubbleWrapper.appendChild(avatarDiv);
            bubbleWrapper.appendChild(bubbleText);
            messageDiv.appendChild(bubbleWrapper);
            messagesContainer.appendChild(messageDiv);
        });
        scrollToBottom();
    }
    
    // simple escape to avoid XSS
    function escapeHtml(str) {
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function(c) {
            return c;
        });
    }
    
    // send message logic
    async function sendMessage() {
        const inputText = chatInput.value.trim();
        if (!inputText) return;
        if (loading) return;
        
        // Add user message
        const userMsg = { role: 'user', content: inputText };
        messages.push(userMsg);
        renderMessages();
        
        // clear input
        chatInput.value = '';
        loading = true;
        updateSendButton();
        
        // show loading indicator
        loadingIndicator.classList.remove('hidden');
        scrollToBottom();
        
        // Get conversation history (last 5 messages for context)
        const conversationHistory = messages.slice(-6, -1).map(m => ({ role: m.role, content: m.content }));
        
        try {
            // Use mock API (same signature as original api.sendMessage)
            const response = await mockSendMessage(inputText, conversationHistory);
            const assistantReply = response.data.reply;
            const assistantMsg = { role: 'assistant', content: assistantReply };
            messages.push(assistantMsg);
            renderMessages();
        } catch (error) {
            console.error(error);
            const errorMsg = { role: 'assistant', content: '⚠️ Sorry, I\'m having trouble connecting. Please refresh or try again later.' };
            messages.push(errorMsg);
            renderMessages();
            // optional toast equivalent: alert style but we can simulate small console
            showFloatingToast("Network issue, but AI still works offline");
        } finally {
            loading = false;
            loadingIndicator.classList.add('hidden');
            updateSendButton();
            scrollToBottom();
        }
    }
    
    function showFloatingToast(msg) {
        let toastDiv = document.getElementById('custom-toast-msg');
        if (!toastDiv) {
            toastDiv = document.createElement('div');
            toastDiv.id = 'custom-toast-msg';
            toastDiv.className = 'fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-5 py-2 rounded-full text-sm font-medium shadow-lg z-50 transition-all duration-300 opacity-0';
            document.body.appendChild(toastDiv);
        }
        toastDiv.innerText = msg;
        toastDiv.style.opacity = '1';
        setTimeout(() => {
            toastDiv.style.opacity = '0';
        }, 2000);
    }
    
    function updateSendButton() {
        const isEmpty = !chatInput.value.trim();
        if (loading) {
            sendBtn.disabled = true;
            sendBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else if (isEmpty) {
            sendBtn.disabled = true;
            sendBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            sendBtn.disabled = false;
            sendBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }
    
    // handle keypress
    function handleKeyPress(e) {
        if (e.key === 'Enter' && !loading && chatInput.value.trim()) {
            sendMessage();
        }
    }
    
    // initialize suggestions chips
    function initSuggestions() {
        suggestionsContainer.innerHTML = '';
        suggestedQuestions.forEach((q) => {
            const chip = document.createElement('button');
            chip.className = 'text-xs md:text-sm bg-gray-100 hover:bg-indigo-50 text-gray-700 border border-gray-200 rounded-full px-4 py-1.5 transition-all duration-150 hover:border-indigo-300 hover:text-indigo-700 font-medium';
            chip.innerText = q;
            chip.addEventListener('click', () => {
                if (!loading) {
                    chatInput.value = q;
                    updateSendButton();
                    chatInput.focus();
                }
            });
            suggestionsContainer.appendChild(chip);
        });
    }
    
    // listen to input changes
    chatInput.addEventListener('input', updateSendButton);
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', handleKeyPress);
    
    // initial render
    renderMessages();
    initSuggestions();
    updateSendButton();
    
    // Additional style polishing: ensure loading hides correctly
    // Also set initial focus
    chatInput.focus();
    
    // little extra: responsive and add tooltip hover
    console.log("EduSmart AI Mentor ready — modern color palette: deep navy gradients + indigo/violet accents + clean white cards.");
</script>

<!-- color palette description & visual style note 
     Primary palette: 
     - Header: Deep Blue/Navy (#1E2A5E to #3E5A9C) conveys trust & academic professionalism
     - Accent: Indigo-600 (#4F46E5) + Violet-600 (#7C3AED) gradient on buttons => vibrant, smart
     - Chat bubbles: User messages in rich Indigo (#4F46E5), Assistant in clean white with subtle gray border
     - Background: Soft off-white #F9FAFF and gradient body #f0f4ff → fresh, minimal, easy on eyes
     - Suggested chips: Soft gray/white with hover transition → friendly interaction
     - Typography: Inter font, modern, excellent readability
     - Shadows and rounded corners give modern "SaaS" AI feel, perfectly matching "Education Smart Study AI Assistant"
-->
</body>
</html>
