<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>EduSmart AI | Admission Probability Predictor</title>
    <!-- Tailwind CSS v3 + Font Awesome for icons (optional but nice) + Google Fonts -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Override Tailwind config to match modern edu palette -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&display=swap" rel="stylesheet">
    <!-- Lucide icons are used in original; we simulate with simple SVG/data but will use FontAwesome for better rendering -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <!-- React and ReactDOM (for simulation, we embed demo as pure HTML/CSS/JS with state to mimic exactly the component) -->
    <script src="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.development.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.development.js"></script>
    <!-- For toast we use simple noty or custom; we'll implement toast with minimal inline -->
    <style>
        * {
            font-family: 'Inter', sans-serif;
        }
        /* Custom smooth transitions and gradient animations */
        .gradient-bg-header {
            background: linear-gradient(135deg, #0F2B3D 0%, #1B4F72 50%, #0E2F44 100%);
        }
        .edu-card {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .edu-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -12px rgba(0, 0, 0, 0.15);
        }
        .custom-ring:focus {
            outline: none;
            ring: 2px solid #2C7DA0;
            ring-offset: 2px;
        }
        .toast-message {
            animation: fadeInUp 0.3s ease forwards;
        }
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
        .result-card {
            backdrop-filter: blur(2px);
        }
        /* custom scroll */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
            background: #2C7DA0;
            border-radius: 10px;
        }
    </style>
