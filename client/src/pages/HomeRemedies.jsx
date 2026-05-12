import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Search, X, ChevronRight, ChevronDown, Leaf, Clock, AlertTriangle,
  CheckCircle2, ArrowLeft, Sparkles, Heart, Shield, Star, BookOpen
} from 'lucide-react';
import allRemediesData from '../data/remediesIndex';

const HomeRemedies = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [matchedConditions, setMatchedConditions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);

  // Only logged-in patients can access
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role === 'doctor' || user.role === 'vendor') {
      navigate('/');
    }
  }, [user]);

  // Smart search across all conditions
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setMatchedConditions([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const query = searchQuery.toLowerCase();
    const words = query.split(/\s+/);
    const results = [];

    allRemediesData.forEach(cat => {
      cat.conditions.forEach(cond => {
        let score = 0;
        // Check condition name
        if (cond.name.toLowerCase().includes(query)) score += 10;
        // Check keywords
        cond.keywords.forEach(kw => {
          words.forEach(w => {
            if (kw.includes(w) || w.includes(kw)) score += 3;
          });
          if (kw.includes(query)) score += 5;
        });
        // Check remedy descriptions
        cond.remedies.forEach(r => {
          if (r.desc.toLowerCase().includes(query)) score += 2;
          if (r.title.toLowerCase().includes(query)) score += 4;
        });
        if (score > 0) {
          results.push({ ...cond, category: cat.category, categoryIcon: cat.icon, score });
        }
      });
    });

    results.sort((a, b) => b.score - a.score);
    setMatchedConditions(results.slice(0, 15));
  }, [searchQuery]);

  const getSeverityColor = (s) => {
    if (s === 'mild') return 'bg-green-50 text-green-600 border-green-100';
    if (s === 'moderate') return 'bg-yellow-50 text-yellow-600 border-yellow-100';
    return 'bg-red-50 text-red-600 border-red-100';
  };

  const getSeverityLabel = (s) => {
    if (s === 'mild') return '✅ Home treatable';
    if (s === 'moderate') return '⚠️ Try remedies, see doctor if no improvement';
    return '🚨 Consult doctor first — remedies are supplementary';
  };

  // DETAIL VIEW — showing a single condition's remedies
  if (selectedCondition) {
    return (
      <div className="min-h-screen pt-32 md:pt-40 pb-20 px-4 md:px-12 lg:px-24 bg-light/30">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedCondition(null)}
            className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft size={18} /> Back to {selectedCategory ? selectedCategory.category : 'search results'}
          </button>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{selectedCondition.categoryIcon || '🏥'}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                {selectedCondition.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">{selectedCondition.name}</h1>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black border ${getSeverityColor(selectedCondition.severity)}`}>
              {getSeverityLabel(selectedCondition.severity)}
            </div>
          </div>

          {selectedCondition.severity === 'serious' && (
            <div className="bg-red-50 border border-red-100 rounded-3xl p-6 mb-8 flex items-start gap-4">
              <AlertTriangle className="text-red-500 shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-bold text-red-700 mb-1">Medical Attention Recommended</h4>
                <p className="text-sm text-red-600">
                  This condition may require professional medical treatment. The remedies below are supplementary and should not replace a doctor's advice. Please consult a healthcare provider.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {selectedCondition.remedies.map((remedy, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="glass rounded-[32px] p-6 md:p-8 border-white/20 hover:shadow-2xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{remedy.title}</h3>
                      <p className="text-sm text-gray-500">{remedy.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-full shrink-0 ml-4">
                    <Clock size={12} /> {remedy.duration}
                  </div>
                </div>

                {remedy.ingredients.length > 0 && (
                  <div className="mb-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-1">
                      <Leaf size={12} /> Ingredients
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {remedy.ingredients.map((ing, i) => (
                        <span key={i} className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-1">
                    <BookOpen size={12} /> Steps
                  </p>
                  <ol className="space-y-2">
                    {remedy.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-black text-gray-500 shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 bg-primary/5 border border-primary/10 rounded-3xl p-6 text-center">
            <Shield className="mx-auto text-primary mb-3" size={32} />
            <h4 className="font-bold text-dark mb-2">Disclaimer</h4>
            <p className="text-xs text-gray-500 max-w-lg mx-auto">
              These home remedies are based on traditional medicine and general wellness practices. 
              They are not a substitute for professional medical advice. If symptoms persist or worsen, 
              please consult a healthcare professional immediately.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 md:pt-40 pb-20 px-4 md:px-12 lg:px-24 bg-light/30">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            <Leaf size={14} /> Natural Healing
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-4">
            Home <span className="text-gradient">Remedies</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Describe what you're suffering from, and we'll suggest natural home remedies backed by traditional and modern wellness practices.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12" ref={searchRef}>
          <div className="relative">
            <div className="glass rounded-[28px] overflow-hidden flex items-center px-6 border-white/30 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <Search className="text-gray-400 shrink-0" size={22} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Describe your problem... e.g. 'I have a headache' or 'stomach burning'"
                className="flex-1 bg-transparent border-none focus:ring-0 py-5 px-4 text-base font-medium"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="p-2 hover:bg-gray-100 rounded-full transition-all">
                  <X size={18} className="text-gray-400" />
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {isSearching && matchedConditions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 glass rounded-3xl overflow-hidden z-30 max-h-[400px] overflow-y-auto"
                >
                  <div className="p-2">
                    <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                      <Sparkles size={12} className="inline mr-1" />
                      {matchedConditions.length} matching conditions found
                    </p>
                    {matchedConditions.map((cond, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedCondition(cond);
                          setSearchQuery('');
                          setIsSearching(false);
                        }}
                        className="w-full flex items-center gap-4 p-4 hover:bg-primary/5 rounded-2xl transition-all text-left"
                      >
                        <span className="text-2xl">{cond.categoryIcon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-dark">{cond.name}</p>
                          <p className="text-xs text-gray-500 truncate">{cond.category} · {cond.remedies.length} remedies</p>
                        </div>
                        <div className={`px-2 py-0.5 rounded-full text-[9px] font-black border ${getSeverityColor(cond.severity)}`}>
                          {cond.severity}
                        </div>
                        <ChevronRight size={16} className="text-gray-300" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              {isSearching && searchQuery.length >= 2 && matchedConditions.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 glass rounded-3xl p-8 text-center z-30"
                >
                  <p className="text-gray-500 font-bold">No matching conditions found.</p>
                  <p className="text-xs text-gray-400 mt-1">Try different keywords or browse categories below.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Category Grid or Category Detail */}
        {selectedCategory ? (
          <div>
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary mb-8 transition-colors"
            >
              <ArrowLeft size={18} /> All Categories
            </button>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl">{selectedCategory.icon}</span>
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold">{selectedCategory.category}</h2>
                <p className="text-sm text-gray-500">{selectedCategory.conditions.length} conditions · Click any to see remedies</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedCategory.conditions.map((cond, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedCondition({
                    ...cond,
                    category: selectedCategory.category,
                    categoryIcon: selectedCategory.icon
                  })}
                  className="glass p-6 rounded-3xl text-left hover:shadow-xl transition-all group border-white/20"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{cond.name}</h3>
                      <p className="text-xs text-gray-500 mb-3">{cond.remedies.length} remedies available</p>
                      <div className={`inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-black border ${getSeverityColor(cond.severity)}`}>
                        {cond.severity === 'mild' ? '✅ Mild' : cond.severity === 'moderate' ? '⚠️ Moderate' : '🚨 Serious'}
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-300 group-hover:text-primary transition-colors mt-1" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Star size={20} className="text-primary" /> Browse by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allRemediesData.map((cat, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setSelectedCategory(cat)}
                  className="glass p-6 rounded-[28px] text-center hover:shadow-2xl hover:-translate-y-1 transition-all group border-white/20"
                >
                  <span className="text-4xl md:text-5xl block mb-3">{cat.icon}</span>
                  <h3 className="font-bold text-sm md:text-base group-hover:text-primary transition-colors">{cat.category}</h3>
                  <p className="text-[10px] text-gray-400 font-bold mt-1">
                    {cat.conditions.length} conditions
                  </p>
                </motion.button>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Categories', value: allRemediesData.length, icon: '📂' },
                { label: 'Conditions', value: allRemediesData.reduce((a, c) => a + c.conditions.length, 0), icon: '🏥' },
                { label: 'Remedies', value: allRemediesData.reduce((a, c) => a + c.conditions.reduce((b, d) => b + d.remedies.length, 0), 0), icon: '🌿' },
                { label: 'Ingredients', value: '500+', icon: '🧪' }
              ].map((stat, i) => (
                <div key={i} className="text-center p-6 bg-white/50 rounded-3xl border border-gray-100">
                  <span className="text-2xl">{stat.icon}</span>
                  <p className="text-2xl font-black text-dark mt-2">{stat.value}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeRemedies;
