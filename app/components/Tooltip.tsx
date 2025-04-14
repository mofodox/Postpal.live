'use client';

import React, { useState, useEffect } from 'react';

type TooltipProps = {
  message: string;
  isVisible: boolean;
  className?: string;
};

const Tooltip = ({ message, isVisible, className = '' }: TooltipProps) => {
  return (
    <div 
      className={`
        absolute -top-8 left-1/2 transform -translate-x-1/2 
        bg-foreground text-background text-xs py-1 px-2 rounded 
        transition-opacity duration-200 pointer-events-none
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        ${className}
      `}
    >
      {message}
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 border-t-4 border-x-4 border-x-transparent border-foreground"></div>
    </div>
  );
};

export default Tooltip; 