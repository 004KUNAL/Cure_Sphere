# CureSphere - Premium MedTech Platform

<p align="center">
  <a href="https://github.com/004KUNAL">
    <img src="https://streak-stats.demolab.com?user=004KUNAL&theme=tokyonight&hide_border=true&border_radius=10" alt="Kunal's GitHub Streak" />
  </a>
</p>

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

---

## ⚡ GitHub Contribution Streak Keeper

This repository is equipped with an automated streak maintainer to ensure continuous contribution history on GitHub.

### 📊 Streak Status
<!-- STREAK_START -->*Last Streak Update: August 05, 2026 10:29 AM UTC*<!-- STREAK_END -->

### ⚙️ How it works
1. **GitHub Actions Workflow**: A scheduled cron job is configured in `.github/workflows/streak.yml`.
2. **Daily Commits**: Every day at 8:00 AM UTC (1:30 PM IST), the workflow automatically updates the timestamp above and commits it back to the repository.
3. **Continuous Activity**: This ensures your GitHub profile keeps its active green contributions and maintains a high streak status.

