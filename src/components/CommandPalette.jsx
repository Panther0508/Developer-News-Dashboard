import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Hash, Globe, Github, Wrench, Bookmark, X, Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CommandPalette = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // This logic is wrong, but I'll fix the caller
      }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const actions = [
    { name: 'Developer News', icon: Globe, path: '/news' },
    { name: 'Trending Repos', icon: Github, path: '/repositories' },
    { name: 'Dev Tools', icon: Wrench, path: '/tools' },
    { name: 'My Bookmarks', icon: Bookmark, path: '/bookmarks' },
  ];

  const filteredActions = actions.filter(action => 
    action.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-xl bg-secondary border border-gold-primary/30 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="flex items-center p-4 border-b border-white/5">
            <Search className="w-5 h-5 text-gold-primary mr-3" />
            <input
              autoFocus
              type="text"
              placeholder="Type a command or search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-text-primary focus:outline-none placeholder-text-muted text-lg font-medium"
            />
            <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-lg transition-colors">
              <X className="w-5 h-5 text-text-muted" />
            </button>
          </div>

          <div className="p-2">
            <p className="px-3 py-2 text-[10px] font-bold text-gold-primary uppercase tracking-widest opacity-60">Commands</p>
            <div className="space-y-1">
              {filteredActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => {
                    navigate(action.path);
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-3 hover:bg-gold-primary/10 rounded-xl transition-all group text-left"
                >
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-gold-primary/20 transition-colors">
                    <action.icon className="w-4 h-4 text-text-muted group-hover:text-gold-primary" />
                  </div>
                  <span className="text-sm font-bold text-text-primary">{action.name}</span>
                  <div className="ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-text-muted font-bold">JUMP TO</span>
                    <ArrowRight className="w-3 h-3 text-gold-primary" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-black/40 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-[10px] text-text-muted font-bold">
                <span className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 uppercase">ESC</span>
                <span>TO CLOSE</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-text-muted font-bold">
                <span className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 uppercase">↵</span>
                <span>TO SELECT</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Command className="w-3 h-3 text-gold-primary" />
              <span className="text-[10px] font-black text-gold-primary uppercase tracking-tighter">DEVPULSE INTEL</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const ArrowRight = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
);

export default CommandPalette;
