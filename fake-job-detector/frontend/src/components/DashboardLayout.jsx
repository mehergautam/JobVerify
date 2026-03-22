import React from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-[#F5F0E8] font-sans">
      <Sidebar />
      <main className="ml-64 flex-1 min-h-screen overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
