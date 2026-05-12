import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import DoctorSearch from './pages/DoctorSearch';
import Pharmacy from './pages/Pharmacy';
import Emergency from './pages/Emergency';
import Community from './pages/Community';
import Profile from './pages/Profile';
import DoctorProfile from './pages/DoctorProfile';
import VendorDashboard from './pages/VendorDashboard';
import Chat from './pages/Chat';
import HomeRemedies from './pages/HomeRemedies';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-light">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/doctors" element={<DoctorSearch />} />
            <Route path="/doctors/:id" element={<DoctorProfile />} />
            <Route path="/pharmacy" element={<Pharmacy />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/home-remedies" element={<HomeRemedies />} />
            {/* Add more routes as we develop */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
