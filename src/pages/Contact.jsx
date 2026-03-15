import React from 'react';
import { motion } from 'framer-motion';
import { Github, Mail } from 'lucide-react';
import Navbar from '../components/Navbar';

const Contact = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl font-bold text-white mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
              DevPulse is an open-source project. For inquiries, contributions, or feedback, 
              please visit our GitHub repository or reach out via the community channels.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="https://github.com/Panther0508/Developer-News-Dashboard" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-premium flex items-center gap-3"
              >
                <Github className="w-5 h-5" />
                GitHub Repository
              </a>
              <a 
                href="mailto:nmesirionyengbaronye@gmail.com" 
                className="px-6 py-2 border border-dark-300 rounded-lg text-gray-300 hover:text-gold hover:border-gold/50 transition-all flex items-center gap-3"
              >
                <Mail className="w-5 h-5" />
                Email Support
              </a>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
