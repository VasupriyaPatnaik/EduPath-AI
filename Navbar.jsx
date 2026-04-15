<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EduNexus - Premium Dark Blue | Smart Study Assistant</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes softGlow {
            0%, 100% { box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.05); }
            50% { box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.08); }
        }
        
        .fade-up {
            animation: fadeInUp 0.5s ease-out;
        }
        
        .card-premium {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            animation: softGlow 3s ease-in-out infinite;
        }
        
        .card-premium:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 35px -12px rgba(0, 0, 0, 0.2);
        }
        
        body {
            background: linear-gradient(135deg, #F5F7FA 0%, #EDF2F7 100%);
        }
        
        /* Premium gradient background for hero */
        .hero-premium {
            background: linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%);
        }
        
        /* Custom premium dark blue colors */
        .premium-card-1 {
            background: linear-gradient(135deg, #1B2A4A 0%, #1E3A5F 100%);
        }
        .premium-card-2 {
            background: linear-gradient(135deg, #16213E 0%, #1A2D4C 100%);
        }
        .premium-card-3 {
            background: linear-gradient(135deg, #1E3A5F 0%, #0F3460 100%);
        }
        .premium-card-4 {
            background: linear-gradient(135deg, #0F2027 0%, #1B2A4A 100%);
        }
    </style>
</head>
<body>

    <div id="root"></div>

    <script>
        let activeTab = 'navigator';
        
        const navItems = [
            { id: 'navigator', icon: 'Compass', label: 'Career Navigator' },
            { id: 'roi', icon: 'Calculator', label: 'ROI Calculator' },
            { id: 'loan', icon: 'DollarSign', label: 'Loan Eligibility' },
            { id: 'chatbot', icon: 'MessageCircle', label: 'AI Mentor' },
            { id: 'admission', icon: 'Target', label: 'Admission Predictor' },
            { id: 'timeline', icon: 'Calendar', label: 'Timeline' }
        ];

        const contentMap = {
            navigator: {
                title: "Career Navigator",
                description: "AI-powered guidance to discover your ideal professional journey",
                cards: [
                    { icon: "🎯", title: "Personalized Career Paths", desc: "Custom roadmaps tailored to your unique skills, interests, and career aspirations", detail: "AI-powered matching" },
                    { icon: "📊", title: "Skill Gap Analysis", desc: "Identify strengths and areas for improvement with detailed competency mapping", detail: "Actionable insights" },
                    { icon: "📈", title: "Industry Demand Insights", desc: "Real-time market trends and emerging opportunities in your field", detail: "Live data updates" },
                    { icon: "💰", title: "Salary Projections", desc: "10-year earning potential forecasts based on current market data", detail: "Accurate predictions" }
                ]
            },
            roi: {
                title: "ROI Calculator",
                description: "Make informed decisions about your education investment",
                cards: [
                    { icon: "💵", title: "Tuition vs Earnings", desc: "Comprehensive comparison of education costs with future income potential", detail: "Detailed analysis" },
                    { icon: "📉", title: "Break-even Analysis", desc: "Know exactly when you'll recover your educational investment", detail: "Timeline planning" },
                    { icon: "🔄", title: "Course Comparison", desc: "Side-by-side analysis of different programs and their value", detail: "Smart comparisons" },
                    { icon: "📅", title: "Long-term Projections", desc: "10-year financial outlook based on your chosen career path", detail: "Future planning" }
                ]
            },
            loan: {
                title: "Loan Eligibility",
                description: "Smart tools to plan your education financing",
                cards: [
                    { icon: "🏦", title: "EMI Calculator", desc: "Monthly installment planning with multiple tenure options", detail: "Flexible terms" },
                    { icon: "📊", title: "Bank Comparison", desc: "Compare interest rates and terms across leading banks", detail: "Best rates" },
                    { icon: "📈", title: "Rate Forecasts", desc: "Future interest rate predictions to plan your borrowing", detail: "Market insights" },
                    { icon: "🎓", title: "Scholarship Finder", desc: "Discover and apply for relevant funding opportunities", detail: "Save money" }
                ]
            },
            chatbot: {
                title: "AI Mentor",
                description: "Your 24/7 intelligent companion for academic success",
                cards: [
                    { icon: "💬", title: "Instant Responses", desc: "Get immediate answers to your study and career questions", detail: "24/7 available" },
                    { icon: "📚", title: "Study Recommendations", desc: "Personalized learning resources based on your progress", detail: "Smart suggestions" },
                    { icon: "❓", title: "Doubt Clarification", desc: "Clear explanations for complex topics and concepts", detail: "Deep understanding" },
                    { icon: "🎤", title: "Mock Interviews", desc: "Practice interviews with realistic AI-powered conversations", detail: "Build confidence" }
                ]
            },
            admission: {
                title: "Admission Predictor",
                description: "Data-driven insights for your college applications",
                cards: [
                    { icon: "🏛️", title: "College Comparison", desc: "Detailed analysis of rankings, fees, and placement records", detail: "Find your fit" },
                    { icon: "📊", title: "Cutoff Trends", desc: "Historical cutoff data to predict your admission chances", detail: "Smart predictions" },
                    { icon: "📅", title: "Deadline Tracker", desc: "Never miss important application dates and requirements", detail: "Stay on track" },
                    { icon: "📋", title: "Document Checklist", desc: "Complete list of required documents for each college", detail: "Be prepared" }
                ]
            },
            timeline: {
                title: "Smart Timeline",
                description: "Your personalized roadmap to academic success",
                cards: [
                    { icon: "📝", title: "Exam Schedules", desc: "All important exam dates organized in one place", detail: "Never miss" },
                    { icon: "⏰", title: "Smart Reminders", desc: "Automated notifications for deadlines and milestones", detail: "Stay informed" },
                    { icon: "📖", title: "Study Plan Generator", desc: "AI-crafted study schedules based on your pace", detail: "Personalized" },
                    { icon: "📈", title: "Progress Tracking", desc: "Visual dashboards to monitor your achievements", detail: "Track growth" }
                ]
            }
        };

        function renderIcon(iconName, className) {
            const icons = {
                Compass: '<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12 8l-4 8 8-4-8-4z"/>',
                Calculator: '<path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><path d="M8 6h8"/><path d="M8 10h8"/><path d="M8 14h4"/><path d="M16 14h4"/><path d="M8 18h8"/>',
                DollarSign: '<path d="M12 2v20"/><path d="M17 7H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
                MessageCircle: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
                Target: '<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6a6 6 0 1 0 6 6"/>',
                Calendar: '<path d="M4 7h16"/><path d="M16 3v4"/><path d="M8 3v4"/><path d="M3 11h18"/><path d="M12 15h.01"/><path d="M12 19h.01"/><path d="M16 15h.01"/><path d="M8 15h.01"/><path d="M8 19h.01"/><path d="M16 19h.01"/><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>',
                GraduationCap: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>'
            };
            return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="${className}">${icons[iconName] || icons.Compass}</svg>`;
        }

        function renderNavbar() {
            const navItemsHtml = navItems.map(item => `
                <button 
                    onclick="setActiveTab('${item.id}')"
                    class="group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        activeTab === item.id 
                            ? 'bg-indigo-900 text-white shadow-md'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }"
                >
                    ${renderIcon(item.icon, `transition-transform group-hover:scale-105`)}
                    <span class="text-sm font-medium">${item.label}</span>
                </button>
            `).join('');

            return `
                <nav class="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
                    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex justify-between items-center">
                            <div class="flex items-center space-x-3 py-3">
                                <div class="bg-gradient-to-br from-indigo-900 to-blue-900 p-2 rounded-xl shadow-md">
                                    ${renderIcon('GraduationCap', 'text-white')}
                                </div>
                                <div>
                                    <span class="font-bold text-xl text-gray-800">EduNexus</span>
                                    <span class="text-xs text-gray-400 block -mt-1">Premium Study Assistant</span>
                                </div>
                            </div>
                            
                            <div class="hidden md:flex space-x-1">
                                ${navItemsHtml}
                            </div>
                            
                            <div class="relative group">
                                <div class="w-9 h-9 bg-gradient-to-br from-indigo-900 to-blue-900 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md cursor-pointer transition-transform group-hover:scale-105">
                                    JD
                                </div>
                                <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                                    <div class="p-3 border-b border-gray-100">
                                        <p class="text-sm font-semibold text-gray-800">John Doe</p>
                                        <p class="text-xs text-gray-500">john@edunexus.com</p>
                                    </div>
                                    <div class="p-2">
                                        <button class="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-900 rounded-lg transition">My Profile</button>
                                        <button class="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-900 rounded-lg transition">Settings</button>
                                        <button class="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition">Sign Out</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            `;
        }

        function renderContent() {
            const currentContent = contentMap[activeTab];
            const premiumCardClasses = ['premium-card-1', 'premium-card-2', 'premium-card-3', 'premium-card-4'];
            
            return `
                <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 fade-up">
                    <!-- Hero Section -->
                    <div class="hero-premium rounded-2xl p-10 text-white mb-10 shadow-xl">
                        <h1 class="text-3xl font-bold mb-3 tracking-tight">${currentContent.title}</h1>
                        <p class="text-blue-100 text-base max-w-2xl">${currentContent.description}</p>
                    </div>
                    
                    <!-- Cards Grid - 2 per row -->
                    <div class="grid md:grid-cols-2 gap-6">
                        ${currentContent.cards.map((card, index) => `
                            <div class="${premiumCardClasses[index % 4]} rounded-xl p-7 card-premium cursor-pointer group relative overflow-hidden">
                                <!-- Premium accent line -->
                                <div class="absolute top-0 left-0 w-1 h-full bg-white/20 group-hover:bg-white/40 transition"></div>
                                
                                <div class="flex items-start gap-5">
                                    <!-- Icon Circle -->
                                    <div class="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <span class="text-3xl">${card.icon}</span>
                                    </div>
                                    
                                    <!-- Content -->
                                    <div class="flex-1">
                                        <h3 class="font-bold text-white text-lg mb-2">${card.title}</h3>
                                        <p class="text-blue-100 text-sm leading-relaxed mb-3">${card.desc}</p>
                                        <div class="flex items-center justify-between">
                                            <span class="text-xs text-blue-200/80 tracking-wide uppercase">${card.detail}</span>
                                            <span class="text-white/50 group-hover:text-white/80 transition">→</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <!-- AI Mentor Premium Card -->
                    <div class="mt-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
                        <div class="flex items-start gap-5">
                            <div class="w-12 h-12 rounded-xl bg-indigo-600/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                                <span class="text-2xl">🤖</span>
                            </div>
                            <div class="flex-1">
                                <p class="text-indigo-300 font-bold mb-1 text-sm tracking-wide">AI MENTOR INSIGHT</p>
                                <p class="text-gray-300 text-sm leading-relaxed">"Your educational journey is unique. Use these tools to explore possibilities and make confident decisions. I'm here to guide you 24/7."</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Stats Section - Premium -->
                    <div class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-5">
                        <div class="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div class="text-2xl font-bold text-indigo-900">10,000+</div>
                            <div class="text-xs text-gray-500 mt-1 uppercase tracking-wide">Students Guided</div>
                        </div>
                        <div class="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div class="text-2xl font-bold text-indigo-900">98%</div>
                            <div class="text-xs text-gray-500 mt-1 uppercase tracking-wide">Success Rate</div>
                        </div>
                        <div class="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div class="text-2xl font-bold text-indigo-900">24/7</div>
                            <div class="text-xs text-gray-500 mt-1 uppercase tracking-wide">AI Support</div>
                        </div>
                        <div class="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div class="text-2xl font-bold text-indigo-900">500+</div>
                            <div class="text-xs text-gray-500 mt-1 uppercase tracking-wide">Partner Colleges</div>
                        </div>
                    </div>
                </div>
            `;
        }

        function render() {
            const root = document.getElementById('root');
            if (root) {
                root.innerHTML = `
                    ${renderNavbar()}
                    ${renderContent()}
                    <footer class="text-center py-6 text-gray-400 text-xs border-t border-gray-200 mt-8 bg-white">
                        <p>© 2024 EduNexus — Premium AI Smart Study Assistant</p>
                    </footer>
                `;
            }
        }

        window.setActiveTab = (tabId) => {
            activeTab = tabId;
            render();
        };

        render();
    </script>
</body>
</html>
