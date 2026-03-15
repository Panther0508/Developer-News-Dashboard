import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  TrendingUp, 
  Code, 
  Wrench,
  Activity
} from 'lucide-react';
import { fetchNews, fetchGithubTrending, fetchDevTools, fetchTechTrends } from '../services/api';
import Navbar from '../components/Navbar';
import NewsCard from '../components/NewsCard';
import RepoCard from '../components/RepoCard';
import ToolCard from '../components/ToolCard';
import TrendChart from '../components/TrendChart';
import LoadingSkeleton from '../components/LoadingSkeleton';

const categories = [
  { id: 'programming', label: 'All' },
  { id: 'ai', label: 'AI' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'webdev', label: 'Web Dev' },
  { id: 'opensource', label: 'Open Source' },
];

const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState('programming');
  const [news, setNews] = useState([]);
  const [repos, setRepos] = useState([]);
  const [tools, setTools] = useState([]);
  const [trends, setTrends] = useState({ languages: [], categories: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [newsData, reposData, toolsData, trendsData] = await Promise.all([
          fetchNews(activeCategory),
          fetchGithubTrending(),
          fetchDevTools(),
          fetchTechTrends(),
        ]);
        setNews(newsData.news || []);
        setRepos(reposData.repositories || []);
        setTools(toolsData.tools || []);
        setTrends(trendsData || { languages: [], categories: [] });
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      {/* Hero Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pt-24 pb-8 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-dark-100 via-dark-50 to-black p-8 md:p-12 border border-dark-300">
            <div className="absolute inset-0 bg-pattern" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-8 h-8 text-gold" />
                <span className="text-gold text-sm font-medium tracking-wider uppercase">
                  Live Updates
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Developer{' '}
                <span className="gradient-text">News Dashboard</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl">
                Stay updated with the latest in tech, programming, and developer tools. 
                Curated news from Hacker News, Dev.to, and GitHub trending.
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-gold text-black'
                    : 'bg-dark-100 text-gray-400 hover:text-gold hover:bg-dark-200 border border-dark-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Trending Developer News */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-white flex items-center">
              <TrendingUp className="w-6 h-6 text-gold mr-2" />
              Trending Developer News
            </h2>
          </div>
          
          {loading ? (
            <LoadingSkeleton type="card" count={6} />
          ) : news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {news.slice(0, 12).map((article, index) => (
                <NewsCard key={article.id || index} article={article} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No news found for this category.
            </div>
          )}
        </motion.section>

        {/* GitHub Trending */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-white flex items-center">
              <Code className="w-6 h-6 text-gold mr-2" />
              GitHub Trending Projects
            </h2>
          </div>
          
          {loading ? (
            <LoadingSkeleton type="repo" count={6} />
          ) : repos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.slice(0, 9).map((repo, index) => (
                <RepoCard key={repo.id || index} repo={repo} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No trending repositories found.
            </div>
          )}
        </motion.section>

        {/* Tech Trends Chart & Dev Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {loading ? (
              <LoadingSkeleton type="chart" />
            ) : (
              <TrendChart
                data={trends.languages || []}
                type="bar"
                title="Most Popular Languages"
              />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="card p-6">
              <h3 className="font-display text-lg font-semibold text-gray-100 mb-6 flex items-center">
                <Wrench className="w-5 h-5 text-gold mr-2" />
                Developer Tool Discovery
              </h3>
              
              {loading ? (
                <LoadingSkeleton type="tool" count={4} />
              ) : tools.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tools.slice(0, 6).map((tool, index) => (
                    <ToolCard key={tool.id} tool={tool} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No tools available.
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Category Trends Chart */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {loading ? (
            <LoadingSkeleton type="chart" />
          ) : (
            <TrendChart
              data={trends.categories || []}
              type="pie"
              title="Tech Categories Distribution"
            />
          )}
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Zap className="w-5 h-5 text-gold" />
              <span className="font-display text-sm font-medium text-gray-400">
                DevPulse
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Built for developers • Powered by Hacker News, Dev.to & GitHub
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
