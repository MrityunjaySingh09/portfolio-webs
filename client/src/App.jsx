import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (!darkMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'text-white' : 'bg-gray-50 text-gray-900'}`}>
        {/* Background gradients */}
        {darkMode && (
          <>
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-neon-purple/20 blur-[120px]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-neon-blue/20 blur-[120px]" />
            </div>
          </>
        )}

        <Routes>
          <Route path="/" element={
            <>
              <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
              <main className="container mx-auto px-6 pt-24 pb-12">
                <Hero />
                <TechStack />
                <Projects />
                <Contact />
              </main>
              <Footer />
            </>
          } />
          
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
