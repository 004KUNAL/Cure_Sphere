import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Ambulance, Phone, AlertCircle, MapPin, Navigation,
  CheckCircle2, Heart, Wind, Zap, Thermometer, Brain,
  Activity, Clock, Shield, ChevronRight, X, User,
  Share2, Droplets, Info, Plus
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EMERGENCY_TYPES = [
  { id: 'cardiac', label: 'Heart Attack', icon: <Heart size={20} />, color: 'red', tip: 'Chew aspirin if available. Keep patient calm and seated.' },
  { id: 'breathing', label: 'Breathing Issue', icon: <Wind size={20} />, color: 'blue', tip: 'Loosen tight clothing. Sit upright. Use inhaler if available.' },
  { id: 'unconscious', label: 'Unconscious', icon: <Brain size={20} />, color: 'purple', tip: 'Check breathing. Place in recovery position. Do not give fluids.' },
  { id: 'bleeding', label: 'Severe Bleeding', icon: <Droplets size={20} />, color: 'rose', tip: 'Apply firm pressure with clean cloth. Elevate the wound above heart.' },
  { id: 'seizure', label: 'Seizure', icon: <Zap size={20} />, color: 'yellow', tip: 'Clear area, cushion head. Do not restrain. Time the seizure.' },
  { id: 'fever', label: 'High Fever', icon: <Thermometer size={20} />, color: 'orange', tip: 'Apply cool damp cloth to forehead. Give fluids if conscious.' },
];

const HOSPITALS = [
  { name: 'AIIMS Trauma Center', dist: '1.2 km', eta: '4 min', beds: 15, rating: 4.9 },
  { name: 'Fortis Memorial Hospital', dist: '2.5 km', eta: '8 min', beds: 10, rating: 4.8 },
  { name: 'Max Super Speciality', dist: '3.8 km', eta: '12 min', beds: 22, rating: 4.7 },
];

const FIRST_AID = [
  {
    title: 'CPR Steps',
    steps: ['Call emergency services', 'Place heel of hand on center of chest', 'Push hard & fast — 100-120 compressions/min', 'Give 2 rescue breaths after every 30 compressions', 'Continue until help arrives'],
  },
  {
    title: 'Choking (Heimlich)',
    steps: ['Stand behind the person', 'Give 5 firm back blows between shoulder blades', 'Give 5 abdominal thrusts', 'Alternate until object is dislodged', 'Call 911 if unconscious'],
  },
  {
    title: 'Stroke (FAST)',
    steps: ['Face: Ask them to smile — is it drooping?', 'Arms: Can they raise both arms?', 'Speech: Is it slurred or strange?', 'Time: Call 911 immediately', 'Note exact time symptoms started'],
  },
];

