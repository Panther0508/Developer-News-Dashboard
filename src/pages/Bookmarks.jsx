import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Newspaper, Github, Wrench, Trash2 } from 'lucide-react';
import NewsCard from '../components/NewsCard';
import RepoCard from '../components/RepoCard';
import ToolCard from '../components/ToolCard';
import Navbar from '../components/Navbar';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState({ news: [], repos: [], tools: [] });

  useEffect(() => {
    // Load bookmarks (mock implementation for now)
    const saved = localStorage.getItem('devpulse_bookmarks');
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing bookmarks', e);
        setBookmarks({ news: [], repos: [], tools: [] });
      }
    }
  }, []);

  const clearBookmarks = () => {
    if (window.confirm('Are you sure you want to clear all bookmarks?')) {
      localStorage.removeItem('devpulse_bookmarks');
      setBookmarks({ news: [], repos: [], tools: [] });
    }
  };

  const hasBookmarks = bookmarks.news.length > 0 || bookmarks.repos.length > 0 || bookmarks.tools.length > 0;

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between border-b border-white/10 pb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
              <Bookmark className="text-gold-primary fill-gold-primary/20" />
              Saved Intelligence
            </h1>
            <p className="text-text-muted mt-1">Access your hand-picked resources and bookmarks.</p>
          </div>
          {hasBookmarks && (
            <button 
              onClick={clearBookmarks}
              className="flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-400 transition-colors uppercase tracking-wider"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </motion.header>

        {!hasBookmarks ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center py-32 text-center space-y-6"
          >
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
              <Bookmark className="w-10 h-10 text-white/20" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Your library is empty</h3>
              <p className="text-text-muted max-w-md">Start bookmarking news, repositories, and tools to build your personalized intelligence feed.</p>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-16">
            {bookmarks.news.length > 0 && (
              <motion.section 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-gold-primary" />
                  Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookmarks.news.map((item, i) => <NewsCard key={i} article={item} index={i} />)}
                </div>
              </motion.section>
            )}

            {bookmarks.repos.length > 0 && (
              <motion.section 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Github className="w-5 h-5 text-gold-primary" />
                  GitHub Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookmarks.repos.map((item, i) => <RepoCard key={i} repo={item} index={i} />)}
                </div>
              </motion.section>
            )}

            {bookmarks.tools.length > 0 && (
              <motion.section 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-gold-primary" />
                  Developer Tools
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {bookmarks.tools.map((item, i) => <ToolCard key={i} tool={item} index={i} />)}
                </div>
              </motion.section>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Bookmarks;

