import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search, Plus, Tag, ShieldAlert, ShoppingCart, Minus, X } from 'lucide-react';
import CheckoutModal from '../components/CheckoutModal';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Pharmacy = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const categories = ['All', 'Antibiotics', 'Pain Relief', 'Supplements', 'Diabetes', 'Cardiac'];

  const addToCart = (med) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === med._id);
      if (existing) {
        return prev.map(item => item._id === med._id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...med, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item._id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/medicines');
        setMedicines(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchMedicines();
  }, []);

  const filteredMedicines = medicines.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || med.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-32 md:pt-40 lg:pt-48 pb-20 px-4 md:px-12 lg:px-24 bg-light/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          <div className="px-2">
            <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-4">Online <span className="text-gradient">Pharmacy</span></h1>
            <p className="text-gray-500 max-w-xl text-sm md:text-base">
              Authentic medicines delivered to your doorstep. Browse categories or search for specific requirements.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto px-2">
            <div className="relative flex-1 md:w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 glass rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/20 border-white/20 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-full font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat 
                ? 'bg-secondary text-white shadow-lg shadow-secondary/20' 
                : 'glass hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMedicines.map((med, index) => (
              <motion.div
                key={med._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="glass rounded-[32px] overflow-hidden flex flex-col group border-white/20"
              >
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={med.image?.startsWith('http') ? med.image : `http://localhost:5000${med.image}`} 
                    alt={med.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {med.requiresPrescription && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                      <ShieldAlert size={12} /> RX REQUIRED
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 glass p-2 rounded-xl">
                    <Tag size={16} className="text-secondary" />
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {med.manufacturer}
                    </span>
                    <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded">
                      {med.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{med.name}</h3>
                  <p className="text-gray-500 text-xs line-clamp-2 mb-6">
                    {med.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Price</p>
                      <p className="text-2xl font-bold text-dark">₹{med.price}</p>
                    </div>
                    <button 
                      onClick={() => {
                        if (!user) return navigate('/login');
                        if (user.role === 'vendor') return alert('Vendors cannot purchase medicines');
                        addToCart(med);
                      }}
                      className="w-12 h-12 bg-secondary text-white rounded-2xl flex items-center justify-center hover:shadow-lg hover:shadow-secondary/30 transition-all active:scale-90"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Cart Sidebar/Float */}
      {cart.length > 0 && user?.role !== 'vendor' && (
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-lg"
        >
          <div className="glass p-6 rounded-[32px] shadow-2xl border-white/40 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary text-white rounded-2xl flex items-center justify-center relative">
                <ShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-dark text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {cart.length}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Your Cart</p>
                <p className="text-xl font-black">₹{cartTotal.toFixed(2)}</p>
              </div>
            </div>
            <button 
              onClick={() => setIsCheckoutOpen(true)}
              className="btn-secondary px-8 py-3 rounded-2xl font-black shadow-lg shadow-secondary/20"
            >
              Checkout Now
            </button>
          </div>
        </motion.div>
      )}

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        cart={cart} 
        total={cartTotal}
        onOrderSuccess={() => setCart([])}
      />
    </div>
  );
};

export default Pharmacy;
