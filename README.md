# 🛡️ JobVerify — AI-Powered Job Safety Toolkit for India

<div align="center">

![JobVerify Banner](https://img.shields.io/badge/JobVerify-AI%20Powered-2D4A3E?style=for-the-badge&logo=shield&logoColor=C9A84C)

**India's first complete AI toolkit to detect fake jobs, verify offers, and get career ready — 100% free.**

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-job--verify--rho.vercel.app-C9A84C?style=for-the-badge)](https://job-verify-rho.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-mehergautam-2D4A3E?style=for-the-badge&logo=github)](https://github.com/mehergautam/JobVerify)
[![Made in India](https://img.shields.io/badge/Made%20with%20❤️-India-FF9933?style=for-the-badge)](https://github.com/mehergautam/JobVerify)

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Groq AI](https://img.shields.io/badge/Groq_AI-LLaMA_3-FF6B35?style=flat-square)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

---

## 🚨 The Problem

Every year, **thousands of Indian job seekers lose money and time** to fake job offers:

- 📧 Fake TCS/Infosys emails asking for "security deposits"
- 💸 "50 LPA for freshers, no experience needed" scams
- 📄 Forged offer letters from non-existent companies
- 🎯 Unrealistic salary promises targeting desperate candidates

**JobVerify solves this with AI.**

---

## ✨ What Makes JobVerify Different

| Feature | JobVerify | Careerflow | Jobscan | LinkedIn Premium |
|---------|-----------|------------|---------|-----------------|
| Fake Job Detector | ✅ **FREE** | ❌ | ❌ | ❌ |
| Resume ATS Score | ✅ **FREE** | 💰 Paid | 💰 Paid | 💰 Paid |
| Interview Prep AI | ✅ **FREE** | ❌ | ❌ | 💰 Paid |
| Cover Letter Gen | ✅ **FREE** | 💰 ₹999/mo | ❌ | ❌ |
| LinkedIn Analyzer | ✅ **FREE** | 💰 Paid | 💰 Paid | 💰 ₹2,499/mo |
| Offer Letter Verify | ✅ **FREE** | ❌ | ❌ | ❌ |
| India Salary Data | ✅ **FREE** | ❌ | ❌ | ❌ |
| **India Focused** | ✅ **YES** | ❌ | ❌ | ❌ |

> **JobVerify = India's only FREE all-in-one AI job safety toolkit**

---

## 🛠️ 8 Powerful AI Tools

### 1. 🔍 Fake Job Detector
Paste any job posting — our AI analyzes **50+ signals** in under 3 seconds:
- ✅ Company MCA/GST registration check
- ✅ Salary benchmark against India market
- ✅ Contact legitimacy (Gmail red flag detection)
- ✅ Language pattern analysis
- ✅ Trust Score: **0-100** with detailed red flags

**Example:**
```
Input: "Software Engineer - 50 LPA for freshers, no experience needed. 
        Send CV to techcorp.hr@gmail.com. Pay ₹5000 security deposit."

Output: Trust Score: 12/100 ⚠️ HIGH RISK
        Red Flags: Unrealistic salary, Gmail contact, Security deposit request
```

### 2. 📄 Resume ATS Analyzer
- Upload PDF or paste text
- AI scores against real ATS systems
- Missing keywords detection for target role
- Actionable suggestions to beat the algorithm
- **Example score: 43 → 89 after optimization**

### 3. 🎤 Interview Prep AI
- 500+ questions from 50+ Indian companies
- TCS, Infosys, Wipro, Razorpay, Swiggy, Zomato
- Real-time AI feedback on your answers
- Company-specific question patterns

### 4. 💰 Salary Reality Check
- India-specific salary data by role + city + experience
- Compare: Bangalore vs Pune vs Mumbai vs Hyderabad
- Example: *React Developer, Pune, 2yr = ₹7-10 LPA*

### 5. ✉️ Offer Letter Verifier
- Paste offer letter text — AI detects:
  - Scam patterns and red flags
  - Missing legal clauses
  - Unrealistic promises
  - Forged company names

### 6. ✍️ Cover Letter Generator ⭐ PREMIUM FREE
- Job description + your skills = personalized letter in 3 seconds
- India-appropriate professional tone
- ATS-friendly formatting
- *Usually ₹999/month on other platforms*

### 7. 💼 LinkedIn Profile Analyzer ⭐ PREMIUM FREE  
- Score your profile like a recruiter sees it
- Headline strength, About quality, Skills relevance
- Recruiter visibility score
- Actionable improvement tips
- *LinkedIn Premium charges ₹2,499/month for similar*

### 8. 📋 History Dashboard
- All your scans saved automatically
- Track your resume score improvements
- View past job analyses
- Export results

---

### Backend
```
Node.js + Express.js — Server framework
MongoDB Atlas        — Cloud database
Mongoose             — ODM
JWT                  — Authentication
bcrypt               — Password hashing
Multer               — File uploads
pdf-parse            — PDF text extraction
```

### AI & Deployment
```
Groq API             — LLaMA 3.3 70B Versatile (ultra-fast inference)
Vercel               — Frontend deployment
Render               — Backend deployment
MongoDB Atlas        — Database hosting
```

---

## 🎨 Design System

**Forest Harmony** — custom design system built for trust and credibility:

```
Primary (60%):   #F5F0E8  — Warm cream backgrounds
Secondary (30%): #2D4A3E  — Deep forest green sidebar
Accent (10%):    #C9A84C  — Gold buttons and highlight
Font:            Plus Jakarta Sans + JetBrains Mono
```

---

## 📸 Screenshots

### Landing Page
> Clean, trust-focused hero with live AI scanner demo

### Dashboard  
> Professional sidebar with all 8 tools + analytics

### Fake Job Detector
> Real-time job analysis with Trust Score visualization

### Resume Analyzer
> ATS scoring with keyword analysis and recommendations

*More screenshots coming soon*

---

## 🚀 Deployment

### Frontend — Vercel
```bash
# Auto-deploys on git push to main
# Live: https://job-verify-rho.vercel.app
```

### Backend — Render
```bash
# Auto-deploys on git push to main  
# API: https://jobverify-goz7.onrender.com
```

**Note:** Render free tier has ~30s cold start. First API call may be slow.

---

## 🗺️ Roadmap

- [x] Fake Job Detector with Trust Score
- [x] Resume ATS Analyzer (PDF + Text)
- [x] Interview Prep AI
- [x] Salary Checker (India)
- [x] Offer Letter Verifier
- [x] Cover Letter Generator
- [x] LinkedIn Profile Analyzer
- [x] User History Dashboard
- [x] JWT Authentication
- [ ] Browser Extension for auto job scanning
- [ ] WhatsApp bot integration
- [ ] Company database (verified Indian companies)
- [ ] Mobile app (React Native)
- [ ] Real-time job feed with verified listings

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

<div align="center">

**Meher Gautam**

*CSE Student | Full Stack Developer | AI Enthusiast*

[![GitHub](https://img.shields.io/badge/GitHub-mehergautam-2D4A3E?style=for-the-badge&logo=github)](https://github.com/mehergautam)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/mehergautam)

> *Built JobVerify in a single day during college break — because every Indian job seeker deserves protection from scams.*

</div>

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**⭐ Star this repo if JobVerify helped you!**

Made with ❤️ for Indian job seekers

*"Stop Fake Jobs. Land Real Offers."*

</div>
