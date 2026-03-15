import React from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink, Folder } from 'lucide-react';

const RepoCard = ({ repo, index = 0, layout = 'default' }) => {
  const isSlim = layout === 'slim';

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#F7DF1E',
      TypeScript: '#3178C6',
      Python: '#3776AB',
      Rust: '#DEA584',
      Go: '#00ADD8',
    };
    return colors[language] || '#D4AF37';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`glass-card gold-glow group cursor-pointer ${isSlim ? 'p-4' : 'p-6'}`}
      onClick={() => window.open(repo.repo_url, '_blank', 'noopener,noreferrer')}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/5 rounded-lg group-hover:bg-gold-primary/10 transition-colors">
            <Folder className="w-5 h-5 text-gold-primary" />
          </div>
          <h3 className={`font-bold text-text-primary group-hover:text-gold-accent transition-colors truncate ${isSlim ? 'text-sm w-32' : 'text-lg w-48'}`}>
            {repo.repo_name}
          </h3>
        </div>
        <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-gold-primary transition-all" />
      </div>

      {!isSlim && repo.description && (
        <p className="text-sm text-text-muted mb-4 line-clamp-2">
          {repo.description}
        </p>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex items-center gap-4">
          <div className="flex items-center text-[10px] font-bold text-text-muted uppercase tracking-tighter">
            <span 
              className="w-2 h-2 rounded-full mr-1.5"
              style={{ backgroundColor: getLanguageColor(repo.language) }}
            />
            {repo.language || 'Unknown'}
          </div>
          <div className="flex items-center text-[10px] font-bold text-gold-primary">
            <Star className="w-3 h-3 mr-1 fill-gold-primary/20" />
            {repo.stars?.toLocaleString()}
          </div>
        </div>
        
        {!isSlim && (
          <div className="flex items-center text-[10px] font-bold text-text-muted uppercase tracking-tighter">
            <GitFork className="w-3 h-3 mr-1" />
            {repo.forks?.toLocaleString() || 0}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RepoCard;
