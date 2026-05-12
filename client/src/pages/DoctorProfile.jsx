import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  MapPin, 
  Clock, 
  DollarSign, 
  Award, 
  CheckCircle2, 
  Calendar,
  Phone,
  Mail,
  ChevronRight,
  Video,
  Home,
  X,
  Camera,
  MessageCircle,
  AlertCircle,
  CreditCard,
  Lock
} from 'lucide-react';

import API_BASE_URL from '../api/config';
const getAvatarUrl = (avatar) => {
  if (!avatar) return null;
  if (avatar.startsWith('http')) return avatar;
  return `${API_BASE_URL}${avatar}`;
};

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    type: 'video',
    date: '',
    time: '',
    notes: ''
  });
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role === 'doctor') {
      navigate('/');
      return;
    }
    const fetchDoctor = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/doctors/${id}`);
        setDoctor(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  const handleBookAppointment = async () => {
    if (!user) return navigate('/login');
    
    setIsBookingLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      await axios.post(`${API_BASE_URL}/api/appointments`, {
        doctorId: doctor._id,
        ...bookingData
      }, config);
      
      setBookingSuccess(true);
      setTimeout(() => {
        setIsBookingOpen(false);
        setBookingSuccess(false);
        setBookingStep(1);
      }, 3000);
    } catch (error) {
      alert(error.response?.data?.message || 'Error booking appointment');
    } finally {
      setIsBookingLoading(false);
    }
  };

  if (loading) return <div className="pt-40 text-center font-bold">Loading Doctor Profile...</div>;
  if (!doctor) return <div className="pt-40 text-center">Doctor not found.</div>;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8 px-2">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight size={14} />
          <Link to="/doctors" className="hover:text-primary">Doctors</Link>
          <ChevronRight size={14} />
          <span className="text-gray-600 font-medium">{doctor.user.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left: Info Card */}
          <div className="lg:col-span-2 space-y-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full md:w-64 aspect-square rounded-[40px] overflow-hidden shadow-2xl shrink-0 relative"
              >
                <img 
                  src={getAvatarUrl(doctor.user.avatar) || `https://api.dicebear.com/7.x/avataaars/svg?seed=${doctor.user.name}`} 
                  className="w-full h-full object-cover" 
                  alt="" 
                />
                <div className={`absolute bottom-6 right-6 w-5 h-5 rounded-full border-4 border-white ${doctor.isOnline ? 'bg-green-500' : 'bg-gray-400 shadow-lg'}`} />
              </motion.div>

              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-black uppercase tracking-widest rounded-full">
                    {doctor.specialization}
                  </span>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${doctor.isOnline ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                    {doctor.isOnline ? 'Available Now' : 'Currently Offline'}
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-display font-black text-dark">{doctor.user.name}</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-primary">
                      <Award size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black text-gray-400">Experience</p>
                      <p className="font-bold">{doctor.experience}+ Years</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-primary">
                      <DollarSign size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black text-gray-400">Consultation Fee</p>
                      <p className="font-bold">₹{doctor.fees}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <section className="space-y-4">
              <h2 className="text-2xl font-black flex items-center gap-2">
                About <span className="text-primary">Me</span>
              </h2>
              <p className="text-gray-500 leading-relaxed text-lg">
                {doctor.about || `Dr. ${doctor.user.name} is a highly skilled ${doctor.specialization} with over ${doctor.experience} years of experience.`}
              </p>
            </section>
          </div>

          {/* Right: Booking Widget */}
          <div className="space-y-8">
            <div className="glass p-8 rounded-[40px] shadow-2xl border-white/40 sticky top-40">
              <h3 className="text-2xl font-black mb-6">Consultation</h3>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-sm font-black text-dark flex items-center gap-2 uppercase tracking-tighter">
                    <MapPin size={16} className="text-primary" /> Clinic Location
                  </p>
                  <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                    <p className="font-bold text-dark">{doctor.clinicLocation?.city || 'Downtown Center'}</p>
                    <p className="text-xs text-gray-500 mt-1">{doctor.clinicLocation?.address || '123 Health Ave'}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                   <button 
                    onClick={() => {
                      if (!user) return navigate('/login');
                      if (user.role !== 'user') return alert('Only patients can book appointments');
                      setIsBookingOpen(true);
                    }}
                    className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 shadow-primary/30"
                   >
                    <Calendar size={20} /> Book Instantly
                  </button>
                  <button className="w-full border border-gray-100 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
                    <MessageCircle size={18} /> Chat with Doctor
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingOpen(false)}
              className="absolute inset-0 bg-dark/60 backdrop-blur-md" 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                  <h2 className="text-2xl font-black">Book <span className="text-primary">Appointment</span></h2>
                  <p className="text-sm text-gray-500 font-medium">Step {bookingStep} of 2</p>
                </div>
                <button 
                  onClick={() => setIsBookingOpen(false)}
                  className="p-3 hover:bg-white rounded-full transition-all shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar" data-lenis-prevent>
                {bookingSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-black mb-2">Booking Confirmed!</h3>
                    <p className="text-gray-500">Your payment was successful. Dr. {doctor.user.name} has been notified.</p>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2 mb-8">
                      {[1, 2, 3].map(s => (
                        <div key={s} className={`h-1.5 flex-1 rounded-full transition-all ${s <= bookingStep ? 'bg-primary' : 'bg-gray-100'}`} />
                      ))}
                    </div>

                    {bookingStep === 1 ? (
                      <div className="space-y-6">
                        <p className="text-sm font-black uppercase tracking-widest text-gray-400">Select Consultation Type</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            { id: 'video', label: 'Video Call', icon: <Camera size={24} />, desc: 'Remote visual' },
                            { id: 'phone', label: 'Phone Call', icon: <Phone size={24} />, desc: 'Audio only' },
                            { id: 'clinic', label: 'Clinic Visit', icon: <Home size={24} />, desc: 'In-person' }
                          ].map(type => (
                            <button
                              key={type.id}
                              onClick={() => setBookingData({ ...bookingData, type: type.id })}
                              className={`p-6 rounded-[32px] border-2 transition-all flex flex-col items-center gap-3 text-center ${
                                bookingData.type === type.id ? 'border-primary bg-primary/5' : 'border-gray-50 hover:border-primary/20'
                              }`}
                            >
                              <div className={`p-4 rounded-2xl ${bookingData.type === type.id ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>
                                {type.icon}
                              </div>
                              <div>
                                <p className="font-black text-sm">{type.label}</p>
                                <p className="text-[10px] text-gray-400 uppercase font-bold">{type.desc}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                        
                        <button 
                          onClick={() => setBookingStep(2)}
                          className="w-full btn-primary py-4 rounded-2xl font-black text-lg mt-4"
                        >
                          Continue to Schedule
                        </button>
                      </div>
                    ) : bookingStep === 2 ? (
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Select Date</label>
                            <input 
                              type="date" 
                              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-bold"
                              value={bookingData.date}
                              onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Preferred Time</label>
                            <select 
                              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-bold"
                              value={bookingData.time}
                              onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                            >
                              <option value="">Select Time Slot</option>
                              <option value="09:00 AM">09:00 AM</option>
                              <option value="10:30 AM">10:30 AM</option>
                              <option value="01:00 PM">01:00 PM</option>
                              <option value="03:30 PM">03:30 PM</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Symptoms / Notes (Optional)</label>
                            <textarea 
                              placeholder="Briefly describe your health concern..."
                              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 min-h-[100px] resize-none"
                              value={bookingData.notes}
                              onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                          <button 
                            onClick={() => setBookingStep(1)}
                            className="flex-1 py-4 font-black border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all"
                          >
                            Back
                          </button>
                          <button 
                            onClick={() => setBookingStep(3)}
                            disabled={!bookingData.date || !bookingData.time}
                            className="flex-[2] btn-primary py-4 rounded-2xl font-black text-lg disabled:opacity-50"
                          >
                            Proceed to Payment
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="p-8 bg-dark text-white rounded-[32px] shadow-2xl relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-8 opacity-10">
                              <CreditCard size={120} />
                           </div>
                           <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-8">Payment Summary</p>
                           <div className="flex justify-between items-end">
                              <div>
                                <p className="text-xs opacity-60">Consultation Fee</p>
                                <p className="text-4xl font-black">₹{doctor.fees}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs opacity-60">Doctor</p>
                                <p className="font-bold">Dr. {doctor.user.name}</p>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-6">
                           <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-[32px] border border-blue-100">
                              <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-4">Scan QR to Pay with UPI</p>
                              <div className="w-48 h-48 bg-white p-4 rounded-2xl shadow-sm mb-4 border border-blue-100 flex items-center justify-center overflow-hidden">
                                 {doctor.upiQR ? (
                                   <img src={`${API_BASE_URL}${doctor.upiQR}`} className="w-full h-full object-contain" alt="Doctor UPI QR" />
                                 ) : (
                                   <div className="flex flex-col items-center gap-2 text-gray-300">
                                      <CreditCard size={40} />
                                      <p className="text-[10px] font-bold">QR Not Available</p>
                                   </div>
                                 )}
                              </div>
                              <p className="text-xs text-gray-500 mb-1 font-medium">UPI ID</p>
                              <p className="text-lg font-black text-blue-600">{doctor.upiId || 'Not Provided'}</p>
                           </div>

                           <div className="p-4 bg-gray-50 rounded-2xl flex gap-3 border border-gray-100">
                             <Lock className="text-gray-400 shrink-0" size={18} />
                             <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
                               Scan the QR code above with any UPI app (PhonePe, GPay, Paytm) to complete the payment of ₹{doctor.fees}. Once paid, click the button below to confirm your slot.
                             </p>
                           </div>

                           <div className="flex gap-4 pt-4">
                             <button 
                               onClick={() => setBookingStep(2)}
                               className="flex-1 py-4 font-black border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all"
                             >
                               Back
                             </button>
                             <button 
                               onClick={handleBookAppointment}
                               disabled={isBookingLoading}
                               className="flex-[2] btn-primary py-4 rounded-2xl font-black text-lg shadow-primary/30"
                             >
                               {isBookingLoading ? 'Processing...' : `Paid ₹${doctor.fees} - Confirm`}
                             </button>
                           </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DoctorProfile;
