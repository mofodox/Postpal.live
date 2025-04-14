'use client';

import React from 'react';

type LoadingSpinnerProps = {
  className?: string;
  text?: string;
};

const LoadingSpinner = ({ 
  className = '', 
  text = 'Generating ideas...' 
}: LoadingSpinnerProps) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="w-10 h-10 border-4 border-foreground/20 border-t-foreground rounded-full animate-spin mb-3"></div>
      <p className="text-sm text-foreground/70">{text}</p>
    </div>
  );
};

export default LoadingSpinner; 