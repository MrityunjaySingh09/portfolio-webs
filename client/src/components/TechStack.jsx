import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Layout, Server, FileJson, Terminal, Coffee, Layers } from 'lucide-react';

const TechStack = () => {
  const technologies = [
    { name: 'ReactJS', icon: <Layout size={32} />, color: 'text-[#61DAFB]' },
    { name: 'NodeJS', icon: <Server size={32} />, color: 'text-[#339933]' },
    { name: 'ExpressJS', icon: <Terminal size={32} />, color: 'text-gray-300' },
    { name: 'MongoDB', icon: <Database size={32} />, color: 'text-[#47A248]' },
    { name: 'Tailwind CSS', icon: <Layers size={32} />, color: 'text-[#06B6D4]' },
    { name: 'Python', icon: <Code2 size={32} />, color: 'text-[#3776AB]' },
    { name: 'Java', icon: <Coffee size={32} />, color: 'text-[#007396]' },
    { name: 'SQL', icon: <FileJson size={32} />, color: 'text-[#4479A1]' },
  ];

  return (
    <section id="tech" className="py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My primary tools and technologies for building robust, scalable applications.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass p-6 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-brand-neon-purple/50 transition-colors group cursor-pointer"
            >
              <div className={`group-hover:scale-110 transition-transform ${tech.color} drop-shadow-lg`}>
                {tech.icon}
              </div>
              <span className="font-medium text-gray-200 group-hover:text-brand-neon-purple transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
