import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Tech Stack', href: '#tech' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 transition-all duration-300 glass border-b-0 border-b-brand-glass-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold text-gradient tracking-tighter">MS.</a>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-brand-neon-purple transition-colors px-3 py-2 rounded-md text-sm font-medium"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-brand-blue" />}
              </button>
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="hover:text-brand-neon-purple block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => { setDarkMode(!darkMode); setIsOpen(false); }}
              className="flex items-center w-full text-left px-3 py-2 hover:bg-white/10 rounded-md"
            >
              {darkMode ? (
                <><Sun size={20} className="mr-2 text-yellow-400" /> Light Mode</>
              ) : (
                <><Moon size={20} className="mr-2" /> Dark Mode</>
              )}
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
