import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, MapPin } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-[85vh] flex items-center justify-center relative">
      {/* 3D or Interactive elements can be placed behind or integrated here */}
      <div className="max-w-4xl w-full flex flex-col items-center text-center z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-neon-blue/30"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-neon-blue opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-neon-blue"></span>
          </span>
          <span className="text-sm font-medium text-brand-neon-blue">Available for Opportunities</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight"
        >
          Hi, I'm <span className="text-gradient">Mrityunjay Singh</span>
        </motion.h1>

        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl md:text-3xl font-medium text-gray-300 mb-6"
        >
          Software Engineer · Full-Stack Developer
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center text-gray-400 mb-8"
        >
          <MapPin className="mr-2 h-5 w-5 text-brand-neon-purple" />
          <span>📍 Bhopal / Kanpur, India</span>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-gray-400 max-w-2xl mb-10 leading-relaxed"
        >
          Passionate about building scalable, production-ready web applications. 
          I specialize in problem-solving and crafting clean architecture to deliver 
          immersive, high-performance user experiences.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a 
            href="#projects" 
            className="px-8 py-3 rounded-md bg-gradient-to-r from-brand-neon-blue to-brand-neon-purple text-white font-semibold flex items-center justify-center hover:opacity-90 transition-opacity glow"
          >
            View Projects <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <a 
            href="/Mrityunjay_Singh_Resume.pdf"
            download="Mrityunjay_Singh_Resume.pdf"
            className="px-8 py-3 rounded-md glass hover:bg-white/10 transition-colors font-semibold flex items-center justify-center border border-white/20"
          >
            Download Resume <Download className="ml-2 h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
