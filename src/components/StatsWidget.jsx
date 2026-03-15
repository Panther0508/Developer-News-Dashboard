import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Code, Github, Sparkles, ArrowUpRight } from 'lucide-react';

const icons = {
  news: Newspaper,
  code: Code,
  github: Github,
  sparkles: Sparkles,
};

const StatsWidget = ({ label, value, trend, icon, delay = 0 }) => {
  const Icon = icons[icon] || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card p-6 gold-glow group cursor-default"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-gold-primary/10 rounded-lg group-hover:bg-gold-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-gold-primary" />
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-gold-accent bg-gold-accent/10 px-2 py-1 rounded-full">
          <span>{trend}</span>
          <ArrowUpRight className="w-3 h-3" />
        </div>
      </div>
      
      <div>
        <p className="text-sm font-medium text-text-muted mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-text-primary tracking-tight">
          {value}
        </h3>
      </div>
      
      <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gold-gradient"
          initial={{ width: 0 }}
          animate={{ width: '70%' }}
          transition={{ duration: 1, delay: delay + 0.5 }}
        />
      </div>
    </motion.div>
  );
};

export default StatsWidget;
