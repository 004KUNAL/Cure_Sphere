import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Phone, CreditCard, ShoppingBag, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import API_BASE_URL from '../api/config';

const CheckoutModal = ({ isOpen, onClose, cart, total, onOrderSuccess }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    pinCode: '',
    phone: '',
    paymentMethod: 'UPI'
  });
  const [vendor, setVendor] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const BASE_URL = API_BASE_URL;

  useEffect(() => {
    if (isOpen && cart.length > 0) {
      const fetchVendor = async () => {
        try {
          const vendorId = cart[0].vendor;
          const { data } = await axios.get(`${BASE_URL}/api/auth/profile/${vendorId}`);
          setVendor(data);
        } catch (err) {
          console.error('Error fetching vendor:', err);
        }
      };
      fetchVendor();
    }
  }, [isOpen, cart]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleOrder = async () => {
    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };

      const vendorId = cart[0]?.user;

      const orderData = {
        orderItems: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          image: item.image,
          price: item.price,
          product: item._id
        })),
        shippingAddress: formData,
        totalPrice: total,
        vendor: vendorId
      };

      const { data } = await axios.post(`${API_BASE_URL}/api/orders`, orderData, config);
      
      // Simulate Payment
      await axios.put(`${API_BASE_URL}/api/orders/${data._id}/pay`, {}, config);
      
      setStep(3);
      onOrderSuccess();
    } catch (error) {
      alert(error.response?.data?.message || 'Error placing order');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-dark/60 backdrop-blur-md"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div>
              <h2 className="text-2xl font-black">Secure <span className="text-secondary">Checkout</span></h2>
              <p className="text-sm text-gray-500 font-medium">
                {step === 1 ? 'Review your items' : step === 2 ? 'Shipping & Payment' : 'Confirmation'}
              </p>
            </div>
            <button onClick={onClose} className="p-3 hover:bg-white rounded-full transition-all shadow-sm">
              <X size={20} />
            </button>
          </div>

          <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar" data-lenis-prevent>
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item._id} className="flex items-center gap-4 p-4 glass rounded-2xl">
                      <img src={item.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                      <div className="flex-1">
                        <h4 className="font-bold">{item.name}</h4>
                        <p className="text-xs text-gray-400">{item.manufacturer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₹{item.price}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-6 bg-secondary/5 rounded-3xl border border-secondary/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-bold">₹{total}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-500">Shipping</span>
                    <span className="text-green-500 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-secondary/20">
                    <span className="text-lg font-black">Total</span>
                    <span className="text-2xl font-black text-secondary">₹{total}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setStep(2)}
                  className="w-full btn-secondary py-4 text-lg rounded-2xl flex items-center justify-center gap-2 shadow-secondary/20"
                >
                  Continue to Shipping <ShoppingBag size={20} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-black flex items-center gap-2"><MapPin size={20} className="text-secondary" /> Shipping Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="city" value={formData.city} onChange={onChange} placeholder="City" className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold" />
                    <input type="text" name="pinCode" value={formData.pinCode} onChange={onChange} placeholder="Pin Code" className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold" />
                  </div>
                  <input type="text" name="address" value={formData.address} onChange={onChange} placeholder="Full Delivery Address" className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold" />
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input type="tel" name="phone" value={formData.phone} onChange={onChange} placeholder="Phone Number" className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none font-bold" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-black flex items-center gap-2"><CheckCircle2 size={20} className="text-secondary" /> UPI Payment (Scan & Pay)</h3>
                  
                  <div className="p-6 bg-teal-50 rounded-[32px] border border-teal-100 flex flex-col items-center text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-teal-400 mb-4">Pay to Pharmacy Store</p>
                    
                    <div className="w-40 h-40 bg-white p-4 rounded-2xl shadow-sm mb-4 border border-teal-100 flex items-center justify-center overflow-hidden">
                      {vendor?.vendorInfo?.upiQR ? (
                        <img src={`${BASE_URL}${vendor.vendorInfo.upiQR}`} className="w-full h-full object-contain" alt="Vendor UPI QR" />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-gray-300">
                          <CreditCard size={40} />
                          <p className="text-[10px] font-bold">QR Not Available</p>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-xs text-gray-500 mb-1 font-medium">Pharmacy UPI ID</p>
                    <p className="text-lg font-black text-teal-600">{vendor?.vendorInfo?.upiId || 'store@okaxis'}</p>
                    
                    <div className="mt-4 p-4 bg-white/50 rounded-2xl text-[10px] text-teal-700 leading-relaxed font-medium">
                      Scan this QR with GPay, PhonePe or Paytm to pay ₹{total}. Your order will be processed once the vendor confirms the payment.
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="flex-1 py-4 font-bold border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all">Back</button>
                  <button 
                    onClick={handleOrder}
                    disabled={loading || !formData.address || !formData.city || !formData.phone || !formData.pinCode}
                    className="flex-[2] btn-secondary py-4 text-lg rounded-2xl font-black disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : `Pay ₹${total} & Place Order`}
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-black mb-4">Order <span className="text-green-500">Placed!</span></h3>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                  Your medicine request has been sent to the vendor. You can track your delivery in your profile.
                </p>
                <button onClick={onClose} className="btn-secondary px-12">Return to Pharmacy</button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CheckoutModal;
