import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Wrench, ArrowUpRight } from 'lucide-react';

const ToolCard = ({ tool, index = 0 }) => {
  return (
    <motion.a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glass-card p-6 gold-glow group block hover:border-gold-primary/50 transition-all border border-white/5"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="p-3 bg-gold-primary/10 rounded-xl group-hover:bg-gold-primary/20 transition-all">
          <Wrench className="w-6 h-6 text-gold-primary" />
        </div>
        <div className="p-2 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-all -translate-y-2 group-hover:translate-y-0">
          <ArrowUpRight className="w-4 h-4 text-gold-primary" />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold px-2 py-0.5 bg-white/5 text-text-muted rounded uppercase tracking-wider">
            {tool.category}
          </span>
        </div>
        <h3 className="text-lg font-bold text-text-primary group-hover:text-gold-accent transition-colors mb-2">
          {tool.name}
        </h3>
        <p className="text-sm text-text-muted line-clamp-3 mb-6">
          {tool.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto">
        {tool.tags?.map((tag, i) => (
          <span key={i} className="text-[9px] font-bold text-gold-primary/60 border border-gold-primary/20 px-2 py-0.5 rounded uppercase">
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  );
};

export default ToolCard;
