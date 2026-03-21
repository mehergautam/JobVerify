import React from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-[#0e0e11] font-['Inter']">
      <Sidebar />
      <main className="ml-60 flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
