import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrainCircuit, Loader2, ChevronDown, ChevronUp, Lightbulb, 
  MessageSquare, Code2, Sparkles, Zap, Target, ArrowRight, Info, ChevronLeft, ChevronRight, Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
      className={`bg-[#131316] rounded-2xl overflow-hidden border transition-all duration-300 ${open ? 'border-[#6366f1]/30 shadow-xl shadow-[#6366f1]/5' : 'border-white/5 hover:border-white/10 hover:bg-white/[0.04]'}`}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-6 text-left gap-4"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-['JetBrains_Mono'] font-bold text-[10px] transition-all ${open ? 'bg-[#6366f1] text-white shadow-lg' : 'bg-white/5 text-[#55555f]'}`}>
            {index + 1}
          </div>
          <span className={`font-bold transition-colors text-sm uppercase tracking-tight ${open ? 'text-white' : 'text-[#8b8b99]'}`}>{q.question}</span>
        </div>
        <div className={`p-1.5 rounded-lg bg-white/5 transition-transform duration-300 ${open ? 'rotate-180 text-[#6366f1]' : 'text-[#55555f]'}`}>
           <ChevronDown size={16} />
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
            <div className="p-8 bg-white/[0.02]">
              <div className="flex items-start gap-5">
                <div className="mt-1 w-10 h-10 rounded-xl bg-[#6366f1]/10 text-[#6366f1] flex items-center justify-center border border-[#6366f1]/20 flex-shrink-0 shadow-inner">
                    <Lightbulb size={20} fill="currentColor" fillOpacity={0.2} />
                </div>
                <div className="space-y-1.5">
                    <p className="text-[10px] font-bold text-[#6366f1] uppercase tracking-[0.2em]">Expert Strategy</p>
                    <p className="text-sm text-[#8b8b99] leading-relaxed font-medium italic pr-4">"{q.hint}"</p>
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
      toast.success('Interview guide ready! 🧠');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to generate guide.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in text-[#f2f2f5] pb-20">
           
           {/* Header Section */}
           <header className="mb-10">
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#55555f] uppercase tracking-widest mb-4">
                 Dashboard <ChevronRight size={10} /> Interview Co-Pilot
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#6366f1]/10 text-[#6366f1] flex items-center justify-center border border-[#6366f1]/20 shadow-xl shadow-[#6366f1]/5">
                    <BrainCircuit size={28} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-['Cabinet_Grotesk'] font-bold text-white tracking-tight">Interview Co-Pilot</h2>
                    <p className="text-[#8b8b99] font-medium mt-1">AI-Generated Placement Strategy • Seniority Focused</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 shadow-sm flex items-center gap-2">
                      <Sparkles size={16} className="text-[#6366f1]" fill="currentColor" fillOpacity={0.2} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#8b8b99]">Deep Learning Enabled</span>
                   </div>
                </div>
              </div>
           </header>

           {/* Input Card */}
           <div className="bg-[#131316] rounded-[2.5rem] p-10 border border-white/5 shadow-xl relative overflow-hidden mb-12">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#6366f1]/5 rounded-bl-full pointer-events-none" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 relative z-10">
                 <div className="space-y-2">
                   <label className="text-[10px] font-bold text-[#8b8b99] uppercase tracking-widest pl-1">Target Position</label>
                   <div className="relative group">
                     <input
                       className="input-field pl-12"
                       placeholder="e.g. Senior Frontend Developer"
                       value={role}
                       onChange={e => setRole(e.target.value)}
                       onKeyDown={e => e.key === 'Enter' && handleGenerate()}
                     />
                     <Zap size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#55555f] group-focus-within:text-[#6366f1] transition-colors" />
                   </div>
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-bold text-[#8b8b99] uppercase tracking-widest pl-1">Your Seniority</label>
                   <div className="relative group">
                     <select
                       className="input-field appearance-none cursor-pointer pr-10"
                       value={experienceLevel}
                       onChange={e => setExperienceLevel(e.target.value)}
                     >
                       {EXPERIENCE_LEVELS.map(l => <option key={l} className="bg-[#131316] font-medium">{l}</option>)}
                     </select>
                     <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-[#55555f] group-focus-within:text-[#6366f1] transition-colors pointer-events-none" />
                   </div>
                 </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-bold py-5 rounded-2xl shadow-xl transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] active:scale-95 disabled:opacity-50 text-xl relative z-10"
              >
                {isLoading ? (
                   <div className="flex items-center justify-center gap-4">
                       <Loader2 size={24} className="animate-spin text-white" />
                       <span className="animate-pulse italic">SYNTHESIZING STRATEGY...</span>
                   </div>
                ) : (
                   <div className="flex items-center justify-center gap-3">
                       <BrainCircuit size={24} />
                       GENERATE CO-PILOT GUIDE ✨
                   </div>
                )}
              </button>
           </div>

           {/* Results Section */}
           <AnimatePresence mode="wait">
             {isLoading ? (
               <motion.div 
                  key="loading"
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }}
                  className="bg-[#131316] rounded-[3rem] p-20 flex flex-col items-center justify-center text-center space-y-8 border border-white/5 shadow-xl min-h-[500px] relative overflow-hidden"
               >
                 <div className="absolute inset-0 bg-dot-grid opacity-10 animate-pulse" />
                 <div className="relative z-10 w-24 h-24">
                   <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
                   <div className="absolute inset-0 rounded-full border-4 border-[#6366f1] border-t-transparent animate-spin"></div>
                   <BrainCircuit className="absolute inset-0 m-auto text-[#6366f1] animate-pulse" size={40} />
                 </div>
                 <div className="relative z-10 space-y-4">
                   <h3 className="text-2xl font-['Cabinet_Grotesk'] font-bold text-white">Advanced AI Intelligence</h3>
                   <p className="text-[#8b8b99] font-medium max-w-sm mx-auto text-sm">Analyzing role-specific competencies and behavioral benchmarks for your profile.</p>
                 </div>
               </motion.div>
             ) : result ? (
               <motion.div 
                  key="results"
                  initial={{ opacity: 0, y: 30 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="space-y-10"
               >
                 {/* Context Summary */}
                 <div className="bg-[#131316] p-10 rounded-[2.5rem] border border-white/5 shadow-xl relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700 opacity-50" />
                    
                    <div className="flex items-center gap-3 mb-6 relative z-10">
                        <div className="w-9 h-9 rounded-xl bg-[#6366f1]/10 text-[#6366f1] flex items-center justify-center border border-[#6366f1]/20">
                            <Target size={18} />
                        </div>
                        <span className="text-[10px] font-bold text-[#8b8b99] uppercase tracking-[0.2em]">Recruiter Perspective</span>
                    </div>
                    <p className="text-xl font-medium text-[#f2f2f5] leading-relaxed italic relative z-10 pr-12">
                      "{result.roleContext}"
                    </p>
                 </div>

                 {/* Tabs Container */}
                 <div className="space-y-8">
                   <div className="flex gap-2 bg-white/5 p-1 rounded-2xl w-fit border border-white/5 shadow-inner">
                     {[
                       { key: 'technical', label: 'Technical', icon: Code2 },
                       { key: 'behavioral', label: 'Behavioral', icon: MessageSquare },
                       { key: 'tips', label: 'Expert Tips', icon: Lightbulb },
                     ].map(t => {
                       const Icon = t.icon;
                       const isActive = activeTab === t.key;
                       return (
                         <button
                           key={t.key}
                           onClick={() => setActiveTab(t.key)}
                           className={`flex items-center gap-2.5 px-8 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                             isActive 
                               ? 'bg-[#6366f1] text-white shadow-xl shadow-[#6366f1]/20' 
                               : 'text-[#8b8b99] hover:text-white border border-transparent hover:bg-white/5'
                           }`}
                         >
                           <Icon size={14} />
                           {t.label}
                         </button>
                       );
                     })}
                   </div>

                   <div className="animate-fade-in min-h-[400px]">
                     {activeTab === 'technical' && (
                       <div className="space-y-4">
                         <div className="flex items-center justify-between mb-4 pl-1">
                           <span className="text-[10px] font-bold text-[#55555f] uppercase tracking-widest">{result.technicalQuestions?.length || 0} Core Competencies Identified</span>
                         </div>
                         {(result.technicalQuestions || []).map((q, i) => <QuestionCard key={i} q={q} index={i} />)}
                       </div>
                     )}

                     {activeTab === 'behavioral' && (
                       <div className="space-y-4">
                          <div className="flex items-center justify-between mb-4 pl-1">
                           <span className="text-[10px] font-bold text-[#55555f] uppercase tracking-widest">{result.behavioralQuestions?.length || 0} Critical Scenarios</span>
                         </div>
                         {(result.behavioralQuestions || []).map((q, i) => <QuestionCard key={i} q={q} index={i} />)}
                       </div>
                     )}

                     {activeTab === 'tips' && (
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         {(result.generalTips || []).map((tip, i) => (
                           <motion.div 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              key={i} 
                              className="bg-[#131316] p-8 rounded-[2rem] border border-white/5 shadow-xl group hover:border-[#6366f1]/30 transition-all flex flex-col gap-6"
                           >
                              <div className="flex items-center justify-between">
                                 <div className="w-12 h-12 rounded-2xl bg-white/5 text-[#f59e0b] flex items-center justify-center group-hover:bg-[#6366f1] group-hover:text-white transition-all border border-white/5">
                                   <Lightbulb size={24} strokeWidth={2.5} fill="currentColor" fillOpacity={0.1} />
                                 </div>
                                 <span className="text-[10px] font-['JetBrains_Mono'] font-bold text-[#55555f] uppercase tracking-widest">Guide #{i+1}</span>
                              </div>
                              <p className="text-sm font-medium text-[#8b8b99] leading-relaxed group-hover:text-white transition-colors uppercase tracking-tight italic">"{tip}"</p>
                           </motion.div>
                         ))}
                       </div>
                     )}
                   </div>
                 </div>
               </motion.div>
             ) : (
               <motion.div 
                 key="empty"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="bg-[#131316] border-2 border-dashed border-white/5 rounded-[3rem] p-24 flex flex-col items-center justify-center text-center group"
               >
                  <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl border border-white/5 group-hover:rotate-6 transition-all duration-500">
                     <BrainCircuit size={44} className="text-[#55555f] group-hover:text-[#6366f1] transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Ready for Preparation</h3>
                  <p className="max-w-xs text-[#8b8b99] font-medium text-sm">Customize your role and seniority above to generate a professional roadmap.</p>
               </motion.div>
             )}
           </AnimatePresence>
    </div>
  );
}

export default InterviewPrep;
