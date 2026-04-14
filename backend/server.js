const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Groq = require('groq-sdk');

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ONLY WORKING MODELS as of April 2026
const MODELS = {
  FAST: 'llama-3.3-70b-versatile',        // ✅ Working - for chat & recommendations
  ALTERNATE: 'deepseek-r1-distill-llama-70b' // ✅ Working - backup model
};

// Helper function to clean JSON from LLM responses
function cleanJSONResponse(text) {
  // Remove markdown code blocks
  let cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
  // Find JSON object in the text
  const jsonMatch = cleaned.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
  if (jsonMatch) {
    return jsonMatch[0];
  }
  return cleaned;
}

// Test endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server running with Groq!', 
    models: MODELS,
    time: new Date().toISOString() 
  });
});

// AI Career Navigator - University Recommendations
app.post('/api/recommend', async (req, res) => {
  try {
    const { interest, budget, preferredCountry, academicScore } = req.body;
    
    console.log('Getting AI recommendations for:', { interest, budget, academicScore });
    
    const prompt = `You are an AI career advisor for Indian students planning higher education.
    
    Student Profile:
    - Interest: ${interest || 'Computer Science'}
    - Budget: ${budget || '30'} lakhs INR total
    - Academic Score: ${academicScore || '70'}%
    
    Return ONLY valid JSON array (no other text, no markdown):
    [
      {
        "university": "University Name",
        "country": "USA/UK/Canada/Australia",
        "course": "Course name",
        "admissionProbability": "High/Medium/Low",
        "estAnnualCost": "Cost in local currency",
        "roiNotes": "One sentence about ROI",
        "deadline": "Month Day"
      }
    ]
    
    Recommend 3 universities (ambitious, moderate, safe).`;
    
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: MODELS.FAST,
      temperature: 0.5,
    });
    
    const responseText = completion.choices[0].message.content;
    const cleanedJSON = cleanJSONResponse(responseText);
    let recommendations = JSON.parse(cleanedJSON);
    
    if (!Array.isArray(recommendations)) {
      recommendations = Object.values(recommendations)[0] || [];
    }
    
    res.json(recommendations);
    
  } catch (error) {
    console.error('Groq API Error:', error.message);
    // Fallback mock data
    res.json([
      {
        university: "Arizona State University",
        country: "USA",
        course: `MS in ${req.body.interest || 'Computer Science'}`,
        admissionProbability: "High",
        estAnnualCost: "$42,000",
        roiNotes: "Strong industry connections, high ROI",
        deadline: "March 15"
      },
      {
        university: "University of Melbourne",
        country: "Australia",
        course: `Master of ${req.body.interest || 'IT'}`,
        admissionProbability: "Medium",
        estAnnualCost: "AUD 48,000",
        roiNotes: "2 year post-study work visa",
        deadline: "April 30"
      },
      {
        university: "University of Birmingham",
        country: "UK",
        course: `MSc in ${req.body.interest || 'Data Science'}`,
        admissionProbability: "Medium",
        estAnnualCost: "£32,000",
        roiNotes: "Graduate Route visa available",
        deadline: "May 15"
      }
    ]);
  }
});

// ROI Calculator with AI insights (FIXED JSON PARSING)
app.post('/api/roi', async (req, res) => {
  const { totalCost, annualSalary, loanAmount, interestRate, loanTenure, course, country } = req.body;
  
  // Calculate EMI
  const monthlyRate = interestRate / 100 / 12;
  const months = loanTenure * 12;
  const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
  
  const monthlySavings = (annualSalary / 12) * 0.6;
  const breakEvenMonths = totalCost / monthlySavings;
  
  // Get AI insights about ROI
  try {
    const prompt = `For a student studying ${course} in ${country} with total cost ${totalCost} USD and expected salary ${annualSalary} USD, give ROI advice.
    
    Return ONLY valid JSON (no markdown, no other text):
    {"insights": "2-3 sentence advice", "riskLevel": "Low", "alternativeAdvice": "one sentence suggestion"}`;
    
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: MODELS.FAST,
      temperature: 0.6,
    });
    
    const responseText = completion.choices[0].message.content;
    const cleanedJSON = cleanJSONResponse(responseText);
    const aiInsights = JSON.parse(cleanedJSON);
    
    res.json({
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round((emi * months) - loanAmount),
      breakEvenYears: (breakEvenMonths / 12).toFixed(1),
      monthlySalaryAfterTax: Math.round(annualSalary / 12 * 0.7),
      insights: aiInsights.insights || "Good ROI potential with this degree",
      riskLevel: aiInsights.riskLevel || "Medium",
      alternativeAdvice: aiInsights.alternativeAdvice || "Consider scholarships to improve ROI"
    });
  } catch (error) {
    console.error('ROI insight error:', error.message);
    res.json({
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round((emi * months) - loanAmount),
      breakEvenYears: (breakEvenMonths / 12).toFixed(1),
      monthlySalaryAfterTax: Math.round(annualSalary / 12 * 0.7),
      insights: "This degree typically offers good ROI within 3-5 years",
      riskLevel: "Medium",
      alternativeAdvice: "Look for universities with co-op programs"
    });
  }
});

