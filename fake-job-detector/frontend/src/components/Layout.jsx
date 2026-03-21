import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Menu, X } from 'lucide-react';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0c0f]">
      {/* Navbar */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0c0c0f]/80 backdrop-blur-xl border-b border-white/5 py-3' 
            : 'bg-transparent border-b border-white/[0.02] py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="text-[#6366f1] transition-transform group-hover:scale-110">
              <Shield size={28} fill="currentColor" fillOpacity={0.15} />
            </div>
            <span className="font-['Cabinet_Grotesk'] font-bold text-xl tracking-tight text-white">JobVerify</span>
          </Link>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-[#8b8b99] hover:text-white transition-colors">Features</a>
            <Link to="/detect" className="text-sm font-medium text-[#8b8b99] hover:text-white transition-colors">Tools</Link>
            <Link to="/pricing" className="text-sm font-medium text-[#8b8b99] hover:text-white transition-colors">Pricing</Link>
            <Link to="/dashboard" className="text-sm font-medium text-[#8b8b99] hover:text-white transition-colors">Dashboard</Link>
          </div>

          {/* Right: Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <button 
                onClick={handleLogout}
                className="text-sm font-medium text-[#8b8b99] hover:text-white transition-colors px-4 py-2"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                className="text-sm font-medium text-[#8b8b99] hover:text-white transition-colors px-4 py-2"
              >
                Login
              </Link>
            )}
            <Link 
              to="/signup" 
              className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white text-sm font-semibold py-2.5 px-6 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] active:scale-95"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white/70 hover:text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0c0c0f] border-b border-white/5 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-5">
                <a href="#features" className="text-sm font-medium text-[#8b8b99]" onClick={() => setMobileMenuOpen(false)}>Features</a>
                <Link to="/detect" className="text-sm font-medium text-[#8b8b99]" onClick={() => setMobileMenuOpen(false)}>Tools</Link>
                <Link to="/pricing" className="text-sm font-medium text-[#8b8b99]" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
                <Link to="/dashboard" className="text-sm font-medium text-[#8b8b99]" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                <div className="h-px bg-white/5 my-1" />
                <Link to="/login" className="text-sm font-medium text-[#8b8b99]" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                <Link to="/signup" className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white text-sm font-bold py-3.5 rounded-xl text-center" onClick={() => setMobileMenuOpen(false)}>
                  Get Started Free
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;
