import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search, Star, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import API_BASE_URL from '../api/config';

const DoctorSearch = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user?.role === 'doctor') {
      navigate('/');
      return;
    }
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/doctors`);
        setDoctors(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(doc => 
    doc.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-32 md:pt-40 lg:pt-48 pb-20 px-4 md:px-12 lg:px-24 bg-light/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="px-2">
            <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-4">Find Your <span className="text-gradient">Specialist</span></h1>
            <p className="text-gray-500 max-w-xl text-sm md:text-base">
              Browse through our network of certified medical professionals and book your consultation instantly.
            </p>
          </div>
          
          <div className="relative w-full md:w-[400px] px-2">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 glass rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 border-white/20 transition-all text-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredDoctors.map((doc, index) => (
              <Link
                key={doc._id}
                to={`/doctors/${doc._id}`}
                className="glass rounded-[32px] overflow-hidden group hover:shadow-2xl transition-all duration-500 border-white/20 block"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={doc.user.avatar ? (doc.user.avatar.startsWith('http') ? doc.user.avatar : `${API_BASE_URL}${doc.user.avatar}`) : `https://api.dicebear.com/7.x/avataaars/svg?seed=${doc.user.name}`} 
                    alt={doc.user.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold">
                    <Star className="text-yellow-400 fill-yellow-400" size={14} />
                    {doc.rating || '4.8'}
                  </div>
                </div>
                
                <div className="p-6">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">
                    {doc.specialization}
                  </span>
                  <h3 className="text-xl font-bold mt-4 mb-2 group-hover:text-primary transition-colors">
                    {doc.user.name}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-6">
                    {doc.about}
                  </p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-400">Consultation Fee</p>
                      <p className="text-lg font-bold text-dark">₹{doc.fees}</p>
                    </div>
                    <div 
                      className="w-12 h-12 bg-dark text-white rounded-2xl flex items-center justify-center hover:bg-primary transition-colors duration-300 group/btn"
                    >
                      <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && filteredDoctors.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 font-semibold">No doctors found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorSearch;
