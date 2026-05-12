import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../store/slices/authSlice';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center bg-light/50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 glass rounded-[40px] overflow-hidden shadow-2xl"
      >
        {/* Left Side: Illustration/Text */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-primary/5 border-r border-white/20">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-xl">
              <HeartPulse className="text-white" size={24} />
            </div>
            <span className="text-2xl font-display font-bold tracking-tight">
              Cure<span className="text-primary">Sphere</span>
            </span>
          </Link>

          <div className="space-y-6">
            <h2 className="heading-lg">Welcome back to <span className="text-primary">Health.</span></h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Login to access your dashboard, book appointments, and manage your health records seamlessly.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <ShieldCheck className="text-accent" size={16} />
                </div>
                <span className="font-semibold text-gray-700">Encrypted Data Storage</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <ShieldCheck className="text-accent" size={16} />
                </div>
                <span className="font-semibold text-gray-700">HIPAA Compliant Platform</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-400">
            © 2026 CureSphere. All rights reserved.
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-10 lg:hidden flex justify-center">
             <Link to="/" className="flex items-center gap-2">
              <div className="p-2 bg-primary rounded-xl">
                <HeartPulse className="text-white" size={24} />
              </div>
              <span className="text-2xl font-display font-bold">CureSphere</span>
            </Link>
          </div>

          <h3 className="text-3xl font-display font-bold mb-2">Sign In</h3>
          <p className="text-gray-500 mb-8">Enter your credentials to access your account</p>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <Link to="/forgot-password" size="sm" className="text-xs font-semibold text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-4 flex items-center justify-center gap-2 group"
            >
              {isLoading ? 'Signing In...' : (
                <>
                  Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="text-center">
              <p className="text-gray-500 text-sm">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary font-bold hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
