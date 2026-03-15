import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Search, LayoutGrid, List } from 'lucide-react';
import { fetchDevTools } from '../services/api';
import ToolCard from '../components/ToolCard';
import SkeletonLoader from '../components/SkeletonLoader';
import Navbar from '../components/Navbar';

const Tools = () => {
  const [tools, setTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const loadTools = async () => {
      setLoading(true);
      try {
        const data = await fetchDevTools();
        setTools(data.tools || []);
        setFilteredTools(data.tools || []);
      } catch (error) {
        console.error('Error loading tools:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTools();
  }, []);

  useEffect(() => {
    let result = tools;
    if (activeCategory !== 'All') {
      result = result.filter(tool => tool.category === activeCategory);
    }
    if (searchQuery.trim()) {
      result = result.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredTools(result);
  }, [searchQuery, activeCategory, tools]);

  const categories = ['All', ...new Set(tools.map(t => t.category))];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
                <Wrench className="text-gold-primary" />
                Dev Arsenal
              </h1>
              <p className="text-text-muted mt-1">Curated collection of essential developer tools and resources.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-gold-primary/50 transition-all text-text-primary"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-gold-primary text-background border-gold-primary'
                      : 'bg-white/5 text-text-muted border-white/5 hover:border-gold-primary/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.header>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {loading ? (
            Array(8).fill(0).map((_, i) => <SkeletonLoader key={i} type="tool" />)
          ) : filteredTools.length > 0 ? (
            filteredTools.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} index={index} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-text-muted italic">No tools found matching your criteria.</p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Tools;