const Emergency = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [status, setStatus] = useState('idle');
  const [timer, setTimer] = useState(8);
  const [selectedType, setSelectedType] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [activeGuide, setActiveGuide] = useState(null);
  const [activeTab, setActiveTab] = useState('sos');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showMedicalId, setShowMedicalId] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [breathCount, setBreathCount] = useState(0);
  const [breathActive, setBreathActive] = useState(false);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (showMedicalId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMedicalId]);

  useEffect(() => {
    let interval;
    if (status === 'arriving') {
      setTimer(8);
      interval = setInterval(() => setTimer(p => p > 0 ? p - 1 : 0), 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (!breathActive) return;
    const phases = ['inhale', 'hold', 'exhale', 'hold'];
    const durations = [4000, 2000, 4000, 2000];
    let idx = 0;
    const run = () => {
      setBreathPhase(phases[idx]);
      idx = (idx + 1) % phases.length;
      if (idx % 4 === 0) setBreathCount(p => p + 1);
    };
    run();
    const t = setInterval(run, durations[idx]);
    return () => clearInterval(t);
  }, [breathActive]);

  const getLocation = () => {
    setLocationLoading(true);
    navigator.geolocation?.getCurrentPosition(
      (pos) => { setLocation({ lat: pos.coords.latitude.toFixed(4), lng: pos.coords.longitude.toFixed(4) }); setLocationLoading(false); },
      () => { setLocation({ lat: '28.6139', lng: '77.2090', fallback: true }); setLocationLoading(false); }
    );
  };

  const handleSOS = async () => {
    if (!user) return navigate('/login');
    if (!selectedType) {
      alert("Please select the type of emergency first.");
      return;
    }
    
    setStatus('requesting');
    
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      await axios.post('http://localhost:5000/api/emergency', {
        type: selectedType.id,
        location: location || { lat: '0', lng: '0' }
      }, config);
      
      setTimeout(() => { 
        setStatus('confirmed'); 
        setTimeout(() => setStatus('arriving'), 3000); 
      }, 3000);
    } catch (error) {
      console.error("SOS Request Failed:", error);
      alert("Failed to send SOS. Calling local emergency services directly...");
      window.location.href = "tel:112";
    }
  };

  const handleShare = () => {
    const text = `🚨 EMERGENCY ALERT from ${user?.name || 'CureSphere User'}\nLocation: ${location?.lat}, ${location?.lng}\nEmergency: ${selectedType?.label || 'Medical Emergency'}\nTrack: https://maps.google.com/?q=${location?.lat},${location?.lng}`;
    navigator.clipboard?.writeText(text);
    setShowShareModal(true);
    setTimeout(() => setShowShareModal(false), 3000);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-red-50/50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-br from-red-500/8 via-rose-500/5 to-transparent -z-10" />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-10 flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-full font-bold text-xs mb-5">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> 24/7 LIVE Emergency Response
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-display font-black mb-3 italic tracking-tight">Cure<span className="text-red-500">Sphere</span> SOS</h1>
          <p className="text-gray-500 max-w-lg mx-auto font-medium">Instant dispatch · GPS tracking · First aid guides · Medical ID</p>
          
          <button 
            onClick={() => setShowMedicalId(true)}
            className="mt-6 flex items-center gap-2 px-6 py-2.5 bg-dark text-white rounded-2xl font-black text-sm hover:scale-105 transition-all shadow-xl shadow-dark/20"
          >
            <Shield size={16} className="text-red-500" /> View My Medical ID
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex flex-wrap gap-2 justify-center mb-10 bg-gray-100 p-1.5 rounded-2xl w-fit mx-auto shadow-inner">
          {[{ id: 'sos', label: '🚨 SOS Dispatch' }, { id: 'hospitals', label: '🏥 Hospitals' }, { id: 'firstaid', label: '🩺 First Aid' }, { id: 'breathe', label: '🌬 Calm Down' }].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`px-3 sm:px-4 py-2 rounded-xl text-[10px] sm:text-xs font-black transition-all ${activeTab === t.id ? 'bg-white shadow-md text-red-500' : 'text-gray-500 hover:text-gray-700'}`}>
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* === SOS TAB === */}
          {activeTab === 'sos' && (
            <motion.div key="sos" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-10">

              {/* Emergency Type Selector */}
              {status === 'idle' && (
                <div className="w-full max-w-3xl">
                  <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Select Emergency Type</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {EMERGENCY_TYPES.map(type => (
                      <button key={type.id} onClick={() => setSelectedType(selectedType?.id === type.id ? null : type)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${selectedType?.id === type.id ? 'border-red-400 bg-red-50 shadow-lg' : 'border-gray-100 bg-white hover:border-red-200'}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-red-500">{type.icon}</span>
                          <span className="font-bold text-sm">{type.label}</span>
                        </div>
                        {selectedType?.id === type.id && (
                          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-[10px] text-gray-500 mt-2 leading-relaxed font-medium">
                            {type.tip}
                          </motion.p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* SOS Button & Status */}
              <div className="flex flex-col items-center gap-6">
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.button key="btn" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={handleSOS}
                      className="w-52 h-52 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-[0_0_60px_rgba(239,68,68,0.45)] flex flex-col items-center justify-center text-white border-[10px] border-white relative overflow-hidden group">
                      <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.15, 0, 0.15] }} transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-white rounded-full" />
                      <Ambulance size={48} className="mb-2 relative z-10 group-hover:rotate-12 transition-transform" />
                      <span className="text-3xl font-display font-black tracking-tight z-10">SOS</span>
                      <span className="text-[10px] font-bold opacity-80 uppercase mt-1 z-10">Tap to Dispatch</span>
                    </motion.button>
                  )}

                  {status === 'requesting' && (
                    <motion.div key="req" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4">
                      <div className="relative w-52 h-52 flex items-center justify-center">
                        <div className="absolute inset-0 border-[10px] border-red-100 rounded-full" />
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                          className="absolute inset-0 border-[10px] border-t-red-500 border-transparent rounded-full" />
                        <div className="text-center">
                          <p className="text-red-500 font-black text-lg animate-pulse">Requesting...</p>
                          <p className="text-xs text-gray-400 mt-1">Contacting Central Hub</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {status === 'confirmed' && (
                    <motion.div key="conf" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                      className="glass p-8 rounded-[40px] flex flex-col items-center gap-4 border-white/20 shadow-2xl text-center">
                      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-200">
                        <CheckCircle2 size={40} />
                      </div>
                      <h3 className="text-2xl font-black">Ambulance Confirmed!</h3>
                      <p className="text-gray-500">Unit #442 · Driver: Rajesh Kumar · ETA calculating...</p>
                    </motion.div>
                  )}

                  {status === 'arriving' && (
                    <motion.div key="arr" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      className="w-full max-w-2xl glass p-6 md:p-10 rounded-[40px] shadow-2xl border-white/40">
                      <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="relative w-full md:w-52 h-44 rounded-2xl overflow-hidden shadow-lg bg-gray-100 shrink-0 border-4 border-white">
                          <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Map" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          <motion.div animate={{ x: [0, 15, 0], y: [0, 8, 0] }} transition={{ duration: 3, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 drop-shadow-lg">
                            <Navigation size={28} fill="currentColor" className="rotate-45" />
                          </motion.div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 text-center shadow-sm">
                              <p className="text-[10px] font-black text-red-500 uppercase">Live Unit Location</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 w-full">
                          <div className="inline-block px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded-full mb-3 uppercase tracking-wider">Unit In Transit</div>
                          <div className="flex items-baseline gap-2 mb-5">
                            <span className="text-5xl font-display font-black text-red-500">{timer}</span>
                            <span className="text-gray-400 font-bold">min away</span>
                          </div>
                          <div className="space-y-3">
                            {[
                              { icon: <MapPin size={14} />, label: 'Pickup Point', value: location ? `${location.lat}, ${location.lng}` : 'Detected GPS' },
                              { icon: <Phone size={14} />, label: 'Driver Contact', value: '+91 98765 43210' },
                              { icon: <Shield size={14} />, label: 'Unit Details', value: 'AMB-442 · ACLS Equipped' },
                            ].map((item, i) => (
                              <div key={i} className="flex items-center gap-3 p-3 bg-white/50 border border-white/40 rounded-xl">
                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-gray-500 shadow-sm">{item.icon}</div>
                                <div>
                                  <p className="text-[10px] text-gray-400 font-bold uppercase">{item.label}</p>
                                  <p className="text-sm font-bold">{item.value}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <button onClick={handleShare} className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-dark text-white font-black rounded-2xl hover:bg-black transition-all text-sm shadow-xl shadow-dark/10">
                        <Share2 size={16} /> Notify My Emergency Contacts
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Share Confirmation Toast */}
                <AnimatePresence>
                  {showShareModal && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-2xl z-50 flex items-center gap-2">
                      <CheckCircle2 size={16} /> SOS Link Copied & Shared!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Location Bar */}
              <div className="w-full max-w-3xl glass p-4 rounded-2xl border-white/20 flex items-center gap-3 shadow-xl">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500 shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Detected GPS Coordinates</p>
                  <p className="text-sm font-bold truncate text-dark">
                    {locationLoading ? 'Syncing with Satellite...' : location?.fallback ? 'New Delhi, India (Default)' : `${location?.lat}°N, ${location?.lng}°E`}
                  </p>
                </div>
                <button onClick={getLocation} className="px-3 py-1 text-xs font-black bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-all shrink-0">RE-SYNC</button>
              </div>

              {/* Quick Call Cards */}
              <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Police / Emergency', number: '112', color: 'red' },
                  { name: 'Ambulance', number: '102', color: 'primary' },
                  { name: 'Medical Helpline', number: '108', color: 'rose' },
                ].map((c, i) => (
                  <a key={i} href={`tel:${c.number}`}
                    className="glass p-5 rounded-2xl flex items-center justify-between hover:scale-105 transition-all group border-white/20 shadow-md">
                    <div>
                      <p className="text-[10px] text-gray-400 font-black uppercase mb-1">{c.name}</p>
                      <p className="text-xl font-black text-red-600 tracking-wider">{c.number}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-400 group-hover:bg-red-500 group-hover:text-white transition-all shadow-sm">
                      <Phone size={18} />
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          )}

          {/* === HOSPITALS TAB === */}
          {activeTab === 'hospitals' && (
            <motion.div key="hosp" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto space-y-4">
              <p className="text-center text-xs text-gray-400 font-black uppercase tracking-[0.2em] mb-6">Nearby Emergency Trauma Centers</p>
              {HOSPITALS.map((h, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="glass p-6 rounded-3xl border-white/20 hover:shadow-xl transition-all group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4 items-start">
                      <div className="w-12 h-12 bg-red-50 group-hover:bg-red-500 group-hover:text-white rounded-2xl flex items-center justify-center text-red-500 shrink-0 text-xl font-black transition-all shadow-sm">#{i + 1}</div>
                      <div>
                        <h4 className="font-black text-lg text-dark group-hover:text-red-600 transition-colors">{h.name}</h4>
                        <div className="flex gap-4 mt-2 text-xs text-gray-500 font-bold flex-wrap">
                          <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg"><MapPin size={10} />{h.dist}</span>
                          <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg"><Clock size={10} />ETA {h.eta}</span>
                          <span className="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-1 rounded-lg"><Activity size={10} />{h.beds} BEDS FREE</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <a href="tel:112" className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-red-200">
                        <Phone size={18} />
                      </a>
                      <button className="p-3 bg-dark text-white rounded-xl hover:bg-black transition-all shadow-lg shadow-dark/10">
                        <Navigation size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* === FIRST AID TAB === */}
          {activeTab === 'firstaid' && (
            <motion.div key="aid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto space-y-4">
              <div className="bg-red-600 p-6 rounded-[32px] text-white mb-6 shadow-xl shadow-red-200 relative overflow-hidden">
                <AlertCircle className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 rotate-12" />
                <h3 className="text-xl font-black mb-1 flex items-center gap-2"><Info size={20} /> Professional Tip</h3>
                <p className="text-sm text-red-50 font-medium leading-relaxed">During any emergency, try to remain calm. Take deep breaths and follow these verified medical steps until a professional arrives.</p>
              </div>
              
              {FIRST_AID.map((guide, i) => (
                <div key={i} className="glass rounded-[32px] border-white/20 overflow-hidden shadow-md">
                  <button onClick={() => setActiveGuide(activeGuide === i ? null : i)}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-white/50 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 font-black text-lg shadow-inner">{i + 1}</div>
                      <h4 className="font-black text-lg text-dark">{guide.title}</h4>
                    </div>
                    <motion.div animate={{ rotate: activeGuide === i ? 90 : 0 }}>
                      <ChevronRight size={20} className="text-gray-400" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {activeGuide === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-gray-100 bg-white/30">
                        <div className="p-6 space-y-4">
                          {guide.steps.map((step, j) => (
                            <div key={j} className="flex gap-4 items-start">
                              <div className="w-8 h-8 bg-dark text-white rounded-xl flex items-center justify-center text-xs font-black shrink-0 shadow-sm">{j + 1}</div>
                              <p className="text-sm text-gray-700 font-semibold pt-1.5 leading-relaxed">{step}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          )}

          {/* === BREATHE / CALM TAB === */}
          {activeTab === 'breathe' && (
            <motion.div key="breathe" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-8 max-w-lg mx-auto">
              <div className="text-center">
                <h3 className="text-3xl font-black mb-3 text-dark italic">Breathe & Reset</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">Box breathing lowers cortisol and stabilizes heart rate. Perfect for high-stress moments.</p>
              </div>
              <div className="relative w-64 h-64 flex items-center justify-center">
                <motion.div
                  animate={breathActive ? {
                    scale: breathPhase === 'inhale' ? 1.3 : breathPhase === 'exhale' ? 0.8 : 1.3,
                    backgroundColor: breathPhase === 'inhale' || breathPhase === 'hold' ? '#ef4444' : '#3b82f6',
                  } : { scale: 1 }}
                  transition={{ duration: breathPhase === 'hold' ? 0.1 : 4, ease: 'easeInOut' }}
                  className="w-full h-full rounded-full bg-red-100 flex items-center justify-center border-8 border-white shadow-2xl relative overflow-hidden">
                  <div className="text-center relative z-10">
                    {breathActive ? (
                      <>
                        <p className="text-white font-black text-2xl uppercase tracking-tighter drop-shadow-md">{breathPhase}</p>
                        <p className="text-white/80 text-[10px] font-black mt-1 uppercase tracking-widest">ROUND {breathCount + 1}</p>
                      </>
                    ) : (
                      <Wind size={56} className="text-red-400 animate-pulse" />
                    )}
                  </div>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-dashed border-white/30 rounded-full" 
                  />
                </motion.div>
              </div>
              <button onClick={() => { setBreathActive(!breathActive); if (breathActive) { setBreathCount(0); setBreathPhase('inhale'); } }}
                className={`px-12 py-4 rounded-[24px] font-black text-white transition-all shadow-xl ${breathActive ? 'bg-dark hover:bg-black shadow-dark/20' : 'bg-red-500 hover:bg-red-600 shadow-red-200'}`}>
                {breathActive ? 'STOP SESSION' : 'START BREATHING GUIDE'}
              </button>
              <div className="grid grid-cols-2 gap-3 w-full text-center">
                {['Inhale 4s', 'Hold 2s', 'Exhale 4s', 'Hold 2s'].map((l, i) => (
                  <div key={i} className="bg-white border border-gray-100 p-3 rounded-2xl font-black text-[10px] uppercase text-gray-500 tracking-wider shadow-sm">{l}</div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Medical ID Modal */}
        <AnimatePresence>
          {showMedicalId && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                onClick={() => setShowMedicalId(false)}
                className="absolute inset-0 bg-dark/60 backdrop-blur-md"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-lg bg-white rounded-[40px] overflow-hidden shadow-2xl"
              >
                <div className="bg-red-600 p-8 text-white relative">
                  <button onClick={() => setShowMedicalId(false)} className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                    <X size={20} />
                  </button>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-lg">
                      <Shield size={32} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black italic">Medical ID</h2>
                      <p className="text-red-100 text-sm font-bold opacity-80 uppercase tracking-widest">Emergency Responders Info</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl border border-white/20">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
                      <img src={user?.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div>
                      <p className="font-black text-lg leading-none">{user?.name}</p>
                      <p className="text-xs font-bold opacity-70 mt-1 uppercase">DOB: 12 July 1995 · Male</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar" data-lenis-prevent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Blood Group</p>
                      <p className="text-2xl font-black text-red-600">{user?.medicalId?.bloodGroup || 'O+'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Weight / Height</p>
                      <p className="text-lg font-black text-dark">72 kg / 178 cm</p>
                    </div>
                  </div>

                  {[
                    { label: 'Allergies', value: user?.medicalId?.allergies || 'Penicillin, Dust', icon: <AlertCircle className="text-red-500" /> },
                    { label: 'Medications', value: user?.medicalId?.medications || 'None active', icon: <Plus className="text-blue-500" /> },
                    { label: 'Conditions', value: user?.medicalId?.chronicConditions || 'None', icon: <Activity className="text-green-500" /> },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100">{item.icon}</div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase mb-1">{item.label}</p>
                        <p className="text-sm font-bold text-dark">{item.value}</p>
                      </div>
                    </div>
                  ))}

                  <div className="pt-6 border-t border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-4">Emergency Contact</p>
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-3xl border border-red-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-500 shadow-sm"><User size={18} /></div>
                        <div>
                          <p className="font-black text-dark leading-none">{user?.medicalId?.emergencyContact?.name || 'Sarah Johnson'}</p>
                          <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">{user?.medicalId?.emergencyContact?.relationship || 'Wife'}</p>
                        </div>
                      </div>
                      <a href={`tel:${user?.medicalId?.emergencyContact?.phone || '9876543210'}`} className="w-10 h-10 bg-red-500 text-white rounded-xl flex items-center justify-center hover:bg-red-600 transition-all shadow-lg shadow-red-200">
                        <Phone size={18} />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 pt-0">
                  <button 
                    onClick={() => navigate('/profile')}
                    className="w-full py-4 bg-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-200 transition-all text-xs uppercase tracking-widest"
                  >
                    Edit Medical Info in Profile
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Emergency;
