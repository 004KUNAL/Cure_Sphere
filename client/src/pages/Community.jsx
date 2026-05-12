import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import axios from 'axios';
import API_BASE_URL from '../api/config';

const getAvatarUrl = (avatar) => {
  if (!avatar) return 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
  if (avatar.startsWith('http')) return avatar;
  return `${API_BASE_URL}${avatar}`;
};
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  Plus, 
  Users, 
  Stethoscope, 
  Image as ImageIcon,
  Video,
  Send,
  MoreHorizontal,
  Bookmark,
  Repeat,
  X,
  Trash2,
  MessageCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('public');
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [mediaPreviews, setMediaPreviews] = useState([]);
  const [commentingOn, setCommentingOn] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  
  const fileInputRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, [activeTab]);

  const getAuthConfig = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    return {
      headers: { 
        Authorization: `Bearer ${userData?.token}`,
        'Content-Type': 'multipart/form-data'
      }
    };
  };

  const fetchPosts = async () => {
    try {
      const endpoint = activeTab === 'doctors' ? '/api/posts/doctors' : '/api/posts';
      const config = user ? {
        headers: { Authorization: `Bearer ${user.token}` }
      } : {};
      
      const res = await axios.get(`${API_BASE_URL}${endpoint}`, config);
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  const handleMediaSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedMedia(prev => [...prev, ...files]);
    
    const previews = files.map(file => URL.createObjectURL(file));
    setMediaPreviews(prev => [...prev, ...previews]);
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim() && selectedMedia.length === 0) return;
    
    setIsPosting(true);
    const formData = new FormData();
    formData.append('content', newPostContent);
    formData.append('scope', activeTab === 'doctors' ? 'doctors-only' : 'public');
    selectedMedia.forEach(file => {
      formData.append('media', file);
    });

    try {
      await axios.post(`${API_BASE_URL}/api/posts`, formData, getAuthConfig());
      
      setNewPostContent('');
      setSelectedMedia([]);
      setMediaPreviews([]);
      fetchPosts();
    } catch (err) {
      console.error('Error creating post:', err);
      alert('Failed to upload post. Please try again.');
    } finally {
      setIsPosting(false);
    }
  };

  const handleLike = async (postId) => {
    if (!user) return navigate('/login');
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      await axios.put(`${API_BASE_URL}/api/posts/${postId}/like`, {}, config);
      fetchPosts();
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleSave = async (postId) => {
    if (!user) return navigate('/login');
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      await axios.put(`${API_BASE_URL}/api/posts/${postId}/save`, {}, config);
      fetchPosts();
    } catch (err) {
      console.error('Error saving post:', err);
    }
  };

  const handleComment = async (postId) => {
    if (!user) return navigate('/login');
    if (!commentText.trim()) return;
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      await axios.post(`${API_BASE_URL}/api/posts/${postId}/comment`, { text: commentText }, config);
      setCommentText('');
      setCommentingOn(null);
      fetchPosts();
    } catch (err) {
      console.error('Error commenting:', err);
    }
  };

  const handleShare = (postId) => {
    const url = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      await axios.delete(`${API_BASE_URL}/api/posts/${postId}`, config);
      fetchPosts();
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  return (
    <div className="min-h-screen pt-32 md:pt-40 pb-20 px-4 md:px-12 lg:px-24 bg-white">
      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8 justify-center">
        
        {/* Main Feed */}
        <div className="flex-1 max-w-2xl border-x border-gray-100 min-h-screen">
          <div className="sticky top-28 md:top-36 bg-white/80 backdrop-blur-md z-20 border-b border-gray-100">
            <div className="flex">
              <button 
                onClick={() => setActiveTab('public')}
                className={`flex-1 py-4 font-bold text-center hover:bg-gray-50 transition-all relative ${activeTab === 'public' ? 'text-dark' : 'text-gray-500'}`}
              >
                For you
                {activeTab === 'public' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-primary rounded-full" />}
              </button>
              <button 
                onClick={() => setActiveTab('doctors')}
                className={`flex-1 py-4 font-bold text-center hover:bg-gray-50 transition-all relative ${activeTab === 'doctors' ? 'text-dark' : 'text-gray-500'}`}
              >
                Medical Feed
                {activeTab === 'doctors' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-secondary rounded-full" />}
              </button>
            </div>
          </div>

          {/* Create Post */}
          {user && (
            <div className="p-4 border-b border-gray-100">
              <div className="flex gap-4">
                <img src={getAvatarUrl(user.avatar)} className="w-12 h-12 rounded-full object-cover" alt="" />
                <div className="flex-1">
                  <textarea 
                    placeholder="What is happening?!"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="w-full text-xl bg-transparent border-none focus:ring-0 resize-none min-h-[100px]"
                  />
                  
                  {/* Media Previews */}
                  {mediaPreviews.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mb-4 relative">
                      {mediaPreviews.map((src, i) => (
                        <div key={i} className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100">
                          <img src={src} className="w-full h-full object-cover" alt="" />
                          <button 
                            onClick={() => {
                              setMediaPreviews(prev => prev.filter((_, idx) => idx !== i));
                              setSelectedMedia(prev => prev.filter((_, idx) => idx !== i));
                            }}
                            className="absolute top-2 right-2 p-1 bg-dark/50 text-white rounded-full hover:bg-dark"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <div className="flex gap-2">
                      <button onClick={() => fileInputRef.current.click()} className="p-2 text-primary hover:bg-primary/10 rounded-full transition-all">
                        <ImageIcon size={20} />
                      </button>
                      <button className="p-2 text-primary hover:bg-primary/10 rounded-full transition-all">
                        <Video size={20} />
                      </button>
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
                      disabled={(!newPostContent.trim() && selectedMedia.length === 0) || isPosting}
                      className="bg-primary text-white px-6 py-2 rounded-full font-bold disabled:opacity-50 hover:bg-primary-dark transition-all"
                    >
                      {isPosting ? 'Posting...' : 'Post'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Feed */}
          <div className="flex flex-col">
            {posts.map(post => (
              <div key={post._id} className="p-4 border-b border-gray-100 hover:bg-gray-50/50 transition-all group">
                <div className="flex gap-4">
                  <Link to={`/profile/${post.user?._id}`}>
                    <img src={getAvatarUrl(post.user?.avatar)} className="w-12 h-12 rounded-full object-cover" alt="" />
                  </Link>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Link to={`/profile/${post.user?._id}`} className="font-bold hover:underline cursor-pointer">
                          {post.user?.name}
                        </Link>
                        {post.user?.role === 'doctor' && <Stethoscope size={14} className="text-secondary" />}
                        <span className="text-gray-500">@{post.user?.name.replace(/\s/g, '').toLowerCase()}</span>
                        <span className="text-gray-500">· {new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="relative group/menu">
                        <button className="p-2 text-gray-500 hover:bg-primary/10 hover:text-primary rounded-full transition-all">
                          <MoreHorizontal size={18} />
                        </button>
                        {user?._id === post.user?._id && (
                          <div className="absolute right-0 top-full hidden group-hover/menu:block glass p-2 rounded-xl shadow-xl z-30">
                            <button 
                              onClick={() => handleDelete(post._id)}
                              className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg w-full text-sm font-bold"
                            >
                              <Trash2 size={16} /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="mt-1 text-[15px] leading-normal whitespace-pre-wrap">{post.content}</p>
                    
                    {/* Media Display */}
                    {post.media?.length > 0 && (
                      <div className={`mt-3 grid gap-2 rounded-2xl overflow-hidden border border-gray-100 ${post.media.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                        {post.media.map((item, i) => (
                          <div key={i} className="relative aspect-video bg-gray-100">
                            {item.type === 'video' ? (
                              <video src={`${API_BASE_URL}${item.url}`} controls className="w-full h-full object-cover" />
                            ) : (
                              <img src={`${API_BASE_URL}${item.url}`} className="w-full h-full object-cover" alt="" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-4 max-w-md text-gray-500">
                      <button 
                        onClick={() => setCommentingOn(commentingOn === post._id ? null : post._id)}
                        className="flex items-center gap-2 hover:text-primary group/action"
                      >
                        <div className="p-2 group-hover/action:bg-primary/10 rounded-full transition-all">
                          <MessageSquare size={18} />
                        </div>
                        <span className="text-xs font-medium">{post.comments?.length || 0}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-green-500 group/action">
                        <div className="p-2 group-hover/action:bg-green-500/10 rounded-full transition-all">
                          <Repeat size={18} />
                        </div>
                        <span className="text-xs font-medium">{post.reposts?.length || 0}</span>
                      </button>
                      <button 
                        onClick={() => handleLike(post._id)}
                        className={`flex items-center gap-2 group/action ${post.likes?.includes(user?._id) ? 'text-pink-500' : 'hover:text-pink-500'}`}
                      >
                        <div className={`p-2 transition-all rounded-full ${post.likes?.includes(user?._id) ? 'bg-pink-500/10' : 'group-hover/action:bg-pink-500/10'}`}>
                          <Heart size={18} fill={post.likes?.includes(user?._id) ? "currentColor" : "none"} />
                        </div>
                        <span className="text-xs font-medium">{post.likes?.length || 0}</span>
                      </button>
                      <button 
                        onClick={() => handleSave(post._id)}
                        className={`flex items-center gap-2 group/action ${post.saves?.includes(user?._id) ? 'text-primary' : 'hover:text-primary'}`}
                      >
                        <div className={`p-2 transition-all rounded-full ${post.saves?.includes(user?._id) ? 'bg-primary/10' : 'group-hover/action:bg-primary/10'}`}>
                          <Bookmark size={18} fill={post.saves?.includes(user?._id) ? "currentColor" : "none"} />
                        </div>
                      </button>
                      <button 
                        onClick={() => handleShare(post._id)}
                        className="flex items-center gap-2 hover:text-primary group/action"
                      >
                        <div className="p-2 group-hover/action:bg-primary/10 rounded-full transition-all">
                          <Share2 size={18} />
                        </div>
                      </button>
                    </div>

                    {/* Comment Input */}
                    {commentingOn === post._id && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 flex gap-4 items-center"
                      >
                        <img src={getAvatarUrl(user.avatar)} className="w-8 h-8 rounded-full" alt="" />
                        <input 
                          type="text" 
                          placeholder="Post your reply"
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          className="flex-1 bg-transparent border-none focus:ring-0 text-sm"
                          onKeyPress={(e) => e.key === 'Enter' && handleComment(post._id)}
                        />
                        <button 
                          onClick={() => handleComment(post._id)}
                          className="bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold"
                        >
                          Reply
                        </button>
                      </motion.div>
                    )}

                    {/* Comments List Preview */}
                    {post.comments?.length > 0 && (
                      <div className="mt-4 flex flex-col gap-3">
                        {post.comments.slice(0, 2).map((comment, i) => (
                          <div key={i} className="flex gap-2 items-start text-sm">
                            <img src={getAvatarUrl(comment.user?.avatar)} className="w-6 h-6 rounded-full" alt="" />
                            <div>
                              <span className="font-bold mr-2">{comment.user?.name}</span>
                              <span className="text-gray-700">{comment.text}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Widgets */}
        <div className="hidden xl:flex flex-col gap-6 w-80 shrink-0 sticky top-40 h-fit">
          <div className="bg-gray-50 rounded-2xl p-4">
            <h3 className="text-xl font-black mb-4">What's happening</h3>
            {[
              { topic: 'Healthcare', title: '#CureSphereRevolution', posts: '12.4K posts' },
              { topic: 'Trending', title: 'New COVID Variant', posts: '85.2K posts' },
              { topic: 'Medicine', title: 'AI in Diagnosis', posts: '5.1K posts' }
            ].map((trend, i) => (
              <div key={i} className="py-3 hover:bg-gray-100 cursor-pointer px-2 transition-all rounded-lg">
                <p className="text-xs text-gray-500">{trend.topic} · Trending</p>
                <p className="font-bold">{trend.title}</p>
                <p className="text-xs text-gray-500">{trend.posts}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-4">
            <h3 className="text-xl font-black mb-4">Who to follow</h3>
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between py-3">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div>
                    <p className="font-bold text-sm">Dr. House</p>
                    <p className="text-xs text-gray-500">@greg_house</p>
                  </div>
                </div>
                <button className="bg-dark text-white px-4 py-1.5 rounded-full text-xs font-bold">Follow</button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Community;
