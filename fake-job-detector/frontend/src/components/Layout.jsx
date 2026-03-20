import React from 'react';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Search, 
  Bookmark, 
  History, 
  Settings,
  Bell,
  Search as SearchIcon
} from 'lucide-react';

const Layout = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen flex bg-workspace font-sans text-navy">
      {/* Sidebar */}
      <aside className="w-64 glass-sidebar flex-shrink-0 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3 border-b border-navy-light/30">
          <div className="bg-emerald p-1.5 rounded-lg text-white">
            <ShieldCheck size={26} strokeWidth={2.5} />
          </div>
          <span className="font-extrabold tracking-tight text-xl text-white">JobVerify</span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'dashboard' ? 'bg-emerald text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-navy-light/50'}`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('analyze')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'analyze' ? 'bg-emerald text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-navy-light/50'}`}
          >
            <Search size={20} />
            Scanner
          </button>
          <button 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-slate-400 hover:text-white hover:bg-navy-light/50`}
          >
            <Bookmark size={20} />
            Saved Jobs
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'history' ? 'bg-emerald text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-navy-light/50'}`}
          >
            <History size={20} />
            History
          </button>
          <button 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-slate-400 hover:text-white hover:bg-navy-light/50`}
          >
            <Settings size={20} />
            Settings
          </button>
        </nav>

        <div className="p-4 border-t border-navy-light/30">
          <div className="bg-navy-light/30 rounded-xl p-4 text-center">
            <p className="text-emerald-light font-bold text-sm mb-1">PRO Plan</p>
            <p className="text-slate-400 text-xs">12/100 scans used</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 lg:h-20 bg-workspace sticky top-0 z-40 px-6 lg:px-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-navy hidden sm:block">
              {activeTab === 'dashboard' ? 'Dashboard' : activeTab === 'analyze' ? 'Scanner' : 'History'}
            </h1>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <button className="text-slate-400 hover:text-navy transition-colors bg-white p-2.5 rounded-full shadow-sm">
              <SearchIcon size={20} />
            </button>
            <button className="text-slate-400 hover:text-navy transition-colors bg-white p-2.5 rounded-full shadow-sm relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-coral rounded-full border border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-emerald flex items-center justify-center text-white font-bold shadow-sm group-hover:ring-2 ring-emerald/30 transition-all">
                AR
              </div>
              <div className="hidden sm:block text-sm">
                <p className="font-bold text-navy leading-none">Alex R.</p>
                <p className="text-slate-400 mt-1">Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Workspace Content */}
        <main className="flex-1 overflow-y-auto w-full p-4 sm:p-6 lg:p-10 relative">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
