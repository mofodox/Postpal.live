'use client';

import React, { useState } from 'react';
import Button from './Button';
import Tooltip from './Tooltip';

export type Idea = {
  id: string;
  title: string;
  videoOutline: string;
  hook: string;
  caption: string;
};

type ContentIdeaProps = {
  idea: Idea;
  className?: string;
};

const ContentIdea = ({ idea, className = '' }: ContentIdeaProps) => {
  const [tooltipState, setTooltipState] = useState({
    script: false,
    caption: false,
    all: false
  });

  const showTooltip = (type: 'script' | 'caption' | 'all') => {
    setTooltipState((prev) => ({ ...prev, [type]: true }));
    
    // Hide tooltip after 2 seconds
    setTimeout(() => {
      setTooltipState((prev) => ({ ...prev, [type]: false }));
    }, 2000);
  };

  const handleCopyScript = () => {
    const text = `${idea.title}\n\n${idea.hook}\n\n${idea.videoOutline}`;
    navigator.clipboard.writeText(text);
    showTooltip('script');
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(idea.caption);
    showTooltip('caption');
  };

  const handleCopyAll = () => {
    const text = `${idea.title}\n\n${idea.hook}\n\n${idea.videoOutline}\n\n${idea.caption}`;
    navigator.clipboard.writeText(text);
    showTooltip('all');
  };

  return (
    <div className={`p-6 rounded-xl border border-gray-200 dark:border-gray-800 ${className}`}>
      <h3 className="text-lg font-bold mb-4">{idea.title}</h3>
      
      <div className="space-y-4 mb-6">
        <div>
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Hook:</h4>
          <p className="text-sm">{idea.hook}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Video Outline:</h4>
          <p className="text-sm">{idea.videoOutline}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Caption:</h4>
          <p className="text-sm">{idea.caption}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <div className="flex-1 relative">
          <Tooltip message="Copied!" isVisible={tooltipState.script} />
          <Button 
            variant="secondary" 
            onClick={handleCopyScript}
            className="w-full text-xs" 
            ariaLabel="Copy script"
          >
            Copy Script
          </Button>
        </div>
        
        <div className="flex-1 relative">
          <Tooltip message="Copied!" isVisible={tooltipState.caption} />
          <Button 
            variant="secondary" 
            onClick={handleCopyCaption}
            className="w-full text-xs" 
            ariaLabel="Copy caption"
          >
            Copy Caption
          </Button>
        </div>
        
        <div className="flex-1 relative">
          <Tooltip message="Copied!" isVisible={tooltipState.all} />
          <Button 
            variant="secondary" 
            onClick={handleCopyAll}
            className="w-full text-xs" 
            ariaLabel="Copy all"
          >
            Copy All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentIdea; 