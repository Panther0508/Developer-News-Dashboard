import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Newspaper, Github, Wrench, Trash2 } from 'lucide-react';
import NewsCard from '../components/NewsCard';
import RepoCard from '../components/RepoCard';
import ToolCard from '../components/ToolCard';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState({ news: [], repos: [], tools: [] });

  useEffect(() => {
    // Load bookmarks (mock implementation for now)
    const saved = localStorage.getItem('devpulse_bookmarks');
    if (saved) {
      setBookmarks(JSON.parse(saved));
    } else {
      // Mock data if empty
      setBookmarks({
        news: [],
        repos: [],
        tools: []
      });
    }
  }, []);

  const clearBookmarks = () => {
    localStorage.removeItem('devpulse_bookmarks');
    setBookmarks({ news: [], repos: [], tools: [] });
  };

  const hasBookmarks = bookmarks.news.length > 0 || bookmarks.repos.length > 0 || bookmarks.tools.length > 0;

  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto">
      <header className="flex items-center justify-between border-b border-border pb-8">
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
      </header>

      {!hasBookmarks ? (
        <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
            <Bookmark className="w-10 h-10 text-white/20" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-primary mb-2">Your library is empty</h3>
            <p className="text-text-muted max-w-md">Start bookmarking news, repositories, and tools to build your personalized intelligence feed.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-16">
          {bookmarks.news.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-gold-primary" />
                Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarks.news.map((item, i) => <NewsCard key={i} article={item} index={i} />)}
              </div>
            </section>
          )}

          {bookmarks.repos.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Github className="w-5 h-5 text-gold-primary" />
                GitHub Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarks.repos.map((item, i) => <RepoCard key={i} repo={item} index={i} />)}
              </div>
            </section>
          )}

          {bookmarks.tools.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Wrench className="w-5 h-5 text-gold-primary" />
                Developer Tools
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {bookmarks.tools.map((item, i) => <ToolCard key={i} tool={item} index={i} />)}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
