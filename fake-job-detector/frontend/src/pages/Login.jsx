import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Lock, ArrowRight, Chrome } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0f0f1a]">
      {/* Left Side: Illustration & Branding */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-violet-900/40 via-[#13132b] to-[#0f0f1a] p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-600/10 blur-[120px] rounded-full animate-pulse-glow" />
        
        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div className="bg-violet-600 p-1.5 rounded-lg text-white">
            <ShieldCheck size={24} strokeWidth={2.5} />
          </div>
          <span className="font-black text-2xl tracking-tight text-white font-sans">JobVerify</span>
        </Link>

        <div className="relative z-10">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"
          >
            Your path to a <br />
            <span className="gradient-text">Secure Career</span> <br />
            starts here.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-lg max-w-md"
          >
            Protect yourself from fraudulent postings and optimize your job search with our AI-powered toolkit.
          </motion.p>
        </div>

        <div className="relative z-10 text-slate-500 text-sm font-medium">
          © 2026 JobVerify AI. Secure by design.
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
        <div className="w-full max-w-md">
          <div className="md:hidden flex justify-center mb-8">
            <div className="bg-violet-600 p-2 rounded-xl text-white">
              <ShieldCheck size={32} strokeWidth={2.5} />
            </div>
          </div>

          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-black text-white mb-2">Welcome Back</h1>
            <p className="text-slate-500">Log in to your JobVerify account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="float-label-group">
              <input 
                type="email" 
                id="email"
                placeholder=" "
                required
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email Address</label>
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
            </div>

            <div className="float-label-group">
              <input 
                type="password" 
                id="password"
                placeholder=" "
                required
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300">
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 accent-violet-600" />
                Remember me
              </label>
              <a href="#" className="text-violet-400 font-semibold hover:text-violet-300 transition-colors">Forgot password?</a>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="btn-primary w-full py-4 text-lg font-bold group"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0f0f1a] px-3 text-slate-500 font-bold tracking-widest">Or continue with</span>
              </div>
            </div>

            <button 
              type="button"
              className="btn-secondary w-full py-3.5 flex items-center justify-center gap-3 font-bold group"
            >
              <Chrome className="text-white group-hover:scale-110 transition-transform" size={20} />
              Google
            </button>
          </form>

          <p className="mt-10 text-center text-slate-500 font-medium">
            New to JobVerify? <Link to="/signup" className="text-violet-400 font-bold hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
