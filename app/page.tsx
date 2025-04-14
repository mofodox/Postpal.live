import Link from 'next/link';
import Button from './components/Button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="max-w-3xl w-full text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Turn your product into scroll-stopping content
          </h1>
          
          <p className="text-lg mb-10 text-foreground/70">
            Describe what you sell, and we'll generate ready-to-post content ideas for your social media platforms.
          </p>
          
          <Link href="/generate" className="inline-block">
            <Button 
              variant="primary"
              className="px-8"
              ariaLabel="Start creating content"
            >
              Start Creating
            </Button>
          </Link>
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
