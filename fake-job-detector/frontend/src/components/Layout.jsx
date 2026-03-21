import React, { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  LayoutDashboard,
  Search,
  History,
  FileText,
  BrainCircuit,
  ScrollText,
  DollarSign,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronRight,
  User,
  Settings,
  HelpCircle
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Fake Job Detector', path: '/detect', icon: ShieldCheck },
  { label: 'Resume Analyzer', path: '/resume', icon: FileText },
  { label: 'Interview Prep', path: '/interview', icon: BrainCircuit },
  { label: 'Offer Verifier', path: '/offer', icon: ScrollText },
  { label: 'Salary Checker', path: '/salary', icon: DollarSign },
  { label: 'History', path: '/history', icon: History },
];

const NavItem = ({ item, onClick }) => {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) =>
        `group w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 text-sm ${
          isActive
            ? 'nav-active'
            : 'text-slate-400 hover:text-white hover:bg-white/5'
        }`
      }
    >
      <Icon size={18} className="group-hover:scale-110 transition-transform" />
      <span>{item.label}</span>
      {({ isActive }) => isActive && (
        <motion.div layoutId="nav-tick" className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#fff]" />
      )}
    </NavLink>
  );
};

const Layout = ({ children, pageTitle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userInitials = user?.email?.slice(0, 2).toUpperCase() || 'U';

  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  const sidebarContent = (
    <>
      <div className="p-6 mb-2">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="bg-violet-600 p-1.5 rounded-lg text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]">
            <ShieldCheck size={22} strokeWidth={2.5} />
          </div>
          <span className="font-black tracking-tight text-xl text-white">JobVerify</span>
        </Link>
      </div>

      <nav className="flex-1 py-4 px-4 space-y-1.5 overflow-y-auto">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-4 mb-4">Main Menu</p>
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.path} item={item} onClick={() => setSidebarOpen(false)} />
        ))}
        
        <div className="pt-8">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-4 mb-4">Support</p>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all">
            <Settings size={18} />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all">
            <HelpCircle size={18} />
            <span>Help Center</span>
          </button>
        </div>
      </nav>

      <div className="p-4 border-t border-white/5 mt-auto">
        <div className="bg-white/5 rounded-2xl p-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center text-white font-black text-sm shadow-lg overflow-hidden relative group">
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              {userInitials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm truncate">{user?.email?.split('@')[0] || 'User'}</p>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Pro Plan</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-red-400 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 transition-all"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-[#0f0f1a] font-sans text-slate-200 selection:bg-violet-500/30">
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="glass-sidebar w-72 flex-shrink-0 hidden md:flex flex-col sticky top-0 h-screen z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <motion.aside
        initial="closed"
        animate={sidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="glass-sidebar w-72 flex-col fixed top-0 left-0 h-screen z-50 flex md:hidden"
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-5 right-5 text-slate-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        {sidebarContent}
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-hidden relative">
        {/* Subtle Background Glows */}
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-teal-600/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Header */}
        <header className="h-20 bg-[#0f0f1a]/80 backdrop-blur-xl sticky top-0 z-30 px-6 lg:px-10 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-white p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/10"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <h1 className="text-xl font-black text-white tracking-tight">{pageTitle || 'Dashboard'}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 focus-within:border-violet-500/50 transition-all">
              <Search size={16} className="text-slate-500" />
              <input type="text" placeholder="Search tools..." className="bg-transparent border-none outline-none text-sm px-3 w-40 md:w-60 text-white placeholder-slate-600" />
            </div>
            
            <button className="relative text-slate-400 hover:text-white transition-all bg-white/5 p-2.5 rounded-full border border-white/10 hover:border-white/20 group">
              <Bell size={18} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-violet-500 rounded-full border-2 border-[#0f0f1a] group-hover:scale-125 transition-transform" />
            </button>
            
            <div className="h-8 w-px bg-white/5 hidden sm:block mx-1" />
            
            <div className="flex items-center gap-3 pl-1 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-black text-sm shadow-lg group-hover:scale-105 transition-all">
                {userInitials}
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto w-full custom-scrollbar">
          <div className="max-w-7xl mx-auto w-full p-6 lg:ml-0 lg:p-10 animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
