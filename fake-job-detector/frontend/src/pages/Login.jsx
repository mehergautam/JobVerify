import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, Lock, Zap } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
      login(data.token, data);
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.error || 'Login failed. Please try again.';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl border border-[#E8E0D0] shadow-lg p-8">
          {/* Top */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#F0F5F3] rounded-2xl mb-4">
              <Shield size={32} className="text-[#2D4A3E]" fill="currentColor" fillOpacity={0.1} />
            </div>
            <h1 className="text-2xl font-bold text-[#1A2E25]">Welcome back</h1>
            <p className="text-[#6B8A7A] text-sm mt-1">Login to your JobVerify account</p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-[#FDEFEF] border border-[#F5BABA] text-[#C04040] rounded-xl p-3 text-sm mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">Email Address</label>
              <input
                type="email"
                placeholder="name@email.com"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-[#6B8A7A] uppercase tracking-widest">Password</label>
                <a href="#" className="text-xs font-semibold text-[#C9A84C] hover:text-[#B8943D] transition-colors">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="input-field pr-11"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9AB5A8] hover:text-[#6B8A7A] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#C9A84C] text-white font-semibold py-3 rounded-lg text-base shadow-[0_4px_12px_rgba(201,168,76,0.25)] hover:bg-[#B8943D] hover:-translate-y-px transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /><span>Signing in...</span></>
              ) : 'Sign In →'}
            </button>
          </form>

          {/* Bottom */}
          <p className="text-center text-sm text-[#9AB5A8] mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#C9A84C] font-semibold hover:text-[#B8943D] transition-colors">Create one free →</Link>
          </p>

          {/* Trust row */}
          <div className="mt-6 pt-5 border-t border-[#F0EBE0] flex justify-center gap-8">
            <span className="flex items-center gap-1.5 text-xs text-[#9AB5A8]"><Lock size={12} className="text-[#9AB5A8]" /> Secure</span>
            <span className="flex items-center gap-1.5 text-xs text-[#9AB5A8]"><Shield size={12} className="text-[#9AB5A8]" /> Safe</span>
            <span className="flex items-center gap-1.5 text-xs text-[#9AB5A8]"><Zap size={12} className="text-[#9AB5A8]" /> Fast</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
