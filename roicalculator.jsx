<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Education ROI Calculator | Professional Indigo-Navy Theme</title>
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

        /* Container */
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        /* Header */
        .header {
            background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #172554 100%);
            border-radius: 16px;
            padding: 32px;
            color: white;
            margin-bottom: 32px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .header h1 {
            font-size: 32px;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .header p {
            color: #a5b4fc;
        }

        /* Grid Layout */
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
            gap: 8px;
        }

        /* Form Elements */
        .form-group {
            margin-bottom: 16px;
        }

        label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            color: #374151;
            margin-bottom: 6px;
        }

        input, select {
            width: 100%;
            padding: 12px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 14px;
            transition: all 0.2s;
        }

        input:focus, select:focus {
            outline: none;
            border-color: #4f46e5;
            ring: 2px solid #4f46e5;
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }

        /* Calculate Button */
        .calc-btn {
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

        .calc-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
        }

        .calc-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        /* Results */
        .result-card {
            background: white;
            border-radius: 16px;
            padding: 24px;
            animation: fadeIn 0.5s ease-out;
        }

        .emi-box {
            background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
            padding: 16px;
            border-radius: 12px;
            border: 1px solid #c7d2fe;
            margin-bottom: 16px;
        }

        .emi-label {
            font-size: 14px;
            color: #4b5563;
            margin-bottom: 4px;
        }

        .emi-value {
            font-size: 28px;
            font-weight: bold;
            color: #4f46e5;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-bottom: 16px;
        }

        .stat-box {
            padding: 16px;
            border-radius: 12px;
        }

        .stat-interest {
            background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
            border: 1px solid #d8b4fe;
        }

        .stat-breakeven {
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
            border: 1px solid #a7f3d0;
        }

        .stat-label {
            font-size: 12px;
            color: #4b5563;
            margin-bottom: 4px;
        }

        .stat-value {
            font-size: 18px;
            font-weight: bold;
        }

        /* Risk Levels */
        .risk-low {
            background-color: #eef2ff;
            border-left: 4px solid #4f46e5;
            padding: 16px;
            border-radius: 12px;
            margin-bottom: 16px;
        }

        .risk-medium {
            background-color: #fffbeb;
            border-left: 4px solid #f59e0b;
            padding: 16px;
            border-radius: 12px;
            margin-bottom: 16px;
        }

        .risk-high {
            background-color: #fef2f2;
            border-left: 4px solid #ef4444;
            padding: 16px;
            border-radius: 12px;
            margin-bottom: 16px;
        }

        .suggestion {
            background-color: #fffbeb;
            border-left: 4px solid #f59e0b;
            padding: 16px;
            border-radius: 12px;
            margin-bottom: 16px;
        }

        .footer-note {
            border-top: 1px solid #e5e7eb;
            padding-top: 16px;
            margin-top: 16px;
            font-size: 12px;
            color: #6b7280;
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
            background-color: #10b981;
        }

        .toast-error {
            background-color: #ef4444;
        }

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
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>
                <span>💰</span>
                Education ROI Calculator
            </h1>
            <p>Calculate your return on investment before committing to education</p>
        </div>

        <!-- Main Grid -->
        <div class="grid">
            <!-- Input Form -->
            <div class="card">
                <div class="card-title">
                    <span>📊</span>
                    Enter Your Details
                </div>
                
                <div class="form-group">
                    <label>💰 Total Course Cost (USD) *</label>
                    <input type="number" id="totalCost" placeholder="e.g., 50000">
                </div>

                <div class="form-group">
                    <label>💵 Expected Annual Salary (USD) *</label>
                    <input type="number" id="annualSalary" placeholder="e.g., 80000">
                </div>

                <div class="form-group">
                    <label>🏦 Loan Amount Needed (USD) *</label>
                    <input type="number" id="loanAmount" placeholder="e.g., 40000">
                </div>

                <div class="row">
                    <div class="form-group">
                        <label>📊 Interest Rate (%)</label>
                        <input type="number" id="interestRate" value="10.5" step="0.5">
                    </div>
                    <div class="form-group">
                        <label>⏱️ Loan Tenure (Years)</label>
                        <input type="number" id="loanTenure" value="10">
                    </div>
                </div>

                <div class="form-group">
                    <label>📚 Course Name</label>
                    <input type="text" id="course" placeholder="e.g., MS in Computer Science">
                </div>

                <div class="form-group">
                    <label>🌍 Country</label>
                    <select id="country">
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="India">India</option>
                    </select>
                </div>

                <button class="calc-btn" onclick="calculateROI()">
                    <span>📈</span>
                    Calculate ROI
                </button>
            </div>

            <!-- Results Display -->
            <div id="resultsContainer"></div>
        </div>
    </div>

    <script>
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

        // Calculate ROI
        function calculateROI() {
            const totalCost = parseFloat(document.getElementById('totalCost').value);
            const annualSalary = parseFloat(document.getElementById('annualSalary').value);
            const loanAmount = parseFloat(document.getElementById('loanAmount').value);
            const interestRate = parseFloat(document.getElementById('interestRate').value);
            const loanTenure = parseInt(document.getElementById('loanTenure').value);
            const course = document.getElementById('course').value || 'Graduate Program';
            const country = document.getElementById('country').value;

            // Validation
            if (!totalCost || !annualSalary || !loanAmount) {
                showToast('❌ Please fill all required fields', 'error');
                return;
            }

            // Show loading state
            const resultsContainer = document.getElementById('resultsContainer');
            resultsContainer.innerHTML = `
                <div class="card" style="display: flex; align-items: center; justify-content: center; min-height: 400px;">
                    <div style="text-align: center;">
                        <div style="font-size: 48px; margin-bottom: 16px;">⏳</div>
                        <div style="color: #4f46e5; font-weight: 600;">Calculating ROI...</div>
                    </div>
                </div>
            `;

            // Simulate API call
            setTimeout(() => {
                // Calculate monthly EMI
                const monthlyRate = interestRate / 100 / 12;
                const months = loanTenure * 12;
                let emi = 0;
                
                if (monthlyRate > 0) {
                    emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
                } else {
                    emi = loanAmount / months;
                }
                
                // Calculate total interest
                const totalInterest = (emi * months) - loanAmount;
                
                // Calculate break-even years
                const annualAfterTax = annualSalary * 0.7;
                const breakEvenYears = (totalCost / annualAfterTax).toFixed(1);
                
                // Determine risk level
                const roiRatio = annualSalary / totalCost;
                let riskLevel = 'Medium';
                let insights = '';
                let riskClass = 'risk-medium';
                
                if (roiRatio > 1.5) {
                    riskLevel = 'Low';
                    insights = '✅ Excellent ROI! Your expected salary significantly exceeds the course cost.';
                    riskClass = 'risk-low';
                } else if (roiRatio > 1) {
                    riskLevel = 'Medium';
                    insights = '📈 Good ROI. The investment should pay off within reasonable time.';
                    riskClass = 'risk-medium';
                } else {
                    riskLevel = 'High';
                    insights = '⚠️ Consider alternatives or negotiate better salary/scholarships.';
                    riskClass = 'risk-high';
                }
                
                const monthlySalaryAfterTax = Math.round(annualSalary * 0.7 / 12);
                const alternativeAdvice = roiRatio < 1.2 ? '💡 Consider scholarships, part-time work, or lower-cost alternatives' : null;
                
                // Build results HTML
                let resultsHTML = `
                    <div class="result-card" style="animation: fadeIn 0.5s ease-out;">
                        <div class="card-title">
                            <span>📊</span>
                            Your ROI Analysis
                        </div>
                        
                        <div class="emi-box">
                            <div class="emi-label">Monthly EMI</div>
                            <div class="emi-value">$${Math.round(emi).toLocaleString()}</div>
                        </div>
                        
                        <div class="stats-grid">
                            <div class="stat-box stat-interest">
                                <div class="stat-label">Total Interest</div>
                                <div class="stat-value" style="color: #7c3aed;">$${Math.round(totalInterest).toLocaleString()}</div>
                            </div>
                            <div class="stat-box stat-breakeven">
                                <div class="stat-label">Break-even Period</div>
                                <div class="stat-value" style="color: #059669;">${breakEvenYears} years</div>
                            </div>
                        </div>
                        
                        <div class="${riskClass}">
                            <div style="font-weight: 600; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
                                <span>⚠️</span>
                                Risk Level: ${riskLevel}
                            </div>
                            <div style="font-size: 14px;">${insights}</div>
                        </div>
                `;
                
                if (alternativeAdvice) {
                    resultsHTML += `
                        <div class="suggestion">
                            <div style="font-weight: 600; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
                                <span>💡</span>
                                Suggestion
                            </div>
                            <div style="font-size: 14px;">${alternativeAdvice}</div>
                        </div>
                    `;
                }
                
                resultsHTML += `
                        <div class="footer-note">
                            Monthly after-tax salary: $${monthlySalaryAfterTax.toLocaleString()}
                        </div>
                    </div>
                `;
                
                resultsContainer.innerHTML = resultsHTML;
                showToast('🎉 ROI calculation complete!', 'success');
            }, 800);
        }

        // Add enter key support
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    calculateROI();
                }
            });
        });
    </script>
</body>
</html>
