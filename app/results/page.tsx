'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ContentIdea, { Idea } from '../components/ContentIdea';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';

// This is just mock data for the demo
// In a real app, you would fetch real AI-generated ideas
const generateMockIdeas = (product: string, audience: string, platform: string, isFree = false): Idea[] => {
  const baseIdeas: Idea[] = [
    {
      id: '1',
      title: `Day in the Life of a ${product} Creator`,
      videoOutline: `Show your process of creating ${product}. Start with gathering materials, show the creation process, and the finished product.`,
      hook: `Ever wondered how ${product} is made? Here's a behind-the-scenes look at my process!`,
      caption: `Taking you behind the scenes of how I create each ${product} from start to finish! ✨\n\nIt takes [hours/days] to complete each piece, but the joy on customers' faces makes it all worth it.\n\n#${product.replace(/\s+/g, '')} #behindthescenes #smallbusiness`,
    },
    {
      id: '2',
      title: 'Customer Testimonial Showcase',
      videoOutline: `Show screenshots or videos of happy customers using your ${product}. Include text overlays with their feedback.`,
      hook: `Don't just take my word for it - here's what customers are saying about our ${product}!`,
      caption: `Nothing makes me happier than seeing how much people love their ${product}! 🥰\n\nSwipe to see what our amazing customers are saying. Want to join them? Link in bio!\n\n#${product.replace(/\s+/g, '')} #customerlove #testimonials`,
    },
    {
      id: '3',
      title: `Top 3 Reasons ${audience} Need ${product}`,
      videoOutline: `Create a countdown of three problems your ${product} solves for ${audience}. Show the problem, then immediately show your product as the solution.`,
      hook: `${audience} have these 3 common problems that our ${product} solves perfectly!`,
      caption: `If you're part of the ${audience} community, you probably struggle with these issues daily!\n\nOur ${product} was designed specifically to help with all three. Which one resonates with you most?\n\n#${product.replace(/\s+/g, '')} #${audience.replace(/\s+/g, '')} #problemsolved`,
    }
  ];

  return isFree ? [baseIdeas[0]] : baseIdeas;
};

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => {
    const product = searchParams.get('product') || '';
    const audience = searchParams.get('audience') || '';
    const goal = searchParams.get('goal') || '';
    const platform = searchParams.get('platform') || 'all';
    
    // Simulate API call delay
    setTimeout(() => {
      // Demo: 70% chance of showing free tier (1 idea) to encourage upgrades
      const isFree = Math.random() > 0.3;
      setIdeas(generateMockIdeas(product, audience, platform, isFree));
      setLoading(false);
      setShowUpgrade(isFree);
    }, 2000);
  }, [searchParams]);

  const handleRegenerate = () => {
    setLoading(true);
    
    // Simulate regeneration
    setTimeout(() => {
      const product = searchParams.get('product') || '';
      const audience = searchParams.get('audience') || '';
      const platform = searchParams.get('platform') || 'all';
      
      // Get fresh ideas but maintain the same tier
      setIdeas(generateMockIdeas(product, audience, platform, ideas.length === 1));
      setLoading(false);
    }, 2000);
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
          <p className="text-foreground/70 mb-8">Here are some content ideas based on your inputs.</p>
          
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