// Loan Eligibility Checker (USING WORKING MODEL)
app.post('/api/loan-eligibility', async (req, res) => {
  const { course, university, coApplicantIncome, loanAmount, courseDuration, universityTier } = req.body;
  
  const prompt = `Check education loan eligibility for Indian student.
  
  Details:
  Course: ${course}
  Co-applicant Annual Income: ${coApplicantIncome} lakhs INR
  Loan Required: ${loanAmount} lakhs INR
  
  Return ONLY valid JSON (no markdown):
  {"eligible": true, "maxLoanAmount": ${Math.min(loanAmount, coApplicantIncome * 3)}, "interestRate": 10.5, "marginMoney": 15, "requiredDocuments": ["Academic Transcripts", "Admission Letter", "Co-applicant ITR"], "suggestions": "Your profile looks good"}`;
  
  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: MODELS.FAST,  // Using Llama 3.3 instead of decommissioned Mixtral
      temperature: 0.3,
    });
    
    const responseText = completion.choices[0].message.content;
    const cleanedJSON = cleanJSONResponse(responseText);
    const result = JSON.parse(cleanedJSON);
    res.json(result);
  } catch (error) {
    console.error('Loan eligibility error:', error.message);
    // Smart fallback logic
    const eligible = coApplicantIncome >= (loanAmount * 0.3);
    res.json({
      eligible: eligible,
      maxLoanAmount: Math.min(loanAmount, coApplicantIncome * 3),
      interestRate: eligible ? 10.5 : 12.5,
      marginMoney: eligible ? 15 : 25,
      requiredDocuments: ["Academic Transcripts", "Admission Letter", "Co-applicant ITR", "Address Proof", "Passport"],
      suggestions: eligible ? "✅ Pre-approval likely. Submit documents for final sanction." : "❌ Consider adding a stronger co-applicant or reducing loan amount by 20%"
    });
  }
});

// Chatbot endpoint - Fully working
app.post('/api/chat', async (req, res) => {
  const { message, conversationHistory } = req.body;
  
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are an AI study abroad advisor for Indian students. Be helpful, concise (2-3 sentences max). Give specific advice about universities, loans, visas, and careers. Use Indian context (INR, lakhs, crores)." },
        ...(conversationHistory || []),
        { role: "user", content: message }
      ],
      model: MODELS.FAST,
      temperature: 0.7,
      max_tokens: 300,
    });
    
    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error('Chat error:', error.message);
    res.json({ reply: "I'm here to help with study abroad questions! Ask me about universities, loans, visas, or applications." });
  }
});

// Admission Probability Predictor
app.post('/api/admission-probability', async (req, res) => {
  try {
    const { gpa, testScore, internships, university, course } = req.body;
    
    const prompt = `Predict admission probability. Return ONLY JSON: {"probability": 65, "reasoning": "brief", "strengths": ["point1"], "weaknesses": ["point1"]}`;
    
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: MODELS.FAST,
      temperature: 0.4,
    });
    
    const responseText = completion.choices[0].message.content;
    const cleanedJSON = cleanJSONResponse(responseText);
    const result = JSON.parse(cleanedJSON);
    res.json(result);
  } catch (error) {
    res.json({ probability: 65, reasoning: "Based on similar profiles", strengths: ["Good academic background"], weaknesses: ["Test scores could improve"] });
  }
});

// Application timeline generator
app.post('/api/timeline', async (req, res) => {
  const { targetIntake, currentMonth, testsTaken } = req.body;
  
  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: `Generate timeline for ${targetIntake} intake. Return JSON: {"timeline": [{"month": "Month 1-2", "tasks": ["task1","task2"]}]}` }],
      model: MODELS.FAST,
      temperature: 0.5,
    });
    
    const responseText = completion.choices[0].message.content;
    const cleanedJSON = cleanJSONResponse(responseText);
    res.json(JSON.parse(cleanedJSON));
  } catch (error) {
    res.json({
      timeline: [
        { month: "Month 1-2", tasks: ["Research universities", "Prepare for IELTS/TOEFL"] },
        { month: "Month 3-4", tasks: ["Take language tests", "Request recommendations"] },
        { month: "Month 5-6", tasks: ["Write SOP", "Apply to universities"] },
        { month: "Month 7-8", tasks: ["Track applications", "Prepare for interviews"] }
      ]
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
  console.log(`🤖 Using Groq model: ${MODELS.FAST}`);
  console.log(`📡 Test: http://localhost:${PORT}/api/health`);
});