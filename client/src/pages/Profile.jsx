import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../store/slices/authSlice';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Clock,
  Lock, 
  Settings,
  MessageCircle,
  Stethoscope,
  Heart,
  MessageSquare,
  Repeat,
  Share2,
  Bookmark,
  Video,
  Phone,
  Image as ImageIcon,
  Send,
  MoreHorizontal,
  Trash2,
  Camera,
  X,
  ShoppingBag,
  Package as PackageIcon,
  Shield,
  Activity
} from 'lucide-react';
import CreatePost from '../components/CreatePost';

const BASE_URL = 'http://localhost:5000';

const getAvatarUrl = (avatar) => {
  if (!avatar) return 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
  if (avatar.startsWith('http')) return avatar;
  return `${BASE_URL}${avatar}`;
};

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState('Posts'); // Posts, Replies, Likes, Appointments
  const [appointmentFilter, setAppointmentFilter] = useState('active'); // active, history
  const [isFollowing, setIsFollowing] = useState(false);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ 
    name: '', 
    email: '', 
    bio: '',
    medicalId: {
      bloodGroup: 'Not Set',
      allergies: '',
      medications: '',
      chronicConditions: '',
      emergencyContact: { name: '', phone: '', relationship: '' }
    },
    doctorInfo: {
      specialization: '',
      fees: '',
      about: '',
      upiId: '',
      upiQR: null
    },
    vendorInfo: {
      upiId: '',
      upiQR: null,
      storeName: '',
      storeAddress: ''
    }
  });
  const [selectedFiles, setSelectedFiles] = useState({ avatar: null, cover: null });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (isEditModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isEditModalOpen]);

  const { user: currentUser } = useSelector((state) => state.auth);

  const isOwnProfile = currentUser?._id === id;

  useEffect(() => {
    fetchProfile();
  }, [id]);

  useEffect(() => {
    if (profile) {
      // If the current tab is hidden for doctors, switch to Posts
      if (profile.role === 'doctor' && ['Replies', 'Likes'].includes(activeTab)) {
        setActiveTab('Posts');
      }
      fetchTabData();
    }
  }, [activeTab, profile]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/auth/profile/${id}`);
      setProfile(res.data);
      setIsFollowing(res.data.followers?.includes(currentUser?._id));
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const fetchTabData = async () => {
    try {
      let endpoint = '';
      if (activeTab === 'Posts') endpoint = `/api/posts/user/${id}`;
      else if (activeTab === 'Replies') endpoint = `/api/posts/user/${id}/comments`;
      else if (activeTab === 'Likes') endpoint = `/api/posts/user/${id}/likes`;
      else if (activeTab === 'Appointments') endpoint = `/api/appointments/my`;
      else if (activeTab === 'Orders') endpoint = `/api/orders/myorders`;

      const config = {
        headers: { Authorization: `Bearer ${currentUser?.token}` }
      };
      
      const res = await axios.get(`http://localhost:5000${endpoint}`, config);
      setData(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching tab data:', err);
      setData([]);
    }
  };

  const updateStatus = async (appointmentId, status) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${currentUser.token}` }
      };
      await axios.put(`http://localhost:5000/api/appointments/${appointmentId}`, { status }, config);
      fetchTabData();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleFollow = async () => {
    if (!currentUser) return navigate('/login');
    try {
      const config = {
        headers: { Authorization: `Bearer ${currentUser.token}` }
      };
      const res = await axios.put(`http://localhost:5000/api/auth/follow/${id}`, {}, config);
      setIsFollowing(!isFollowing);
      setProfile(prev => ({
        ...prev,
        followers: res.data.followers
      }));
    } catch (err) {
      console.error('Error following:', err);
    }
  };

  const handleMessage = () => {
    if (!currentUser) return navigate('/login');
    // We could pass state to chat page to auto-select this user
    navigate('/chat', { state: { selectUser: profile } });
  };

  const togglePrivacy = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${currentUser.token}` }
      };
      const res = await axios.put(`http://localhost:5000/api/auth/privacy`, {}, config);
      setProfile({ ...profile, isPrivate: res.data.isPrivate });
    } catch (err) {
      console.error('Error toggling privacy:', err);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const formData = new FormData();
    formData.append('name', editFormData.name);
    formData.append('email', editFormData.email);
    formData.append('bio', editFormData.bio);
    formData.append('medicalId', JSON.stringify(editFormData.medicalId));
    if (currentUser.role === 'vendor') {
      formData.append('vendorInfo', JSON.stringify({
        ...editFormData.vendorInfo,
        upiQR: undefined // Handled separately as file
      }));
      if (editFormData.vendorInfo.upiQR instanceof File) {
        formData.append('upiQR', editFormData.vendorInfo.upiQR);
      }
    }
    if (selectedFiles.avatar) formData.append('avatar', selectedFiles.avatar);
    if (selectedFiles.cover) formData.append('cover', selectedFiles.cover);

    try {
      const config = {
        headers: { 
          Authorization: `Bearer ${currentUser.token}`,
          'Content-Type': 'multipart/form-data'
        }
      };
      const res = await axios.put(`${BASE_URL}/api/auth/profile`, formData, config);
      // Update local profile state
      setProfile(prev => ({ ...prev, ...res.data }));
      // Sync Redux store + localStorage so navbar/other components update immediately
      const updatedUser = { ...currentUser, ...res.data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      dispatch(updateUser(updatedUser));

      // If doctor, update doctor profile too
      if (currentUser.role === 'doctor') {
        const docFormData = new FormData();
        docFormData.append('specialization', editFormData.doctorInfo.specialization);
        docFormData.append('fees', editFormData.doctorInfo.fees);
        docFormData.append('about', editFormData.doctorInfo.about);
        docFormData.append('upiId', editFormData.doctorInfo.upiId);
        if (editFormData.doctorInfo.upiQR instanceof File) {
          docFormData.append('upiQR', editFormData.doctorInfo.upiQR);
        }

        const docConfig = {
          headers: { 
            Authorization: `Bearer ${currentUser.token}`,
            'Content-Type': 'multipart/form-data'
          }
        };
        const docRes = await axios.put(`${BASE_URL}/api/doctors/profile`, docFormData, docConfig);
        setProfile(prev => ({ ...prev, doctorInfo: docRes.data }));
      }

      setSelectedFiles({ avatar: null, cover: null });
      setIsEditModalOpen(false);
      setIsUpdating(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setIsUpdating(false);
      alert('Failed to update profile. Please try again.');
    }
  };

  const openEditModal = () => {
    setEditFormData({
      name: profile.name,
      email: profile.email,
      bio: profile.bio || '',
      medicalId: profile.medicalId || {
        bloodGroup: 'Not Set',
        allergies: '',
        medications: '',
        chronicConditions: '',
        emergencyContact: { name: '', phone: '', relationship: '' }
      },
      doctorInfo: profile.doctorInfo || {
        specialization: '',
        fees: '',
        about: '',
        upiId: '',
        upiQR: null
      },
      vendorInfo: profile.vendorInfo || {
        upiId: '',
        upiQR: null,
        storeName: '',
        storeAddress: ''
      }
    });
    setIsEditModalOpen(true);
  };

  if (!profile) return <div className="pt-40 text-center font-bold">Loading Profile...</div>;

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Cover Image */}
      <div className="h-48 md:h-64 bg-gradient-to-r from-primary/20 to-secondary/20 relative overflow-hidden">
        {profile.cover && (
          <img src={`http://localhost:5000${profile.cover}`} className="w-full h-full object-cover" alt="" />
        )}
        <div className="absolute inset-0 backdrop-blur-[2px] bg-black/5" />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative">
        {/* Profile Header */}
        <div className="flex justify-between items-end -mt-16 mb-6">
          <div className="relative">
            <img 
              src={getAvatarUrl(profile.avatar)} 
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover shadow-xl bg-white"
              alt="Profile"
            />
          </div>
          <div className="flex gap-3 mb-2">
            {isOwnProfile && profile.role === 'doctor' && (
              <button 
                onClick={async () => {
                  try {
                    const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
                    const res = await axios.put('http://localhost:5000/api/doctors/status', {}, config);
                    setProfile({ ...profile, isOnline: res.data.isOnline });
                  } catch (err) { console.error(err); }
                }}
                className={`px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 transition-all ${profile.isOnline ? 'bg-green-500 text-white shadow-lg shadow-green-200' : 'bg-gray-200 text-gray-500'}`}
              >
                <div className={`w-2 h-2 rounded-full bg-white ${profile.isOnline ? 'animate-pulse' : ''}`} />
                {profile.isOnline ? 'Online' : 'Offline'}
              </button>
            )}
            {isOwnProfile ? (
              <>
                <button onClick={togglePrivacy} className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-all">
                  {profile.isPrivate ? <Lock size={20} className="text-primary" /> : <Settings size={20} />}
                </button>
                <button 
                  onClick={openEditModal}
                  className="px-6 py-2 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-all text-sm md:text-base"
                >
                  Edit profile
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={handleMessage}
                  className="p-2.5 border border-gray-200 rounded-full hover:bg-gray-50 transition-all"
                >
                  <MessageCircle size={22} />
                </button>
                <button 
                  onClick={handleFollow}
                  className={`px-8 py-2.5 rounded-full font-bold transition-all text-sm md:text-base ${isFollowing ? 'border border-gray-200 hover:text-red-500 hover:border-red-500 hover:bg-red-50' : 'bg-dark text-white hover:bg-dark/90 shadow-lg'}`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black">{profile.name}</h1>
            {profile.role === 'doctor' && <Stethoscope className="text-secondary" size={20} />}
          </div>
          <p className="text-gray-500">@{profile.name.replace(/\s/g, '').toLowerCase()}</p>
          
          <p className="mt-4 text-[15px] leading-relaxed text-gray-800">
            {profile.bio || "No bio yet."}
          </p>

          <div className="flex flex-wrap gap-4 mt-4 text-gray-500 text-sm font-medium">
            <span className="flex items-center gap-1"><MapPin size={16} /> Global</span>
            <span className="flex items-center gap-1"><Calendar size={16} /> Joined {new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          </div>

          <div className="flex gap-6 mt-4">
            <button className="hover:underline text-sm">
              <span className="font-bold text-dark">{profile.following?.length || 0}</span> <span className="text-gray-500">Following</span>
            </button>
            <button className="hover:underline text-sm">
              <span className="font-bold text-dark">{profile.followers?.length || 0}</span> <span className="text-gray-500">Followers</span>
            </button>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="flex border-b border-gray-100 overflow-x-auto no-scrollbar">
          {['Posts', 'Replies', 'Likes', ...(isOwnProfile ? ['Appointments', 'Orders'] : [])].filter(tab => {
            if (profile.role === 'vendor') {
              // Vendors only see their posts and orders
              return ['Posts', 'Orders'].includes(tab);
            }
            if (profile.role === 'doctor' && !isOwnProfile) {
              // When viewing a doctor's profile, guests/others only see their posts
              return tab === 'Posts';
            }
            return true;
          }).map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 font-bold text-sm hover:bg-gray-50 transition-all relative whitespace-nowrap px-4 ${activeTab === tab ? 'text-dark' : 'text-gray-500'}`}
            >
              {tab}
              {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-full" />}
            </button>
          ))}
        </div>

        {/* Data Area */}
        <div className="py-2">
          {profile.isPrivate && !isOwnProfile && !isFollowing ? (
            <div className="text-center py-24 px-8 bg-gray-50 rounded-[32px] mt-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Lock size={32} className="text-primary" />
              </div>
              <h3 className="text-2xl font-black mb-2 text-dark">These Posts are protected</h3>
              <p className="text-gray-500 max-w-xs mx-auto">Only approved followers can see @{profile.name.replace(/\s/g, '').toLowerCase()}'s Posts and activity.</p>
              <button onClick={handleFollow} className="btn-primary mt-6 px-10">Follow</button>
            </div>
          ) : (
            <div className="flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="divide-y divide-gray-50"
                >
                  {activeTab === 'Appointments' ? (
                    <div className="py-4 space-y-6">
                      <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl w-fit">
                        <button 
                          onClick={() => setAppointmentFilter('active')}
                          className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${appointmentFilter === 'active' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                          Active Requests
                        </button>
                        <button 
                          onClick={() => setAppointmentFilter('history')}
                          className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${appointmentFilter === 'history' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                          Booking History
                        </button>
                      </div>

                      <div className="space-y-4">
                        {Array.isArray(data) && data.filter(app => {
                          if (appointmentFilter === 'active') return ['pending', 'confirmed'].includes(app.status);
                          return ['cancelled', 'completed'].includes(app.status);
                        }).map((app) => (
                          <div key={app._id} className="p-6 glass rounded-3xl border border-gray-100 hover:shadow-xl transition-all">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex gap-4">
                                <img 
                                  src={profile.role === 'doctor' ? getAvatarUrl(app.patient?.avatar) : getAvatarUrl(app.doctor?.user?.avatar)} 
                                  className="w-12 h-12 rounded-2xl object-cover shadow-md" 
                                  alt="" 
                                />
                                <div>
                                  <p className="text-[10px] font-black text-primary uppercase tracking-widest">
                                    {app.type} Consultation
                                  </p>
                                  <h4 className="font-bold text-lg">
                                    {profile.role === 'doctor' ? (app.patient?.name || 'Unknown Patient') : `Dr. ${app.doctor?.user?.name || 'Unknown'}`}
                                  </h4>
                                  <div className="flex gap-3 text-xs text-gray-500 mt-1">
                                    <span className="flex items-center gap-1"><Calendar size={12} /> {app.date ? new Date(app.date).toLocaleDateString() : 'N/A'}</span>
                                    <span className="flex items-center gap-1"><Clock size={12} /> {app.time || 'N/A'}</span>
                                  </div>
                                </div>
                              </div>
                              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                app.status === 'pending' ? 'bg-yellow-50 text-yellow-600' :
                                app.status === 'confirmed' ? 'bg-green-50 text-green-600' :
                                'bg-red-50 text-red-600'
                              }`}>
                                {app.status}
                              </span>
                            </div>
                            
                            {app.notes && (
                              <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-2xl mb-4 italic">
                                "{app.notes}"
                              </p>
                            )}

                            {profile.role === 'doctor' && app.status === 'pending' && (
                              <div className="flex gap-3 pt-2">
                                <button 
                                  onClick={() => updateStatus(app._id, 'confirmed')}
                                  className="flex-1 bg-primary text-white py-2.5 rounded-xl font-bold text-sm hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all"
                                >
                                  Confirm Request
                                </button>
                                <button 
                                  onClick={() => updateStatus(app._id, 'cancelled')}
                                  className="px-6 py-2.5 border border-gray-100 text-gray-400 rounded-xl font-bold text-sm hover:text-red-500 hover:bg-red-50 transition-all"
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : activeTab === 'Orders' ? (
                    <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Array.isArray(data) && data.map((order) => (
                        <div key={order._id} className="glass p-5 rounded-3xl border-white hover:shadow-lg transition-all">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                              <PackageIcon size={16} className="text-primary" />
                              <span className="text-[10px] font-black uppercase tracking-tighter">Order #{order._id?.slice(-6)}</span>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              order.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' :
                              order.status === 'Shipped' ? 'bg-blue-50 text-blue-600' :
                              order.status === 'Delivered' ? 'bg-green-50 text-green-600' :
                              'bg-red-50 text-red-600'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="space-y-2 mb-4">
                            {Array.isArray(order.items) && order.items.map((item, i) => item && (
                              <div key={i} className="flex justify-between text-xs font-bold">
                                <span className="text-gray-500 truncate mr-2">{item.medicine?.name || 'Medicine'} x{item.quantity || 1}</span>
                                <span className="shrink-0">₹{((item.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                          <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                            <p className="text-[10px] text-gray-400 font-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
                            <p className="font-black text-dark text-lg">₹{(order.totalPrice || 0).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : activeTab === 'Replies' ? (
                    <div className="py-4 space-y-4">
                      {Array.isArray(data) && data.map((reply, i) => (
                        <div key={i} className="py-4 px-2 hover:bg-gray-50 transition-all rounded-2xl group">
                          <div className="flex items-center gap-2 mb-1 text-xs text-gray-500 font-bold uppercase tracking-wider">
                            <MessageSquare size={12} /> Replied to a post
                          </div>
                          <p className="text-xs text-gray-400 italic mb-2 line-clamp-1 border-l-2 border-gray-100 pl-2">"{reply.postContent}"</p>
                          <p className="text-[15px] text-dark font-medium">{reply.commentText}</p>
                          <p className="text-[10px] text-gray-400 mt-2">{new Date(reply.createdAt).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      {isOwnProfile && <CreatePost user={currentUser} onPostCreated={fetchTabData} />}
                      
                      {Array.isArray(data) && data.map(post => (
                        <div key={post._id} className="py-8 px-4 border-b border-gray-50 hover:bg-gray-50/50 transition-all group">
                          <div className="flex gap-5">
                            <img src={getAvatarUrl(post.user?.avatar)} className="w-12 h-12 rounded-2xl object-cover shadow-sm" alt="" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-black text-dark tracking-tight">{post.user?.name}</span>
                                  {post.user?.role === 'doctor' && <Stethoscope size={14} className="text-secondary" />}
                                  <span className="text-xs text-gray-400">· {new Date(post.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="relative group/menu">
                                  <button className="p-2 text-gray-400 hover:bg-primary/10 hover:text-primary rounded-xl transition-all">
                                    <MoreHorizontal size={18} />
                                  </button>
                                  {currentUser?._id === post.user?._id && (
                                    <div className="absolute right-0 top-full hidden group-hover/menu:block glass p-2 rounded-2xl shadow-2xl z-30 min-w-[140px]">
                                      <button 
                                        onClick={async () => {
                                          if (window.confirm('Delete this post?')) {
                                            const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
                                            await axios.delete(`http://localhost:5000/api/posts/${post._id}`, config);
                                            fetchTabData();
                                          }
                                        }}
                                        className="flex items-center gap-2 px-4 py-2.5 text-red-500 hover:bg-red-50 rounded-xl w-full text-xs font-black uppercase tracking-widest"
                                      >
                                        <Trash2 size={16} /> Delete
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <p className="text-gray-600 leading-relaxed text-[15px] mb-4 whitespace-pre-wrap">{post.content}</p>
                              
                              {/* Media Display */}
                              {post.media?.length > 0 && (
                                <div className={`mb-4 grid gap-3 rounded-[28px] overflow-hidden border border-gray-100 ${post.media.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                  {post.media.map((item, i) => (
                                    <div key={i} className="relative aspect-video bg-gray-100">
                                      {item.type === 'video' ? (
                                        <video src={`http://localhost:5000${item.url}`} controls className="w-full h-full object-cover" />
                                      ) : (
                                        <img src={`http://localhost:5000${item.url}`} className="w-full h-full object-cover" alt="" />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Actions */}
                              <div className="flex items-center gap-8 text-gray-400">
                                <button className="flex items-center gap-2 hover:text-primary transition-colors group/action">
                                  <div className="p-2 group-hover/action:bg-primary/10 rounded-full">
                                    <MessageSquare size={18} />
                                  </div>
                                  <span className="text-xs font-bold">{post.comments?.length || 0}</span>
                                </button>
                                <button 
                                  onClick={async () => {
                                    const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
                                    await axios.put(`http://localhost:5000/api/posts/${post._id}/like`, {}, config);
                                    fetchTabData();
                                  }}
                                  className={`flex items-center gap-2 transition-colors group/action ${post.likes?.includes(currentUser?._id) ? 'text-pink-500' : 'hover:text-pink-500'}`}
                                >
                                  <div className={`p-2 rounded-full ${post.likes?.includes(currentUser?._id) ? 'bg-pink-500/10' : 'group-hover/action:bg-pink-500/10'}`}>
                                    <Heart size={18} fill={post.likes?.includes(currentUser?._id) ? "currentColor" : "none"} />
                                  </div>
                                  <span className="text-xs font-bold">{post.likes?.length || 0}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {data.length === 0 && (
                    <div className="text-center py-20">
                      <p className="text-gray-400 font-bold">No {activeTab.toLowerCase()} found.</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
              </div>
            )}
          </div>
        </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-dark/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar"
              data-lenis-prevent
            >
              <div className="p-8 md:p-10">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-3xl font-display font-bold">Edit Profile</h3>
                  <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-all">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  {/* Image Uploads */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Profile Picture</label>
                      <div className="relative group cursor-pointer" onClick={() => document.getElementById('avatar-input').click()}>
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-100 bg-gray-50 flex items-center justify-center">
                          {selectedFiles.avatar ? (
                            <img src={URL.createObjectURL(selectedFiles.avatar)} className="w-full h-full object-cover" alt="" />
                          ) : (
                            <img src={getAvatarUrl(profile.avatar)} className="w-full h-full object-cover" alt="" />
                          )}
                        </div>
                        <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white">
                          <Camera size={20} />
                        </div>
                        <input id="avatar-input" type="file" className="hidden" accept="image/*" onChange={(e) => setSelectedFiles({ ...selectedFiles, avatar: e.target.files[0] })} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Cover Image</label>
                      <div className="relative group cursor-pointer aspect-video rounded-2xl overflow-hidden border-2 border-gray-100 bg-gray-50 flex items-center justify-center" onClick={() => document.getElementById('cover-input').click()}>
                        {selectedFiles.cover ? (
                          <img src={URL.createObjectURL(selectedFiles.cover)} className="w-full h-full object-cover" alt="" />
                        ) : profile.cover ? (
                          <img src={`http://localhost:5000${profile.cover}`} className="w-full h-full object-cover" alt="" />
                        ) : (
                          <ImageIcon className="text-gray-300" size={32} />
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white">
                          <Camera size={24} />
                        </div>
                        <input id="cover-input" type="file" className="hidden" accept="image/*" onChange={(e) => setSelectedFiles({ ...selectedFiles, cover: e.target.files[0] })} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Full Name</label>
                      <input 
                        type="text" 
                        value={editFormData.name}
                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-bold"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Email Address</label>
                      <input 
                        type="email" 
                        value={editFormData.email}
                        onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-bold"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Bio / Professional Summary</label>
                    <textarea 
                      value={editFormData.bio}
                      onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
                      placeholder="Share a bit about yourself..."
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none min-h-[100px] resize-none"
                    />
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <h4 className="text-sm font-black uppercase tracking-widest text-red-500 mb-6 flex items-center gap-2">
                      <Shield size={16} /> Medical ID (Emergency Info)
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Blood Group</label>
                        <select 
                          value={editFormData.medicalId.bloodGroup}
                          onChange={(e) => setEditFormData({ ...editFormData, medicalId: { ...editFormData.medicalId, bloodGroup: e.target.value } })}
                          className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold"
                        >
                          {['Not Set', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Allergies</label>
                        <input 
                          type="text" 
                          value={editFormData.medicalId.allergies}
                          onChange={(e) => setEditFormData({ ...editFormData, medicalId: { ...editFormData.medicalId, allergies: e.target.value } })}
                          placeholder="e.g. Penicillin, Peanuts"
                          className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Medications</label>
                        <input 
                          type="text" 
                          value={editFormData.medicalId.medications}
                          onChange={(e) => setEditFormData({ ...editFormData, medicalId: { ...editFormData.medicalId, medications: e.target.value } })}
                          className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Chronic Conditions</label>
                        <input 
                          type="text" 
                          value={editFormData.medicalId.chronicConditions}
                          onChange={(e) => setEditFormData({ ...editFormData, medicalId: { ...editFormData.medicalId, chronicConditions: e.target.value } })}
                          className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold"
                        />
                      </div>
                    </div>

                    <div className="mt-6 p-6 bg-red-50/50 rounded-[32px] border border-red-100">
                      <p className="text-[10px] font-black uppercase text-red-400 tracking-widest mb-4">Emergency Contact</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input 
                          type="text" 
                          value={editFormData.medicalId.emergencyContact.name}
                          onChange={(e) => setEditFormData({ ...editFormData, medicalId: { ...editFormData.medicalId, emergencyContact: { ...editFormData.medicalId.emergencyContact, name: e.target.value } } })}
                          placeholder="Contact Name"
                          className="w-full p-3 bg-white border border-red-100 rounded-xl outline-none font-bold"
                        />
                        <input 
                          type="text" 
                          value={editFormData.medicalId.emergencyContact.phone}
                          onChange={(e) => setEditFormData({ ...editFormData, medicalId: { ...editFormData.medicalId, emergencyContact: { ...editFormData.medicalId.emergencyContact, phone: e.target.value } } })}
                          placeholder="Phone Number"
                          className="w-full p-3 bg-white border border-red-100 rounded-xl outline-none font-bold"
                        />
                        <input 
                          type="text" 
                          value={editFormData.medicalId.emergencyContact.relationship}
                          onChange={(e) => setEditFormData({ ...editFormData, medicalId: { ...editFormData.medicalId, emergencyContact: { ...editFormData.medicalId.emergencyContact, relationship: e.target.value } } })}
                          placeholder="Relationship (e.g. Spouse)"
                          className="w-full p-3 bg-white border border-red-100 rounded-xl outline-none font-bold md:col-span-2"
                        />
                      </div>
                    </div>
                  </div>

                  {currentUser?.role === 'doctor' && (
                    <div className="pt-6 border-t border-gray-100">
                      <h4 className="text-sm font-black uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                        <Stethoscope size={16} /> Professional Settings (Doctor)
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Specialization</label>
                          <input 
                            type="text" 
                            value={editFormData.doctorInfo.specialization}
                            onChange={(e) => setEditFormData({ ...editFormData, doctorInfo: { ...editFormData.doctorInfo, specialization: e.target.value } })}
                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Consultation Fees (₹)</label>
                          <input 
                            type="number" 
                            value={editFormData.doctorInfo.fees}
                            onChange={(e) => setEditFormData({ ...editFormData, doctorInfo: { ...editFormData.doctorInfo, fees: e.target.value } })}
                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold"
                          />
                        </div>
                      </div>

                      <div className="mt-6 space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">UPI ID for Payments</label>
                        <input 
                          type="text" 
                          value={editFormData.doctorInfo.upiId}
                          onChange={(e) => setEditFormData({ ...editFormData, doctorInfo: { ...editFormData.doctorInfo, upiId: e.target.value } })}
                          placeholder="example@okaxis"
                          className="w-full p-4 bg-blue-50 border border-blue-100 rounded-2xl outline-none font-bold text-blue-600"
                        />
                      </div>

                      <div className="mt-6 space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">UPI QR Code (Scan to Pay)</label>
                        <div 
                          className="relative group cursor-pointer aspect-video rounded-3xl overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center"
                          onClick={() => document.getElementById('upi-qr-input').click()}
                        >
                          {editFormData.doctorInfo.upiQR ? (
                            <img 
                              src={editFormData.doctorInfo.upiQR instanceof File ? URL.createObjectURL(editFormData.doctorInfo.upiQR) : `${BASE_URL}${editFormData.doctorInfo.upiQR}`} 
                              className="w-full h-full object-contain" 
                              alt="UPI QR" 
                            />
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-gray-400">
                              <Camera size={32} />
                              <p className="text-[10px] font-bold uppercase">Upload QR Code</p>
                            </div>
                          )}
                          <input 
                            id="upi-qr-input" 
                            type="file" 
                            className="hidden" 
                            accept="image/*" 
                            onChange={(e) => setEditFormData({ ...editFormData, doctorInfo: { ...editFormData.doctorInfo, upiQR: e.target.files[0] } })} 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {currentUser?.role === 'vendor' && (
                    <div className="pt-6 border-t border-gray-100">
                      <h4 className="text-sm font-black uppercase tracking-widest text-secondary mb-6 flex items-center gap-2">
                        <ShoppingBag size={16} /> Business Settings (Vendor)
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Store Name</label>
                          <input 
                            type="text" 
                            value={editFormData.vendorInfo.storeName}
                            onChange={(e) => setEditFormData({ ...editFormData, vendorInfo: { ...editFormData.vendorInfo, storeName: e.target.value } })}
                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Store Address</label>
                          <input 
                            type="text" 
                            value={editFormData.vendorInfo.storeAddress}
                            onChange={(e) => setEditFormData({ ...editFormData, vendorInfo: { ...editFormData.vendorInfo, storeAddress: e.target.value } })}
                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold"
                          />
                        </div>
                      </div>

                      <div className="mt-6 space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">UPI ID for Business Payments</label>
                        <input 
                          type="text" 
                          value={editFormData.vendorInfo.upiId}
                          onChange={(e) => setEditFormData({ ...editFormData, vendorInfo: { ...editFormData.vendorInfo, upiId: e.target.value } })}
                          placeholder="store@okaxis"
                          className="w-full p-4 bg-teal-50 border border-teal-100 rounded-2xl outline-none font-bold text-teal-600"
                        />
                      </div>

                      <div className="mt-6 space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Business UPI QR Code</label>
                        <div 
                          className="relative group cursor-pointer aspect-video rounded-3xl overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center"
                          onClick={() => document.getElementById('vendor-upi-qr-input').click()}
                        >
                          {editFormData.vendorInfo.upiQR ? (
                            <img 
                              src={editFormData.vendorInfo.upiQR instanceof File ? URL.createObjectURL(editFormData.vendorInfo.upiQR) : `${BASE_URL}${editFormData.vendorInfo.upiQR}`} 
                              className="w-full h-full object-contain" 
                              alt="Vendor UPI QR" 
                            />
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-gray-400">
                              <Camera size={32} />
                              <p className="text-[10px] font-bold uppercase">Upload Store QR Code</p>
                            </div>
                          )}
                          <input 
                            id="vendor-upi-qr-input" 
                            type="file" 
                            className="hidden" 
                            accept="image/*" 
                            onChange={(e) => setEditFormData({ ...editFormData, vendorInfo: { ...editFormData.vendorInfo, upiQR: e.target.files[0] } })} 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    <button 
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="flex-1 py-4 font-black border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={isUpdating}
                      className="flex-[2] btn-primary py-4 rounded-2xl font-black text-lg shadow-primary/30"
                    >
                      {isUpdating ? 'Saving Changes...' : 'Update Profile'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
