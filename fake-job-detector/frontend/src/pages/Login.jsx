import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
      login(data.token, data);
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c0f] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Hero Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,_rgba(99,102,241,0.15),_transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-dot-grid opacity-10 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#131316] border border-white/10 rounded-[2.5rem] p-10 shadow-[0_24px_48px_rgba(0,0,0,0.4)] relative z-10">
          <div className="flex flex-col items-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[#6366f1]/10 flex items-center justify-center text-[#6366f1] mb-6 border border-[#6366f1]/20">
              <Shield size={32} fill="currentColor" fillOpacity={0.15} />
            </div>
            <h2 className="text-3xl font-['Cabinet_Grotesk'] font-extrabold text-[#f2f2f5] mb-2 text-center">Welcome back</h2>
            <p className="text-[#8b8b99] font-medium text-center">Login to your JobVerify account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#8b8b99] uppercase tracking-widest pl-1">Email Address</label>
              <input 
                type="email" 
                placeholder="name@email.com" 
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-[#8b8b99] uppercase tracking-widest">Password</label>
                <Link to="#" className="text-xs font-bold text-[#6366f1] hover:text-[#4f46e5] transition-colors">Forgot password?</Link>
              </div>
              <div className="relative group">
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••" 
                  className="input-field pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#55555f] hover:text-[#8b8b99] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-bold py-4 rounded-xl shadow-xl transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={20} /></>
              )}
            </button>

            <div className="relative py-2 text-center">
               <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
               <span className="relative bg-[#131316] px-4 text-[10px] font-bold text-[#55555f] uppercase tracking-widest">or</span>
            </div>

            <p className="text-center text-sm font-medium text-[#8b8b99]">
              Don't have an account? <Link to="/signup" className="text-[#6366f1] font-bold hover:underline ml-1">Sign up</Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
