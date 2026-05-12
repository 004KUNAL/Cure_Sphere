import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Video, X, Stethoscope, Users } from 'lucide-react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';
const getAvatarUrl = (avatar) => {
  if (!avatar) return 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
  if (avatar.startsWith('http')) return avatar;
  return `${BASE_URL}${avatar}`;
};

const CreatePost = ({ user, onPostCreated, defaultScope = 'public' }) => {
  const [content, setContent] = useState('');
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [mediaPreviews, setMediaPreviews] = useState([]);
  const [isPosting, setIsPosting] = useState(false);
  const [scope, setScope] = useState(defaultScope);
  
  const fileInputRef = useRef(null);

  const handleMediaSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedMedia(prev => [...prev, ...files]);
    
    const previews = files.map(file => URL.createObjectURL(file));
    setMediaPreviews(prev => [...prev, ...previews]);
  };

  const removeMedia = (index) => {
    setMediaPreviews(prev => prev.filter((_, i) => i !== index));
    setSelectedMedia(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreatePost = async () => {
    if (!content.trim() && selectedMedia.length === 0) return;
    
    setIsPosting(true);
    const formData = new FormData();
    formData.append('content', content);
    formData.append('scope', scope);
    selectedMedia.forEach(file => {
      formData.append('media', file);
    });

    try {
      const config = {
        headers: { 
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data'
        }
      };
      await axios.post('http://localhost:5000/api/posts', formData, config);
      
      setContent('');
      setSelectedMedia([]);
      setMediaPreviews([]);
      if (onPostCreated) onPostCreated();
    } catch (err) {
      console.error('Error creating post:', err);
      alert('Failed to upload post. Please try again.');
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="p-6 glass rounded-[32px] border border-gray-100 mb-8 shadow-xl shadow-primary/5">
      <div className="flex gap-4">
        <img src={getAvatarUrl(user.avatar)} className="w-12 h-12 rounded-full object-cover shadow-md" alt="" />
        <div className="flex-1">
          <textarea 
            placeholder={user.role === 'doctor' ? "Share medical insights or updates..." : "What's on your mind?"}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full text-lg bg-transparent border-none focus:ring-0 resize-none min-h-[80px]"
          />
          
          {/* Media Previews */}
          {mediaPreviews.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              {mediaPreviews.map((src, i) => (
                <div key={i} className="relative aspect-video rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                  <img src={src} className="w-full h-full object-cover" alt="" />
                  <button 
                    onClick={() => removeMedia(i)}
                    className="absolute top-2 right-2 p-1.5 bg-dark/70 text-white rounded-full hover:bg-dark transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-50">
            <div className="flex gap-1">
              <button 
                onClick={() => fileInputRef.current.click()} 
                className="p-2.5 text-primary hover:bg-primary/10 rounded-xl transition-all"
                title="Add Images"
              >
                <ImageIcon size={20} />
              </button>
              <button 
                onClick={() => fileInputRef.current.click()} 
                className="p-2.5 text-primary hover:bg-primary/10 rounded-xl transition-all"
                title="Add Video"
              >
                <Video size={20} />
              </button>
              
              {user.role === 'doctor' && (
                <div className="flex items-center gap-2 ml-4 px-3 py-1 bg-gray-50 rounded-xl border border-gray-100">
                  <button 
                    onClick={() => setScope('public')}
                    className={`p-1.5 rounded-lg transition-all ${scope === 'public' ? 'bg-primary text-white shadow-sm' : 'text-gray-400'}`}
                    title="Public Post"
                  >
                    <Users size={16} />
                  </button>
                  <button 
                    onClick={() => setScope('doctors-only')}
                    className={`p-1.5 rounded-lg transition-all ${scope === 'doctors-only' ? 'bg-secondary text-white shadow-sm' : 'text-gray-400'}`}
                    title="Doctors Only"
                  >
                    <Stethoscope size={16} />
                  </button>
                </div>
              )}
              
              <input 
                type="file" 
                multiple 
                accept="image/*,video/*" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleMediaSelect}
              />
            </div>
            <button 
              onClick={handleCreatePost}
              disabled={(!content.trim() && selectedMedia.length === 0) || isPosting}
              className={`px-8 py-2.5 rounded-2xl font-black text-sm transition-all shadow-lg ${
                isPosting ? 'bg-gray-100 text-gray-400' : 'bg-primary text-white shadow-primary/20 hover:scale-105 active:scale-95'
              }`}
            >
              {isPosting ? 'Posting...' : 'Post Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
