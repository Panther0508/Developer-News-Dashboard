import React from 'react';

const SkeletonLoader = ({ type, count = 1 }) => {
  const skeletons = Array(count).fill(0);

  const renderSkeleton = () => {
    switch (type) {
      case 'stats':
        return (
          <div className="glass-card p-6 h-32 animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-white/5 rounded-lg" />
              <div className="w-12 h-5 bg-white/5 rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="w-24 h-4 bg-white/5 rounded" />
              <div className="w-16 h-6 bg-white/5 rounded" />
            </div>
          </div>
        );
      case 'news-wide':
        return (
          <div className="glass-card p-4 h-24 flex gap-4 animate-pulse">
            <div className="w-20 h-full bg-white/5 rounded-lg" />
            <div className="flex-1 space-y-3 py-1">
              <div className="w-3/4 h-4 bg-white/5 rounded" />
              <div className="w-1/2 h-3 bg-white/5 rounded" />
            </div>
          </div>
        );
      case 'repo-slim':
        return (
          <div className="glass-card p-4 animate-pulse">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-5 h-5 bg-white/5 rounded" />
              <div className="w-32 h-4 bg-white/5 rounded" />
            </div>
            <div className="w-full h-3 bg-white/5 rounded mb-2" />
            <div className="flex gap-2">
              <div className="w-12 h-3 bg-white/5 rounded" />
              <div className="w-12 h-3 bg-white/5 rounded" />
            </div>
          </div>
        );
      default:
        return (
          <div className="glass-card p-6 h-40 animate-pulse bg-white/5" />
        );
    }
  };

  return (
    <>
      {skeletons.map((_, i) => (
        <React.Fragment key={i}>
          {renderSkeleton()}
        </React.Fragment>
      ))}
    </>
  );
};

export default SkeletonLoader;
