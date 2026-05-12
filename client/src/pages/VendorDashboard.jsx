import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { 
  Package, 
  ShoppingBag, 
  Plus, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  X,
  Truck,
  DollarSign,
  AlertCircle
} from 'lucide-react';

import API_BASE_URL from '../api/config';
const getAvatarUrl = (avatar) => {
  if (!avatar) return null;
  if (avatar.startsWith('http')) return avatar;
  return `${BASE_URL}${avatar}`;
};

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [medicines, setMedicines] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const { user } = useSelector((state) => state.auth);

  const [newMedicine, setNewMedicine] = useState({
    name: '',
    category: 'Antibiotics',
    price: '',
    stock: '',
    description: '',
    manufacturer: user?.name || '',
    requiresPrescription: false
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchVendorData();
  }, [activeTab]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const fetchVendorData = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      
      if (activeTab === 'inventory') {
        const { data } = await axios.get(`${API_BASE_URL}/api/medicines/my-medicines`, config);
        setMedicines(data);
      } else {
        const { data } = await axios.get(`${API_BASE_URL}/api/orders/vendor`, config);
        setOrders(data);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(newMedicine).forEach(key => {
        formData.append(key, newMedicine[key]);
      });
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const config = {
        headers: { 
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data'
        }
      };

      await axios.post(`${API_BASE_URL}/api/medicines`, formData, config);
      setIsAddModalOpen(false);
      fetchVendorData();
      setNewMedicine({ 
        name: '', 
        category: 'Antibiotics', 
        price: '', 
        stock: '', 
        description: '', 
        manufacturer: user?.name || '',
        requiresPrescription: false
      });
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      alert('Error adding medicine');
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      await axios.put(`${API_BASE_URL}/api/orders/${orderId}/status`, { status }, config);
      fetchVendorData();
    } catch (error) {
      alert('Error updating status');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-12 lg:px-24 bg-light/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-[32px] overflow-hidden border-4 border-white shadow-xl shrink-0">
               <img 
                 src={getAvatarUrl(user.avatar) || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                 className="w-full h-full object-cover" 
                 alt="" 
               />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-2">Vendor <span className="text-primary">Dashboard</span></h1>
              <p className="text-gray-500 font-medium">Manage your pharmacy inventory and fulfill customer orders.</p>
            </div>
          </div>
          <div className="flex gap-4">
             <div className="p-4 glass rounded-3xl flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                  <DollarSign size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Sales</p>
                  <p className="text-xl font-black">₹{orders.filter(o => o.isPaid).reduce((acc, o) => acc + o.totalPrice, 0).toFixed(2)}</p>
                </div>
             </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 bg-white/50 p-2 rounded-[28px] w-fit border border-white/20">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`px-8 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 ${activeTab === 'inventory' ? 'bg-primary text-white shadow-lg' : 'text-gray-500 hover:bg-white'}`}
          >
            <Package size={20} /> Inventory
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-8 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 ${activeTab === 'orders' ? 'bg-primary text-white shadow-lg' : 'text-gray-500 hover:bg-white'}`}
          >
            <ShoppingBag size={20} /> Orders
          </button>
        </div>

        {activeTab === 'inventory' ? (
          // ... (keep existing inventory logic)
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-black">Your Medicines</h3>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="btn-primary py-3 px-6 rounded-2xl flex items-center gap-2"
              >
                <Plus size={20} /> Add New Medicine
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {medicines.map(med => (
                <div key={med._id} className="glass rounded-[32px] overflow-hidden group">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={med.image?.startsWith('http') ? med.image : `${API_BASE_URL}${med.image}`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      alt="" 
                    />
                    <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-xs font-bold text-primary">
                      ₹{med.price}
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-lg mb-1">{med.name}</h4>
                    <p className="text-xs text-gray-500 mb-4">{med.category}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <Package size={14} className="text-gray-400" />
                        <span className="text-sm font-bold">{med.stock} in stock</span>
                      </div>
                      <button className="text-xs font-bold text-primary hover:underline">Edit Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {medicines.length === 0 && !loading && (
              <div className="text-center py-20 bg-white/50 rounded-[40px] border border-dashed border-gray-200">
                <Package className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-gray-500 font-bold">No medicines in your inventory yet.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-black">Fulfillment Board</h3>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Live Sync Active
              </div>
            </div>

            {/* Kanban Board Stacks */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
              {[
                { id: 'Pending', label: 'Incoming', color: 'bg-yellow-500', bg: 'bg-yellow-50/50' },
                { id: 'Processing', label: 'Processing', color: 'bg-blue-500', bg: 'bg-blue-50/50' },
                { id: 'Shipped', label: 'In Transit', color: 'bg-primary', bg: 'bg-primary/5' },
                { id: 'Delivered', label: 'History', color: 'bg-green-500', bg: 'bg-green-50/30' }
              ].map(stack => (
                <div key={stack.id} className={`flex flex-col gap-4 p-4 rounded-[32px] ${stack.bg} border border-white/40 min-h-[500px]`}>
                  <div className="flex items-center justify-between px-2 mb-2">
                    <h4 className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${stack.color}`} />
                      {stack.label}
                    </h4>
                    <span className="bg-white/80 px-2 py-0.5 rounded-lg text-[10px] font-black shadow-sm">
                      {orders.filter(o => o.status === stack.id).length}
                    </span>
                  </div>

                  <div className="flex flex-col gap-4">
                    {orders.filter(o => o.status === stack.id).map(order => (
                      <motion.div 
                        layoutId={order._id}
                        key={order._id} 
                        className="glass p-5 rounded-2xl border-white hover:shadow-xl transition-all group"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <p className="text-[10px] font-black text-primary uppercase tracking-tighter">Order #{order._id.slice(-6)}</p>
                          <p className="text-sm font-black">₹{order.totalPrice.toFixed(2)}</p>
                        </div>

                        <div className="space-y-3 mb-6">
                          {order.items.slice(0, 2).map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[10px] font-bold shadow-sm">
                                {item.quantity}x
                              </div>
                              <p className="text-xs font-bold text-gray-600 truncate">{item.medicine?.name || 'Medicine'}</p>
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <p className="text-[10px] font-bold text-gray-400">+{order.items.length - 2} more items</p>
                          )}
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                           <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold uppercase">
                                {order.user?.name?.charAt(0)}
                              </div>
                              <p className="text-[10px] font-bold text-dark">{order.user?.name}</p>
                           </div>
                           
                           <div className="flex gap-2">
                              {order.status === 'Pending' && (
                                <button 
                                  onClick={() => updateOrderStatus(order._id, 'Processing')}
                                  className="w-full py-2 bg-dark text-white rounded-xl font-bold text-[10px] hover:bg-black transition-all"
                                >
                                  Accept & Process
                                </button>
                              )}
                              {order.status === 'Processing' && (
                                <button 
                                  onClick={() => updateOrderStatus(order._id, 'Shipped')}
                                  className="w-full py-2 bg-primary text-white rounded-xl font-bold text-[10px] hover:bg-primary-dark transition-all"
                                >
                                  Ship Meds
                                </button>
                              )}
                              {order.status === 'Shipped' && (
                                <button 
                                  onClick={() => updateOrderStatus(order._id, 'Delivered')}
                                  className="w-full py-2 bg-green-500 text-white rounded-xl font-bold text-[10px] hover:bg-green-600 transition-all"
                                >
                                  Complete Delivery
                                </button>
                              )}
                              {order.status === 'Delivered' && (
                                <div className="w-full py-2 bg-gray-100 text-gray-400 rounded-xl font-bold text-[10px] flex items-center justify-center gap-1">
                                  <CheckCircle2 size={12} /> Delivered
                                </div>
                              )}
                           </div>
                        </div>
                      </motion.div>
                    ))}
                    {orders.filter(o => o.status === stack.id).length === 0 && (
                      <div className="py-12 text-center opacity-30">
                        <Package className="mx-auto mb-2" size={24} />
                        <p className="text-[10px] font-black uppercase tracking-widest">No Items</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Medicine Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-dark/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="overflow-y-auto p-8 custom-scrollbar" data-lenis-prevent>
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-black">Add New <span className="text-primary">Medicine</span></h3>
                  <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-all">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleAddMedicine} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Medicine Name</label>
                    <input 
                      type="text" 
                      value={newMedicine.name}
                      onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                      className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold"
                      placeholder="e.g. Paracetamol 500mg"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                      <select 
                        value={newMedicine.category}
                        onChange={(e) => setNewMedicine({ ...newMedicine, category: e.target.value })}
                        className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold"
                      >
                        <option value="Antibiotics">Antibiotics</option>
                        <option value="Pain Relief">Pain Relief</option>
                        <option value="Supplements">Supplements</option>
                        <option value="Diabetes">Diabetes</option>
                        <option value="Cardiac">Cardiac</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Price (₹)</label>
                      <input 
                        type="number" 
                        value={newMedicine.price}
                        onChange={(e) => setNewMedicine({ ...newMedicine, price: e.target.value })}
                        className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold"
                        placeholder="19.99"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Stock Quantity</label>
                      <input 
                        type="number" 
                        value={newMedicine.stock}
                        onChange={(e) => setNewMedicine({ ...newMedicine, stock: e.target.value })}
                        className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold"
                        placeholder="100"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Manufacturer</label>
                      <input 
                        type="text" 
                        value={newMedicine.manufacturer}
                        onChange={(e) => setNewMedicine({ ...newMedicine, manufacturer: e.target.value })}
                        className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold"
                        placeholder="PharmaCorp"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Medicine Description</label>
                    <textarea 
                      value={newMedicine.description}
                      onChange={(e) => setNewMedicine({ ...newMedicine, description: e.target.value })}
                      className="w-full p-4 bg-gray-50 rounded-2xl border-none min-h-[100px] resize-none font-medium"
                      placeholder="Brief description of the medicine and usage..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Medicine Image</label>
                      <div className="relative group/img h-40 rounded-2xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 hover:border-primary/50 transition-all">
                        {imagePreview ? (
                          <img src={imagePreview} className="w-full h-full object-cover" alt="" />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <Plus size={32} />
                            <p className="text-[10px] font-bold mt-2">Upload Photo</p>
                          </div>
                        )}
                        <input 
                          type="file" 
                          onChange={handleImageChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          accept="image/*"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col justify-center gap-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                        <div>
                          <p className="text-sm font-bold">RX Required</p>
                          <p className="text-[10px] text-gray-400">Prescription needed?</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setNewMedicine({ ...newMedicine, requiresPrescription: !newMedicine.requiresPrescription })}
                          className={`w-12 h-6 rounded-full relative transition-all ${newMedicine.requiresPrescription ? 'bg-red-500' : 'bg-gray-200'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${newMedicine.requiresPrescription ? 'right-1' : 'left-1'}`} />
                        </button>
                      </div>
                      <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                         <p className="text-[10px] font-bold text-primary flex items-center gap-1"><AlertCircle size={12} /> Pro Tip</p>
                         <p className="text-[10px] text-gray-500 mt-1">High-quality photos increase sales by up to 40%.</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full btn-primary py-4 text-lg rounded-2xl font-black shadow-primary/30 mt-4"
                  >
                    Add to Inventory
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VendorDashboard;
