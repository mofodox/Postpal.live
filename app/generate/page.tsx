'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextField from '../components/TextField';
import Dropdown from '../components/Dropdown';
import PlatformSelector from '../components/PlatformSelector';
import ModelSelector, { AI_MODELS } from '../components/ModelSelector';
import Button from '../components/Button';
import Link from 'next/link';

const postGoalOptions = [
  { value: 'awareness', label: 'Awareness' },
  { value: 'engagement', label: 'Engagement' },
  { value: 'sales', label: 'Sales' },
];

export default function GeneratePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    product: '',
    audience: '',
    goal: '',
    platform: 'all' as 'tiktok' | 'instagram' | 'reels' | 'all',
    model: AI_MODELS[0].id, // Default to the first model
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePlatformChange = (platform: 'tiktok' | 'instagram' | 'reels' | 'all') => {
    setFormData((prev) => ({ ...prev, platform }));
  };
  
  const handleModelChange = (model: string) => {
    setFormData((prev) => ({ ...prev, model }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Add loading animation
    setTimeout(() => {
      const queryParams = new URLSearchParams({
        product: formData.product,
        audience: formData.audience,
        goal: formData.goal,
        platform: formData.platform,
        model: formData.model,
      }).toString();
      
      router.push(`/results?${queryParams}`);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-6 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-xl font-bold">Postpal.live</Link>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Create Content Ideas</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
              id="product"
              label="What do you sell or offer?"
              placeholder="e.g. Handmade soy candles"
              value={formData.product}
              onChange={handleChange}
              required
            />
            
            <TextField
              id="audience"
              label="Who is your target audience?"
              placeholder="e.g. Home decor lovers, mostly women 25–40"
              value={formData.audience}
              onChange={handleChange}
              required
            />
            
            <Dropdown
              id="goal"
              label="What's your goal for this post? (optional)"
              options={postGoalOptions}
              value={formData.goal}
              onChange={handleChange}
            />
            
            <PlatformSelector
              selectedPlatform={formData.platform}
              onChange={handlePlatformChange}
              className="mb-4"
            />
            
            <ModelSelector
              selectedModel={formData.model}
              onChange={handleModelChange}
              className="mb-8"
            />
            
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isLoading}
              ariaLabel="Generate ideas"
            >
              {isLoading ? 'Generating Ideas...' : 'Generate Ideas'}
            </Button>
          </form>
        </div>
      </main>
      
      <footer className="py-6 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto text-center text-sm text-foreground/50">
          <p>© {new Date().getFullYear()} Postpal.live. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 