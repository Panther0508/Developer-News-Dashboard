import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Clock, User, Bookmark, Sparkles, Loader2 } from 'lucide-react';
import { summarizeNews } from '../services/api';

const NewsCard = ({ article, index = 0, layout = 'default' }) => {
  const [summary, setSummary] = useState(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  const handleSummarize = async (e) => {
    e.stopPropagation();
    if (summary) {
      setSummary(null);
      return;
    }
    
    setIsSummarizing(true);
    try {
      const textToSummarize = article.description && article.description.length > 50 
        ? article.description 
        : article.title;
      const data = await summarizeNews(textToSummarize);
      setSummary(data.summary);
    } catch (error) {
      console.error('Summarization failed:', error);
    } finally {
      setIsSummarizing(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      
      if (diffHours < 1) return 'Just now';
      if (diffHours < 24) return `${diffHours}h ago`;
      return date.toLocaleDateString();
    } catch (e) {
      return '';
    }
  };

  const isWide = layout === 'wide';

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`glass-card gold-glow group cursor-pointer overflow-hidden transition-all ${isWide ? 'flex gap-6 p-4' : 'p-6'} ${summary ? 'ring-1 ring-gold-primary/30 shadow-gold-sm' : ''}`}
      onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')}
    >
      {isWide && (
        <div className="w-24 h-24 rounded-lg bg-white/5 flex-shrink-0 flex items-center justify-center border border-white/5 group-hover:border-gold-primary/30 transition-all">
          <Newspaper className="w-8 h-8 text-gold-primary/40 group-hover:text-gold-primary transition-all" />
        </div>
      )}

      <div className="flex-1 flex flex-col justify-between">
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-gold-primary/10 text-gold-primary rounded uppercase tracking-wider">
              {article.source}
            </span>
            <div className="flex items-center gap-3 text-text-muted">
              <div className="flex items-center text-[10px]">
                <Clock className="w-3 h-3 mr-1" />
                {formatDate(article.published_date)}
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleSummarize}
                  className={`p-1 rounded hover:bg-gold-primary/10 transition-colors ${summary ? 'text-gold-primary' : 'hover:text-gold-primary'}`}
                  title="AI Summary"
                >
                  {isSummarizing ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Sparkles className={`w-3.5 h-3.5 ${summary ? 'fill-gold-primary' : ''}`} />
                  )}
                </button>
                <Bookmark className="w-3.5 h-3.5 hover:text-gold-primary transition-colors cursor-alias" />
              </div>
            </div>
          </div>

          <h3 className={`font-bold text-text-primary group-hover:text-gold-accent transition-colors line-clamp-2 ${isWide ? 'text-lg' : 'text-base'}`}>
            {article.title}
          </h3>
          
          <AnimatePresence mode="wait">
            {summary ? (
              <motion.div
                key="summary"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 p-3 bg-gold-primary/5 border-l-2 border-gold-primary rounded-r-lg"
              >
                <div className="flex items-start gap-2">
                  <Sparkles className="w-3 h-3 text-gold-primary mt-1 flex-shrink-0" />
                  <p className="text-xs text-text-primary italic leading-relaxed">{summary}</p>
                </div>
              </motion.div>
            ) : (
              !isWide && article.description && (
                <motion.p 
                  key="description"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-text-muted mt-2 line-clamp-2"
                >
                  {article.description}
                </motion.p>
              )
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center text-xs text-text-muted">
            <User className="w-3 h-3 mr-1" />
            <span className="truncate max-w-[120px]">{article.author}</span>
          </div>
          <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-gold-primary transition-all transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.article>
  );
};

const Newspaper = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
    <path d="M18 14h-8"></path>
    <path d="M15 18h-5"></path>
    <path d="M10 6h8v4h-8V6Z"></path>
  </svg>
);

export default NewsCard;
