<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>EduSmart AI | Smart University Matcher with Financial Guidance</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        * { font-family: 'Inter', sans-serif; }
        .hero-gradient { background: linear-gradient(135deg, #0F2B3D 0%, #1A4A6F 50%, #0F2B3D 100%); }
        .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 25px -12px rgba(0, 0, 0, 0.15); }
        .financial-card { background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); }
        .modal-backdrop { background-color: rgba(15, 43, 61, 0.75); backdrop-filter: blur(4px); }
        
        /* Fixed badge styles with proper contrast */
        .badge-high { background-color: #10b981; color: white; }
        .badge-medium { background-color: #f59e0b; color: white; }
        .badge-low { background-color: #ef4444; color: white; }
        
        .badge-within { background-color: #10b981; color: white; }
        .badge-small-gap { background-color: #f59e0b; color: white; }
        .badge-medium-gap { background-color: #3b82f6; color: white; }
        .badge-large-gap { background-color: #8b5cf6; color: white; }
        
        /* Card background variations */
        .card-within { border-left: 4px solid #10b981; background: linear-gradient(to right, #ffffff, #f0fdf4); }
        .card-manageable { border-left: 4px solid #3b82f6; background: linear-gradient(to right, #ffffff, #eff6ff); }
        .card-scholarship { border-left: 4px solid #8b5cf6; background: linear-gradient(to right, #ffffff, #f5f3ff); }
    </style>
</head>
<body class="bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">

    <div id="app" class="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8"></div>

    <script>
        function showToast(message, type) {
            let container = document.getElementById('toast-container');
            if (!container) {
                container = document.createElement('div');
                container.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-2.5';
                container.id = 'toast-container';
                document.body.appendChild(container);
            }
            const toast = document.createElement('div');
            const bg = type === 'success' ? 'bg-gradient-to-r from-emerald-600 to-teal-700' : 'bg-gradient-to-r from-rose-600 to-red-700';
            toast.className = bg + ' text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm font-semibold';
            toast.innerHTML = '<i class="' + (type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle') + ' text-lg"></i><span>' + message + '</span>';
            container.appendChild(toast);
            setTimeout(function() { toast.remove(); }, 4000);
        }

        // Expanded University Database
        const universitiesDB = [
            { name: "Massachusetts Institute of Technology (MIT)", country: "USA", costLakhs: 55, minScore: 88, deadline: "Dec 15", roi: "$130k avg starting salary", scholarships: "Need-blind, up to 100%", partTimeWork: "$15-25/hr" },
            { name: "Stanford University", country: "USA", costLakhs: 58, minScore: 86, deadline: "Jan 5", roi: "$145k avg starting salary", scholarships: "Knight-Hennessy, need-based", partTimeWork: "$18-30/hr" },
            { name: "Harvard University", country: "USA", costLakhs: 56, minScore: 89, deadline: "Jan 1", roi: "$140k avg starting salary", scholarships: "Generous need-based aid", partTimeWork: "$15-25/hr" },
            { name: "University of Cambridge", country: "UK", costLakhs: 45, minScore: 85, deadline: "Mar 31", roi: "£65k avg salary", scholarships: "Gates Cambridge, Commonwealth", partTimeWork: "£12-18/hr" },
            { name: "University of Oxford", country: "UK", costLakhs: 48, minScore: 87, deadline: "Jan 19", roi: "£68k avg salary", scholarships: "Rhodes, Clarendon", partTimeWork: "£12-18/hr" },
            { name: "Imperial College London", country: "UK", costLakhs: 50, minScore: 86, deadline: "Jan 31", roi: "£70k avg salary", scholarships: "President's Scholarships", partTimeWork: "£14-20/hr" },
            { name: "University of Toronto", country: "Canada", costLakhs: 32, minScore: 82, deadline: "Feb 1", roi: "CAD $85k avg salary", scholarships: "Lester B. Pearson", partTimeWork: "CAD $16-22/hr" },
            { name: "University of British Columbia", country: "Canada", costLakhs: 30, minScore: 80, deadline: "Jan 31", roi: "CAD $80k avg salary", scholarships: "International Scholars Program", partTimeWork: "CAD $15-20/hr" },
            { name: "McGill University", country: "Canada", costLakhs: 28, minScore: 81, deadline: "Feb 15", roi: "CAD $78k avg salary", scholarships: "McGill Entrance Scholarship", partTimeWork: "CAD $15-20/hr" },
            { name: "University of Melbourne", country: "Australia", costLakhs: 35, minScore: 78, deadline: "Apr 30", roi: "AUD $90k avg salary", scholarships: "Melbourne International", partTimeWork: "AUD $21-28/hr" },
            { name: "Australian National University", country: "Australia", costLakhs: 34, minScore: 80, deadline: "May 15", roi: "AUD $88k avg salary", scholarships: "ANU Chancellor's", partTimeWork: "AUD $21-28/hr" },
            { name: "Technical University of Munich", country: "Germany", costLakhs: 12, minScore: 75, deadline: "Mar 15", roi: "€65k avg salary", scholarships: "DAAD, Deutschlandstipendium", partTimeWork: "€12-18/hr" },
            { name: "LMU Munich", country: "Germany", costLakhs: 10, minScore: 73, deadline: "Jul 1", roi: "€62k avg salary", scholarships: "DAAD scholarships", partTimeWork: "€12-16/hr" },
            { name: "Heidelberg University", country: "Germany", costLakhs: 11, minScore: 74, deadline: "Jun 15", roi: "€60k avg salary", scholarships: "Heidelberg Excellence", partTimeWork: "€11-15/hr" },
            { name: "RWTH Aachen", country: "Germany", costLakhs: 11, minScore: 74, deadline: "Mar 1", roi: "€63k avg salary", scholarships: "RWTH International", partTimeWork: "€12-17/hr" },
            { name: "National University of Singapore", country: "Singapore", costLakhs: 42, minScore: 84, deadline: "Dec 30", roi: "SGD $85k avg salary", scholarships: "NUS Global Merit", partTimeWork: "SGD $12-18/hr" },
            { name: "Nanyang Technological University", country: "Singapore", costLakhs: 40, minScore: 83, deadline: "Jan 15", roi: "SGD $82k avg salary", scholarships: "NTU Scholarship", partTimeWork: "SGD $12-18/hr" },
            { name: "University of Amsterdam", country: "Netherlands", costLakhs: 18, minScore: 76, deadline: "Apr 1", roi: "€55k avg salary", scholarships: "Amsterdam Merit", partTimeWork: "€12-16/hr" },
            { name: "KU Leuven", country: "Belgium", costLakhs: 8, minScore: 72, deadline: "Mar 1", roi: "€58k avg salary", scholarships: "Science@Leuven", partTimeWork: "€11-15/hr" },
            { name: "University of Copenhagen", country: "Denmark", costLakhs: 9, minScore: 73, deadline: "Mar 15", roi: "€60k avg salary", scholarships: "Danish Government Scholarships", partTimeWork: "€13-18/hr" }
        ];

        let appState = {
            interest: 'Computer Science',
            budget: '30',
            academicScore: '70',
            preferredCountry: 'Any',
            recommendations: [],
            loading: false,
            selectedUni: null
        };

        function assessFinancialSituation(costLakhs, userBudgetLakhs, university) {
            const gap = costLakhs - userBudgetLakhs;
            
            if (userBudgetLakhs >= costLakhs) {
                return {
                    status: 'within_budget',
                    badge: 'Within Budget',
                    badgeClass: 'badge-within',
                    message: 'Your budget covers the full estimated cost. No loan needed!',
                    loanRequired: 0,
                    monthlyEmi: 0,
                    recommendation: 'Direct admission - financially comfortable'
                };
            } else if (gap <= 15) {
                return {
                    status: 'small_gap',
                    badge: 'Small Gap - Easy Loan',
                    badgeClass: 'badge-small-gap',
                    message: 'Only ₹' + gap + 'L additional needed. High approval chance for education loan.',
                    loanRequired: gap,
                    monthlyEmi: Math.round(gap * 1100),
                    recommendation: 'Education loan easily approved'
                };
            } else if (gap <= 35) {
                return {
                    status: 'medium_gap',
                    badge: 'Loan + Part-time Work',
                    badgeClass: 'badge-medium-gap',
                    message: '₹' + gap + 'L loan needed. Part-time work can help with living expenses.',
                    loanRequired: gap,
                    monthlyEmi: Math.round(gap * 1100),
                    recommendation: 'Combine education loan with part-time work'
                };
            } else {
                return {
                    status: 'large_gap',
                    badge: 'Scholarship Opportunity',
                    badgeClass: 'badge-large-gap',
                    message: '₹' + gap + 'L gap. Many students get 20-50% scholarships at this university.',
                    loanRequired: gap,
                    monthlyEmi: Math.round(gap * 1100),
                    recommendation: 'Apply for scholarships first'
                };
            }
        }

        function getCardClass(financial) {
            if (financial.status === 'within_budget') return 'card-within';
            if (financial.status === 'small_gap' || financial.status === 'medium_gap') return 'card-manageable';
            return 'card-scholarship';
        }

        function getProbClass(prob) {
            if (prob === 'High') return 'badge-high';
            if (prob === 'Medium') return 'badge-medium';
            return 'badge-low';
        }

        function getProbText(prob) {
            if (prob === 'High') return 'High Chance';
            if (prob === 'Medium') return 'Medium Chance';
            return 'Low Chance';
        }

        async function getRecommendations() {
            if (!appState.interest.trim()) {
                showToast('Please enter your field of interest', 'error');
                return;
            }
            
            appState.loading = true;
            appState.recommendations = [];
            renderApp();
            
            await new Promise(resolve => setTimeout(resolve, 800));
            
            const scoreNum = parseFloat(appState.academicScore) || 70;
            const budgetNum = parseFloat(appState.budget) || 30;
            const interestLower = appState.interest.toLowerCase();
            
            let filtered = [...universitiesDB];
            
            if (appState.preferredCountry && appState.preferredCountry !== 'Any') {
                filtered = filtered.filter(function(uni) { return uni.country === appState.preferredCountry; });
            }
            
            const recommendations = filtered.map(function(uni) {
                let admissionProb = '';
                if (scoreNum >= uni.minScore) admissionProb = 'High';
                else if (scoreNum >= uni.minScore - 10) admissionProb = 'Medium';
                else admissionProb = 'Low';
                
                const financial = assessFinancialSituation(uni.costLakhs, budgetNum, uni);
                
                let bestCourse = "Graduate Program";
                if (interestLower.indexOf('computer') !== -1 || interestLower.indexOf('cs') !== -1 || interestLower.indexOf('data') !== -1) {
                    bestCourse = "Computer Science / Data Science";
                } else if (interestLower.indexOf('business') !== -1 || interestLower.indexOf('mba') !== -1) {
                    bestCourse = "MBA / Business Analytics";
                } else if (interestLower.indexOf('engineer') !== -1) {
                    bestCourse = "Engineering / Robotics";
                } else if (interestLower.indexOf('finance') !== -1) {
                    bestCourse = "Finance / Economics";
                }
                
                return {
                    name: uni.name,
                    country: uni.country,
                    costLakhs: uni.costLakhs,
                    minScore: uni.minScore,
                    deadline: uni.deadline,
                    roi: uni.roi,
                    scholarships: uni.scholarships,
                    partTimeWork: uni.partTimeWork,
                    course: bestCourse,
                    admissionProbability: admissionProb,
                    financial: financial,
                    matchScore: scoreNum >= uni.minScore ? 100 : (scoreNum / uni.minScore) * 100
                };
            });
            
            recommendations.sort(function(a, b) {
                var probOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
                var probDiff = probOrder[b.admissionProbability] - probOrder[a.admissionProbability];
                if (probDiff !== 0) return probDiff;
                return a.costLakhs - b.costLakhs;
            });
            
            appState.recommendations = recommendations;
            appState.loading = false;
            renderApp();
            showToast('Found ' + recommendations.length + ' universities matching your profile!', 'success');
        }

        function renderApp() {
            var root = document.getElementById('app');
            if (!root) return;
            
            var state = appState;
            var interest = state.interest;
            var budget = state.budget;
            var academicScore = state.academicScore;
            var preferredCountry = state.preferredCountry;
            var recommendations = state.recommendations;
            var loading = state.loading;
            var selectedUni = state.selectedUni;
            
            var countries = ['Any', 'USA', 'UK', 'Canada', 'Australia', 'Germany', 'Singapore', 'Netherlands', 'Belgium', 'Denmark'];
            
            var affordableUnis = [];
            var manageableUnis = [];
            var scholarshipUnis = [];
            
            for (var i = 0; i < recommendations.length; i++) {
                var uni = recommendations[i];
                if (uni.financial.status === 'within_budget') {
                    affordableUnis.push(uni);
                } else if (uni.financial.status === 'small_gap' || uni.financial.status === 'medium_gap') {
                    manageableUnis.push(uni);
                } else {
                    scholarshipUnis.push(uni);
                }
            }
            
            var html = '<div class="space-y-8">';
            
            // Hero Header
            html += '<div class="hero-gradient rounded-2xl p-6 md:p-8 text-white shadow-xl">';
            html += '<div class="flex items-center gap-3 mb-3">';
            html += '<i class="fas fa-graduation-cap text-3xl bg-white/20 p-2 rounded-2xl"></i>';
            html += '<h1 class="text-3xl md:text-4xl font-extrabold">🎓 AI Career Navigator</h1>';
            html += '</div>';
            html += '<p class="text-blue-100 text-base max-w-2xl">Smart university matching with budget analysis, scholarship info & part-time work estimates</p>';
            html += '<div class="flex flex-wrap gap-2 mt-4">';
            html += '<span class="bg-white/20 px-3 py-1.5 rounded-full text-xs"><i class="fas fa-chart-line mr-1"></i> ML Predictions</span>';
            html += '<span class="bg-white/20 px-3 py-1.5 rounded-full text-xs"><i class="fas fa-rupee-sign mr-1"></i> Budget Analysis</span>';
            html += '<span class="bg-white/20 px-3 py-1.5 rounded-full text-xs"><i class="fas fa-hand-holding-usd mr-1"></i> Loan Assessment</span>';
            html += '<span class="bg-white/20 px-3 py-1.5 rounded-full text-xs"><i class="fas fa-clock mr-1"></i> Part-time Work</span>';
            html += '</div></div>';
            
            // Budget Info Banner
            html += '<div class="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">';
            html += '<div class="flex items-start gap-3">';
            html += '<i class="fas fa-lightbulb text-amber-600 text-xl mt-0.5"></i>';
            html += '<div class="text-sm">';
            html += '<p class="font-semibold text-amber-800">💡 Understanding Your Budget of ₹' + budget + ' Lakhs</p>';
            html += '<p class="text-amber-700 mt-1">This is your upfront amount for 1st year fees + living expenses. Many students cover gaps through: ';
            html += '<span class="font-medium">education loans (easy approval for top unis), scholarships (20-100% tuition), and part-time work (₹8-15 Lakhs/year)</span>.';
            html += ' Don\'t let a higher fee discourage you!</p>';
            html += '</div></div></div>';
            
            // Input Form
            html += '<div class="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">';
            html += '<div class="bg-slate-50 px-6 py-4 border-b border-slate-100">';
            html += '<h2 class="text-xl font-bold text-slate-800"><i class="fas fa-user-graduate text-indigo-600 mr-2"></i>Your Profile</h2>';
            html += '</div><div class="p-6">';
            html += '<div class="grid md:grid-cols-2 gap-6">';
            
            html += '<div><label class="block text-sm font-semibold text-gray-700 mb-2"><i class="fas fa-heart text-rose-500 mr-1"></i> Field of Interest *</label>';
            html += '<input type="text" id="interestInput" placeholder="e.g., Computer Science, MBA, Data Science" value="' + interest.replace(/"/g, '&quot;') + '" class="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-300"></div>';
            
            html += '<div><label class="block text-sm font-semibold text-gray-700 mb-2"><i class="fas fa-rupee-sign text-emerald-600 mr-1"></i> Your Budget (INR Lakhs) - 1st Year</label>';
            html += '<input type="number" id="budgetInput" value="' + budget + '" class="w-full p-3 border rounded-xl">';
            html += '<p class="text-xs text-gray-500 mt-1">*Your available funds for tuition + living expenses (1st year)</p></div>';
            
            html += '<div><label class="block text-sm font-semibold text-gray-700 mb-2"><i class="fas fa-globe text-sky-600 mr-1"></i> Preferred Country</label>';
            html += '<select id="countrySelect" class="w-full p-3 border rounded-xl bg-white">';
            for (var c = 0; c < countries.length; c++) {
                var selected = (preferredCountry === countries[c]) ? 'selected' : '';
                html += '<option value="' + countries[c] + '" ' + selected + '>' + countries[c] + '</option>';
            }
            html += '</select></div>';
            
            html += '<div><label class="block text-sm font-semibold text-gray-700 mb-2"><i class="fas fa-chart-line text-indigo-500 mr-1"></i> Academic Score: <span id="scoreValue">' + academicScore + '</span>%</label>';
            html += '<input type="range" id="scoreSlider" min="50" max="100" step="1" value="' + academicScore + '" class="w-full accent-indigo-600"></div>';
            
            html += '</div>';
            html += '<button id="runBtn" class="mt-8 w-full bg-gradient-to-r from-indigo-700 to-sky-700 hover:from-indigo-800 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 text-lg">';
            if (loading) {
                html += '<i class="fas fa-circle-notch fa-spin"></i> Analyzing ' + universitiesDB.length + '+ universities...';
            } else {
                html += '<i class="fas fa-play-circle mr-2"></i> Run AI Recommendation Engine';
            }
            html += '</button></div></div>';
            
            // Results Section
            if (loading) {
                html += '<div class="bg-white rounded-2xl p-12 text-center">';
                html += '<i class="fas fa-brain fa-3x text-indigo-300 animate-pulse mb-4"></i>';
                html += '<p class="text-slate-500">AI is analyzing ' + universitiesDB.length + ' universities based on your profile...</p>';
                html += '</div>';
            } else if (recommendations.length > 0) {
                html += '<div><div class="flex items-center justify-between mb-4">';
                html += '<h2 class="text-2xl font-bold"><i class="fas fa-trophy text-amber-500 mr-2"></i>Your Matches (' + recommendations.length + ' Universities)</h2>';
                html += '<span class="text-sm text-gray-500"><i class="fas fa-info-circle"></i> Click any card for details</span>';
                html += '</div>';
                
                // Affordable universities
                if (affordableUnis.length > 0) {
                    html += '<div class="mb-8"><h3 class="text-lg font-semibold text-emerald-700 mb-3"><i class="fas fa-check-circle mr-2"></i>Within Your Budget (' + affordableUnis.length + ')</h3>';
                    html += '<div class="grid md:grid-cols-2 gap-4">';
                    for (var a = 0; a < affordableUnis.length; a++) {
                        html += renderUniversityCard(affordableUnis[a], recommendations.indexOf(affordableUnis[a]));
                    }
                    html += '</div></div>';
                }
                
                // Manageable with loan
                if (manageableUnis.length > 0) {
                    html += '<div class="mb-8"><h3 class="text-lg font-semibold text-blue-700 mb-3"><i class="fas fa-hand-holding-usd mr-2"></i>Manageable with Loan + Part-time Work (' + manageableUnis.length + ')</h3>';
                    html += '<div class="grid md:grid-cols-2 gap-4">';
                    for (var m = 0; m < manageableUnis.length; m++) {
                        html += renderUniversityCard(manageableUnis[m], recommendations.indexOf(manageableUnis[m]));
                    }
                    html += '</div></div>';
                }
                
                // Scholarship opportunities
                if (scholarshipUnis.length > 0) {
                    html += '<div class="mb-8"><h3 class="text-lg font-semibold text-purple-700 mb-3"><i class="fas fa-graduation-cap mr-2"></i>Scholarship Opportunities (' + scholarshipUnis.length + ')</h3>';
                    html += '<p class="text-sm text-gray-600 mb-3">These universities offer generous scholarships. Many students get 20-100% tuition coverage!</p>';
                    html += '<div class="grid md:grid-cols-2 gap-4">';
                    for (var s = 0; s < scholarshipUnis.length; s++) {
                        html += renderUniversityCard(scholarshipUnis[s], recommendations.indexOf(scholarshipUnis[s]));
                    }
                    html += '</div></div>';
                }
                
                html += '</div>';
            }
            
            // Modal
            if (selectedUni) {
                html += renderModal(selectedUni);
            }
            
            html += '</div>';
            
            root.innerHTML = html;
            
            // Helper function to render a university card
            function renderUniversityCard(uni, idx) {
                var cardClass = getCardClass(uni.financial);
                var probClass = getProbClass(uni.admissionProbability);
                var probText = getProbText(uni.admissionProbability);
                var badgeClass = uni.financial.badgeClass;
                var badgeText = uni.financial.badge;
                
                return '<div class="bg-white rounded-xl shadow-lg border overflow-hidden card-hover cursor-pointer ' + cardClass + '" data-uni-idx="' + idx + '">' +
                    '<div class="p-4">' +
                        '<div class="flex justify-between items-start mb-2">' +
                            '<div>' +
                                '<h3 class="font-bold text-lg">' + uni.name.replace(/&/g, '&amp;') + '</h3>' +
                                '<p class="text-sm text-gray-500"><i class="fas fa-map-marker-alt mr-1"></i>' + uni.country + '</p>' +
                            '</div>' +
                            '<span class="px-2 py-1 rounded-full text-xs font-bold ' + probClass + '">' + probText + '</span>' +
                        '</div>' +
                        '<div class="flex justify-between text-sm mb-3">' +
                            '<span><i class="fas fa-tag text-emerald-600 mr-1"></i>₹' + uni.costLakhs + 'L/year</span>' +
                            '<span><i class="far fa-calendar mr-1"></i>' + uni.deadline + '</span>' +
                        '</div>' +
                        '<div class="p-2 rounded-lg text-xs text-white ' + badgeClass + ' mb-2">' +
                            '<i class="fas ' + (uni.financial.status === 'within_budget' ? 'fa-check-circle' : 'fa-chart-line') + ' mr-1"></i> ' + badgeText +
                        '</div>' +
                        '<p class="text-xs text-gray-600">' + uni.financial.message.substring(0, 80) + '...</p>' +
                    '</div>' +
                '</div>';
            }
            
            function renderModal(uni) {
                var probClass = getProbClass(uni.admissionProbability);
                var probText = getProbText(uni.admissionProbability);
                var badgeClass = uni.financial.badgeClass;
                var badgeText = uni.financial.badge;
                
                return '<div class="fixed inset-0 modal-backdrop flex items-center justify-center z-50 p-4" id="modalOverlay">' +
                    '<div class="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">' +
                        '<div class="bg-indigo-50 px-6 py-4 rounded-t-2xl border-b flex justify-between items-center sticky top-0">' +
                            '<h3 class="text-xl font-bold">' + uni.name.replace(/&/g, '&amp;') + '</h3>' +
                            '<button id="closeModalBtn" class="text-gray-400 hover:text-gray-600"><i class="fas fa-times text-xl"></i></button>' +
                        '</div>' +
                        '<div class="p-6 space-y-4">' +
                            '<div class="grid grid-cols-2 gap-3 text-sm">' +
                                '<div><span class="font-semibold">Country:</span></div><div>' + uni.country + '</div>' +
                                '<div><span class="font-semibold">Course:</span></div><div>' + uni.course + '</div>' +
                                '<div><span class="font-semibold">Admission Chance:</span></div><div><span class="px-2 py-0.5 rounded-full text-xs font-bold ' + probClass + '">' + probText + '</span></div>' +
                                '<div><span class="font-semibold">Annual Cost:</span></div><div>₹' + uni.costLakhs + ' Lakhs</div>' +
                                '<div><span class="font-semibold">Deadline:</span></div><div>' + uni.deadline + '</div>' +
                            '</div>' +
                            '<div class="financial-card p-4 rounded-xl">' +
                                '<h4 class="font-bold text-indigo-800 mb-2"><i class="fas fa-hand-holding-usd mr-2"></i>Financial Assessment</h4>' +
                                '<div class="space-y-2 text-sm">' +
                                    '<p><span class="font-semibold">Status:</span> <span class="px-2 py-0.5 rounded text-white text-xs ' + badgeClass + '">' + badgeText + '</span></p>' +
                                    '<p>' + uni.financial.message + '</p>';
                if (uni.financial.loanRequired > 0) {
                    html += '<p><span class="font-semibold">Loan Required:</span> ₹' + uni.financial.loanRequired + ' Lakhs</p>' +
                            '<p><span class="font-semibold">Monthly EMI (5 years):</span> ~₹' + uni.financial.monthlyEmi.toLocaleString() + '</p>';
                }
                html += '<p><span class="font-semibold">Part-time Work:</span> ' + uni.partTimeWork + '</p>' +
                                    '<p class="text-emerald-700 font-medium mt-2">💡 ' + uni.financial.recommendation + '</p>' +
                                '</div>' +
                            '</div>' +
                            '<div class="bg-sky-50 p-3 rounded-xl">' +
                                '<p class="text-sm"><i class="fas fa-gift text-sky-600 mr-2"></i><span class="font-semibold">Scholarships:</span> ' + uni.scholarships + '</p>' +
                            '</div>' +
                            '<div class="bg-amber-50 p-3 rounded-xl">' +
                                '<p class="text-sm"><i class="fas fa-chart-line text-amber-600 mr-2"></i><span class="font-semibold">Expected ROI:</span> ' + uni.roi + '</p>' +
                            '</div>' +
                        '</div>' +
                        '<div class="px-6 pb-6">' +
                            '<button id="closeModalFooterBtn" class="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-semibold">Close</button>' +
                        '</div>' +
                    '</div>' +
                '</div>';
            }
            
            // Attach event listeners
            var interestInput = document.getElementById('interestInput');
            var budgetInput = document.getElementById('budgetInput');
            var countrySelect = document.getElementById('countrySelect');
            var scoreSlider = document.getElementById('scoreSlider');
            var scoreSpan = document.getElementById('scoreValue');
            var runBtn = document.getElementById('runBtn');
            
            if (interestInput) {
                interestInput.addEventListener('input', function(e) { appState.interest = e.target.value; });
            }
            if (budgetInput) {
                budgetInput.addEventListener('input', function(e) { appState.budget = e.target.value; });
            }
            if (countrySelect) {
                countrySelect.addEventListener('change', function(e) { appState.preferredCountry = e.target.value; renderApp(); });
            }
            if (scoreSlider && scoreSpan) {
                scoreSlider.addEventListener('input', function(e) {
                    appState.academicScore = e.target.value;
                    if (scoreSpan) scoreSpan.innerText = e.target.value;
                });
            }
            if (runBtn) {
                runBtn.addEventListener('click', getRecommendations);
            }
            
            // Card click handlers
            for (var i = 0; i < recommendations.length; i++) {
                var card = document.querySelector('[data-uni-idx="' + i + '"]');
                if (card) {
                    card.addEventListener('click', (function(idx) {
                        return function() {
                            appState.selectedUni = recommendations[idx];
                            renderApp();
                        };
                    })(i));
                }
            }
            
            // Modal close handlers
            var closeBtn = document.getElementById('closeModalBtn');
            var closeFooter = document.getElementById('closeModalFooterBtn');
            var overlay = document.getElementById('modalOverlay');
            
            if (closeBtn) {
                closeBtn.addEventListener('click', function() { appState.selectedUni = null; renderApp(); });
            }
            if (closeFooter) {
                closeFooter.addEventListener('click', function() { appState.selectedUni = null; renderApp(); });
            }
            if (overlay) {
                overlay.addEventListener('click', function(e) { if (e.target.id === 'modalOverlay') { appState.selectedUni = null; renderApp(); } });
            }
        }
        
        renderApp();
    </script>
</body>
</html>
