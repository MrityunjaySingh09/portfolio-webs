import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Server, Smartphone, Database, Cpu, Palette } from 'lucide-react';

const WhatIBuild = () => {
  const services = [
    {
      icon: <Globe size={28} />,
      title: "Web Applications",
      color: "from-[#38bdf8] to-[#6366f1]",
      borderColor: "border-[#38bdf8]/30",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]",
      description: "Full-stack web apps with React frontends and Node.js backends — fast, responsive, and production-ready.",
      skills: ["React", "Node.js", "Express", "REST APIs"]
    },
    {
      icon: <Database size={28} />,
      title: "Backend & APIs",
      color: "from-[#a78bfa] to-[#ec4899]",
      borderColor: "border-[#a78bfa]/30",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(167,139,250,0.15)]",
      description: "Scalable server-side architecture with secure authentication, database design, and clean REST/JSON APIs.",
      skills: ["MongoDB", "SQL", "JWT Auth", "Vercel"]
    },
    {
      icon: <Palette size={28} />,
      title: "UI / UX Design",
      color: "from-[#fb923c] to-[#f43f5e]",
      borderColor: "border-[#fb923c]/30",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(251,146,60,0.15)]",
      description: "Clean, modern interfaces with smooth animations and accessibility in mind — built with Tailwind CSS.",
      skills: ["Tailwind CSS", "Framer Motion", "Figma", "Responsive"]
    },
    {
      icon: <Cpu size={28} />,
      title: "Problem Solving",
      color: "from-[#34d399] to-[#06b6d4]",
      borderColor: "border-[#34d399]/30",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]",
      description: "Strong DSA fundamentals in Java & Python. I write efficient, maintainable code that scales under pressure.",
      skills: ["Java", "Python", "DSA", "System Design"]
    },
    {
      icon: <Server size={28} />,
      title: "DevOps & Deployment",
      color: "from-[#facc15] to-[#f97316]",
      borderColor: "border-[#facc15]/30",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(250,204,21,0.15)]",
      description: "Deploy apps confidently with Vercel, environment config, CI/CD pipelines, and Git-based workflows.",
      skills: ["Vercel", "Git", "GitHub", "CI/CD"]
    },
    {
      icon: <Smartphone size={28} />,
      title: "Responsive & Mobile",
      color: "from-[#c084fc] to-[#38bdf8]",
      borderColor: "border-[#c084fc]/30",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(192,132,252,0.15)]",
      description: "Every interface I build works flawlessly across all devices — mobile-first thinking from day one.",
      skills: ["Mobile-first", "Cross-browser", "PWA", "Accessibility"]
    }
  ];

  return (
    <section id="tech" className="py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-neon-blue text-sm font-semibold tracking-widest uppercase mb-3"
          >
            My Expertise
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="text-gradient">What I Build</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            From idea to deployment — here's how I bring products to life.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className={`group glass rounded-2xl p-6 border ${service.borderColor} transition-all duration-300 ${service.glowColor} cursor-default`}
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.color} bg-opacity-10 mb-5`}>
                <div className="text-white">
                  {service.icon}
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                {service.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {service.skills.map(skill => (
                  <span
                    key={skill}
                    className={`text-xs px-2.5 py-1 rounded-full bg-gradient-to-r ${service.color} bg-opacity-10 text-gray-300 border border-white/10`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIBuild;