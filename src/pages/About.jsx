import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Github, Heart, Star, Code, Users, Shield, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar';

const About = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'Real-time Updates',
      description: 'Stay informed with the latest developer news from multiple sources, updated in real-time.'
    },
    {
      icon: Code,
      title: 'Curated Content',
      description: 'Hand-picked articles, tutorials, and resources tailored for developers.'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data stays on your device. No tracking, no ads, just pure developer experience.'
    },
    {
      icon: Heart,
      title: 'Open Source',
      description: 'Built with transparency. View our code, contribute, or fork it for your own projects.'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Monthly Users' },
    { value: '10K+', label: 'Articles Indexed' },
    { value: '500+', label: 'Contributors' },
    { value: '99.9%', label: 'Uptime' }
  ];

  const team = [
    { name: 'DevPulse Team', role: 'Founders & Maintainers', avatar: 'DP' }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gold/10 mb-6">
              <Zap className="w-10 h-10 text-gold" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              About <span className="gradient-text">DevPulse</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The developer news dashboard designed for programmers. Aggregating the best developer content 
              from around the web into one beautiful, distraction-free interface.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="text-3xl font-bold text-gold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="font-display text-2xl font-bold text-white mb-8 text-center">
              Why <span className="gradient-text">DevPulse</span>?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="card p-6"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="font-display text-2xl font-bold text-white mb-8 text-center">
              Built With
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {['React', 'FastAPI', 'TailwindCSS', 'Framer Motion', 'Recharts', 'Hacker News API', 'Dev.to API'].map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-dark-100 border border-dark-300 rounded-lg text-sm text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Open Source */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="card p-8 text-center"
          >
            <Github className="w-12 h-12 text-gold mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Open Source</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              DevPulse is open source and free to use. Fork the repository, contribute, 
              or build your own version.
            </p>
            <a
              href="https://github.com/Panther0508/Developer-News-Dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center px-6 py-3 rounded-lg font-medium"
            >
              <Star className="w-5 h-5 mr-2" />
              Star on GitHub
            </a>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default About;
