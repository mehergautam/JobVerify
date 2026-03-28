import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  Sparkles, Send, Copy, Download,
  RefreshCw, ChevronRight, Briefcase,
  Building2, MessageSquare, Wand2, ArrowRight, CheckCircle2, Info, FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const CoverLetterGenerator = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    jobDescription: '',
    skills: '',
    experience: 'Fresher',
    tone: 'Professional'
  });
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fillDemo = () => {
    setFormData({
      jobTitle: 'Senior React Developer',
      company: 'Innovate Solutions',
      jobDescription: 'Seeking a developer with 5+ years of experience in React, Node.js, and Cloud architectures...',
      skills: 'React, Redux, Node.js, AWS, TypeScript',
      experience: '5+ years',
      tone: 'Confident'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    setIsLoading(true);
    setGeneratedLetter('');
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post(
        `${API_URL}/tools/cover-letter/generate`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGeneratedLetter(data.coverLetter);
      toast.success('Cover letter generated! ✨');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Generation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    toast.success('Copied to clipboard!');
  };

  const downloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `CoverLetter_${formData.company || 'Job'}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-white border-b border-[#E8E0D0] px-8 py-6">
        <div className="flex items-center gap-1.5 text-sm text-[#9AB5A8] mb-2">
          <Link to="/dashboard" className="hover:text-[#6B8A7A] transition-colors">Dashboard</Link>
          <ChevronRight size={14} /><span className="text-[#3D5A4F] font-medium">Cover Letter</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="font-bold text-[#1A2E25] text-2xl flex items-center gap-2">
              <Sparkles size={22} className="text-[#C9A84C]" /> Cover Letter Generator
            </h1>
            <p className="text-[#6B8A7A] text-sm mt-1">AI writes personalized cover letters in 3 seconds</p>
          </div>
          <span className="badge-success self-start">FREE • Others charge ₹999/mo</span>
        </div>
      </div>

      <div className="px-8 py-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-6">
          {/* Input */}
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0D1813] rounded-[2rem] border border-[#2D4A3E] shadow-2xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1A2E25] rounded-bl-full border-l border-b border-[#3D5A4F] -z-0" />
            
            <div className="relative z-10">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-sm font-bold text-[#F5F0E8] uppercase tracking-widest flex items-center gap-2">
                     <Wand2 size={18} className="text-[#C9A84C]" /> Draft Parameters
                  </h3>
                  <button onClick={fillDemo} className="text-[10px] font-extrabold text-[#4CAF7D] uppercase tracking-widest hover:text-[#C9A84C] transition-colors">
                     Load Sample Context
                  </button>
               </div>

                 <form onSubmit={handleGenerate} className="space-y-6">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <label className="text-[10px] font-extrabold text-[#6B8A7A] uppercase tracking-[0.2em] ml-1">Desired Role</label>
                     <div className="relative group">
                       <input type="text" name="jobTitle" placeholder="e.g. UX Designer" className="input-field py-4 pr-10 pl-5 bg-[#1A2E25] border-[#3D5A4F] text-[#F5F0E8] focus:bg-[#0D1813] focus:border-[#C9A84C]" required value={formData.jobTitle} onChange={handleInputChange} />
                       <Briefcase size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B8A7A] group-focus-within:text-[#C9A84C] transition-colors" />
                     </div>
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-extrabold text-[#6B8A7A] uppercase tracking-[0.2em] ml-1">Target Company</label>
                     <div className="relative group">
                       <input type="text" name="company" placeholder="e.g. OpenAI" className="input-field py-4 pr-10 pl-5 bg-[#1A2E25] border-[#3D5A4F] text-[#F5F0E8] focus:bg-[#0D1813] focus:border-[#C9A84C]" required value={formData.company} onChange={handleInputChange} />
                       <Building2 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B8A7A] group-focus-within:text-[#C9A84C] transition-colors" />
                     </div>
                   </div>
                 </div>

                 <div className="space-y-2">
                   <label className="text-[10px] font-extrabold text-[#6B8A7A] uppercase tracking-[0.2em] ml-1">Job Description Core</label>
                   <textarea name="jobDescription" placeholder="Paste key requirements from the job posting..." className="input-field min-h-[140px] resize-none py-4 px-5 bg-[#1A2E25] border-[#3D5A4F] text-[#F5F0E8] focus:bg-[#0D1813] focus:border-[#C9A84C] text-sm" required value={formData.jobDescription} onChange={handleInputChange} />
                 </div>

                 <div className="space-y-2">
                   <label className="text-[10px] font-extrabold text-[#6B8A7A] uppercase tracking-[0.2em] ml-1">Your Competitive Skills</label>
                   <input type="text" name="skills" placeholder="List your top 3-5 technical skills..." className="input-field py-4 px-5 bg-[#1A2E25] border-[#3D5A4F] text-[#F5F0E8] focus:bg-[#0D1813] focus:border-[#C9A84C]" required value={formData.skills} onChange={handleInputChange} />
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <label className="text-[10px] font-extrabold text-[#6B8A7A] uppercase tracking-[0.2em] ml-1">Years Active</label>
                     <select name="experience" className="input-field py-4 px-5 bg-[#1A2E25] border-[#3D5A4F] text-[#F5F0E8] focus:border-[#C9A84C] appearance-none" value={formData.experience} onChange={handleInputChange}>
                       <option>Fresher</option>
                       <option value="1-2 years">1-2 years</option>
                       <option value="3-5 years">3-5 years</option>
                       <option value="5+ years">5+ years</option>
                     </select>
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-extrabold text-[#6B8A7A] uppercase tracking-[0.2em] ml-1">Persuasion Tone</label>
                     <select name="tone" className="input-field py-4 px-5 bg-[#1A2E25] border-[#3D5A4F] text-[#F5F0E8] focus:border-[#C9A84C] appearance-none" value={formData.tone} onChange={handleInputChange}>
                       <option>Professional</option>
                       <option>Confident</option>
                       <option>Enthusiastic</option>
                       <option>Concise</option>
                     </select>
                   </div>
                 </div>

                 <button type="submit" disabled={isLoading}
                   className="w-full bg-[#2D4A3E] text-white font-bold py-5 rounded-2xl shadow-xl hover:bg-[#1A2E25] hover:scale-[1.01] transition-all flex items-center justify-center gap-4 disabled:opacity-60"
                 >
                   {isLoading ? (
                     <><Loader2 size={20} className="animate-spin" /><span>Consulting Writing Paradigms...</span></>
                   ) : (
                     <><Sparkles size={20} className="text-[#C9A84C]" /><span>Generate High-Impact Draft</span></>
                   )}
                 </button>
               </form>
            </div>
          </motion.div>

          {/* Output */}
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0D1813] rounded-[2rem] border border-[#2D4A3E] shadow-2xl p-8 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#1A2E25] text-[#4CAF7D] flex items-center justify-center border border-[#3D5A4F] shadow-inner">
                     <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#F5F0E8] uppercase tracking-wide">Generated Draft</h3>
                    <p className="text-[10px] text-[#9AB5A8] font-bold uppercase tracking-widest mt-0.5">Optimized for {formData.company || 'Recruiter'}</p>
                  </div>
              </div>
              {generatedLetter && (
                <div className="flex items-center gap-2">
                  <button onClick={copyToClipboard} className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#1A2E25] border border-[#3D5A4F] text-[#9AB5A8] hover:text-[#C9A84C] hover:border-[#C9A84C] transition-all shadow-sm" title="Copy"><Copy size={16} /></button>
                  <button onClick={downloadTxt} className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#1A2E25] border border-[#3D5A4F] text-[#9AB5A8] hover:text-[#C9A84C] hover:border-[#C9A84C] transition-all shadow-sm" title="Download"><Download size={16} /></button>
                </div>
              )}
            </div>

            <div className="flex-1 min-h-[450px] bg-[#1A2E25] border border-[#3D5A4F] rounded-3xl p-8 relative overflow-hidden group shadow-inner">
              {!generatedLetter && !isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-[#0D1813] border-2 border-dashed border-[#2D4A3E] flex items-center justify-center text-[#C9A84C] mb-6 group-hover:scale-110 transition-transform shadow-inner">
                    <Sparkles size={36} />
                  </div>
                  <h4 className="text-lg font-bold text-[#F5F0E8] mb-2">Awaiting Analysis</h4>
                  <p className="text-[#9AB5A8] text-sm max-w-xs leading-relaxed">Fill in the job context to generate a high-impact, AI-personalized cover letter.</p>
                </div>
              )}

              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-[#1A2E25]/95 z-10 rounded-3xl backdrop-blur-sm">
                   <div className="relative mb-6">
                      <div className="w-16 h-16 border-4 border-[#C9A84C]/20 border-t-[#C9A84C] rounded-full animate-spin" />
                      <MessageSquare className="absolute inset-0 m-auto text-[#C9A84C]" size={24} />
                   </div>
                  <p className="text-[#F5F0E8] font-bold text-lg mb-1">Synthesizing Voice...</p>
                  <p className="text-sm text-[#C9A84C] animate-pulse">Infusing {formData.tone} nuances for {formData.company}</p>
                </div>
              )}

              {generatedLetter && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="h-full whitespace-pre-wrap text-[#9AB5A8] leading-7 text-sm overflow-y-auto pr-2 custom-scrollbar font-medium"
                >
                  {generatedLetter}
                  <div className="mt-12 pt-8 border-t border-[#3D5A4F] flex items-center justify-between opacity-60">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B8A7A]">AI SECURE GENERATION • {new Date().toLocaleDateString()}</p>
                     <CheckCircle2 size={16} className="text-[#4CAF7D]" />
                  </div>
                </motion.div>
              )}
            </div>

            {generatedLetter && (
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2">
                   {['Strong Hook', 'Skill Match', 'Company Value'].map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-[#1A2E25] text-[9px] font-black text-[#4CAF7D] uppercase tracking-tighter border border-[#3D5A4F] rounded-lg shadow-sm">
                         ✓ {tag}
                      </span>
                   ))}
                </div>
                <div className="flex items-center gap-6">
                   <div className="text-right">
                      <p className="text-[10px] font-extrabold text-[#9AB5A8] uppercase tracking-widest">Word Count</p>
                      <p className="text-xs font-bold text-[#F5F0E8]">{generatedLetter.split(/\s+/).filter(x => x).length} Words</p>
                   </div>
                   <button onClick={() => handleGenerate(null)} className="h-10 px-4 rounded-xl bg-[#1A2E25] border border-[#2D4A3E] text-[10px] font-extrabold text-[#9AB5A8] uppercase tracking-widest hover:text-[#C9A84C] hover:border-[#C9A84C] transition-all flex items-center gap-2 group/btn shadow-sm">
                     <RefreshCw size={12} className="group-hover/btn:rotate-180 transition-transform duration-500" /> Rewrite Draft
                   </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterGenerator;
