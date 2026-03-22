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
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F0E8]">
      {/* Navbar */}
      <nav
        className={`sticky top-0 w-full z-50 transition-all duration-300 h-16 flex items-center ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-[0_1px_3px_rgba(45,74,62,0.06)]'
            : 'bg-white shadow-[0_1px_3px_rgba(45,74,62,0.06)]'
        } border-b border-[#E8E0D0]`}
      >
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Shield size={28} className="text-[#2D4A3E] group-hover:scale-110 transition-transform" fill="currentColor" fillOpacity={0.1} />
            <span className="font-bold text-xl text-[#1A2E25] tracking-tight">JobVerify</span>
          </Link>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-[#6B8A7A] hover:text-[#1A2E25] transition-colors">Features</a>
            <a href="#tools" className="text-sm font-medium text-[#6B8A7A] hover:text-[#1A2E25] transition-colors">Tools</a>
            <a href="#how-it-works" className="text-sm font-medium text-[#6B8A7A] hover:text-[#1A2E25] transition-colors">How It Works</a>
            <Link to="/dashboard" className="text-sm font-medium text-[#6B8A7A] hover:text-[#1A2E25] transition-colors">Dashboard</Link>
          </div>

          {/* Right Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <button onClick={handleLogout} className="btn-ghost text-sm">Logout</button>
            ) : (
              <Link to="/login" className="btn-ghost text-sm">Login</Link>
            )}
            <Link to="/signup" className="btn-primary">Get Started Free →</Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-[#2D4A3E] hover:text-[#1A2E25] p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-[#E8E0D0] shadow-md overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                <a href="#features" className="text-sm font-medium text-[#6B8A7A]" onClick={() => setMobileMenuOpen(false)}>Features</a>
                <a href="#tools" className="text-sm font-medium text-[#6B8A7A]" onClick={() => setMobileMenuOpen(false)}>Tools</a>
                <a href="#how-it-works" className="text-sm font-medium text-[#6B8A7A]" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
                <Link to="/dashboard" className="text-sm font-medium text-[#6B8A7A]" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                <div className="h-px bg-[#E8E0D0] my-1" />
                {user ? (
                  <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="text-sm font-semibold text-[#2D4A3E] text-left">Logout</button>
                ) : (
                  <Link to="/login" className="text-sm font-medium text-[#6B8A7A]" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                )}
                <Link to="/signup" className="btn-primary text-center" onClick={() => setMobileMenuOpen(false)}>
                  Get Started Free →
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
