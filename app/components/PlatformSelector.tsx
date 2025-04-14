'use client';

import React from 'react';
import Image from 'next/image';

type Platform = 'tiktok' | 'instagram' | 'reels' | 'all';

type PlatformSelectorProps = {
  selectedPlatform: Platform;
  onChange: (platform: Platform) => void;
  className?: string;
};

const platforms = [
  { id: 'tiktok', label: 'TikTok', icon: '/tiktok-icon.svg' },
  { id: 'instagram', label: 'Instagram', icon: '/instagram-icon.svg' },
  { id: 'reels', label: 'Reels', icon: '/reels-icon.svg' },
  { id: 'all', label: 'All', icon: '/all-platforms-icon.svg' },
];

const PlatformSelector = ({
  selectedPlatform,
  onChange,
  className = '',
}: PlatformSelectorProps) => {
  return (
    <div className={`w-full ${className}`}>
      <p className="block text-sm font-medium mb-3">Which platform?</p>
      <div className="flex flex-wrap gap-3">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            type="button"
            className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
              selectedPlatform === platform.id
                ? 'border-foreground bg-foreground/5'
                : 'border-gray-300 dark:border-gray-700'
            } hover:border-foreground hover:bg-foreground/5 transition-all`}
            onClick={() => onChange(platform.id as Platform)}
            aria-label={`Select ${platform.label}`}
            aria-selected={selectedPlatform === platform.id}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onChange(platform.id as Platform);
              }
            }}
          >
            <div className="w-8 h-8 mb-2 relative">
              {/* Placeholder for image - in production you'd have actual platform icons */}
              <div className="w-full h-full rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-xs">
                {platform.label.charAt(0)}
              </div>
            </div>
            <span className="text-xs font-medium">{platform.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlatformSelector; 