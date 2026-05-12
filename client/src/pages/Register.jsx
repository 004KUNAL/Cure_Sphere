import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../store/slices/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  HeartPulse, 
  Stethoscope,
  MapPin,
  Briefcase,
  DollarSign,
  Phone
} from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'user',
    specialization: '',
    experience: '',
    fees: '',
    city: ''
  });

  const { name, email, password, phone, role, specialization, experience, fees, city } = formData;

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
    dispatch(register(formData));
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center bg-light/50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 glass rounded-[40px] overflow-hidden shadow-2xl"
      >
        {/* Left Side: Illustration/Text */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-secondary/5 border-r border-white/20">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 bg-secondary rounded-xl">
              <HeartPulse className="text-white" size={24} />
            </div>
            <span className="text-2xl font-display font-bold tracking-tight">
              Cure<span className="text-secondary">Sphere</span>
            </span>
          </Link>

          <div className="space-y-6">
            <h2 className="heading-lg">Join the <span className="text-secondary">Revolution.</span></h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              CureSphere connects patients with top-tier medical professionals. Register today to experience the future of digital healthcare.
            </p>
            <div className="flex flex-col gap-4 mt-8">
               <div className="flex items-center gap-4 p-4 glass rounded-2xl">
                 <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
                   <Stethoscope size={20} />
                 </div>
                 <div>
                   <p className="font-bold text-sm">For Doctors</p>
                   <p className="text-xs text-gray-500">Reach more patients worldwide</p>
                 </div>
               </div>
                <div className="flex items-center gap-4 p-4 glass rounded-2xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-sm">For Patients</p>
                    <p className="text-xs text-gray-500">Book instant consultations</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 glass rounded-2xl">
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-sm">For Vendors</p>
                    <p className="text-xs text-gray-500">Sell medical supplies & meds</p>
                  </div>
                </div>
            </div>
          </div>

          <div className="text-sm text-gray-400">
            Secure, HIPAA-compliant platform.
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center max-h-[80vh] overflow-y-auto custom-scrollbar">
          <h3 className="text-3xl font-display font-bold mb-2">Create Account</h3>
          <p className="text-gray-500 mb-8">Choose your role and fill in your details</p>

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Role Selection */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'user' })}
                className={`py-3 rounded-2xl border transition-all font-bold text-xs md:text-sm flex items-center justify-center gap-2 ${
                  role === 'user' ? 'bg-dark text-white border-dark shadow-xl' : 'bg-gray-50 text-gray-500 border-gray-100'
                }`}
              >
                <User size={18} /> Patient
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'doctor' })}
                className={`py-3 rounded-2xl border transition-all font-bold text-xs md:text-sm flex items-center justify-center gap-2 ${
                  role === 'doctor' ? 'bg-secondary text-white border-secondary shadow-xl shadow-secondary/20' : 'bg-gray-50 text-gray-500 border-gray-100'
                }`}
              >
                <Stethoscope size={18} /> Doctor
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'vendor' })}
                className={`py-3 rounded-2xl border transition-all font-bold text-xs md:text-sm flex items-center justify-center gap-2 ${
                  role === 'vendor' ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20' : 'bg-gray-50 text-gray-500 border-gray-100'
                }`}
              >
                <Briefcase size={18} /> Vendor
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="text" name="name" value={name} onChange={onChange} placeholder="John Doe" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-secondary/20 transition-all text-sm" required />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="email" name="email" value={email} onChange={onChange} placeholder="john@example.com" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-secondary/20 transition-all text-sm" required />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="password" name="password" value={password} onChange={onChange} placeholder="••••••••" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-secondary/20 transition-all text-sm" required />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="tel" name="phone" value={phone} onChange={onChange} placeholder="+1 234 567 890" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-secondary/20 transition-all text-sm" required />
                </div>
              </div>
            </div>

            <AnimatePresence>
              {role === 'doctor' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-4 overflow-hidden pt-2"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Specialization</label>
                      <div className="relative">
                        <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" name="specialization" value={specialization} onChange={onChange} placeholder="Cardiology" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-secondary/20 transition-all text-sm" required={role === 'doctor'} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Experience (Years)</label>
                      <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="number" name="experience" value={experience} onChange={onChange} placeholder="10" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-secondary/20 transition-all text-sm" required={role === 'doctor'} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Consultation Fees ($)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="number" name="fees" value={fees} onChange={onChange} placeholder="50" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-secondary/20 transition-all text-sm" required={role === 'doctor'} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Clinic City</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" name="city" value={city} onChange={onChange} placeholder="New York" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-secondary/20 transition-all text-sm" required={role === 'doctor'} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              {role === 'vendor' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-4 overflow-hidden pt-2"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Business Name</label>
                      <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" name="name" value={name} onChange={onChange} placeholder="Health Meds Co." className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-sm" required={role === 'vendor'} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Business City</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" name="city" value={city} onChange={onChange} placeholder="Chicago" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-sm" required={role === 'vendor'} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 flex items-center justify-center gap-2 group mt-6 rounded-2xl font-bold transition-all shadow-xl ${
                role === 'doctor' ? 'bg-secondary text-white shadow-secondary/20 hover:bg-secondary-dark' : 
                role === 'vendor' ? 'bg-primary text-white shadow-primary/20 hover:bg-primary-dark' :
                'bg-dark text-white shadow-dark/20 hover:bg-black'
              }`}
            >
              {isLoading ? 'Creating Account...' : (
                <>
                  Register Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <p className="text-center text-gray-500 text-sm mt-6">
              Already have an account? <Link to="/login" className="text-secondary font-bold hover:underline">Sign In</Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
