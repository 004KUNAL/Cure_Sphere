import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const BASE_URL = 'http://localhost:5000';
const getAvatarUrl = (avatar) => {
  if (!avatar) return 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
  if (avatar.startsWith('http')) return avatar;
  return `${BASE_URL}${avatar}`;
};
import { 
  Search, 
  Send, 
  Phone, 
  Video, 
  Info,
  MoreVertical,
  ChevronLeft,
  MessageCircle
} from 'lucide-react';

import { useLocation, Link } from 'react-router-dom';

const Chat = () => {
  const location = useLocation();
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(location.state?.selectUser || null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const scrollRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

  useEffect(() => {
    if (selectedChat && user) {
      fetchMessages();
    }
  }, [selectedChat, user]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchConversations = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      const res = await axios.get('http://localhost:5000/api/messages/conversations', config);
      setConversations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMessages = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      const res = await axios.get(`http://localhost:5000/api/messages/${selectedChat._id}`, config);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      const res = await axios.post('http://localhost:5000/api/messages', {
        receiver: selectedChat._id,
        text: newMessage
      }, config);
      
      setMessages([...messages, res.data]);
      setNewMessage('');
      fetchConversations();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen pt-28 md:pt-36 flex bg-white">
      <div className="max-w-7xl mx-auto w-full flex border border-gray-100 rounded-t-[40px] overflow-hidden shadow-2xl">
        
        {/* Conversations Sidebar */}
        <div className={`w-full md:w-96 border-r border-gray-100 flex flex-col bg-gray-50/50 ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-2xl font-black mb-4">Messages</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search direct messages"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full border-none focus:ring-1 focus:ring-primary/20 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations
              .filter(conv => conv.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((conv) => (
              <div 
                key={conv.user._id}
                onClick={() => setSelectedChat(conv.user)}
                className={`flex gap-4 p-4 hover:bg-white cursor-pointer transition-all border-l-4 ${selectedChat?._id === conv.user._id ? 'bg-white border-primary shadow-sm' : 'border-transparent'}`}
              >
                <Link
                  to={`/profile/${conv.user._id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="shrink-0"
                >
                  <img
                    src={getAvatarUrl(conv.user.avatar)}
                    className="w-12 h-12 rounded-full object-cover hover:ring-2 hover:ring-primary transition-all"
                    alt={conv.user.name}
                    title={`View ${conv.user.name}'s profile`}
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <Link
                      to={`/profile/${conv.user._id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="font-bold text-sm truncate hover:text-primary hover:underline transition-colors"
                    >
                      {conv.user.name}
                    </Link>
                    <p className="text-[10px] text-gray-400 shrink-0 ml-2">{new Date(conv.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col bg-white ${!selectedChat ? 'hidden md:flex items-center justify-center' : 'flex'}`}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
                <div className="flex items-center gap-3">
                  <button onClick={() => setSelectedChat(null)} className="md:hidden p-2 hover:bg-gray-100 rounded-full">
                    <ChevronLeft size={20} />
                  </button>
                  <Link to={`/profile/${selectedChat._id}`} className="shrink-0">
                    <img
                      src={getAvatarUrl(selectedChat.avatar)}
                      className="w-10 h-10 rounded-full object-cover hover:ring-2 hover:ring-primary transition-all cursor-pointer"
                      alt={selectedChat.name}
                      title={`View ${selectedChat.name}'s profile`}
                    />
                  </Link>
                  <Link to={`/profile/${selectedChat._id}`} className="group">
                    <p className="font-bold text-sm leading-none group-hover:text-primary group-hover:underline transition-colors">{selectedChat.name}</p>
                    <p className="text-[10px] text-green-500 font-bold mt-1 uppercase tracking-wider">Online</p>
                  </Link>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-all"><Phone size={18} /></button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-all"><Video size={18} /></button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-all"><Info size={18} /></button>
                </div>
              </div>

              {/* Messages Feed */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                {messages.map((msg, i) => (
                  <div 
                    key={msg._id} 
                    className={`flex flex-col ${msg.sender === user._id ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-[15px] ${msg.sender === user._id ? 'bg-primary text-white rounded-tr-none' : 'bg-gray-100 text-dark rounded-tl-none'}`}>
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                ))}
                <div ref={scrollRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-100 bg-white">
                <form onSubmit={handleSend} className="flex gap-2 bg-gray-50 p-1 rounded-full items-center pl-4 border border-gray-100 focus-within:border-primary/20 focus-within:bg-white transition-all">
                  <input 
                    type="text" 
                    placeholder="Start a new message"
                    className="flex-1 bg-transparent border-none focus:ring-0 text-sm"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="p-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-all shadow-md shadow-primary/20"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="text-center p-12">
              <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle size={40} className="text-primary" />
              </div>
              <h2 className="text-3xl font-black mb-2">Select a message</h2>
              <p className="text-gray-500 max-w-xs mx-auto">Choose from your existing conversations, start a new one, or just keep swimming.</p>
              <button className="btn-primary mt-6 px-10">New message</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Chat;
