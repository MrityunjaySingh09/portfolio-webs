import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-brand-glass-border bg-[#0a0f1d]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex gap-6">
            <a href="#home" className="text-sm text-gray-400 hover:text-brand-neon-purple transition-colors">Home</a>
            <a href="#projects" className="text-sm text-gray-400 hover:text-brand-neon-purple transition-colors">Portfolio</a>
            <a href="#contact" className="text-sm text-gray-400 hover:text-brand-neon-purple transition-colors">Contact</a>
          </div>

          <div className="text-sm text-gray-500">
            © 2026 Mrityunjay Singh. Crafted with React & Tailwind
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
