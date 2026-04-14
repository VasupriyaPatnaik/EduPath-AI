import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = {
  // Health check
  health: () => axios.get(`${API_URL}/health`),
  
  // Career Navigator
  getRecommendations: (data) => axios.post(`${API_URL}/recommend`, data),
  
  // ROI Calculator
  calculateROI: (data) => axios.post(`${API_URL}/roi`, data),
  
  // Loan Eligibility
  checkLoanEligibility: (data) => axios.post(`${API_URL}/loan-eligibility`, data),
  
  // Chatbot
  sendMessage: (data) => axios.post(`${API_URL}/chat`, data),
  
  // Admission Probability
  predictAdmission: (data) => axios.post(`${API_URL}/admission-probability`, data),
  
  // Timeline Generator
  generateTimeline: (data) => axios.post(`${API_URL}/timeline`, data)
};