import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2A454E] text-white text-center text-xs py-3 mt-auto">
      <p>GESTÃO CORPORATIVA {currentYear}®</p>
    </footer>
  );
}

export default Footer;
