import React from 'react';
import HeaderHome from '../components/ui/HeaderHome';
import Footer from '../components/ui/Footer';
import PageHeader from '../components/ui/PageHeader';
import Header from '../components/ui/Header';

function HomeLayout({ children, title, subtitle }) {
  return (
    <div className="flex flex-col min-h-screen bg-white font-poppins">
      <Header showLinks={false} showNotifications={true}/>
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

export default HomeLayout;
