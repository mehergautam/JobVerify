import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  Linkedin, Search, ChevronRight, BarChart3, 
  CheckCircle2, AlertCircle, Info, Zap, 
  UserCircle, AlignLeft, Award, Users, Camera, Star, Activity
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const CategoryBar = ({ label, score }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-[#8b8b99]">
      <span>{label}</span>
      <span className={score >= 70 ? 'text-[#22d3a5]' : score >= 40 ? 'text-amber-500' : 'text-red-500'}>{score}%</span>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${score}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full ${score >= 70 ? 'bg-[#22d3a5]' : score >= 40 ? 'bg-amber-500' : 'bg-red-500'}`}
      />
    </div>
  </div>
);

const LinkedInAnalyzer = () => {
  const [formData, setFormData] = useState({
    headline: '',
    about: '',
    skills: '',
    recentJob: '',
    connections: '100-500',
    hasPhoto: true,
    hasFeatured: false,
  });
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResults(null);
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post(
        `${API_URL}/tools/linkedin/analyze`, 
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResults(data);
      toast.success('Analysis complete!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Analysis failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in text-[#f2f2f5] pb-20">
      {/* HEADER SECTION */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-[10px] font-bold text-[#55555f] uppercase tracking-widest mb-4">
           Dashboard <ChevronRight size={10} /> LinkedIn Analyzer
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div>
              <h1 className="text-3xl font-['Cabinet_Grotesk'] font-bold text-white tracking-tight flex items-center gap-3">
                LinkedIn Profile Analyzer <Linkedin size={24} className="text-[#6366f1]" />
              </h1>
              <p className="text-[#8b8b99] font-medium mt-1">Score your LinkedIn profile like a recruiter sees it</p>
           </div>
           <div className="bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-full px-4 py-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] animate-pulse" />
              <span className="text-[10px] font-bold text-[#a5b4fc] uppercase tracking-widest">Premium Feature — Free</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUT COLUMN */}
        <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6">
           <motion.div 
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             className="bg-[#131316] border border-white/5 rounded-[2rem] p-8 shadow-xl"
           >
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-lg font-bold text-white">Profile Details</h3>
              </div>

              <div className="space-y-8">
                 {/* INFO BOX */}
                 <div className="bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-2xl p-4 flex items-start gap-3 shadow-lg shadow-[#6366f1]/5">
                       <div className="mt-0.5 text-[#6366f1] bg-white rounded-full p-0.5">
                          <Info size={14} fill="currentColor" className="text-white" />
                       </div>
                       <div>
                          <p className="text-xs font-bold text-white mb-1">💡 Tip: Open LinkedIn profile → Copy each section → Paste here. Takes 2 minutes!</p>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <div className="flex items-center justify-between">
                          <h4 className="text-[10px] font-bold text-[#8b8b99] uppercase tracking-[0.2em]">Quick Profile Import</h4>
                          <button 
                            onClick={() => setShowGuide(!showGuide)}
                            className="text-[10px] font-bold text-[#6366f1] uppercase tracking-widest hover:underline flex items-center gap-1"
                          >
                            {showGuide ? 'Hide Guide' : 'How to find these sections?'}
                          </button>
                       </div>

                       {/* CSS GUIDE MOCKUP */}
                       <AnimatePresence>
                          {showGuide && (
                             <motion.div 
                               initial={{ height: 0, opacity: 0 }}
                               animate={{ height: 'auto', opacity: 1 }}
                               exit={{ height: 0, opacity: 0 }}
                               className="overflow-hidden"
                             >
                                <div className="bg-white/5 border border-white/5 rounded-[1.5rem] p-4 mb-6 relative">
                                   <div className="absolute top-2 right-2 flex gap-1">
                                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/30" />
                                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500/30" />
                                      <div className="w-1.5 h-1.5 rounded-full bg-[#22d3a5]/30" />
                                   </div>
                                   
                                   {/* MOCKUP HEADER */}
                                   <div className="flex items-center gap-3 mb-6">
                                      <div className="w-10 h-10 rounded-full bg-white/10" />
                                      <div className="space-y-2">
                                         <div className="h-2 w-24 bg-white/10 rounded-full" />
                                         <div className="h-1.5 w-16 bg-white/5 rounded-full" />
                                      </div>
                                   </div>

                                   {/* MOCKUP SECTIONS */}
                                   <div className="space-y-4">
                                      <div className="p-2 border border-[#6366f1]/40 rounded-lg bg-[#6366f1]/5 relative">
                                         <div className="h-2 w-3/4 bg-[#6366f1]/30 rounded-full mb-1" />
                                         <span className="absolute -top-2 left-2 px-1 bg-[#131316] text-[8px] font-bold text-[#6366f1]">1. HEADLINE</span>
                                      </div>
                                      <div className="p-2 border border-[#6366f1]/40 rounded-lg bg-[#6366f1]/5 relative">
                                         <div className="h-8 w-full bg-[#6366f1]/20 rounded-md" />
                                         <span className="absolute -top-2 left-2 px-1 bg-[#131316] text-[8px] font-bold text-[#6366f1]">2. ABOUT</span>
                                      </div>
                                      <div className="grid grid-cols-2 gap-2">
                                         <div className="p-2 border border-[#22d3a5]/40 rounded-lg bg-[#22d3a5]/5 relative">
                                            <div className="h-2 w-1/2 bg-[#22d3a5]/30 rounded-full" />
                                            <span className="absolute -top-2 left-2 px-1 bg-[#131316] text-[8px] font-bold text-[#22d3a5]">3. SKILLS</span>
                                         </div>
                                         <div className="p-2 border border-amber-500/40 rounded-lg bg-amber-500/5 relative">
                                            <div className="h-2 w-1/2 bg-amber-500/30 rounded-full" />
                                            <span className="absolute -top-2 left-2 px-1 bg-[#131316] text-[8px] font-bold text-amber-500">4. RECENT JOB</span>
                                         </div>
                                      </div>
                                   </div>
                                </div>
                             </motion.div>
                          )}
                       </AnimatePresence>

                       <form onSubmit={handleAnalyze} className="space-y-6">
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-[#8b8b99] uppercase tracking-widest pl-1">1. Your Headline</label>
                             <div className="relative group">
                                 <input 
                                  type="text" name="headline" placeholder="Ex: CSE Student | React Developer | Open to Work" 
                                  className="input-field pr-10 focus:border-[#6366f1]/50" required
                                  value={formData.headline} onChange={handleInputChange}
                                />
                                <AlignLeft size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#55555f] group-focus-within:text-[#6366f1]" />
                             </div>
                          </div>

                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-[#8b8b99] uppercase tracking-widest pl-1">2. About Section</label>
                             <textarea 
                                name="about" placeholder="Paste your LinkedIn About section..." 
                                className="input-field min-h-[140px] resize-none py-4 focus:border-[#6366f1]/50" required
                                value={formData.about} onChange={handleInputChange}
                             />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <label className="text-[10px] font-bold text-[#8b8b99] uppercase tracking-widest pl-1">3. Top 5 Skills</label>
                                <div className="relative group">
                                   <input 
                                     type="text" name="skills" placeholder="React.js, Node.js, Python, MongoDB, Git" 
                                     className="input-field pr-10 focus:border-[#6366f1]/50" required
                                     value={formData.skills} onChange={handleInputChange}
                                   />
                                   <Award size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#55555f] group-focus-within:text-[#6366f1]" />
                                </div>
                             </div>

                             <div className="space-y-2">
                                <label className="text-[10px] font-bold text-[#8b8b99] uppercase tracking-widest pl-1">4. Recent Job Title</label>
                                <div className="relative group">
                                   <input 
                                     type="text" name="recentJob" placeholder="Ex: Frontend Intern at Razorpay" 
                                     className="input-field pr-10 focus:border-[#6366f1]/50"
                                     value={formData.recentJob} onChange={handleInputChange}
                                   />
                                   <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#55555f] group-focus-within:text-[#6366f1]" />
                                </div>
                             </div>
                          </div>

                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-[#8b8b99] uppercase tracking-widest pl-1">Connections</label>
                             <div className="relative">
                                <select 
                                   name="connections" className="input-field appearance-none cursor-pointer pr-10" 
                                   value={formData.connections} onChange={handleInputChange}
                                >
                                   <option value="Under 100">Under 100</option>
                                   <option value="100-500">100-500</option>
                                   <option value="500+">500+</option>
                                </select>
                                <Users size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#55555f] pointer-events-none" />
                             </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
                             {[
                               { name: 'hasPhoto', label: 'Profile Photo?', icon: Camera },
                               { name: 'hasFeatured', label: 'Featured Section?', icon: Star },
                             ].map(toggle => (
                               <label key={toggle.name} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl cursor-pointer hover:border-[#6366f1]/30 transition-all group">
                                  <div className="flex items-center gap-3">
                                     <toggle.icon size={16} className="text-[#8b8b99] group-hover:text-[#6366f1] transition-colors" />
                                     <span className="text-xs font-bold text-[#f2f2f5]">{toggle.label}</span>
                                  </div>
                                  <div className="relative inline-flex items-center">
                                     <input 
                                       type="checkbox" name={toggle.name} 
                                       checked={formData[toggle.name]} onChange={handleInputChange}
                                       className="sr-only peer" 
                                     />
                                     <div className="w-8 h-4 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#6366f1]"></div>
                                  </div>
                               </label>
                             ))}
                          </div>

                          <button 
                             type="submit" disabled={isLoading}
                             className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-bold py-5 rounded-2xl shadow-xl transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] disabled:opacity-50 flex items-center justify-center gap-3 text-lg"
                          >
                             {isLoading ? (
                                <div className="flex items-center gap-3">
                                   <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                   <span className="animate-pulse">Analyzing Profile...</span>
                                </div>
                             ) : (
                                <>Analyze My Profile 🔍</>
                             )}
                          </button>
                       </form>
                    </div>
                 </div>
           </motion.div>
        </div>

        {/* RESULTS COLUMN */}
        <div className="lg:col-span-12 xl:col-span-7">
           <AnimatePresence mode="wait">
              {!results && !isLoading && (
                 <motion.div 
                   key="empty"
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                   className="h-full min-h-[400px] bg-[#131316] border border-white/5 border-dashed rounded-[2rem] flex flex-col items-center justify-center text-center p-12"
                 >
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 text-[#55555f]">
                       <BarChart3 size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-[#f2f2f5] mb-2">Analyze your profile</h3>
                    <p className="text-[#8b8b99] font-medium max-w-xs">Fill in your profile details to see how you rank among other Indian candidates.</p>
                 </motion.div>
              )}

              {isLoading && (
                 <motion.div 
                    key="loading"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="h-full min-h-[400px] bg-[#131316] border border-white/5 rounded-[2rem] flex flex-col items-center justify-center text-center p-12 relative overflow-hidden"
                 >
                    <div className="absolute inset-0 bg-dot-grid opacity-10" />
                    <div className="relative z-10 flex flex-col items-center">
                       <div className="w-16 h-16 border-4 border-[#6366f1]/10 border-t-[#6366f1] rounded-full animate-spin mb-6" />
                       <h3 className="text-xl font-bold text-white mb-2">Groq AI is analyzing...</h3>
                       <p className="text-[10px] font-bold text-[#8b8b99] uppercase tracking-[0.2em] animate-pulse">Running 50+ Recruiter Signal Checks</p>
                    </div>
                 </motion.div>
              )}

              {results && (
                 <motion.div 
                    key="results"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                 >
                    {/* Top Score Summary */}
                    <div className="bg-[#131316] border border-white/5 rounded-[2rem] p-8 shadow-xl">
                       <div className="flex flex-col items-center text-center mb-10">
                          <div className="relative w-44 h-44 flex items-center justify-center mb-2">
                             <svg className="w-full h-full -rotate-90">
                                <circle cx="88" cy="88" r="82" fill="none" className="stroke-white/5" strokeWidth="10" />
                                <motion.circle 
                                   cx="88" cy="88" r="82" fill="none" stroke="currentColor" strokeWidth="10"
                                   className={results.overallScore >= 75 ? 'text-[#22d3a5]' : results.overallScore >= 50 ? 'text-amber-500' : 'text-red-500'}
                                   strokeDasharray="515"
                                   initial={{ strokeDashoffset: 515 }}
                                   animate={{ strokeDashoffset: 515 * (1 - results.overallScore / 100) }}
                                   transition={{ duration: 2, ease: "easeOut" }}
                                   strokeLinecap="round"
                                />
                             </svg>
                             <div className="absolute flex flex-col items-center">
                                <span className="text-[4rem] font-['JetBrains_Mono'] font-bold text-white tracking-tighter leading-none">{results.overallScore}</span>
                             </div>
                          </div>
                          <p className="text-sm font-bold text-[#8b8b99] uppercase tracking-widest mt-2">{results.overallScore >= 75 ? 'Excellent Profile' : results.overallScore >= 50 ? 'Good Potential' : 'Needs Optimization'}</p>
                       </div>

                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          <CategoryBar label="Headline" score={results.categories.headlineStrength} />
                          <CategoryBar label="About Section" score={results.categories.aboutSection} />
                          <CategoryBar label="Skills Match" score={results.categories.skillsRelevance} />
                          <CategoryBar label="Visibility" score={results.categories.recruiterVisibility} />
                          <CategoryBar label="Completeness" score={results.categories.profileCompleteness} />
                          <CategoryBar label="Engagement" score={results.categories.engagementPotential} />
                       </div>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-[#131316] border border-white/5 rounded-[2rem] p-8 shadow-xl">
                       <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                          Actionable Tips <Zap size={18} className="text-yellow-500" />
                       </h3>
                       <div className="space-y-4">
                          {results.recommendations.map((rec, i) => (
                             <motion.div 
                               initial={{ opacity: 0, x: 20 }}
                               animate={{ opacity: 1, x: 0 }}
                               transition={{ delay: i * 0.1 }}
                               key={i} 
                               className="bg-white/5 border-l-4 border-[#6366f1] rounded-r-xl p-4 flex items-start gap-4"
                             >
                                <div className="mt-1">
                                   <div className="w-5 h-5 rounded-full bg-[#6366f1]/20 flex items-center justify-center text-[#6366f1]">
                                      <Info size={12} />
                                   </div>
                                </div>
                                <div className="flex-1">
                                   <p className="text-sm font-medium text-[#f2f2f5] mb-1">{rec.tip}</p>
                                   <div className="flex items-center gap-2">
                                      <span className="text-[10px] font-bold text-[#55555f] uppercase tracking-widest">{rec.category}</span>
                                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded text-white ${rec.impact === 'High' ? 'bg-red-500/50' : 'bg-amber-500/50'}`}>{rec.impact} Impact</span>
                                   </div>
                                </div>
                             </motion.div>
                          ))}
                       </div>
                    </div>
                 </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LinkedInAnalyzer;
