import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({ type: 'error', message: 'All fields are required.' });
      return;
    }
    
    if (!validateEmail(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // API call to backend
      await axios.post('http://localhost:5000/api/contact', formData);
      
      setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Contact error:', error);
      setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Get in Touch</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'm always open to talking about new systems and full-stack roles.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column: Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-2xl relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon-purple/10 rounded-bl-full rounded-tr-2xl -z-10"></div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {status.message && (
                <div className={`p-4 rounded-md flex items-start gap-3 ${status.type === 'error' ? 'bg-red-500/10 border border-red-500/50 text-red-200' : 'bg-green-500/10 border border-green-500/50 text-green-200'}`}>
                  {status.type === 'error' ? <AlertCircle size={20} className="mt-0.5" /> : <CheckCircle2 size={20} className="mt-0.5" />}
                  <p className="text-sm">{status.message}</p>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="name" className="text-sm text-gray-400 font-medium">Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#0a0f1d]/50 border border-brand-glass-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-neon-purple transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-gray-400 font-medium">Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#0a0f1d]/50 border border-brand-glass-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-neon-purple transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm text-gray-400 font-medium">Subject</label>
                <input 
                  type="text" 
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-[#0a0f1d]/50 border border-brand-glass-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-neon-purple transition-colors"
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm text-gray-400 font-medium">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-[#0a0f1d]/50 border border-brand-glass-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-neon-purple transition-colors resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-brand-neon-purple to-brand-neon-blue text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                ) : (
                  <>Send Message <Send size={18} /></>
                )}
              </button>
            </form>
          </motion.div>

          {/* Right Column: Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="glass border-brand-neon-blue/30 inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 self-start">
              <span className="w-2 h-2 rounded-full bg-brand-neon-blue animate-pulse"></span>
              <span className="text-sm font-medium text-brand-neon-blue">Available for custom systems and full-stack roles • Fast response</span>
            </div>

            <h3 className="text-2xl font-bold mb-6">Let's build something amazing together.</h3>
            
            <p className="text-gray-400 mb-10 leading-relaxed">
              I'm currently seeking new opportunities and open to both freelance projects and full-time roles. 
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="space-y-6">
              <a href="mailto:mrityunjay@example.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:bg-brand-neon-purple/20 group-hover:border-brand-neon-purple transition-all">
                  <Mail size={20} className="text-gray-300 group-hover:text-brand-neon-purple transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Email</p>
                  <p className="text-white group-hover:text-brand-neon-purple transition-colors">mrityunjay@example.com</p>
                </div>
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:bg-[#0077b5]/20 group-hover:border-[#0077b5] transition-all">
                  <FaLinkedin size={20} className="text-gray-300 group-hover:text-[#0077b5] transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">LinkedIn</p>
                  <p className="text-white group-hover:text-[#0077b5] transition-colors">linkedin.com/in/mrityunjay</p>
                </div>
              </a>

              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:bg-white/10 group-hover:border-white transition-all">
                  <FaGithub size={20} className="text-gray-300 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">GitHub</p>
                  <p className="text-white group-hover:text-white transition-colors">github.com/mrityunjay</p>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
