import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search as SearchIcon, X, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import NewsCard from '../components/NewsCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { searchNews } from '../services/api';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (q) => {
    if (!q.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    try {
      const data = await searchNews(q);
      setResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setResults([]);
    setHasSearched(false);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl font-bold text-white mb-6 text-center">
              Search{' '}
              <span className="gradient-text">Developer News</span>
            </h1>
            
            <form onSubmit={handleSearch} className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for topics, technologies, frameworks..."
                className="w-full bg-black-100 border border-black-300 rounded-xl pl-12 pr-12 py-4 text-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gold transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </form>
          </motion.div>

          {loading ? (
            <div className="mt-8">
              <LoadingSkeleton type="card" count={6} />
            </div>
          ) : hasSearched ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-400">
                  {results.length > 0
                    ? `Found ${results.length} results for "${query}"`
                    : `No results found for "${query}"`}
                </p>
              </div>

              {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.map((article, index) => (
                    <NewsCard key={article.id || index} article={article} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black-100 flex items-center justify-center">
                    <SearchIcon className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-300 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-500">
                    Try searching for different keywords like "React", "Python", "AI", etc.
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-black-100 flex items-center justify-center">
                <Zap className="w-10 h-10 text-gold" />
              </div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">
                Discover Developer Content
              </h2>
              <p className="text-gray-400 max-w-md mx-auto">
                Search across Hacker News and Dev.to for the latest in programming, 
                tech trends, and developer tools.
              </p>
              
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {['React', 'Python', 'AI', 'TypeScript', 'Rust', 'Web Dev'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                      setSearchParams({ q: tag });
                    }}
                    className="px-4 py-2 bg-black-100 border border-black-300 rounded-lg text-sm text-gray-400 hover:text-gold hover:border-gold/30 transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Search;
