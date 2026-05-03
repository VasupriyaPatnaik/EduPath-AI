# 🎓 EduPath AI - Smart Study Abroad & Loan Assistant

**Your AI Companion for Global Education**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js)
![Groq](https://img.shields.io/badge/Groq-LLM-FF6600?logo=groq)

---

## ✨ The Problem We Solve

Indian students aspiring to study abroad face a **fragmented journey** – jumping between websites for university discovery, applications, visa rules, financial planning, and education loans. This leads to information overload, delayed decisions, and missed opportunities.

**80% of students feel overwhelmed. 65% delay decisions due to financial uncertainty. 70% wish for a single AI mentor.**

---

## 🚀 Our Solution: EduPath AI

An **AI‑first engagement ecosystem** that unifies the entire study abroad journey. From finding the right university to securing an education loan, we guide students with intelligence, personalization, and fun.

### 🔥 Key Features

| Module | Description |
|--------|-------------|
| **🎯 AI Career Navigator** | Finds best‑fit universities using budget, score, interest & preferred country. Provides admission probability, cost analysis & scholarship insights. |
| **💰 ROI Calculator** | Computes EMI, break‑even period, total interest, and risk level (Low/Medium/High) based on salary vs. investment. |
| **🏦 Loan Eligibility** | Bank‑style underwriting engine with dynamic interest rates (7.85%–10.2%) and margin money (10%–25%) based on university tier. |
| **🤖 AI Mentor** | 24/7 conversational assistant powered by **Groq Llama 3.3‑70b**. Answers queries on visas, SOPs, scholarships, tests, and part‑time work. |
| **📊 Admission Predictor** | Multi‑factor weighted scoring (GPA, tests, internships, university rank) to predict admission probability with a visual donut chart. |
| **📅 Timeline Generator** | Creates a personalized month‑by‑month application roadmap that adapts based on tests already taken. |
| **🎮 Gamification** | Earn points, maintain streaks, level up, collect badges, and complete daily quests to stay motivated. |
| **🔔 Smart Nudges** | Context‑aware reminders that trigger based on the user's journey stage (exploration → application → loan). |
| **📰 Personalized Feed** | AI‑curated content (scholarships, SOP tips, success stories) tailored to the student's interests. |

---

## 🛠️ Tech Stack

### Frontend
- **React 19** with Hooks
- **Tailwind CSS** – custom light theme (blue/teal palette)
- **Lucide React** icons
- **Framer Motion** + CSS animations
- **Zustand** + `localStorage` for state persistence

### Backend (Prototype)
- **Node.js** + **Express** (mock APIs for demo)
- **Groq Cloud** – `llama3‑3‑70b‑versatile` for AI Mentor
- **Custom algorithms** – weighted scoring, decision tree, financial formulas

### Deployment Ready for
- **Vercel** (frontend)
- **Render / Cyclic** (backend)

---

## 📁 Project Structure
EduPath-AI/
├── backend/ # Node.js + Express mock API
│ ├── server.js # Main backend with Groq integration
│ └── package.json
├── frontend/ # React application
│ ├── public/
│ ├── src/
│ │ ├── components/ # All 6 AI tools + Navbar + Gamification + etc.
│ │ ├── App.js # Main routing and layout
│ │ ├── index.css # Tailwind + custom animations
│ │ └── index.js
│ └── package.json
├── README.md # You are here
└── LICENSE

---

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- A [Groq Cloud API key](https://console.groq.com) (free tier available)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/VasupriyaPatnaik/EduPath-AI.git
cd EduPath-AI

Set up the backend

bash
cd backend
npm install
# Create a .env file and add your Groq API key:
# GROQ_API_KEY=your_key_here
npm run dev        # runs on http://localhost:5000
Set up the frontend

bash
cd ../frontend
npm install
npm start          # runs on http://localhost:3000
Login with demo credentials

Email: demo@example.com

Password: password123

Note: No actual database is required – all data is stored in localStorage for the hackathon prototype.

🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the repository

Create your feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

👥 Team
Name	Role
B. Vasupriya Patnaik	Frontend Lead, UI/UX Design
Palavalasa Sai Joshitha	Backend Integration, AI Logic
📄 License
Distributed under the MIT License. See LICENSE for more information.

🙏 Acknowledgements
Groq Cloud for the ultra‑fast Llama 3.3 API

Lucide Icons for beautiful open‑source icons

Tailwind CSS for rapid styling

React Hot Toast for delightful notifications

📬 Contact
Vasupriya Patnaik – GitHub

Joshitha – GitHub

Project Link: https://github.com/VasupriyaPatnaik/EduPath-AI

⭐ If this project helped you, please give it a star! ⭐

text

---

This README is tailored to the visible structure of your repository (`backend/`, `frontend/`). If you have additional internal files (e.g., actual ML models, a `docs/` folder, or a more complex backend), let me know and I will update the structure accordingly.

