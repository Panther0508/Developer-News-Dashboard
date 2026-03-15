import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Code, Star, ExternalLink, Zap } from 'lucide-react';
import { fetchGithubTrending } from '../services/api';
import RepoCard from '../components/RepoCard';
import SkeletonLoader from '../components/SkeletonLoader';
import Navbar from '../components/Navbar';

const languages = [
  { id: null, label: 'All Languages' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'python', label: 'Python' },
  { id: 'rust', label: 'Rust' },
  { id: 'go', label: 'Go' },
];

const Repositories = () => {
  const [activeLang, setActiveLang] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRepos = async () => {
      setLoading(true);
      try {
        const data = await fetchGithubTrending(activeLang, 24);
        setRepos(data.repositories || []);
      } catch (error) {
        console.error('Error loading repos:', error);
      } finally {
        setLoading(false);
      }
    };
    loadRepos();
  }, [activeLang]);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:items-center text-center space-y-4"
        >
          <div className="p-3 bg-gold-primary/10 rounded-2xl">
            <Github className="w-8 h-8 text-gold-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Trending Repositories</h1>
            <p className="text-text-muted mt-1">Discover the hottest open-source projects on GitHub right now.</p>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide max-w-full">
            {languages.map((lang) => (
              <button
                key={lang.id || 'all'}
                onClick={() => setActiveLang(lang.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border whitespace-nowrap ${
                  activeLang === lang.id
                    ? 'bg-gold-primary text-background border-gold-primary'
                    : 'bg-white/5 text-text-muted border-white/5 hover:border-gold-primary/30'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </motion.header>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {loading ? (
            Array(9).fill(0).map((_, i) => <SkeletonLoader key={i} type="repo-default" />)
          ) : (
            repos.map((repo, index) => (
              <RepoCard key={repo.id} repo={repo} index={index} />
            ))
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Repositories;