</head>
<body class="bg-gradient-to-br from-slate-50 to-blue-50/30 antialiased">

    <!-- We will not use actual React rendering but build a pure JS replica of AdmissionPredictor component
         with state management, same logic, and beautiful color palette aligned with education & smart study AI -->
    <div id="root" class="max-w-6xl mx-auto p-4 md:p-6"></div>

    <script>
        // custom toast implementation (lightweight)
        function showToast(message, type = 'error') {
            const toastContainer = document.getElementById('toast-container');
            if (!toastContainer) {
                const container = document.createElement('div');
                container.id = 'toast-container';
                container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2';
                document.body.appendChild(container);
            }
            const containerFinal = document.getElementById('toast-container');
            const toastDiv = document.createElement('div');
            const bgColor = type === 'success' ? 'bg-emerald-600' : 'bg-rose-600';
            toastDiv.className = `${bgColor} text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 text-sm font-medium toast-message transition-all`;
            toastDiv.innerHTML = `<i class="${type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle'}"></i> <span>${message}</span>`;
            containerFinal.appendChild(toastDiv);
            setTimeout(() => {
                toastDiv.style.opacity = '0';
                toastDiv.style.transform = 'translateY(20px)';
                setTimeout(() => toastDiv.remove(), 300);
            }, 3000);
        }

        // Mock API call: simulate prediction with AI reasoning based on inputs
        // Using same interface as the original: predictAdmission({gpa, testScore, internships, university, course})
        const mockApi = {
            predictAdmission: (payload) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        const { gpa, testScore, internships, university, course } = payload;
                        // Intelligent algorithm: compute base probability
                        let prob = 0;
                        // GPA contribution (out of 10) -> max 50%
                        let gpaFactor = Math.min(50, (gpa / 10) * 50);
                        // testScore analysis: if contains GRE/GMAT/IELTS scores, parse simple logic
                        let testFactor = 0;
                        const testStr = testScore.toLowerCase();
                        if (testStr !== 'not taken' && testStr.trim() !== '') {
                            // extract numbers from test string
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
                        // internships contribution: max 15%
                        let internFactor = Math.min(15, internships * 3.5);
                        // university reputation factor based on keywords: max 15%
                        let uniFactor = 0;
                        const uniName = university.toLowerCase();
                        const eliteKeywords = ['stanford', 'mit', 'harvard', 'oxford', 'cambridge', 'caltech', 'eth', 'imperial', 'ucla', 'uc berkeley', 'yale', 'princeton'];
                        const goodKeywords = ['university of', 'state university', 'texas', 'michigan', 'toronto', 'mcgill', 'british columbia', 'melbourne', 'national university'];
                        if (eliteKeywords.some(k => uniName.includes(k))) uniFactor = 15;
                        else if (goodKeywords.some(k => uniName.includes(k))) uniFactor = 9;
                        else if (uniName.trim().length > 3) uniFactor = 5;
                        else uniFactor = 2;
                        
                        // course relevance minor boost
                        let courseFactor = 0;
                        const courseLow = course.toLowerCase();
                        if (courseLow.includes('cs') || courseLow.includes('computer') || courseLow.includes('data') || courseLow.includes('ai')) courseFactor = 3;
                        else if (courseLow.includes('business') || courseLow.includes('mba')) courseFactor = 2;
                        else courseFactor = 1;
                        
                        let rawProb = gpaFactor + testFactor + internFactor + uniFactor + courseFactor;
                        rawProb = Math.min(98, Math.max(12, rawProb));
                        const finalProb = Math.round(rawProb);
                        
                        // reasoning + strengths/weaknesses dynamic
                        let reasoning = "";
                        let strengths = [];
                        let weaknesses = [];
                        
                        if (finalProb >= 70) reasoning = "Excellent profile! Your academic and extracurricular background align strongly with the university's expectations. High chance of admission.";
                        else if (finalProb >= 50) reasoning = "Good potential! Your profile is competitive but consider enhancing test scores or gaining more relevant experience to boost chances.";
                        else reasoning = "Your application needs improvement. Focus on increasing GPA, preparing for standardized tests, and pursuing internships in your field.";
                        
                        if (gpa >= 8) strengths.push(`Strong GPA (${gpa}/10) shows academic excellence.`);
                        else if (gpa < 6) weaknesses.push(`GPA is below competitive threshold (${gpa}/10). Consider retaking courses or highlighting project work.`);
                        else strengths.push(`Satisfactory GPA (${gpa}/10) meets baseline criteria.`);
                        
                        if (testFactor > 12) strengths.push(`Competitive test score (${testScore}) gives you an edge.`);
                        else if (testScore === 'Not taken' || testStr === '' || testStr === 'not taken') weaknesses.push(`Test score missing: Many programs require GRE/GMAT/IELTS. Prepare and submit scores.`);
                        else if (testFactor < 6 && testScore !== 'Not taken') weaknesses.push(`Test score (${testScore}) is below average for top admits. Consider retaking.`);
                        
                        if (internships >= 2) strengths.push(`${internships} internship(s) demonstrate practical experience and initiative.`);
                        else if (internships === 1) strengths.push(`1 internship adds valuable industry exposure.`);
                        else weaknesses.push(`No internships reported. Add relevant work experience or projects.`);
                        
                        if (uniFactor >= 12) strengths.push(`Target university "${university}" is well-recognized, but competition is high — your profile stands out.`);
                        else if (uniFactor <= 4 && university.trim() !== "") weaknesses.push(`University prestige may impact decisions. Research scholarships and highlight unique strengths.`);
                        
                        if (courseFactor >= 2) strengths.push(`Course alignment with your profile is favorable.`);
                        
                        // limit to 4 items each
                        strengths = strengths.slice(0, 3);
                        weaknesses = weaknesses.slice(0, 3);
                        
                        resolve({
                            data: {
                                probability: finalProb,
                                reasoning: reasoning,
                                strengths: strengths,
                                weaknesses: weaknesses
                            }
                        });
                    }, 800);
                });
            }
        };
        
        // Simulate React Component using vanilla JS but replicate all interactions + UI with Tailwind
        // We'll build the entire AdmissionPredictor component inside root.
        
        let state = {
            formData: {
                gpa: '',
                testScore: '',
                internships: '',
                university: '',
                course: ''
            },
            result: null,
            loading: false
        };
        
        let listeners = [];
        
        function subscribe(listener) {
            listeners.push(listener);
            return () => { listeners = listeners.filter(l => l !== listener); };
        }
        
        function setState(newState) {
            Object.assign(state, newState);
            listeners.forEach(fn => fn());
        }
        
        function updateFormField(field, value) {
            setState({ formData: { ...state.formData, [field]: value }, result: state.result, loading: state.loading });
        }
        
        async function predictProbability() {
            if (!state.formData.gpa || !state.formData.university) {
                showToast('Please fill GPA and University name', 'error');
                return;
            }
            setState({ ...state, loading: true });
            try {
                const response = await mockApi.predictAdmission({
                    gpa: parseFloat(state.formData.gpa),
                    testScore: state.formData.testScore || 'Not taken',
                    internships: parseInt(state.formData.internships) || 0,
                    university: state.formData.university,
                    course: state.formData.course || 'Graduate Program'
                });
                setState({ ...state, result: response.data, loading: false });
                showToast('Prediction complete!', 'success');
            } catch (error) {
                setState({ ...state, loading: false });
                showToast('Error predicting admission', 'error');
                console.error(error);
            }
        }
        
        function getProbabilityColor(prob) {
            if (prob >= 70) return 'bg-emerald-100 text-emerald-800 border-l-4 border-emerald-500';
            if (prob >= 50) return 'bg-amber-100 text-amber-800 border-l-4 border-amber-500';
            return 'bg-rose-100 text-rose-800 border-l-4 border-rose-500';
        }
        
        // render full UI
        function renderApp() {
            const rootEl = document.getElementById('root');
            if (!rootEl) return;
            
            const { formData, result, loading } = state;
            
            const probabilityColorClass = result ? getProbabilityColor(result.probability) : '';
            
            rootEl.innerHTML = `
                <div class="animate-fade-in">
                    <!-- Header with new edu palette: deep teal + smart study accent -->
                    <div class="rounded-2xl mb-8 overflow-hidden shadow-xl bg-gradient-to-r from-[#0F2B3D] via-[#1A4A6F] to-[#0F2B3D] p-8 text-white">
                        <div class="flex items-center gap-3 flex-wrap">
                            <div class="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                                <i class="fas fa-graduation-cap text-3xl"></i>
                            </div>
                            <div>
                                <h1 class="text-3xl md:text-4xl font-bold tracking-tight">🎯 Admission Probability Predictor</h1>
                                <p class="text-sky-100/90 mt-1 text-base">AI-powered prediction of your admission chances — Smart Study Assistant</p>
                            </div>
                        </div>
                        <div class="mt-4 flex gap-2 text-sm text-sky-100">
                            <span class="bg-white/20 px-3 py-1 rounded-full"><i class="fas fa-chart-line mr-1"></i> Real-time ML simulation</span>
                            <span class="bg-white/20 px-3 py-1 rounded-full"><i class="fas fa-university mr-1"></i> Top university analytics</span>
                        </div>
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-8">
                        <!-- Left card: Form -->
                        <div class="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden edu-card">
                            <div class="bg-gradient-to-r from-slate-50 to-white px-6 py-4 border-b border-slate-100">
                                <h2 class="text-xl font-bold flex items-center gap-2 text-slate-800">
                                    <i class="fas fa-user-graduate text-indigo-600"></i>
                                    Your Academic Profile
                                </h2>
                            </div>
                            <div class="p-6">
                                <div class="space-y-5">
                                    <!-- GPA -->
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><i class="fas fa-star-of-life text-xs text-rose-500"></i> GPA/Percentage (out of 10) *</label>
                                        <input type="number" step="0.1" placeholder="e.g., 8.5" value="${formData.gpa}" id="gpaInput" class="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition outline-none shadow-sm">
                                    </div>
                                    <!-- Test Score -->
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-1"><i class="fas fa-file-alt mr-1 text-slate-500"></i> Test Score (GRE/GMAT/IELTS)</label>
                                        <input type="text" placeholder="e.g., GRE 320 or IELTS 7.5" value="${formData.testScore}" id="testScoreInput" class="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-300 outline-none">
                                    </div>
                                    <!-- Internships -->
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-1"><i class="fas fa-briefcase mr-1 text-slate-500"></i> Number of Internships</label>
                                        <input type="number" placeholder="e.g., 2" value="${formData.internships}" id="internshipsInput" class="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-300 outline-none">
                                    </div>
                                    <!-- University Name -->
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><i class="fas fa-university text-xs text-rose-500"></i> University Name *</label>
                                        <input type="text" placeholder="e.g., Stanford University, University of Toronto" value="${formData.university}" id="universityInput" class="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-300 outline-none">
                                    </div>
                                    <!-- Course Name -->
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-1"><i class="fas fa-book-open mr-1 text-slate-500"></i> Course Name</label>
                                        <input type="text" placeholder="e.g., MS in CS, MBA, Data Science" value="${formData.course}" id="courseInput" class="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-300 outline-none">
                                    </div>
                                    <button id="predictBtn" class="w-full bg-gradient-to-r from-indigo-700 to-sky-700 hover:from-indigo-800 hover:to-sky-800 text-white py-3.5 rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-3 text-base mt-2">
                                        ${loading ? '<i class="fas fa-circle-notch fa-spin"></i> Predicting...' : '<i class="fas fa-chart-simple"></i> Predict Admission Chance'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Right card: dynamic results or placeholder -->
                        <div class="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden edu-card min-h-[420px] flex flex-col">
                            <div class="bg-gradient-to-r from-slate-50 to-white px-6 py-4 border-b border-slate-100">
                                <h2 class="text-xl font-bold flex items-center gap-2 text-slate-800">
                                    <i class="fas fa-chart-line text-emerald-600"></i>
                                    Admission Insights
                                </h2>
                            </div>
                            <div class="p-6 flex-1">
                                ${!result ? `
                                    <div class="flex flex-col items-center justify-center h-full text-center py-12">
                                        <div class="bg-slate-100 rounded-full p-6 mb-4">
                                            <i class="fas fa-brain text-4xl text-indigo-400"></i>
                                        </div>
                                        <h3 class="text-xl font-semibold text-slate-700">AI Prediction Engine</h3>
                                        <p class="text-slate-500 mt-2 max-w-sm">Fill your profile details and click "Predict Admission Chance" to get personalized probability, strengths and improvement areas.</p>
                                        <div class="mt-6 flex flex-wrap gap-2 justify-center">
                                            <span class="text-xs bg-slate-100 px-3 py-1 rounded-full">📊 Based on GPA</span>
                                            <span class="text-xs bg-slate-100 px-3 py-1 rounded-full">🎓 University ranking</span>
                                            <span class="text-xs bg-slate-100 px-3 py-1 rounded-full">💼 Internship count</span>
                                        </div>
                                    </div>
                                ` : `
                                    <div class="space-y-5">
                                        <div class="text-center mb-2">
                                            <div class="inline-flex flex-col items-center gap-2 p-1">
                                                <div class="relative w-36 h-36 mx-auto">
                                                    <svg class="w-36 h-36 transform -rotate-90">
                                                        <circle cx="72" cy="72" r="64" stroke="#E2E8F0" stroke-width="12" fill="none"></circle>
                                                        <circle cx="72" cy="72" r="64" stroke="${result.probability >= 70 ? '#10B981' : (result.probability >= 50 ? '#F59E0B' : '#EF4444')}" stroke-width="12" fill="none" stroke-dasharray="${2 * Math.PI * 64}" stroke-dashoffset="${2 * Math.PI * 64 * (1 - result.probability/100)}" class="transition-all duration-700"></circle>
                                                    </svg>
                                                    <div class="absolute inset-0 flex flex-col items-center justify-center font-bold text-3xl">${result.probability}%</div>
                                                </div>
                                                <div class="mt-2 px-4 py-2 rounded-full ${getProbabilityColor(result.probability).split(' ')[0]} ${getProbabilityColor(result.probability).split(' ')[1]} text-base font-bold shadow-sm">
                                                    <i class="fas fa-percent mr-1"></i> Admission Chance
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="p-4 bg-sky-50 rounded-xl border border-sky-100">
                                            <p class="text-sky-800 text-sm leading-relaxed"><i class="fas fa-lightbulb mr-2 text-sky-600"></i>${result.reasoning}</p>
                                        </div>
                                        
                                        ${result.strengths && result.strengths.length > 0 ? `
                                            <div class="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                                                <p class="font-bold text-emerald-800 text-sm flex items-center gap-2 mb-2"><i class="fas fa-check-circle text-emerald-600"></i> ✅ Strengths</p>
                                                <ul class="text-sm space-y-1.5 text-emerald-700">
                                                    ${result.strengths.map(s => `<li class="flex gap-2"><i class="fas fa-plus-circle text-emerald-500 mt-0.5"></i><span>${s}</span></li>`).join('')}
                                                </ul>
                                            </div>
                                        ` : ''}
                                        
                                        ${result.weaknesses && result.weaknesses.length > 0 ? `
                                            <div class="p-4 bg-amber-50 rounded-xl border border-amber-100">
                                                <p class="font-bold text-amber-800 text-sm flex items-center gap-2 mb-2"><i class="fas fa-exclamation-triangle text-amber-600"></i> ⚠️ Areas to Improve</p>
                                                <ul class="text-sm space-y-1.5 text-amber-700">
                                                    ${result.weaknesses.map(w => `<li class="flex gap-2"><i class="fas fa-arrow-trend-down text-amber-500 mt-0.5"></i><span>${w}</span></li>`).join('')}
                                                </ul>
                                            </div>
                                        ` : ''}
                                        
                                        <div class="text-center text-xs text-slate-400 pt-2 border-t border-slate-100 mt-2">
                                            <i class="fas fa-robot"></i> AI recommendation based on historical admit patterns
                                        </div>
                                    </div>
                                `}
                            </div>
                        </div>
                    </div>
                    
                    <!-- extra educational note footer -->
                    <div class="mt-8 text-center text-sm text-slate-500 bg-white/60 rounded-xl p-3 border border-slate-100">
                        <i class="fas fa-chalkboard-user mr-1"></i> Smart Study AI Assistant — Predictive model uses GPA, test scores, internships & university reputation. 
                        <span class="hidden md:inline-block">| Get personalized guidance for master's & PhD admissions.</span>
                    </div>
                </div>
            `;
            
            // attach event listeners after innerHTML
            document.getElementById('gpaInput')?.addEventListener('input', (e) => updateFormField('gpa', e.target.value));
            document.getElementById('testScoreInput')?.addEventListener('input', (e) => updateFormField('testScore', e.target.value));
            document.getElementById('internshipsInput')?.addEventListener('input', (e) => updateFormField('internships', e.target.value));
            document.getElementById('universityInput')?.addEventListener('input', (e) => updateFormField('university', e.target.value));
            document.getElementById('courseInput')?.addEventListener('input', (e) => updateFormField('course', e.target.value));
            const predictBtn = document.getElementById('predictBtn');
            if (predictBtn) predictBtn.addEventListener('click', predictProbability);
        }
        
        // initial subscription
        subscribe(renderApp);
        renderApp();
    </script>
</body>
</html>
