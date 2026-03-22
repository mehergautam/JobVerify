import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  Linkedin, Search, ChevronRight, BarChart3,
  Info, Zap, AlignLeft, Award, Users, Camera, Star
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const CategoryBar = ({ label, score }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-center text-xs font-semibold text-[#6B8A7A]">
      <span>{label}</span>
      <span className={score >= 70 ? 'text-[#4CAF7D]' : score >= 40 ? 'text-[#E09B3D]' : 'text-[#E05C5C]'}>{score}%</span>
    </div>
    <div className="h-2 w-full bg-[#F0EBE0] rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${score}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full rounded-full ${score >= 70 ? 'bg-[#4CAF7D]' : score >= 40 ? 'bg-[#E09B3D]' : 'bg-[#E05C5C]'}`}
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

      <div className="px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Input */}
          <div className="lg:col-span-5">
            <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl border border-[#E8E0D0] shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-semibold text-[#1A2E25]">Profile Details</h3>
                <button
                  onClick={() => setShowGuide(!showGuide)}
                  className="text-xs font-semibold text-[#C9A84C] hover:text-[#B8943D] transition-colors"
                >
                  {showGuide ? 'Hide Guide' : 'How to fill this?'}
                </button>
              </div>

              {/* Info Box */}
              <div className="bg-[#F0F5F3] border border-[#C4D8D0] rounded-xl p-3 flex items-start gap-2.5 mb-5">
                <Info size={14} className="text-[#2D4A3E] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-[#3D5A4F]">💡 Open LinkedIn → Copy each section → Paste here. Takes 2 mins!</p>
              </div>

              <form onSubmit={handleAnalyze} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">1. Your Headline</label>
                  <div className="relative">
                    <input type="text" name="headline" placeholder="CSE Student | React Developer | Open to Work" className="input-field pr-9" required value={formData.headline} onChange={handleInputChange} />
                    <AlignLeft size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9AB5A8]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">2. About Section</label>
                  <textarea name="about" placeholder="Paste your LinkedIn About section..." className="input-field min-h-[100px] resize-none py-3" required value={formData.about} onChange={handleInputChange} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">3. Top Skills</label>
                    <div className="relative">
                      <input type="text" name="skills" placeholder="React, Node.js, Python..." className="input-field pr-9" required value={formData.skills} onChange={handleInputChange} />
                      <Award size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9AB5A8]" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">4. Recent Job</label>
                    <div className="relative">
                      <input type="text" name="recentJob" placeholder="Frontend Intern at..." className="input-field pr-9" value={formData.recentJob} onChange={handleInputChange} />
                      <Search size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9AB5A8]" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">Connections</label>
                  <div className="relative">
                    <select name="connections" className="input-field appearance-none pr-9" value={formData.connections} onChange={handleInputChange}>
                      <option value="Under 100">Under 100</option>
                      <option value="100-500">100-500</option>
                      <option value="500+">500+</option>
                    </select>
                    <Users size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9AB5A8] pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[{ name: 'hasPhoto', label: 'Profile Photo?', icon: Camera }, { name: 'hasFeatured', label: 'Featured Section?', icon: Star }].map(toggle => (
                    <label key={toggle.name} className="flex items-center justify-between p-3.5 bg-[#FAF7F2] border border-[#E8E0D0] rounded-xl cursor-pointer hover:border-[#C9A84C] transition-all">
                      <div className="flex items-center gap-2">
                        <toggle.icon size={14} className="text-[#9AB5A8]" />
                        <span className="text-xs font-semibold text-[#3D5A4F]">{toggle.label}</span>
                      </div>
                      <div className="relative inline-flex items-center">
                        <input type="checkbox" name={toggle.name} checked={formData[toggle.name]} onChange={handleInputChange} className="sr-only peer" />
                        <div className="w-8 h-4 bg-[#E8E0D0] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#C9A84C]"></div>
                      </div>
                    </label>
                  ))}
                </div>

                <button type="submit" disabled={isLoading}
                  className="w-full bg-[#C9A84C] text-white font-semibold py-3 rounded-lg shadow-[0_4px_12px_rgba(201,168,76,0.25)] hover:bg-[#B8943D] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isLoading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Analyzing Profile...</span></> : 'Analyze My Profile 🔍'}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Results */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!results && !isLoading && (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full min-h-[400px] bg-white border-2 border-dashed border-[#E8E0D0] rounded-2xl flex flex-col items-center justify-center text-center p-12 hover:border-[#C9A84C] transition-colors"
                >
                  <div className="w-16 h-16 bg-[#FDF3DC] rounded-2xl flex items-center justify-center mb-5">
                    <BarChart3 size={30} className="text-[#C9A84C]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1A2E25] mb-2">Analyze Your Profile</h3>
                  <p className="text-[#9AB5A8] text-sm max-w-xs">Fill in your profile details to see how you rank and get actionable improvement tips.</p>
                </motion.div>
              )}

              {isLoading && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full min-h-[400px] bg-white rounded-2xl border border-[#E8E0D0] flex flex-col items-center justify-center text-center p-12"
                >
                  <div className="w-14 h-14 border-4 border-[#C9A84C]/20 border-t-[#C9A84C] rounded-full animate-spin mb-5" />
                  <h3 className="text-lg font-bold text-[#1A2E25] mb-1">AI is analyzing...</h3>
                  <p className="text-xs text-[#9AB5A8] animate-pulse uppercase tracking-widest">Running 50+ recruiter signal checks</p>
                </motion.div>
              )}

              {results && (
                <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                  {/* Score Ring */}
                  <div className="bg-white rounded-2xl border border-[#E8E0D0] shadow-sm p-6">
                    <div className="flex flex-col items-center mb-6">
                      <div className="relative w-36 h-36 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                          <circle cx="72" cy="72" r="64" fill="none" className="stroke-[#E8E0D0]" strokeWidth="10" />
                          <motion.circle
                            cx="72" cy="72" r="64" fill="none" stroke="currentColor" strokeWidth="10"
                            className={results.overallScore >= 75 ? 'text-[#4CAF7D]' : results.overallScore >= 50 ? 'text-[#E09B3D]' : 'text-[#E05C5C]'}
                            strokeDasharray="402"
                            initial={{ strokeDashoffset: 402 }}
                            animate={{ strokeDashoffset: 402 * (1 - results.overallScore / 100) }}
                            transition={{ duration: 2, ease: "easeOut" }} strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                          <span className="text-4xl font-mono font-bold text-[#1A2E25] leading-none">{results.overallScore}</span>
                          <span className="text-xs text-[#9AB5A8] uppercase tracking-widest mt-1">Score</span>
                        </div>
                      </div>
                      <span className={`mt-3 font-bold text-sm ${results.overallScore >= 75 ? 'text-[#4CAF7D]' : results.overallScore >= 50 ? 'text-[#E09B3D]' : 'text-[#E05C5C]'}`}>
                        {results.overallScore >= 75 ? 'Excellent Profile' : results.overallScore >= 50 ? 'Good Potential' : 'Needs Optimization'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <CategoryBar label="Headline" score={results.categories.headlineStrength} />
                      <CategoryBar label="About Section" score={results.categories.aboutSection} />
                      <CategoryBar label="Skills Match" score={results.categories.skillsRelevance} />
                      <CategoryBar label="Visibility" score={results.categories.recruiterVisibility} />
                      <CategoryBar label="Completeness" score={results.categories.profileCompleteness} />
                      <CategoryBar label="Engagement" score={results.categories.engagementPotential} />
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-white rounded-2xl border border-[#E8E0D0] shadow-sm p-6">
                    <h3 className="font-semibold text-[#1A2E25] mb-4 flex items-center gap-2">
                      <Zap size={16} className="text-[#C9A84C]" /> Actionable Tips
                    </h3>
                    <div className="space-y-3">
                      {results.recommendations.map((rec, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                          className={`p-4 rounded-xl border-l-4 ${rec.impact === 'High' ? 'border-[#E05C5C] bg-[#FDEFEF]' : 'border-[#C9A84C] bg-[#FDF3DC]'}`}
                        >
                          <p className="text-sm text-[#3D5A4F] mb-1">{rec.tip}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-[#9AB5A8]">{rec.category}</span>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${rec.impact === 'High' ? 'bg-[#FDEFEF] text-[#E05C5C] border border-[#F5BABA]' : 'bg-[#FEF6E7] text-[#E09B3D] border border-[#F5D89A]'}`}>{rec.impact} Impact</span>
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
    </div>
  );
};

export default LinkedInAnalyzer;
