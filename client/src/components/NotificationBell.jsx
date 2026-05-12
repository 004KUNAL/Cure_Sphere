import { useState, useEffect } from 'react';
import { Bell, CheckCircle2, Clock, CreditCard, Stethoscope, ShoppingBag } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../api/config';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      fetchNotifications();
      // Poll for new notifications every 30 seconds
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      const res = await axios.get(`${API_BASE_URL}/api/notifications`, config);
      setNotifications(res.data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const markAsRead = async (id) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      await axios.put(`${API_BASE_URL}/api/notifications/${id}/read`, {}, config);
      setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleToggle = async () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    
    // If we are opening the bell, mark all as read
    if (nextState && unreadCount > 0) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.put(`${API_BASE_URL}/api/notifications/read-all`, {}, config);
        // Optimistically update local state
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
      } catch (err) {
        console.error('Error marking all as read:', err);
      }
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'appointment': return <Stethoscope size={16} className="text-primary" />;
      case 'payment': return <CreditCard size={16} className="text-green-500" />;
      case 'message': return <CheckCircle2 size={16} className="text-blue-500" />;
      case 'order': return <ShoppingBag size={16} className="text-secondary" />;
      default: return <Bell size={16} className="text-gray-500" />;
    }
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button 
        onClick={handleToggle}
        className="p-2.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all relative group"
      >
        <Bell size={20} className={unreadCount > 0 ? 'text-primary animate-wiggle' : 'text-gray-500'} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-4 w-80 md:w-96 bg-white rounded-[32px] shadow-2xl border border-gray-100 z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-black text-lg">Notifications</h3>
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{unreadCount} Unread</span>
              </div>

              <div className="max-h-[400px] overflow-y-auto custom-scrollbar" data-lenis-prevent>
                {notifications.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bell size={24} className="text-gray-300" />
                    </div>
                    <p className="text-gray-400 font-bold text-sm">No notifications yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {notifications.map((n) => (
                      <Link
                        key={n._id}
                        to={n.link || '#'}
                        onClick={() => {
                          markAsRead(n._id);
                          setIsOpen(false);
                        }}
                        className={`p-5 flex gap-4 hover:bg-gray-50 transition-all ${!n.isRead ? 'bg-primary/5' : ''}`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${!n.isRead ? 'bg-white shadow-sm' : 'bg-gray-50'}`}>
                          {getIcon(n.type)}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm ${!n.isRead ? 'font-bold text-dark' : 'text-gray-600'}`}>{n.title}</p>
                          <p className="text-xs text-gray-400 mt-1 line-clamp-2">{n.message}</p>
                          <p className="text-[10px] text-gray-400 mt-2 font-medium flex items-center gap-1">
                            <Clock size={10} /> {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        {!n.isRead && <div className="w-2 h-2 bg-primary rounded-full mt-2" />}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {notifications.length > 0 && (
                <button className="w-full py-4 text-xs font-black text-primary hover:bg-primary/5 transition-all uppercase tracking-widest border-t border-gray-50">
                  View All Activity
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
