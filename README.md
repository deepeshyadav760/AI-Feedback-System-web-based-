# Fynd Feedback - AI-Powered Review Management System

A production-grade feedback ecosystem that utilizes Large Language Models (LLMs) to automatically respond to customers, summarize feedback, and provide actionable business insights.

---

## 🚀 Live Demo
- User Dashboard: https://fynd-user-feedback.vercel.app/
- Admin Dashboard: https://fynd-admin-panel.vercel.app/
- Backend API: https://ai-feedback-system-web-based.onrender.com/

---

## 🌟 Key Features

### 👤 Customer Experience (User Dashboard)
- Instant AI Engagement: Customers receive a personalized, empathetic AI-generated response immediately after submitting feedback, tailored to both star rating and written review.
- Dynamic Star Rating UI: Clean and intuitive interface for seamless feedback submission.
- Real-Time Feedback Confirmation: Success modals and responses powered by LLMs.

### 📊 Business Management (Admin Dashboard)
- AI Review Summarization: Long reviews are automatically condensed into 1–2 sentence summaries.
- Actionable AI Insights: Generates 3 clear, practical business improvement steps based on customer sentiment.
- Live Analytics: View average ratings, total reviews, and 24-hour activity trends.
- Smart Filtering: Filter feedback by star ratings to quickly identify issues or strengths.

---

## 🛠️ Tech Stack

Frontend:
- React.js
- Axios
- CSS3 (Custom Properties, Flexbox, Grid)

Backend:
- Node.js
- Express.js

Database:
- MongoDB Atlas
- Mongoose ODM

AI Integration:
- Groq SDK
- Mixtral-8x7b-32768 Model

Security:
- Helmet.js (Secure HTTP Headers)
- Express Rate Limit (DDoS Protection)
- CORS (Strict Origin Validation)

Deployment:
- Vercel (Frontend)
- Render (Backend)

---

## 📁 Project Structure

fynd-feedback-system/
├── backend/
│   ├── src/
│   │   ├── config/         # Database connection
│   │   ├── models/         # Mongoose schemas (Review.js)
│   │   ├── routes/         # Express API routes
│   │   ├── services/       # AI / LLM logic
│   │   ├── middleware/     # Error handling & security
│   │   └── app.js          # App entry point
├── user-dashboard/         # Customer-facing React app
└── admin-dashboard/        # Business admin React app

---

## ⚙️ Environment Variables

Backend Configuration (/backend/.env)

PORT=5000  
NODE_ENV=production  
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/fynd_db  
GROQ_API_KEY=your_groq_api_key_here  
CORS_ORIGINS=https://fynd-user-feedback.vercel.app,https://fynd-admin-panel.vercel.app  

Frontend Configuration (/user-dashboard/.env & /admin-dashboard/.env)

REACT_APP_API_URL=https://ai-feedback-system-web-based.onrender.com/api  

---

## 🏗️ Local Installation

Clone the Repository

git clone https://github.com/deepeshyadav760/AI-Feedback-System-web-based-.git  
cd AI-Feedback-System-web-based-  

Install & Run Backend

cd backend  
npm install  
npm start  

Install & Run User Dashboard

cd ../user-dashboard  
npm install  
npm start  

Install & Run Admin Dashboard

cd ../admin-dashboard  
npm install  
npm start  

---

## 🔐 Security Standards
- DDoS Protection: Rate limiting to prevent abuse and spam.
- Strict CORS Policy: Only approved frontend domains can access the API.
- XSS Protection: Secure HTTP headers via Helmet.js.
- Graceful Shutdown: Database connections close cleanly on server termination.

---

## 👨‍💻 Author

Deepesh Yadav

GitHub: https://github.com/deepeshyadav760  
LinkedIn: https://www.linkedin.com/in/deepesh-yadav-b29a29250/
