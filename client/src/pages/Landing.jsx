import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ShieldCheck, 
  Clock, 
  Stethoscope, 
  Pill, 
  Ambulance, 
  Users, 
  BookOpen, 
  ArrowRight,
  Play
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // GSAP Hero Animation
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.2
      });
      
      gsap.from('.hero-image', {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out',
        delay: 0.5
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      title: 'Doctor Consultation',
      desc: 'Expert medical advice from top specialists via video or chat.',
      icon: <Stethoscope className="text-primary" size={32} />,
      link: '/doctors',
      color: 'bg-blue-50'
    },
    {
      title: 'Online Pharmacy',
      desc: 'Get your medicines delivered at your doorstep with ease.',
      icon: <Pill className="text-secondary" size={32} />,
      link: '/pharmacy',
      color: 'bg-teal-50'
    },
    {
      title: 'Emergency Help',
      desc: 'One-click ambulance request and live location tracking.',
      icon: <Ambulance className="text-red-500" size={32} />,
      link: '/emergency',
      color: 'bg-red-50'
    },
    {
      title: 'Medical Community',
      desc: 'Join discussions and share health experiences with others.',
      icon: <Users className="text-accent" size={32} />,
      link: '/community',
      color: 'bg-green-50'
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center section-padding pt-32 lg:pt-0">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 left-[-10%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="flex flex-col gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 w-fit"
            >
              <ShieldCheck className="text-accent" size={18} />
              <span className="text-sm font-semibold text-gray-600">Trusted by 1M+ Users across India</span>
            </motion.div>

            <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-tight">
              Your <span className="text-gradient">Complete Health</span> Ecosystem.
            </h1>
            
            <p className="hero-title text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
              CureSphere brings doctors, medicines, and community together in one premium platform. Experience the future of healthcare today.
            </p>

            <div className="hero-title flex flex-col sm:flex-row gap-4 pt-4">
              {user ? (
                <Link to={user.role === 'vendor' ? '/vendor/dashboard' : `/profile/${user._id}`} className="btn-primary flex items-center justify-center gap-2 group text-sm sm:text-base">
                  {user.role === 'vendor' ? 'Go to Dashboard' : 'Go to Profile'} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <Link to="/register" className="btn-primary flex items-center justify-center gap-2 group text-sm sm:text-base">
                  Start Your Journey <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
              <button className="flex items-center justify-center gap-3 font-bold hover:text-primary transition-colors px-6 py-3 text-sm sm:text-base">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-primary flex items-center justify-center animate-pulse">
                  <Play size={12} sm:size={14} fill="currentColor" />
                </div>
                How it Works
              </button>
            </div>

            <div className="hero-title grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-8 border-t border-gray-100 pt-8">
              <div>
                <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-dark">500+</h4>
                <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm">Expert Doctors</p>
              </div>
              <div>
                <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-dark">10k+</h4>
                <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm">Medicines</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-dark">24/7</h4>
                <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm">Support</p>
              </div>
            </div>
          </div>

          <div className="hero-image relative">
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-[12px] border-white">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070" 
                alt="Healthcare Tech" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
            </div>
            
            {/* Floating Elements - Hidden on small mobile */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 glass p-4 md:p-6 rounded-2xl shadow-xl z-20 hidden sm:flex items-center gap-4"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <Clock className="text-accent" size={20} />
              </div>
              <div>
                <p className="text-[10px] md:text-xs text-gray-500">Quick Appointment</p>
                <p className="text-sm md:text-base font-bold">In 2 Minutes</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 glass p-4 md:p-6 rounded-2xl shadow-xl z-20 hidden sm:flex items-center gap-4"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Stethoscope className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-[10px] md:text-xs text-gray-500">Live Consultation</p>
                <p className="text-sm md:text-base font-bold">Expert Doctors</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="section-padding bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 px-4">
            <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-4">Comprehensive <span className="text-gradient">Medical Services</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need for your health, integrated into a single seamless experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services
              .filter(service => {
                if (user?.role === 'doctor') {
                  return !['Doctor Consultation', 'Emergency Help'].includes(service.title);
                }
                return true;
              })
              .map((service, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  onClick={() => navigate(service.link)}
                  className={`p-8 rounded-[32px] ${service.color} border border-transparent hover:border-gray-100 transition-all duration-300 group cursor-pointer`}
                >
                  <div className="mb-6 p-4 bg-white rounded-2xl shadow-sm w-fit group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.desc}
                  </p>
                  <div className="flex items-center gap-2 font-bold text-sm group-hover:gap-3 transition-all text-dark">
                    Learn More <ArrowRight size={16} />
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="section-padding bg-dark text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="px-4">
            <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-8">Why Choose <span className="text-primary">CureSphere?</span></h2>
            <div className="flex flex-col gap-8">
              {[
                { title: 'AI-Powered Insights', desc: 'Get preliminary health checks using our advanced AI symptom checker.' },
                { title: 'Secure & Private', desc: 'Your medical data is encrypted and secure with hospital-grade protocols.' },
                { title: 'Global Network', desc: 'Connect with specialists across various timezones for instant help.' },
                { title: 'One-Click SOS', desc: 'Instant emergency assistance with live ambulance tracking.' }
              ].map((f, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <div className="w-3 h-3 bg-primary rounded-full" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{f.title}</h4>
                    <p className="text-gray-400">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="glass-dark p-1 rounded-[40px] rotate-3 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1584982224638-dfd28444462e?auto=format&fit=crop&q=80&w=2069" 
                alt="Digital Health" 
                className="w-full h-auto rounded-[38px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto glass p-12 md:p-20 rounded-[48px] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-[100px] -ml-32 -mb-32" />
          
          <div className="relative z-10 px-4">
            <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-6">Ready to prioritize your <span className="text-gradient">health?</span></h2>
            <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-base md:text-lg">
              Join thousands of users who have transformed their healthcare experience with CureSphere. Create your account today.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {user ? (
                <Link to={
                  user.role === 'doctor' ? `/profile/${user._id}` : 
                  user.role === 'vendor' ? '/vendor/dashboard' : 
                  '/community'
                } className="btn-primary">
                  {
                    user.role === 'doctor' ? 'Manage Your Profile' : 
                    user.role === 'vendor' ? 'Go to Dashboard' : 
                    'Visit Community'
                  }
                </Link>
              ) : (
                <Link to="/register" className="btn-primary">Join CureSphere Now</Link>
              )}
              <Link to="/contact" className="px-8 py-4 border-2 border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-colors">Talk to Sales</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
