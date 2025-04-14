'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ContentIdea, { Idea } from '../components/ContentIdea';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { AI_MODELS } from '../components/ModelSelector';

// Fallback mock data generator in case API fails
const generateFallbackIdea = (product: string, audience: string): Idea => {
  return {
    id: '1',
    title: `Day in the Life of a ${product} Creator`,
    videoOutline: `Show your process of creating ${product}. Start with gathering materials, show the creation process, and the finished product.`,
    hook: `Ever wondered how ${product} is made? Here's a behind-the-scenes look at my process!`,
    caption: `Taking you behind the scenes of how I create each ${product} from start to finish! ✨\n\nIt takes [hours/days] to complete each piece, but the joy on customers' faces makes it all worth it.\n\n#${product.replace(/\s+/g, '')} #behindthescenes #smallbusiness`,
  };
};

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [usedModel, setUsedModel] = useState<string>('');

  const fetchIdeas = async (isFree = false) => {
    setLoading(true);
    setError(null);
    
    const product = searchParams.get('product') || '';
    const audience = searchParams.get('audience') || '';
    const goal = searchParams.get('goal') || '';
    const platform = searchParams.get('platform') || 'all';
    const model = searchParams.get('model') || 'claude-3-haiku-20240307';
    
    // Set the model being used
    setUsedModel(model);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product,
          audience,
          goal,
          platform,
          model,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate ideas. Please try again.');
      }
      
      const data = await response.json();
      let generatedIdeas = data.ideas || [];
      
      // Apply free tier limitation (only show 1 idea)
      if (isFree && generatedIdeas.length > 1) {
        generatedIdeas = [generatedIdeas[0]];
        setShowUpgrade(true);
      } else {
        setShowUpgrade(false);
      }
      
      // Handle empty response
      if (generatedIdeas.length === 0) {
        generatedIdeas = [generateFallbackIdea(product, audience)];
      }
      
      setIdeas(generatedIdeas);
    } catch (err) {
      console.error('Error generating ideas:', err);
      setError('Failed to generate ideas. Please try again.');
      // Provide fallback idea
      setIdeas([generateFallbackIdea(product, audience)]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Demo: 70% chance of showing free tier (1 idea) to encourage upgrades
    const isFree = Math.random() > 0.3;
    fetchIdeas(isFree);
  }, [searchParams]);

  const handleRegenerate = () => {
    // Maintain the same tier (free or premium)
    fetchIdeas(ideas.length === 1);
  };

  // Get the model display name and provider
  const getModelDisplayInfo = () => {
    const model = AI_MODELS.find(m => m.id === usedModel);
    if (!model) return { name: 'AI', provider: 'unknown' };
    return { 
      name: model.name,
      provider: model.provider 
    };
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-6 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">Postpal.live</Link>
          <Link href="/generate">
            <Button 
              variant="secondary" 
              className="text-sm" 
              ariaLabel="Create new ideas"
            >
              New Ideas
            </Button>
          </Link>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Your Content Ideas</h1>
          
          <div className="flex items-center mb-8">
            <p className="text-foreground/70">Generated with {getModelDisplayInfo().name}</p>
            
            <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded"
              style={{
                backgroundColor: getModelDisplayInfo().provider === 'anthropic' ? '#5436DA' : '#19C37D',
                color: 'white'
              }}>
              {getModelDisplayInfo().provider === 'anthropic' ? 'Claude' : 'OpenAI'}
            </span>
          </div>
          
          {error && (
            <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 rounded-lg p-4 mb-8">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="py-20">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <div className="space-y-8 mb-12">
                {ideas.map((idea) => (
                  <ContentIdea key={idea.id} idea={idea} />
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="secondary" 
                  onClick={handleRegenerate}
                  ariaLabel="Regenerate ideas"
                >
                  Regenerate Ideas
                </Button>
              </div>
              
              {showUpgrade && (
                <div className="mt-12 p-6 border border-foreground/20 rounded-xl bg-foreground/5">
                  <h2 className="text-xl font-bold mb-2">Want more ideas?</h2>
                  <p className="mb-4">Upgrade to our premium plan for just $5/month to get 3 ideas per generation!</p>
                  <Button 
                    variant="primary"
                    ariaLabel="Upgrade to premium"
                  >
                    Upgrade to Premium
                  </Button>
                </div>
              )}
            </>
          )}
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