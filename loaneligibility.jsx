<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>EduSmart AI | Education Loan Eligibility | Professional Suite</title>
    <!-- Tailwind CSS v3 + Inter Font -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        // Professional Navy & Indigo palette
                        'navy': {
                            50: '#f0f4fc',
                            100: '#d9e2f5',
                            200: '#b8c8ec',
                            300: '#8ca5df',
                            400: '#5f7ed0',
                            500: '#3b5db8',   // primary navy
                            600: '#2c4794',
                            700: '#1f356e',
                            800: '#17254d',
                            900: '#0e1733',
                        },
                        'indigo': {
                            50: '#eef2ff',
                            100: '#e0e7ff',
                            200: '#c7d2fe',
                            300: '#a5b4fc',
                            400: '#818cf8',
                            500: '#6366f1',   // vibrant indigo accent
                            600: '#4f46e5',
                            700: '#4338ca',
                            800: '#3730a3',
                            900: '#312e81',
                        },
                        'slate': {
                            50: '#f8fafc',
                            100: '#f1f5f9',
                            200: '#e2e8f0',
                            300: '#cbd5e1',
                            400: '#94a3b8',
                            500: '#64748b',
                            600: '#475569',
                            700: '#334155',
                            800: '#1e293b',
                            900: '#0f172a',
                        }
                    },
                    fontFamily: {
                        'sans': ['Inter', 'system-ui', 'Segoe UI', 'sans-serif'],
                    },
                    boxShadow: {
                        'card': '0 8px 30px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.02)',
                        'card-hover': '0 20px 35px -12px rgba(0, 0, 0, 0.12), 0 4px 12px -4px rgba(0, 0, 0, 0.05)',
                        'elegant': '0 10px 25px -5px rgba(31, 53, 110, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.02)',
                    }
                }
            }
        }
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap" rel="stylesheet">
    <style>
        /* Custom smooth transitions and professional touches */
        .gradient-navy {
            background: linear-gradient(135deg, #0e1733 0%, #1f356e 50%, #2c4794 100%);
        }
        .gradient-indigo-accent {
            background: linear-gradient(105deg, #4338ca 0%, #6366f1 100%);
        }
        .input-focus {
            transition: all 0.2s ease;
        }
        .input-focus:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
            ring: 2px solid #6366f1;
        }
        .card-hover-effect {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card-hover-effect:hover {
            transform: translateY(-4px);
            box-shadow: 0 25px 35px -12px rgba(15, 23, 42, 0.15);
        }
        .btn-primary {
            background: linear-gradient(105deg, #4338ca 0%, #6366f1 100%);
            transition: all 0.2s;
        }
        .btn-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 12px 20px -12px #4f46e5;
            background: linear-gradient(105deg, #4f46e5 0%, #818cf8 100%);
        }
        .btn-primary:active {
            transform: translateY(1px);
        }
        /* Scrollbar elegant */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #eef2ff;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
            background: #818cf8;
            border-radius: 10px;
        }
        body {
            background: linear-gradient(145deg, #f5f7fc 0%, #eef2fa 100%);
        }
        .badge-eligible {
            background: #ecfdf5;
            color: #065f46;
            border: 1px solid #a7f3d0;
        }
        .badge-noteligible {
            background: #fef2f2;
            color: #991b1b;
            border: 1px solid #fecaca;
        }
    </style>
</head>
<body class="font-sans antialiased">

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <!-- Hero Section with navy/indigo professional gradient -->
        <div class="gradient-navy rounded-2xl shadow-xl overflow-hidden mb-8 relative">
            <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
            <div class="relative p-6 md:p-8 lg:p-10">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-4xl drop-shadow-md">🏦</span>
                            <span class="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium tracking-wide text-indigo-100">AI-Powered Assessment</span>
                        </div>
                        <h1 class="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">Education Loan Eligibility</h1>
                        <p class="text-indigo-100 text-base md:text-lg max-w-xl leading-relaxed">Professional underwriting analysis • Real-time eligibility • Personalized loan offers for global education</p>
                    </div>
                    <div class="hidden md:flex bg-indigo-900/40 backdrop-blur-md rounded-xl px-5 py-2.5 border border-indigo-400/30 shadow-sm">
                        <span class="text-indigo-200 text-sm font-medium">✨ EduSmart Study AI Assistant</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Two Column Grid Layout -->
        <div class="grid lg:grid-cols-2 gap-8">
            <!-- Left Card: Application Details - Navy/Indigo subtle card -->
            <div class="bg-white rounded-2xl shadow-card border border-slate-200 overflow-hidden transition-all card-hover-effect">
                <div class="border-b border-slate-100 bg-slate-50/60 px-6 py-4">
                    <div class="flex items-center gap-3">
                        <div class="bg-indigo-100 p-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14 2 14 8 20 8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                                <polyline points="10 9 9 9 8 9"/>
                            </svg>
                        </div>
                        <h2 class="text-xl font-bold text-slate-800">Application Details</h2>
                    </div>
                </div>
                <div class="p-6 md:p-7 space-y-5">
                    <!-- Course Name -->
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-1.5">🎓 Course / Program Name</label>
                        <input type="text" id="courseName" placeholder="e.g., MSc in Finance, MBA Tech, MS Data Science" class="w-full p-3 border border-slate-200 rounded-xl focus:border-indigo-400 input-focus bg-slate-50/40 transition">
                    </div>
                    <!-- Co-applicant Income -->
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-1.5">Co-applicant Annual Income <span class="text-indigo-600">(INR lakhs)</span> <span class="text-red-500">*</span></label>
                        <div class="relative">
                            <span class="absolute left-3 top-3 text-slate-500 font-medium">₹</span>
                            <input type="number" id="coApplicantIncome" placeholder="e.g., 12.5" class="w-full p-3 pl-8 border border-slate-200 rounded-xl focus:border-indigo-400 input-focus bg-slate-50/40">
                        </div>
                    </div>
                    <!-- Loan Amount Required -->
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-1.5">Loan Amount Required <span class="text-indigo-600">(INR lakhs)</span> <span class="text-red-500">*</span></label>
                        <div class="relative">
                            <span class="absolute left-3 top-3 text-slate-500 font-medium">₹</span>
                            <input type="number" id="loanAmount" placeholder="e.g., 40" class="w-full p-3 pl-8 border border-slate-200 rounded-xl focus:border-indigo-400 input-focus bg-slate-50/40">
                        </div>
                    </div>
                    <!-- Two Column: Duration & University Tier -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-1.5">📅 Course Duration</label>
                            <select id="courseDuration" class="w-full p-3 border border-slate-200 rounded-xl bg-slate-50/40 focus:border-indigo-400 input-focus">
                                <option value="1">1 Year</option>
                                <option value="2" selected>2 Years</option>
                                <option value="3">3+ Years</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-1.5">🏛️ University Tier</label>
                            <select id="universityTier" class="w-full p-3 border border-slate-200 rounded-xl bg-slate-50/40 focus:border-indigo-400 input-focus">
                                <option value="Tier 1">Tier 1 (Ivy / IIT / Top Global)</option>
                                <option value="Tier 2" selected>Tier 2 (Reputed National/International)</option>
                                <option value="Tier 3">Tier 3 (Emerging / Regional)</option>
                            </select>
                        </div>
                    </div>
                    <!-- Check Eligibility Button -->
                    <button id="checkEligibilityBtn" class="btn-primary w-full text-white py-3.5 rounded-xl font-bold text-lg shadow-md flex items-center justify-center gap-2 transition-all duration-200 mt-2">
                        <svg id="btnIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="1" x2="12" y2="23"/>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                        </svg>
                        <span id="btnText">Check Eligibility</span>
                    </button>
                    <p class="text-xs text-slate-400 text-center pt-1">*Fields with asterisk are mandatory for accurate AI underwriting</p>
                </div>
            </div>

            <!-- Right Panel: Dynamic Eligibility Result - Professional styling -->
            <div id="resultCard" class="bg-white rounded-2xl shadow-card border border-slate-200 overflow-hidden transition-all card-hover-effect">
                <div class="border-b border-slate-100 bg-slate-50/60 px-6 py-4">
                    <div class="flex items-center gap-3">
                        <div class="bg-indigo-100 p-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="1.8">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="m9 12 2 2 4-4"/>
                            </svg>
                        </div>
                        <h2 class="text-xl font-bold text-slate-800">🎯 Eligibility Verdict</h2>
                    </div>
                </div>
                <div id="dynamicResult" class="p-6 md:p-7 transition-all duration-300">
                    <!-- Placeholder state with navy accent -->
                    <div class="flex flex-col items-center justify-center py-12 text-center">
                        <div class="bg-indigo-50 rounded-full p-4 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="1.2">
                                <path d="M22 12h-4l-3 9-4-18-3 9H2"/>
                            </svg>
                        </div>
                        <p class="text-slate-500 font-medium">Awaiting assessment</p>
                        <p class="text-sm text-slate-400 mt-1 max-w-xs">Complete the loan application form and click "Check Eligibility" to receive a professional underwriting analysis.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer brand note -->
        <div class="mt-12 text-center border-t border-slate-200/70 pt-6">
            <p class="text-slate-500 text-sm">🔍 <span class="font-semibold text-indigo-800">EduSmart AI Study Assistant</span> — Intelligent loan eligibility with real-time margin & document insights. Secure & confidential.</p>
        </div>
    </div>

    <script>
        // DOM elements
        const courseInput = document.getElementById('courseName');
        const coIncomeInput = document.getElementById('coApplicantIncome');
        const loanAmountInput = document.getElementById('loanAmount');
        const durationSelect = document.getElementById('courseDuration');
        const uniTierSelect = document.getElementById('universityTier');
        const checkBtn = document.getElementById('checkEligibilityBtn');
        const btnTextSpan = document.getElementById('btnText');
        const btnIconSpan = document.getElementById('btnIcon');
        const dynamicResultDiv = document.getElementById('dynamicResult');
        
        // Loading state handler
        function setLoading(isLoading) {
            if (isLoading) {
                btnTextSpan.innerText = 'Analyzing...';
                btnIconSpan.innerHTML = '<svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-dasharray="32"/><path d="M12 2a10 10 0 1 0 10 10"/></svg>';
                checkBtn.disabled = true;
                checkBtn.classList.add('opacity-80', 'cursor-not-allowed');
            } else {
                btnTextSpan.innerText = 'Check Eligibility';
                btnIconSpan.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>';
                checkBtn.disabled = false;
                checkBtn.classList.remove('opacity-80', 'cursor-not-allowed');
            }
        }
        
        // Professional toast notification (matches navy/indigo theme)
        function showToast(message, type) {
            const existingToast = document.querySelector('.custom-toast-pro');
            if(existingToast) existingToast.remove();
            
            const toastDiv = document.createElement('div');
            const bgGradient = type === 'error' ? 'bg-gradient-to-r from-red-600 to-rose-700' : 'bg-gradient-to-r from-indigo-700 to-indigo-800';
            toastDiv.className = `custom-toast-pro fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-xl shadow-2xl text-white font-medium transition-all duration-300 animate-bounceIn ${bgGradient}`;
            toastDiv.innerHTML = `${type === 'error' ? '⚠️' : '✅'} ${message}`;
            document.body.appendChild(toastDiv);
            setTimeout(() => {
                toastDiv.style.opacity = '0';
                setTimeout(() => toastDiv.remove(), 300);
            }, 2800);
        }
        
        // Eligibility engine based on underwriting logic (professional financial model)
        function computeEligibility(course, coIncome, loanReq, durationYears, uniTier) {
            let eligible = false;
            let maxLoanAmount = 0;
            let interestRate = 8.9;
            let marginMoney = 15;
            let requiredDocuments = [
                "Valid admission offer letter",
                "Co-applicant income proof (ITR / Form 16 / Salary slips)",
                "Academic transcripts (last degree)",
                "Government ID proof (PAN / Aadhaar / Passport)"
            ];
            let suggestions = "";
            
            // income multiplier based on university tier
            let tierFactor = 1.0;
            if (uniTier === 'Tier 1') tierFactor = 6.2;
            else if (uniTier === 'Tier 2') tierFactor = 4.8;
            else tierFactor = 3.5;
            
            // adjustment based on course duration: longer duration may slightly reduce max loan
            let durationAdjust = 1.0;
            if (durationYears >= 3) durationAdjust = 0.88;
            else if (durationYears <= 1) durationAdjust = 1.05;
            else durationAdjust = 1.0;
            
            let rawCapacity = coIncome * tierFactor * durationAdjust;
            maxLoanAmount = Math.floor(rawCapacity * 10) / 10;
            if (maxLoanAmount < 4) maxLoanAmount = 4;
            if (maxLoanAmount > 150) maxLoanAmount = 150; // cap
            
            const minIncomeThreshold = 3.5; // lakhs per annum
            
            if (coIncome >= minIncomeThreshold && loanReq <= maxLoanAmount && loanReq > 0) {
                eligible = true;
            } else if (coIncome < minIncomeThreshold) {
                suggestions = `Minimum co-applicant annual income should be at least ${minIncomeThreshold} Lakhs INR. Consider adding a joint co-applicant (parent/spouse) to strengthen profile.`;
            } else if (loanReq > maxLoanAmount) {
                suggestions = `Maximum eligible loan amount based on financial profile is ₹${maxLoanAmount} lakhs. You may reduce the loan requirement, increase down payment, or explore external scholarships.`;
            } else {
                suggestions = "Eligibility can be enhanced by providing additional collateral or including a co-applicant with higher stable income.";
            }
            
            // dynamic interest rate and margin money for eligible cases
            if (eligible) {
                if (uniTier === 'Tier 1') {
                    interestRate = 7.85;
                    marginMoney = 10;
                } else if (uniTier === 'Tier 2') {
                    interestRate = 8.65;
                    marginMoney = 15;
                } else {
                    interestRate = 9.45;
                    marginMoney = 20;
                }
                // lower margin if loan amount is <= 60% of max eligibility
                if (loanReq <= maxLoanAmount * 0.6) marginMoney = Math.max(5, marginMoney - 5);
                suggestions = `✅ Pre-approved! You qualify for a loan up to ₹${maxLoanAmount} lakhs at ${interestRate}% p.a. based on income & university ranking. Speak to a loan advisor for faster processing.`;
            } else {
                // not eligible: specific document or collateral suggestions
                if (coIncome < minIncomeThreshold) {
                    suggestions = `Low co-applicant income (₹${coIncome} lakhs). Minimum requirement ₹${minIncomeThreshold} lakhs. Add another earning co-applicant or provide fixed deposit as security.`;
                } else if (loanReq > maxLoanAmount) {
                    suggestions = `Requested loan ₹${loanReq} lakhs exceeds our max approval of ₹${maxLoanAmount} lakhs. Consider arranging margin money (${Math.round((loanReq - maxLoanAmount)/loanReq * 100)}% of total) or reduce loan by ${(loanReq - maxLoanAmount).toFixed(1)} lakhs.`;
                }
                interestRate = 10.2;
                marginMoney = 25;
                requiredDocuments.push("Collateral/Property valuation report (if applicable)");
            }
            
            // additional document for Tier1/Tier2
            if (uniTier === 'Tier 1' && eligible) requiredDocuments.push("Scholarship/Financial aid award letter (if any)");
            requiredDocuments = [...new Map(requiredDocuments.map(doc => [doc, doc])).values()].slice(0,5);
            
            return {
                eligible: eligible,
                maxLoanAmount: maxLoanAmount.toFixed(1),
                interestRate: interestRate.toFixed(1),
                marginMoney: marginMoney,
                requiredDocuments: requiredDocuments,
                suggestions: suggestions
            };
        }
        
        // Render Eligibility Results with professional navy/indigo styling
        function renderResult(eligibility) {
            const { eligible, maxLoanAmount, interestRate, marginMoney, requiredDocuments, suggestions } = eligibility;
            
            let resultHTML = `
                <div class="text-center mb-6">
                    ${eligible ? 
                        `<div class="inline-flex items-center gap-2 badge-eligible px-5 py-2.5 rounded-full shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            <span class="font-bold text-emerald-800">Pre-Approved</span>
                        </div>` : 
                        `<div class="inline-flex items-center gap-2 badge-noteligible px-5 py-2.5 rounded-full shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            <span class="font-bold text-red-700">Under Review / Not Eligible</span>
                        </div>`
                    }
                </div>
                
                <div class="bg-slate-50 rounded-xl p-5 space-y-3 border border-slate-100">
                    <div class="flex justify-between items-center py-2 border-b border-slate-200">
                        <span class="font-medium text-slate-700">🏦 Max Eligible Loan:</span>
                        <span class="font-extrabold text-indigo-700 text-xl">₹${maxLoanAmount} lakhs</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-slate-200">
                        <span class="font-medium text-slate-700">📊 Interest Rate (p.a.):</span>
                        <span class="font-bold text-slate-800">${interestRate}%</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-slate-200">
                        <span class="font-medium text-slate-700">💵 Margin Money:</span>
                        <span class="font-semibold text-slate-800">${marginMoney}%</span>
                    </div>
                </div>
                
                <div class="mt-5">
                    <p class="text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        Required Documentation
                    </p>
                    <ul class="text-sm space-y-2 ml-1">
                        ${requiredDocuments.map(doc => `<li class="flex items-start gap-2 text-slate-600"><span class="text-indigo-500 text-base">▹</span> ${doc}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="mt-6 p-4 bg-indigo-50/50 rounded-xl border-l-4 border-indigo-500 shadow-sm">
                    <p class="text-sm text-indigo-900 font-medium flex gap-2 items-start">
                        <span class="text-indigo-600 mt-0.5">💡</span>
                        <span>${suggestions}</span>
                    </p>
                </div>
                ${eligible ? 
                    `<button id="applyNowProBtn" class="mt-6 w-full bg-indigo-700 hover:bg-indigo-800 text-white py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2">✨ Proceed to Application →</button>` : 
                    `<div class="mt-5 text-center text-xs text-slate-400 border-t pt-4">*Review suggestions above to enhance eligibility profile</div>`
                }
            `;
            
            dynamicResultDiv.innerHTML = resultHTML;
            if (eligible) {
                const applyBtn = document.getElementById('applyNowProBtn');
                if (applyBtn) {
                    applyBtn.addEventListener('click', () => {
                        showToast("Redirecting to secure loan application portal (demo)", "success");
                    });
                }
            }
        }
        
        // Main handler
        async function handleCheck() {
            const coIncomeRaw = coIncomeInput.value;
            const loanRaw = loanAmountInput.value;
            if (!coIncomeRaw || !loanRaw) {
                showToast("Please enter both co-applicant income and loan amount", "error");
                return;
            }
            const coIncome = parseFloat(coIncomeRaw);
            const loanReq = parseFloat(loanRaw);
            if (isNaN(coIncome) || isNaN(loanReq) || coIncome <= 0 || loanReq <= 0) {
                showToast("Please enter valid positive numbers for income and loan amount", "error");
                return;
            }
            const course = courseInput.value.trim() || "Higher Education Program";
            const duration = parseInt(durationSelect.value);
            const uniTier = uniTierSelect.value;
            
            setLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 750));
                const result = computeEligibility(course, coIncome, loanReq, duration, uniTier);
                renderResult(result);
                showToast("Eligibility analysis complete", "success");
            } catch (err) {
                showToast("Error processing eligibility request", "error");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        
        // Attach event
        checkBtn.addEventListener('click', handleCheck);
        
        // Add keyframe animation
        const styleAnim = document.createElement("style");
        styleAnim.textContent = `
            @keyframes bounceIn {
                0% { opacity: 0; transform: translate(-50%, 20px); }
                60% { opacity: 1; transform: translate(-50%, -3px); }
                100% { opacity: 1; transform: translate(-50%, 0); }
            }
            .animate-bounceIn {
                animation: bounceIn 0.28s ease forwards;
            }
        `;
        document.head.appendChild(styleAnim);
    </script>
</body>
</html>
