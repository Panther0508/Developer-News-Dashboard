import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Flame, 
  Clock, 
  Calendar,
  Eye,
  Share2,
  Bookmark,
  ArrowUp,
  ArrowDown,
  Minus,
  Filter,
  RefreshCw
} from 'lucide-react';
import { fetchNews, fetchGithubTrending } from '../services/api';
import NewsCard from '../components/NewsCard';
import RepoCard from '../components/RepoCard';
import Navbar from '../components/Navbar';
import SkeletonLoader from '../components/SkeletonLoader';

const timeFilters = [
  { id: 'today', label: 'Today', icon: Clock },
  { id: 'week', label: 'This Week', icon: Calendar },
  { id: 'month', label: 'This Month', icon: Calendar },
];

const trendingTopics = [
  { id: 1, name: 'AI & Machine Learning', count: 245, trend: 'up' },
  { id: 2, name: 'React 19', count: 189, trend: 'up' },
  { id: 3, name: 'TypeScript 5.0', count: 156, trend: 'up' },
  { id: 4, name: 'Rust Programming', count: 134, trend: 'up' },
  { id: 5, name: 'WebAssembly', count: 98, trend: 'up' },
  { id: 6, name: 'DevOps', count: 87, trend: 'up' },
  { id: 7, name: 'Cloud Native', count: 76, trend: 'up' },
];

const Trending = () => {
  const [activeTimeFilter, setActiveTimeFilter] = useState('today');
  const [news, setNews] = useState([]);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadTrendingData();
  }, [activeTimeFilter]);

  const loadTrendingData = async () => {
    setLoading(true);
    try {
      const [newsData, reposData] = await Promise.all([
        fetchNews('programming', 30),
        fetchGithubTrending(),
      ]);
      
      // Process news with mock engagement metrics
      const processedNews = (newsData.news || []).map((item, index) => ({
        ...item,
        views: Math.floor(Math.random() * 50000) + 1000,
        shares: Math.floor(Math.random() * 5000) + 100,
        trendScore: Math.floor(Math.random() * 100),
        rank: index + 1,
      })).sort((a, b) => b.trendScore - a.trendScore);

      setNews(processedNews);
      setRepos(reposData.repositories || []);
    } catch (error) {
      console.error('Error loading trending data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadTrendingData();
    setRefreshing(false);
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <ArrowUp className="w-4 h-4 text-green-500" />;
    if (trend === 'down') return <ArrowDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Flame className="text-gold-primary w-8 h-8" />
                Trending Now
              </h1>
              <p className="text-gray-400 mt-1">
                Discover the most popular stories in the developer community
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Time Filters */}
              <div className="flex items-center gap-1 bg-[#1a1a1a] p-1 rounded-lg border border-[#333333]">
                {timeFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveTimeFilter(filter.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      activeTimeFilter === filter.id
                        ? 'bg-gold text-black'
                        : 'text-gray-400 hover:text-white hover:bg-[#262626]'
                    }`}
                  >
                    <filter.icon className="w-4 h-4" />
                    {filter.label}
                  </button>
                ))}
              </div>
              
              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                className="p-2 rounded-lg bg-[#1a1a1a] border border-[#333333] text-gray-400 hover:text-gold hover:border-gold/30 transition-all"
                disabled={refreshing}
              >
                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Trending Topics - Horizontal Scroll */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gold" />
            Trending Topics
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {trendingTopics.map((topic) => (
              <motion.div
                key={topic.id}
                whileHover={{ scale: 1.02 }}
                className="flex-shrink-0 px-4 py-3 bg-[#111111] border border-[#333333] rounded-xl hover:border-gold/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium group-hover:text-gold transition-colors">
                    #{topic.name}
                  </span>
                  {getTrendIcon(topic.trend)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {topic.count} mentions
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Trending Articles with Rankings */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-gold" />
              Top Trending Articles
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Eye className="w-4 h-4" />
              Showing {news.length} articles
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              {Array(5).fill(0).map((_, i) => (
                <SkeletonLoader key={i} type="news-default" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {news.slice(0, 15).map((article, index) => (
                  <motion.div
                    key={article.id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative"
                  >
                    {/* Rank Number */}
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-gold/10 text-gold font-bold text-lg">
                      {index + 1}
                    </div>
                    
                    <div className="lg:ml-6">
                      <NewsCard 
                        article={article} 
                        index={index}
                        showMetrics={true}
                        showTrendIndicator={true}
                      />
                    </div>
                    
                    {/* Trend Metrics */}
                    <div className="lg:absolute lg:right-4 lg:top-1/2 lg:-translate-y-1/2 flex lg:flex-col gap-4 mt-3 lg:mt-0 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {article.views?.toLocaleString() || '0'}
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 className="w-3 h-3" />
                        {article.shares?.toLocaleString() || '0'}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.section>

        {/* GitHub Trending Repos */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-gold" />
            Trending GitHub Repositories
          </h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(6).fill(0).map((_, i) => (
                <SkeletonLoader key={i} type="repo" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.slice(0, 9).map((repo, index) => (
                <RepoCard key={repo.id || index} repo={repo} index={index} />
              ))}
            </div>
          )}
        </motion.section>
      </main>
    </div>
  );
};

export default Trending;
