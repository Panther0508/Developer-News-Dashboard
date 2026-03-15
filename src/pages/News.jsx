import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Clock, Filter, Search, Sparkles } from 'lucide-react';
import { fetchNews } from '../services/api';
import NewsCard from '../components/NewsCard';
import SkeletonLoader from '../components/SkeletonLoader';

const categories = [
  { id: 'programming', label: 'Programming' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'ai', label: 'AI' },
  { id: 'webdev', label: 'Web Dev' },
  { id: 'opensource', label: 'Open Source' },
];

const News = () => {
  const [activeCategory, setActiveCategory] = useState('programming');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('latest'); // 'latest' or 'trending'

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        const data = await fetchNews(activeCategory, 30);
        let processedNews = data.news || [];
        
        if (viewMode === 'trending') {
          // Mock trending logic: sort by keywords in title or just randomize to simulate "heat"
          processedNews = [...processedNews].sort((a, b) => {
            const hotValue = (item) => {
              const keywords = ['AI', 'GPT', 'Rust', 'Framework', 'Release', 'New'];
              let score = 0;
              keywords.forEach(kw => {
                if (item.title.includes(kw)) score += 10;
              });
              return score + (Math.random() * 5);
            };
            return hotValue(b) - hotValue(a);
          });
        }
        
        setNews(processedNews.slice(0, 20));
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, [activeCategory, viewMode]);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
              <Newspaper className="text-gold-primary" />
              Developer News
            </h1>
            <p className="text-text-muted mt-1">Stay updated with the latest in the developer ecosystem.</p>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-gold-primary text-background border-gold-primary'
                    : 'bg-white/5 text-text-muted border-white/5 hover:border-gold-primary/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white/5 p-1 rounded-xl w-fit border border-white/5">
          <button
            onClick={() => setViewMode('latest')}
            className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
              viewMode === 'latest' ? 'bg-secondary text-gold-primary shadow-lg' : 'text-text-muted hover:text-text-primary'
            }`}
          >
            Latest
          </button>
          <button
            onClick={() => setViewMode('trending')}
            className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
              viewMode === 'trending' ? 'bg-secondary text-gold-primary shadow-lg' : 'text-text-muted hover:text-text-primary'
            }`}
          >
            Trending
            <Sparkles size={12} className={viewMode === 'trending' ? 'text-gold-primary' : 'text-text-muted'} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(9).fill(0).map((_, i) => <SkeletonLoader key={i} type="news-default" />)
        ) : (
          news.map((article, index) => (
            <NewsCard key={article.id} article={article} index={index} />
          ))
        )}
      </div>
    </div>
  );
};

export default News;
