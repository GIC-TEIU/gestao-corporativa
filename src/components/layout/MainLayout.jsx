import React from 'react';
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import PageHeader from '../ui/PageHeader';

function MainLayout({ children, title, subtitle, showBackButton }) {
  return (
    <div className="flex flex-col min-h-screen bg-white font-poppins">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto py-4 p-4 md:px-8">
        <PageHeader 
          title={title} 
          subtitle={subtitle} 
          showBackButton={showBackButton} 
        />
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;

