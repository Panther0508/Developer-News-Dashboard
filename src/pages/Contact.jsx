import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Twitter, Linkedin, Send, MapPin, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com', color: 'hover:text-white' },
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com', color: 'hover:text-blue-400' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com', color: 'hover:text-blue-500' }
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'hello@devpulse.ai',
      action: 'Send an email'
    },
    {
      icon: MessageCircle,
      title: 'Discord',
      description: 'Join our community',
      action: 'Join Discord'
    },
    {
      icon: MapPin,
      title: 'Location',
      description: 'Remote First',
      action: 'Worldwide'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have questions, suggestions, or just want to say hello? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card p-8"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-100 border border-dark-300 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-100 border border-dark-300 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-100 border border-dark-300 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-dark-100 border border-dark-300 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={submitted}
                  className={`w-full py-3 rounded-lg font-medium transition-all ${
                    submitted
                      ? 'bg-green-500 text-white'
                      : 'bg-gold-gradient text-black hover:shadow-lg hover:shadow-gold/20'
                  }`}
                >
                  {submitted ? (
                    <span className="flex items-center justify-center">
                      <span className="mr-2">✓</span> Message Sent!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </span>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Contact Methods */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4"
              >
                {contactMethods.map((method, index) => (
                  <div key={index} className="card p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <method.icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{method.title}</h3>
                      <p className="text-gray-400 text-sm mb-1">{method.description}</p>
                      <span className="text-gold text-sm">{method.action}</span>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="card p-8"
              >
                <h3 className="font-semibold text-white mb-4">Follow Us</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Stay updated with the latest news and announcements.
                </p>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-lg bg-dark-100 border border-dark-300 flex items-center justify-center text-gray-400 transition-colors ${social.color}`}
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* FAQ */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="card p-8"
              >
                <h3 className="font-semibold text-white mb-4">Quick Answers</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-gold text-sm font-medium mb-1">How can I contribute?</h4>
                    <p className="text-gray-400 text-sm">
                      Check our GitHub repository for open issues and contribution guidelines.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-gold text-sm font-medium mb-1">Is DevPulse free?</h4>
                    <p className="text-gray-400 text-sm">
                      Yes! DevPulse is completely free and open source.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
