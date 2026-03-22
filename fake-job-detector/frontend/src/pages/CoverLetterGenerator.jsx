import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  FileEdit, Sparkles, Send, Copy, Download, 
  RefreshCw, CheckCircle2, ChevronRight, Briefcase, 
  Building2, AlignLeft, GraduationCap, MessageSquare
} from 'lucide-react';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
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
      toast.success('Cover letter generated!');
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
    const file = new Blob([generatedLetter], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `CoverLetter_${formData.company || 'Job'}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="animate-fade-in text-[#f2f2f5]">
      {/* HEADER SECTION */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-[10px] font-bold text-[#55555f] uppercase tracking-widest mb-4">
           Dashboard <ChevronRight size={10} /> Cover Letter
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div>
              <h1 className="text-3xl font-['Cabinet_Grotesk'] font-bold text-white tracking-tight flex items-center gap-3">
                Cover Letter Generator <Sparkles size={24} className="text-[#6366f1]" />
              </h1>
              <p className="text-[#8b8b99] font-medium mt-1">AI writes personalized cover letters in 3 seconds</p>
           </div>
           <div className="bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-full px-4 py-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] animate-pulse" />
              <span className="text-[10px] font-bold text-[#a5b4fc] uppercase tracking-widest">Premium Feature — Free</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
        {/* LEFT — INPUT CARD */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#131316] border border-white/5 rounded-[2rem] p-8 shadow-xl"
        >
          <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
             Job Details <Briefcase size={18} className="text-[#6366f1]" />
          </h3>
          
          <form onSubmit={handleGenerate} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#8b8b99] uppercase tracking-widest pl-1">Job Title</label>
                  <div className="relative">
                    <input 
                      type="text" name="jobTitle" placeholder="Software Engineer" 
                      className="input-field pr-10" required
                      value={formData.jobTitle} onChange={handleInputChange}
                    />
                    <Send size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#55555f]" />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#8b8b99] uppercase tracking-widest pl-1">Company Name</label>
                  <div className="relative">
                    <input 
                      type="text" name="company" placeholder="Google / Tata / Remote" 
                      className="input-field pr-10" required
                      value={formData.company} onChange={handleInputChange}
                    />
                    <Building2 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#55555f]" />
                  </div>
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-bold text-[#8b8b99] uppercase tracking-widest pl-1">Job Description</label>
               <textarea 
                  name="jobDescription" placeholder="Paste the job description here to help AI personalize your letter..." 
                  className="input-field min-h-[160px] resize-none py-4" required
                  value={formData.jobDescription} onChange={handleInputChange}
               />
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-bold text-[#8b8b99] uppercase tracking-widest pl-1">Your Key Skills</label>
               <input 
                  type="text" name="skills" placeholder="React, Node.js, Python, Leadership..." 
                  className="input-field" required
                  value={formData.skills} onChange={handleInputChange}
               />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#8b8b99] uppercase tracking-widest pl-1">Experience Level</label>
                  <select 
                    name="experience" className="input-field appearance-none" 
                    value={formData.experience} onChange={handleInputChange}
                  >
                    <option value="Fresher">Fresher</option>
                    <option value="1-2 years">1-2 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#8b8b99] uppercase tracking-widest pl-1">Letter Tone</label>
                  <select 
                    name="tone" className="input-field appearance-none" 
                    value={formData.tone} onChange={handleInputChange}
                  >
                    <option value="Professional">Professional</option>
                    <option value="Confident">Confident</option>
                    <option value="Enthusiastic">Enthusiastic</option>
                    <option value="Concise">Concise</option>
                  </select>
               </div>
            </div>

            <button 
              type="submit" disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-bold py-4 rounded-xl shadow-xl transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>✨ Generate Cover Letter</>
              )}
            </button>
          </form>
        </motion.div>

        {/* RIGHT — OUTPUT CARD */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#131316] border border-white/5 rounded-[2rem] p-8 shadow-xl flex flex-col"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
               Your Cover Letter <MessageSquare size={18} className="text-[#6366f1]" />
            </h3>
            {generatedLetter && (
              <div className="flex items-center gap-2">
                <button onClick={copyToClipboard} className="p-2 text-[#8b8b99] hover:text-white transition-colors" title="Copy"><Copy size={18} /></button>
                <button onClick={downloadTxt} className="p-2 text-[#8b8b99] hover:text-white transition-colors" title="Download"><Download size={18} /></button>
              </div>
            )}
          </div>

          <div className="flex-1 min-h-[400px] bg-[#1a1a1f] border border-white/5 rounded-2xl p-6 relative group">
             {!generatedLetter && !isLoading && (
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-dashed border-white/10 text-[#55555f] mb-4">
                     <FileEdit size={32} />
                  </div>
                  <p className="text-[#8b8b99] font-medium">Your cover letter will appear here after generation.</p>
                  <p className="text-[10px] font-bold text-[#55555f] uppercase tracking-widest mt-2">Fill in the details on the left</p>
               </div>
             )}
             
             {isLoading && (
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-[#1a1a1f]/80 z-10 backdrop-blur-sm">
                  <div className="w-12 h-12 border-4 border-[#6366f1]/20 border-t-[#6366f1] rounded-full animate-spin mb-4" />
                  <p className="text-[#f2f2f5] font-bold">AI is writing your letter...</p>
                  <p className="text-[10px] font-bold text-[#8b8b99] uppercase tracking-widest mt-2 animate-pulse">Personalizing for {formData.company}</p>
               </div>
             )}

             {generatedLetter && (
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                 className="h-full whitespace-pre-wrap font-['Inter'] text-[#f2f2f5] leading-relaxed text-sm overflow-y-auto pr-2 custom-scrollbar"
               >
                 {generatedLetter}
               </motion.div>
             )}
          </div>

          {generatedLetter && (
            <div className="mt-6 flex items-center justify-between">
               <p className="text-[10px] font-bold text-[#55555f] uppercase tracking-widest">
                  ~ {generatedLetter.split(' ').length} words
               </p>
               <button 
                onClick={handleGenerate}
                className="text-xs font-bold text-[#8b8b99] hover:text-[#6366f1] transition-colors flex items-center gap-1.5"
               >
                  <RefreshCw size={14} /> Regenerate
               </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CoverLetterGenerator;
