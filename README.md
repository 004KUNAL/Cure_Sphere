# CureSphere - Premium MedTech Platform

CureSphere is a high-end, scalable MERN stack application designed for modern healthcare needs.

## 🚀 Getting Started

### 1. Prerequisites
- Node.js installed
- MongoDB running locally (default: `mongodb://localhost:27017/curesphere`)

### 2. Backend Setup
```bash
cd server
npm install
# Create .env file (already created for you)
# Seed the database
node seed.js
# Start the server
npm start
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

## 🛠 Tech Stack
- **Frontend**: React, Tailwind CSS, GSAP, Framer Motion, Lenis, Redux Toolkit.
- **Backend**: Node.js, Express, MongoDB, Mongoose.
- **Auth**: JWT & Role-Based Access.

## ✨ Features Implemented
- **Landing Page**: Premium UI with GSAP/Framer Motion.
- **Authentication**: Secure Login/Register with Patient/Doctor roles.
- **Doctor Discovery**: Search and browse medical specialists.
- **Pharmacy**: E-commerce store for medicines with categories.
- **Emergency SOS**: Instant ambulance request simulation with tracking.

## 📁 Folder Structure
- `/client`: React frontend with Vite.
- `/server`: Node.js/Express backend.
- `/implementation_plan.md`: Detailed roadmap of the project.
