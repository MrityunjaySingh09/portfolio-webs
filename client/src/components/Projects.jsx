import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback projects while API loads or if backend is not available
  const fallbackProjects = [
    {
      title: "Station Guide",
      description: "A comprehensive platform to guide users through station layouts, amenities, and real-time updates.",
      tags: ["ReactJS", "NodeJS", "MongoDB", "TailwindCSS"],
      link: "#",
      featured: true
    },
    {
      title: "100 Days 100 Web Projects",
      description: "A daily coding challenge documenting 100 unique web development projects built from scratch.",
      tags: ["ReactJS", "NodeJS"],
      link: "#",
      featured: true
    },
    {
      title: "Samvidhan Path",
      description: "An educational portal dedicated to spreading awareness about the Constitution and fundamental rights.",
      tags: ["ReactJS", "ExpressJS", "MongoDB"],
      link: "#",
      featured: false
    }
  ];

  useEffect(() => {
    // Fetch from backend API
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        if (response.data && response.data.length > 0) {
          setProjects(response.data);
        } else {
          setProjects(fallbackProjects);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Featured Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A selection of my best work, demonstrating my full-stack capabilities.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-neon-purple"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass rounded-xl overflow-hidden flex flex-col group relative"
              >
                {/* Glow effect behind card on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-neon-purple to-brand-neon-blue opacity-0 group-hover:opacity-20 transition-opacity blur-xl z-[-1]"></div>
                
                <div className="h-48 bg-[#0f152b] relative overflow-hidden flex items-center justify-center border-b border-brand-glass-border">
                  {/* Decorative placeholder for project image */}
                  <div className="absolute w-[150%] h-[150%] bg-gradient-to-tr from-brand-neon-purple/10 to-brand-neon-blue/10 rotate-12 group-hover:rotate-45 transition-transform duration-700"></div>
                  <span className="text-4xl font-bold text-white/10 z-10">{project.title.substring(0, 2).toUpperCase()}</span>
                  
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-20">
                      <span className="bg-brand-neon-purple/20 text-brand-neon-purple text-xs px-3 py-1 rounded-full border border-brand-neon-purple/50">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-brand-neon-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <a href={project.link} className="flex items-center text-sm font-medium text-white hover:text-brand-neon-purple transition-colors">
                      View Project <ExternalLink size={16} className="ml-1" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
