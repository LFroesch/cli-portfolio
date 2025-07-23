import React from 'react';

const SkeletonLoader = ({ className = '', variant = 'text' }) => {
  const baseClasses = 'animate-pulse bg-white/10 rounded';
  
  const variants = {
    text: 'h-4 w-full',
    title: 'h-6 w-3/4',
    number: 'h-8 w-16',
    card: 'h-24 w-full',
    image: 'h-48 w-full',
    button: 'h-10 w-24'
  };

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`}></div>
  );
};

// Skeleton components for specific use cases
export const StatsCardSkeleton = ({ getBorderRadius }) => (
  <div className={`p-4 bg-white/5 border border-white/20 text-center ${getBorderRadius('card')}`}>
    <SkeletonLoader variant="number" className="mx-auto mb-2" />
    <SkeletonLoader variant="text" className="h-3 w-20 mx-auto" />
  </div>
);

export const ProjectCardSkeleton = ({ getBorderRadius }) => (
  <div className={`border border-white/20 overflow-hidden ${getBorderRadius('card')}`}>
    <div className="p-6 lg:p-8 space-y-6">
      <div className="text-center space-y-4">
        <SkeletonLoader variant="title" className="mx-auto" />
        <SkeletonLoader variant="text" className="h-3 w-24 mx-auto" />
      </div>
      <div className="text-center space-y-2">
        <SkeletonLoader variant="text" className="mx-auto" />
        <SkeletonLoader variant="text" className="w-4/5 mx-auto" />
      </div>
      <div className="text-center">
        <div className="flex flex-wrap gap-2 justify-center">
          <SkeletonLoader variant="button" className="h-6 w-16" />
          <SkeletonLoader variant="button" className="h-6 w-20" />
          <SkeletonLoader variant="button" className="h-6 w-14" />
        </div>
      </div>
    </div>
    <SkeletonLoader variant="image" />
  </div>
);

export default SkeletonLoader;