<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Application Timeline Generator | Professional Indigo-Navy Theme</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #e0e7ff 0%, #f3f4f6 100%);
            min-height: 100vh;
            padding: 24px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        /* Header */
        .header {
            background: linear-gradient(135deg, #1e3a8a 0%, #4f46e5 50%, #172554 100%);
            border-radius: 16px;
            padding: 32px;
            color: white;
            margin-bottom: 32px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .header h1 {
            font-size: 32px;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .header p {
            color: #c7d2fe;
        }

        /* Grid */
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 32px;
        }

        /* Cards */
        .card {
            background: white;
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            border: 1px solid #e0e7ff;
        }

        .card-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #1e3a8a;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        /* Form Elements */
        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            color: #374151;
            margin-bottom: 8px;
        }

        select {
            width: 100%;
            padding: 12px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 14px;
            background: white;
            cursor: pointer;
            transition: all 0.2s;
        }

        select:focus {
            outline: none;
            border-color: #4f46e5;
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        /* Generate Button */
        .generate-btn {
            width: 100%;
            background: linear-gradient(135deg, #4f46e5 0%, #1e3a8a 100%);
            color: white;
            padding: 14px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-top: 8px;
            transition: all 0.3s;
        }

        .generate-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
        }

        .generate-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }

        /* Timeline Results - Fixed Header with Scrollable Content */
        .timeline-container {
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            border: 1px solid #e0e7ff;
            display: flex;
            flex-direction: column;
            height: 600px;
            overflow: hidden;
        }

        .timeline-header {
            background: white;
            padding: 24px 24px 16px 24px;
            border-bottom: 2px solid #e0e7ff;
            position: sticky;
            top: 0;
            z-index: 10;
        }

        .timeline-title {
            font-size: 24px;
            font-weight: bold;
            color: #1e3a8a;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .timeline-content-scroll {
            flex: 1;
            overflow-y: auto;
            padding: 24px;
            padding-top: 8px;
        }

        /* Custom Scrollbar */
        .timeline-content-scroll::-webkit-scrollbar {
            width: 8px;
        }

        .timeline-content-scroll::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 4px;
        }

        .timeline-content-scroll::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #4f46e5, #1e3a8a);
            border-radius: 4px;
        }

        .timeline-content-scroll::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #6366f1, #1e40af);
        }

        /* Timeline Items */
        .timeline-item {
            position: relative;
            margin-bottom: 24px;
        }

        .timeline-connector {
            position: absolute;
            left: 16px;
            top: 40px;
            bottom: -24px;
            width: 2px;
            background: linear-gradient(to bottom, #4f46e5, #c7d2fe);
        }

        .timeline-badge {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #4f46e5 0%, #1e3a8a 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 14px;
            flex-shrink: 0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .timeline-content {
            flex: 1;
            background: #f8fafc;
            border-radius: 12px;
            padding: 16px;
            border: 1px solid #e2e8f0;
            transition: all 0.3s;
        }

        .timeline-content:hover {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            transform: translateX(4px);
        }

        .timeline-month {
            font-size: 18px;
            font-weight: bold;
            color: #1e3a8a;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .task-list {
            list-style: none;
            padding-left: 0;
        }

        .task-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 0;
            font-size: 14px;
            color: #475569;
            border-bottom: 1px solid #e2e8f0;
        }

        .task-item:last-child {
            border-bottom: none;
        }

        .task-check {
            color: #10b981;
            font-size: 14px;
        }

        .flex {
            display: flex;
            gap: 16px;
        }

        /* Toast */
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .toast-success {
            background: linear-gradient(135deg, #10b981, #059669);
        }

        .toast-error {
            background: linear-gradient(135deg, #ef4444, #dc2626);
        }

        /* Loading State */
        .loading-container {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            min-height: 400px;
        }

        .spinner {
            display: inline-block;
            width: 48px;
            height: 48px;
            border: 3px solid #e0e7ff;
            border-radius: 50%;
            border-top-color: #4f46e5;
            animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        /* Empty State */
        .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            min-height: 400px;
            text-align: center;
            color: #64748b;
        }

        .empty-state-icon {
            font-size: 64px;
            margin-bottom: 16px;
        }

        .empty-state-text {
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 8px;
            color: #1e3a8a;
        }

        .empty-state-subtext {
            font-size: 14px;
        }

        /* Animations */
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @media (max-width: 768px) {
            .grid {
                grid-template-columns: 1fr;
            }
            
            body {
                padding: 16px;
            }
            
            .header h1 {
                font-size: 24px;
            }
            
            .timeline-container {
                height: 500px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>
                <span>📅</span>
                Application Timeline Generator
            </h1>
            <p>Plan your study abroad journey month by month</p>
        </div>

        <!-- Main Grid -->
        <div class="grid">
            <!-- Input Form -->
            <div class="card">
                <div class="card-title">
                    <span>📅</span>
                    Your Timeline Preferences
                </div>
                
                <div class="form-group">
                    <label>🎯 Target Intake</label>
                    <select id="targetIntake">
                        <option value="Fall (September)">Fall (September)</option>
                        <option value="Spring (January)">Spring (January)</option>
                        <option value="Summer (May)">Summer (May)</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>📆 Current Month</label>
                    <select id="currentMonth">
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>📝 Tests Already Taken</label>
                    <select id="testsTaken">
                        <option value="None">None</option>
                        <option value="IELTS">IELTS</option>
                        <option value="TOEFL">TOEFL</option>
                        <option value="GRE">GRE</option>
                        <option value="GMAT">GMAT</option>
                    </select>
                </div>

                <button class="generate-btn" onclick="generateTimeline()">
                    <span>⏰</span>
                    Generate Timeline
                </button>
            </div>

            <!-- Results Container with Fixed Header Structure -->
            <div id="timelineResults">
                <div class="timeline-container">
                    <div class="timeline-header">
                        <div class="timeline-title">
                            <span>🎯</span>
                            Your Application Timeline
                        </div>
                    </div>
                    <div class="timeline-content-scroll">
                        <div class="empty-state">
                            <div class="empty-state-icon">📋</div>
                            <div class="empty-state-text">No Timeline Generated Yet</div>
                            <div class="empty-state-subtext">Fill in your preferences and click "Generate Timeline"</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Mock timeline data generator
        function getMockTimeline(targetIntake, currentMonth, testsTaken) {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                           'July', 'August', 'September', 'October', 'November', 'December'];
            
            const currentIndex = months.indexOf(currentMonth);
            const intakeMap = {
                'Fall (September)': 8,
                'Spring (January)': 0,
                'Summer (May)': 4
            };
            const targetIndex = intakeMap[targetIntake];
            
            let monthsNeeded = targetIndex - currentIndex;
            if (monthsNeeded < 0) monthsNeeded += 12;
            
            const timeline = [];
            let currentIdx = currentIndex;
            const needsTests = testsTaken === 'None';
            
            for (let i = 0; i <= Math.min(monthsNeeded, 8); i++) {
                const monthName = months[currentIdx % 12];
                const tasks = [];
                
                if (i === 0) {
                    tasks.push('📝 Research universities and programs');
                    if (needsTests) tasks.push('📚 Start preparing for standardized tests');
                    tasks.push('💰 Estimate budget and expenses');
                }
                
                if (i === 1) {
                    if (needsTests) tasks.push('📖 Register for IELTS/TOEFL/GRE');
                    tasks.push('🏦 Start building your academic profile');
                    tasks.push('📋 Prepare initial documents list');
                }
                
                if (i === 2) {
                    if (needsTests) tasks.push('✅ Take standardized tests');
                    tasks.push('📝 Draft Statement of Purpose');
                    tasks.push('👨‍🏫 Request recommendation letters');
                }
                
                if (i === 3) {
                    tasks.push('📄 Finalize Statement of Purpose');
                    tasks.push('🎯 Shortlist 5-8 universities');
                    tasks.push('📊 Check application deadlines');
                }
                
                if (i === 4) {
                    tasks.push('📝 Start filling applications');
                    tasks.push('💳 Pay application fees');
                    tasks.push('📎 Upload required documents');
                }
                
                if (i === 5) {
                    tasks.push('✅ Submit applications');
                    tasks.push('💰 Apply for scholarships');
                    tasks.push('📧 Follow up with recommenders');
                }
                
                if (i === 6) {
                    tasks.push('⏳ Wait for admission decisions');
                    tasks.push('🎓 Apply for housing');
                    tasks.push('🛂 Start visa process if accepted');
                }
                
                if (i === 7) {
                    tasks.push('📊 Compare offers');
                    tasks.push('✅ Accept best offer');
                    tasks.push('🏦 Arrange for education loan');
                }
                
                if (i === 8) {
                    tasks.push('🛫 Apply for student visa');
                    tasks.push('✈️ Book flight tickets');
                    tasks.push('🎒 Pack and prepare for departure');
                }
                
                if (tasks.length > 0) {
                    timeline.push({
                        month: monthName,
                        tasks: tasks
                    });
                }
                
                currentIdx++;
            }
            
            return timeline;
        }

        // Show toast notification
        function showToast(message, type) {
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.textContent = message;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.remove();
            }, 3000);
        }

        // Generate timeline
        function generateTimeline() {
            const targetIntake = document.getElementById('targetIntake').value;
            const currentMonth = document.getElementById('currentMonth').value;
            const testsTaken = document.getElementById('testsTaken').value;
            
            // Show loading state
            const resultsContainer = document.getElementById('timelineResults');
            resultsContainer.innerHTML = `
                <div class="timeline-container">
                    <div class="timeline-header">
                        <div class="timeline-title">
                            <span>🎯</span>
                            Your Application Timeline
                        </div>
                    </div>
                    <div class="timeline-content-scroll">
                        <div class="loading-container">
                            <div style="text-align: center;">
                                <div class="spinner"></div>
                                <div style="color: #4f46e5; font-weight: 600; margin-top: 16px;">Generating your personalized timeline...</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Simulate API call
            setTimeout(() => {
                const timeline = getMockTimeline(targetIntake, currentMonth, testsTaken);
                
                if (timeline.length === 0) {
                    resultsContainer.innerHTML = `
                        <div class="timeline-container">
                            <div class="timeline-header">
                                <div class="timeline-title">
                                    <span>🎯</span>
                                    Your Application Timeline
                                </div>
                            </div>
                            <div class="timeline-content-scroll">
                                <div class="empty-state">
                                    <div class="empty-state-icon">⚠️</div>
                                    <div class="empty-state-text">No Timeline Generated</div>
                                    <div class="empty-state-subtext">Please check your input values</div>
                                </div>
                            </div>
                        </div>
                    `;
                    showToast('❌ Error generating timeline', 'error');
                    return;
                }
                
                // Build timeline HTML
                let timelineHTML = `
                    <div class="timeline-container">
                        <div class="timeline-header">
                            <div class="timeline-title">
                                <span>🎯</span>
                                Your Application Timeline
                            </div>
                        </div>
                        <div class="timeline-content-scroll">
                `;
                
                timeline.forEach((phase, idx) => {
                    timelineHTML += `
                        <div class="timeline-item">
                            ${idx < timeline.length - 1 ? '<div class="timeline-connector"></div>' : ''}
                            <div class="flex">
                                <div class="timeline-badge">
                                    ${idx + 1}
                                </div>
                                <div class="timeline-content">
                                    <div class="timeline-month">
                                        <span>📅</span>
                                        ${phase.month}
                                    </div>
                                    <ul class="task-list">
                    `;
                    
                    phase.tasks.forEach(task => {
                        timelineHTML += `
                            <li class="task-item">
                                <span class="task-check">✅</span>
                                ${task}
                            </li>
                        `;
                    });
                    
                    timelineHTML += `
                                    </ul>
                                </div>
                            </div>
                        </div>
                    `;
                });
                
                timelineHTML += `
                        </div>
                    </div>
                `;
                
                resultsContainer.innerHTML = timelineHTML;
                showToast('🎉 Timeline generated successfully!', 'success');
            }, 1000);
        }

        // Set default current month to actual month
        const currentDate = new Date();
        const currentMonthName = currentDate.toLocaleString('default', { month: 'long' });
        document.getElementById('currentMonth').value = currentMonthName;

        // Add enter key support
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const activeElement = document.activeElement;
                if (activeElement.tagName !== 'BUTTON') {
                    generateTimeline();
                }
            }
        });
    </script>
</body>
</html>
