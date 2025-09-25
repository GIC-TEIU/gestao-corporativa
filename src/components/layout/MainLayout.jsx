import React from 'react';
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import PageHeader from '../ui/PageHeader';

function MainLayout({ children, title, subtitle, showBackButton }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#DFE9ED]">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto p-8">
        <PageHeader 
          title={title} 
          subtitle={subtitle} 
          showBackButton={showBackButton} 
        />
        <div className="bg-white rounded-2xl shadow-sm p-6">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;