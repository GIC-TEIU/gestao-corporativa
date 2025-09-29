import React from 'react';
import HeaderHome from '../ui/HeaderHome';
import Footer from '../ui/Footer';
import PageHeader from '../ui/PageHeader';

function DashboardLayout({ children, title, subtitle }) {
  return (
    <div className="flex flex-col min-h-screen bg-white font-poppins">
      <HeaderHome />
      <main className="text-center w-full max-w-7xl mx-auto p-4 md:p-8">
        <PageHeader 
          title={title} 
          subtitle={subtitle} 
          showBackButton={false}  
        />
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default DashboardLayout;
