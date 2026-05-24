import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { Mail } from 'lucide-react';

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

          <div className="flex gap-4">
            <a href="mailto:Mrityunjaysingh899@gmail.com" className="text-gray-400 hover:text-brand-neon-purple transition-colors" aria-label="Email">
              <Mail size={18} />
            </a>
            <a href="https://www.linkedin.com/in/mrityunjay-singh-51a2b627a/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors" aria-label="LinkedIn">
              <FaLinkedin size={18} />
            </a>
            <a href="https://github.com/MrityunjaySingh09" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
              <FaGithub size={18} />
            </a>
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
