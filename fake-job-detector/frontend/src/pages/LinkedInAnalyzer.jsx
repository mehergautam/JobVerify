import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  Linkedin, Search, ChevronRight, BarChart3,
  Info, Zap, AlignLeft, Award, Users, Camera, Star, ArrowRight, CheckCircle2, Target, TrendingUp, ShieldCheck, Loader2, RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const CategoryBar = ({ label, score, delay = 0 }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-end">
      <div>
         <span className="text-[10px] font-extrabold text-[#9AB5A8] uppercase tracking-widest">{label}</span>
      </div>
      <span className={`text-xs font-mono font-bold ${score >= 75 ? 'text-[#4CAF7D]' : score >= 50 ? 'text-[#C9A84C]' : 'text-[#E05C5C]'}`}>{score}%</span>
    </div>
    <div className="h-2 w-full bg-[#1A2E25] rounded-full border border-[#2D4A3E] overflow-hidden shadow-inner">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 1.2, delay, ease: "circOut" }}
        className={`h-full rounded-full ${score >= 75 ? 'bg-[#4CAF7D] shadow-[0_0_8px_#4CAF7D]' : score >= 50 ? 'bg-[#C9A84C] shadow-[0_0_8px_#C9A84C]' : 'bg-[#E05C5C] shadow-[0_0_8px_#E05C5C]'}`}
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

  const fillDemo = () => {
    setFormData({
      headline: 'Software Engineer | React & Node.js Specialist | Open to Innovative Roles',
      about: 'Passionate developer with experience in building scalable web applications. Expert in React ecosystems and cloud-native solutions. Dedicated to clean code and exceptional user experiences.',
      skills: 'React, Node.js, TypeScript, AWS, PostgreSQL, Tailwind CSS',
      recentJob: 'Frontend Developer at WebCorp Solutions',
      connections: '500+',
      hasPhoto: true,
      hasFeatured: true,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
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
      toast.success('Analysis complete! 🔍');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Analysis failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-white border-b border-[#E8E0D0] px-8 py-6">
        <div className="flex items-center gap-1.5 text-sm text-[#9AB5A8] mb-2">
          <span className="hover:text-[#6B8A7A] cursor-pointer transition-colors">Dashboard</span>
          <ChevronRight size={14} /><span className="text-[#3D5A4F] font-medium">LinkedIn Analyzer</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="font-bold text-[#1A2E25] text-2xl flex items-center gap-2">
              <Linkedin size={22} className="text-[#C9A84C]" /> LinkedIn Profile Analyzer
            </h1>
            <p className="text-[#6B8A7A] text-sm mt-1">Score your LinkedIn like a recruiter sees it</p>
          </div>
          <span className="badge-success self-start">FREE • LinkedIn Premium = ₹2,499/mo</span>
        </div>
      </div>

      <div className="px-8 py-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input */}
          <div className="lg:col-span-5">
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0D1813] rounded-[2rem] border border-[#2D4A3E] shadow-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2D4A3E]/10 rounded-bl-[4rem] -z-0" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-sm font-bold text-[#F5F0E8] uppercase tracking-widest flex items-center gap-2">
                     <Target size={18} className="text-[#C9A84C]" /> Profile Payload
                  </h3>
                  <button onClick={fillDemo} className="text-[10px] font-extrabold text-[#4CAF7D] uppercase tracking-widest hover:text-[#C9A84C] transition-colors">
                     Use Sample Profile
                  </button>
                </div>

                <form onSubmit={handleAnalyze} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold text-[#6B8A7A] uppercase tracking-[0.2em] ml-1">LinkedIn Headline</label>
                    <div className="relative group">
                      <input type="text" name="headline" placeholder="Software Engineer @ Google | Open to Work" className="input-field py-4 pr-10 pl-5 bg-[#1A2E25] border-[#3D5A4F] text-[#F5F0E8] focus:bg-[#0D1813] focus:border-[#C9A84C]" required value={formData.headline} onChange={handleInputChange} />
                      <AlignLeft size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B8A7A] group-focus-within:text-[#C9A84C]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold text-[#6B8A7A] uppercase tracking-[0.2em] ml-1">About / Summary Section</label>
                    <textarea name="about" placeholder="Paste your profile 'About' text for sentiment & keyword extraction..." className="input-field min-h-[140px] resize-none py-4 px-5 bg-[#1A2E25] border-[#3D5A4F] text-[#F5F0E8] focus:bg-[#0D1813] focus:border-[#C9A84C] text-sm" required value={formData.about} onChange={handleInputChange} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold text-[#6B8A7A] uppercase tracking-[0.2em] ml-1">Key Competencies</label>
                      <div className="relative group">
                        <input type="text" name="skills" placeholder="React, Node, etc." className="input-field py-4 pr-10 bg-[#1A2E25] border-[#3D5A4F] text-[#F5F0E8] focus:border-[#C9A84C]" required value={formData.skills} onChange={handleInputChange} />
                        <Star size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B8A7A]" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold text-[#6B8A7A] uppercase tracking-[0.2em] ml-1">Last Role</label>
                      <div className="relative group">
                        <input type="text" name="recentJob" placeholder="e.g. Intern" className="input-field py-4 pr-10 bg-[#1A2E25] border-[#3D5A4F] text-[#F5F0E8] focus:border-[#C9A84C]" value={formData.recentJob} onChange={handleInputChange} />
                        <Search size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B8A7A]" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold text-[#6B8A7A] uppercase tracking-[0.2em] ml-1">Network Density</label>
                    <div className="relative">
                      <select name="connections" className="input-field py-4 px-5 bg-[#1A2E25] border-[#3D5A4F] text-[#F5F0E8] focus:border-[#C9A84C] appearance-none" value={formData.connections} onChange={handleInputChange}>
                        <option value="Under 100">Under 100 Connections</option>
                        <option value="100-500">100-500 Connections</option>
                        <option value="500+">500+ Connections (All-Star)</option>
                      </select>
                      <Users size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B8A7A] pointer-events-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[{ name: 'hasPhoto', label: 'Photo Active', icon: Camera }, { name: 'hasFeatured', label: 'Featured List', icon: Star }].map(toggle => (
                      <label key={toggle.name} className="flex flex-col gap-3 p-4 bg-white border border-[#E8E0D0] rounded-2xl cursor-pointer hover:border-[#4CAF7D] transition-all">
                        <div className="flex items-center justify-between">
                           <toggle.icon size={16} className="text-[#9AB5A8]" />
                           <div className="relative inline-flex items-center">
                              <input type="checkbox" name={toggle.name} checked={formData[toggle.name]} onChange={handleInputChange} className="sr-only peer" />
                              <div className="w-8 h-4 bg-[#E8E0D0] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#4CAF7D]"></div>
                           </div>
                        </div>
                        <span className="text-[10px] font-extrabold text-[#3D5A4F] uppercase tracking-widest">{toggle.label}</span>
                      </label>
                    ))}
                  </div>

                  <button type="submit" disabled={isLoading}
                    className="w-full bg-[#2D4A3E] text-white font-black py-5 rounded-[1.5rem] shadow-xl hover:bg-[#1A2E25] hover:scale-[1.01] transition-all flex items-center justify-center gap-4 disabled:opacity-60"
                  >
                    {isLoading ? (
                      <><Loader2 size={20} className="animate-spin" /><span>Extracting Signals...</span></>
                    ) : (
                      <><BarChart3 size={20} className="text-[#C9A84C]" /><span>Perform Forensic Audit</span></>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Results */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!results && !isLoading && (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full min-h-[500px] bg-[#1A2E25] border-2 border-dashed border-[#2D4A3E] rounded-[2.5rem] flex flex-col items-center justify-center text-center p-12 hover:border-[#4CAF7D] transition-all group"
                >
                  <div className="w-20 h-20 bg-[#0D1813] rounded-[2rem] flex items-center justify-center mb-8 border border-[#3D5A4F] group-hover:scale-110 shadow-inner overflow-hidden relative">
                    <Linkedin size={40} className="text-[#C9A84C] relative z-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#F5F0E8] mb-2">Neural Profile Audit</h3>
                  <p className="text-[#9AB5A8] text-sm max-w-sm leading-relaxed mb-10">Discover how your profile stacks up against job market standards and recruiter algorithms.</p>
                  
                  <button 
                    onClick={fillDemo}
                    className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-[#0D1813] text-[#4CAF7D] font-extrabold text-[10px] uppercase tracking-[0.2em] hover:bg-[#C9A84C] hover:text-[#0D1813] transition-all shadow-xl border border-[#2D4A3E]"
                  >
                    Quick-Fill Sample Data <ArrowRight size={16} />
                  </button>
                </motion.div>
              )}

              {isLoading && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full min-h-[500px] bg-[#1A2E25] rounded-[2.5rem] border border-[#2D4A3E] shadow-2xl flex flex-col items-center justify-center text-center p-12 overflow-hidden relative"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#1A2E25] overflow-hidden">
                     <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} className="w-1/3 h-full bg-[#C9A84C]" />
                  </div>
                  <div className="relative mb-8">
                      <div className="w-20 h-20 border-4 border-[#0D1813] border-t-[#C9A84C] rounded-full animate-spin" />
                      <Search className="absolute inset-0 m-auto text-[#C9A84C]" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#F5F0E8] mb-2">Synthesizing Profile Data</h3>
                  <p className="text-sm text-[#9AB5A8] animate-pulse max-w-xs">Scanning 72 unique profile markers against recruiter preference models...</p>
                </motion.div>
              )}

              {results && (
                <motion.div key="results" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pb-12">
                  {/* Score & Category Grid */}
                  <div className="bg-[#1A2E25] rounded-[2.5rem] border border-[#2D4A3E] shadow-xl overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center gap-12 p-10 border-b border-[#3D5A4F]">
                      <div className="relative w-44 h-44 flex-shrink-0">
                         <svg className="w-full h-full -rotate-90">
                            <circle cx="88" cy="88" r="80" fill="none" className="stroke-[#0D1813]" strokeWidth="12" />
                            <motion.circle
                              cx="88" cy="88" r="80" fill="none" stroke="currentColor" strokeWidth="12"
                              className={results.overallScore >= 75 ? 'text-[#4CAF7D]' : results.overallScore >= 50 ? 'text-[#C9A84C]' : 'text-[#E05C5C]'}
                              strokeDasharray="502.6"
                              initial={{ strokeDashoffset: 502.6 }}
                              animate={{ strokeDashoffset: 502.6 * (1 - results.overallScore / 100) }}
                              transition={{ duration: 2, ease: "circOut" }} strokeLinecap="round"
                            />
                         </svg>
                         <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-mono font-bold text-[#F5F0E8] tracking-tighter drop-shadow-md">{results.overallScore}</span>
                            <span className="text-[9px] font-black text-[#9AB5A8] uppercase tracking-[0.2em] mt-1">Market Match</span>
                         </div>
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                           <h2 className="text-3xl font-bold text-[#F5F0E8] leading-tight">Identity Impact</h2>
                        </div>
                        <p className="text-sm text-[#9AB5A8] leading-relaxed italic border-l-4 border-[#C9A84C] pl-4 py-1">
                           "Your profile shows {results.overallScore >= 75 ? 'exceptionally high' : 'standard'} visibility markers. Recruiter interest probability is estimated at {Math.min(results.overallScore + 10, 100)}%."
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                            <span className="bg-[#0D1813] text-[#C9A84C] border border-[#3D5A4F] px-3 py-1 text-[10px] font-bold rounded-lg uppercase tracking-widest shadow-sm">ALL-STAR PROFILE</span>
                            <span className="bg-[#0D1813] text-[#C9A84C] border border-[#3D5A4F] px-3 py-1 text-[10px] font-bold rounded-lg uppercase tracking-widest shadow-sm">RECRUITER VISIBLE</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#0D1813]/60 p-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 backdrop-blur-sm shadow-inner">
                       <CategoryBar label="Headline Impact" score={results.categories.headlineStrength} delay={0.1} />
                       <CategoryBar label="Storytelling (About)" score={results.categories.aboutSection} delay={0.2} />
                       <CategoryBar label="Skills Relevance" score={results.categories.skillsRelevance} delay={0.3} />
                       <CategoryBar label="Visibility Depth" score={results.categories.recruiterVisibility} delay={0.4} />
                       <CategoryBar label="Profile Logic" score={results.categories.profileCompleteness} delay={0.5} />
                       <CategoryBar label="Engagement potential" score={results.categories.engagementPotential} delay={0.6} />
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-[#1A2E25] rounded-[2.5rem] border border-[#2D4A3E] shadow-xl p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                       <Zap size={120} strokeWidth={1} />
                    </div>
                    
                    <div className="flex items-center justify-between mb-10">
                       <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-[#0D1813] text-[#C9A84C] flex items-center justify-center border border-[#3D5A4F] shadow-inner">
                             <TrendingUp size={24} />
                          </div>
                          <div>
                             <h4 className="font-bold text-[#F5F0E8] text-lg">Optimization Path</h4>
                             <p className="text-[10px] text-[#9AB5A8] font-bold uppercase tracking-widest">High-priority actionable insights</p>
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {results.recommendations.map((rec, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + (i * 0.1) }}
                          className={`p-6 rounded-[2rem] border border-[#3D5A4F] flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-[#C9A84C] transition-all bg-[#0D1813]/50 shadow-sm overflow-hidden relative backdrop-blur-sm`}
                        >
                          <div className="flex items-start gap-4 flex-1">
                             <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${rec.impact === 'High' ? 'bg-[#E05C5C] shadow-[0_0_8px_#E05C5C]' : 'bg-[#C9A84C] shadow-[0_0_8px_#C9A84C]'}`} />
                             <div>
                                <h5 className="font-bold text-[#F5F0E8] text-sm mb-1">{rec.tip}</h5>
                                <p className="text-[10px] text-[#6B8A7A] font-bold uppercase tracking-widest">{rec.category}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-3">
                             <span className={`text-[10px] font-black px-4 py-1.5 rounded-xl uppercase tracking-tighter border ${rec.impact === 'High' ? 'bg-[#3A1818] text-[#E05C5C] border-[#702525]' : 'bg-[#362612] text-[#C9A84C] border-[#6B4B22]'}`}>
                                {rec.impact} Impact
                             </span>
                             <div className="w-8 h-8 rounded-full bg-[#1A2E25] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-[#3D5A4F]">
                                <ChevronRight size={16} className="text-[#C9A84C]" />
                             </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-10 p-6 bg-[#0D1813] rounded-3xl border border-[#3D5A4F] flex items-center gap-4 shadow-inner">
                       <div className="w-12 h-12 bg-[#1A2E25] rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0 border border-[#2D4A3E]">
                          <Users size={24} className="text-[#4CAF7D]" />
                       </div>
                       <div className="flex-1">
                          <h6 className="text-[10px] font-black text-[#4CAF7D] uppercase tracking-widest mb-1">Weekly Growth Suggestion</h6>
                          <p className="text-xs font-bold text-[#F5F0E8]">Add 8-10 meaningful connections to boost ranking.</p>
                       </div>
                       <button className="hidden sm:block px-6 py-2.5 bg-[#4CAF7D] text-[#0D1813] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#3d8c64] transition-colors shadow-lg shadow-[#4CAF7D]/30">
                          Add Connections
                       </button>
                    </div>
                  </div>

                  <div className="flex justify-center pt-8">
                     <button 
                       onClick={() => { setResults(null); }}
                       className="flex items-center gap-2 px-12 py-4 rounded-2xl bg-[#1A2E25] border-2 border-[#3D5A4F] text-[#9AB5A8] font-black text-[10px] uppercase tracking-[0.2em] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all shadow-xl"
                     >
                        Audit New Profile <RefreshCw size={14} />
                     </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedInAnalyzer;
