import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../store/slices/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, HeartPulse, User, LogOut, ChevronDown } from 'lucide-react';
import NotificationBell from './NotificationBell';

import API_BASE_URL from '../api/config';

const getAvatarUrl = (avatar) => {
  if (!avatar) return 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
  if (avatar.startsWith('http')) return avatar;
  const avatarPath = avatar.startsWith('/') ? avatar : `/${avatar}`;
  return `${API_BASE_URL}${avatarPath}`;
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const navLinks = [
    { name: 'Dashboard', href: '/vendor/dashboard' },
    { name: 'Doctors', href: '/doctors' },
    { name: 'Pharmacy', href: '/pharmacy' },
    { name: 'Emergency', href: '/emergency' },
    { name: 'Community', href: '/community' },
    { name: 'Remedies', href: '/home-remedies' },
    { name: 'Messages', href: '/chat' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-4 glass' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="p-1.5 md:p-2 bg-primary rounded-lg md:rounded-xl group-hover:rotate-12 transition-transform duration-300">
            <HeartPulse className="text-white w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span className="text-xl md:text-2xl font-display font-bold tracking-tight">
            Cure<span className="text-primary">Sphere</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks
            .filter(link => {
              if (user?.role === 'doctor') {
                return ['Pharmacy', 'Community', 'Messages'].includes(link.name);
              }
              if (user?.role === 'vendor') {
                return ['Dashboard', 'Pharmacy', 'Community'].includes(link.name);
              }
              // Only logged-in patients see Remedies
              if (user?.role === 'patient') {
                return !['Dashboard'].includes(link.name);
              }
              // Guests see Remedies but clicking it will trigger the page's login redirect
              return !['Dashboard'].includes(link.name);
            })
            .map((link) => (
              <Link 
                key={link.name} 
                to={link.href}
                className="text-sm font-medium hover:text-primary transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <NotificationBell />
              <Link 
                to={`/profile/${user._id}`} 
                className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden ring-2 ring-primary/20">
                  {getAvatarUrl(user.avatar) ? (
                    <img src={getAvatarUrl(user.avatar)} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <User size={18} className="text-primary" />
                  )}
                </div>
                {user.name}
              </Link>
              <button 
                onClick={onLogout}
                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold hover:text-primary transition-colors">
                Login
              </Link>
              <Link to="/register" className="btn-primary py-2 px-6">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-dark"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl border-t border-gray-100 p-6 flex flex-col gap-4 shadow-2xl"
          >
            {navLinks
              .filter(link => {
                if (user?.role === 'doctor') {
                  return ['Pharmacy', 'Community', 'Messages'].includes(link.name);
                }
                if (user?.role === 'vendor') {
                  return ['Dashboard', 'Pharmacy', 'Community'].includes(link.name);
                }
                // Only logged-in patients see Remedies
                if (user?.role === 'patient') {
                  return !['Dashboard'].includes(link.name);
                }
                // Guests see Remedies
                return !['Dashboard'].includes(link.name);
              })
              .map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href}
                  className="text-lg font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            <hr className="border-gray-200" />
            {user ? (
              <div className="flex flex-col gap-4">
                <Link 
                  to={`/profile/${user._id}`} 
                  className="flex items-center gap-2 font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User size={20} /> Profile
                </Link>
                <button onClick={onLogout} className="flex items-center gap-2 font-semibold text-red-500">
                  <LogOut size={20} /> Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Link to="/login" className="font-semibold" onClick={() => setIsMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-center" onClick={() => setIsMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
