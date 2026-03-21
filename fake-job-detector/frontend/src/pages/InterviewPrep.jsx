import React, { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrainCircuit, Loader2, ChevronDown, ChevronUp, Lightbulb, 
  MessageSquare, Code2, Sparkles, Zap, Target, ArrowRight, Info
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const EXPERIENCE_LEVELS = [
  'Fresher (0-1 yr)', 
  'Junior (1-3 yrs)', 
  'Mid-level (3-6 yrs)', 
  'Senior (6-10 yrs)', 
  'Lead/Principal (10+ yrs)'
];

function QuestionCard({ q, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`glass-card overflow-hidden border transition-all duration-300 ${open ? 'border-violet-500/30 bg-white/5 shadow-2xl shadow-violet-500/5' : 'border-white/5 bg-white/[0.02] hover:bg-white/5'}`}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-5 text-left gap-4"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-xs transition-colors ${open ? 'bg-violet-600 text-white' : 'bg-white/5 text-slate-500'}`}>
            {index + 1}
          </div>
          <span className={`font-bold transition-colors ${open ? 'text-white' : 'text-slate-300'}`}>{q.question}</span>
        </div>
        <div className={`p-2 rounded-lg bg-white/5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
           <ChevronDown size={18} className="text-slate-500" />
        </div>
      </button>
      
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/5"
          >
            <div className="p-6 bg-gradient-to-br from-violet-600/5 to-transparent">
              <div className="flex items-start gap-4">
                <div className="mt-1 w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 flex-shrink-0">
                    <Lightbulb size={16} />
                </div>
                <div className="space-y-3">
                    <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Expert Approach</p>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">{q.hint}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function InterviewPrep() {
  const [role, setRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState(EXPERIENCE_LEVELS[2]);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('technical');

  const handleGenerate = async () => {
    if (!role.trim()) return toast.error('Please enter the job role');
    setIsLoading(true);
    setResult(null);
    try {
      const res = await axios.post(`${API_URL}/tools/interview-prep`, { role, experienceLevel });
      setResult(res.data);
      toast.success('Interview guide ready!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to generate guide.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout pageTitle="Interview AI">
      <div className="space-y-8 pb-12 animate-fade-in text-white">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-violet-600/10 flex items-center justify-center text-violet-400 border border-violet-500/20 shadow-lg shadow-violet-500/5">
              <BrainCircuit size={30} />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight">Interview <span className="gradient-text">Co-Pilot</span></h2>
              <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">AI-Generated Placement Strategy</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="glass-card px-4 py-2 border-white/5 flex items-center gap-2 bg-white/5">
                <Sparkles size={16} className="text-violet-400" />
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Deep Learning Enabled</span>
             </div>
          </div>
        </div>

        {/* Input Card */}
        <div className="glass-card p-8 border-white/5 bg-white/5 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 blur-[60px] rounded-full pointer-events-none" />
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Target Position</label>
                <div className="relative group">
                  <input
                    className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-violet-500/50 transition-all text-sm font-bold text-white placeholder:text-slate-600 group-hover:border-white/20"
                    placeholder="e.g. Senior Frontend Developer"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleGenerate()}
                  />
                  <Zap size={18} className="absolute right-5 top-4 text-slate-600 group-hover:text-violet-400 transition-colors" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Your Seniority</label>
                <div className="relative">
                  <select
                    className="w-full px-5 py-4 rounded-2xl bg-[#0a0a14] border border-white/10 focus:outline-none focus:border-violet-500/50 transition-all text-sm font-bold text-white appearance-none cursor-pointer"
                    value={experienceLevel}
                    onChange={e => setExperienceLevel(e.target.value)}
                  >
                    {EXPERIENCE_LEVELS.map(l => <option key={l} className="bg-[#0f0f1a] font-bold text-slate-400">{l}</option>)}
                  </select>
                  <ChevronDown size={18} className="absolute right-5 top-4 text-slate-600 pointer-events-none" />
                </div>
              </div>
           </div>

           <button
             onClick={handleGenerate}
             disabled={isLoading}
             className="btn-primary w-full py-4 text-lg font-black group overflow-hidden relative"
           >
             {isLoading ? (
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span className="animate-pulse">SYNTHESIZING GUIDE...</span>
                </div>
             ) : (
                <div className="flex items-center justify-center gap-3">
                    <BrainCircuit size={22} className="group-hover:scale-110 transition-transform" />
                    GENERATE INTERVIEW GUIDE
                </div>
             )}
           </button>
        </div>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
               key="loading"
               initial={{ opacity: 0, scale: 0.98 }} 
               animate={{ opacity: 1, scale: 1 }} 
               exit={{ opacity: 0, scale: 0.98 }}
               className="glass-card p-16 flex flex-col items-center justify-center text-center space-y-8 border-violet-500/20 min-h-[400px]"
            >
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
                <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
                <BrainCircuit className="absolute inset-0 m-auto text-violet-400 animate-pulse-glow" size={40} />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-white tracking-tight">AI at Work</h3>
                <p className="text-slate-500 font-medium max-w-sm mx-auto">Analyzing role-specific competencies and behavioral benchmarks for your seniority level.</p>
              </div>
            </motion.div>
          ) : result ? (
            <motion.div 
               key="results"
               initial={{ opacity: 0, y: 30 }} 
               animate={{ opacity: 1, y: 0 }} 
               className="space-y-8"
            >
              {/* Context Summary */}
              <div className="glass-card p-8 border border-white/5 bg-gradient-to-br from-violet-600/10 to-transparent relative group">
                <div className="absolute top-4 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <BrainCircuit size={60} />
                </div>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-violet-600/20 flex items-center justify-center text-violet-400">
                        <Target size={18} />
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Placement Intelligence</span>
                </div>
                <p className="text-lg font-bold text-white leading-relaxed italic pr-12">
                  "{result.roleContext}"
                </p>
              </div>

              {/* Tabs Container */}
              <div className="space-y-6">
                <div className="flex gap-3 bg-[#0a0a14] p-1.5 rounded-2xl w-fit border border-white/5">
                  {[
                    { key: 'technical', label: 'Technical', icon: Code2, color: 'text-blue-400' },
                    { key: 'behavioral', label: 'Behavioral', icon: MessageSquare, color: 'text-emerald-400' },
                    { key: 'tips', label: 'Expert Tips', icon: Lightbulb, color: 'text-amber-400' },
                  ].map(t => {
                    const Icon = t.icon;
                    const isActive = activeTab === t.key;
                    return (
                      <button
                        key={t.key}
                        onClick={() => setActiveTab(t.key)}
                        className={`flex items-center gap-3 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                          isActive 
                            ? 'bg-violet-600 text-white shadow-xl shadow-violet-500/20' 
                            : 'text-slate-500 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon size={16} className={isActive ? 'text-white' : t.color} />
                        {t.label}
                      </button>
                    );
                  })}
                </div>

                <div className="animate-fade-in min-h-[300px]">
                  {activeTab === 'technical' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4 px-2">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{result.technicalQuestions?.length || 0} CORE COMPETENCIES</span>
                        <Info size={14} className="text-slate-700" />
                      </div>
                      {(result.technicalQuestions || []).map((q, i) => <QuestionCard key={i} q={q} index={i} />)}
                    </div>
                  )}

                  {activeTab === 'behavioral' && (
                    <div className="space-y-4">
                       <div className="flex items-center justify-between mb-4 px-2">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{result.behavioralQuestions?.length || 0} LEADERSHIP SCENARIOS</span>
                        <Info size={14} className="text-slate-700" />
                      </div>
                      {(result.behavioralQuestions || []).map((q, i) => <QuestionCard key={i} q={q} index={i} />)}
                    </div>
                  )}

                  {activeTab === 'tips' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(result.generalTips || []).map((tip, i) => (
                        <motion.div 
                           initial={{ opacity: 0, scale: 0.95 }}
                           animate={{ opacity: 1, scale: 1 }}
                           transition={{ delay: i * 0.1 }}
                           key={i} 
                           className="glass-card p-6 bg-white/[0.02] border border-white/5 hover:bg-white/5 group transition-colors flex items-start gap-4"
                        >
                          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform shrink-0">
                            <Lightbulb size={20} strokeWidth={2.5} />
                          </div>
                          <div className="space-y-2">
                             <span className="text-[10px] font-black text-amber-500/80 uppercase tracking-widest">AI INSIGHT #{i+1}</span>
                             <p className="text-sm font-bold text-slate-300 leading-relaxed group-hover:text-white transition-colors">{tip}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </Layout>
  );
}

export default InterviewPrep;
