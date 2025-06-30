import React from 'react';
import { PenTool } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface HomePageProps {
  onStartWriting: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStartWriting }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-sage-50 dark:from-stone-900 dark:to-stone-800">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-lg">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-sage-100 dark:bg-sage-800 rounded-full mb-6">
              <PenTool className="w-10 h-10 text-sage-600 dark:text-sage-400" />
            </div>
            <h1 className="text-4xl font-serif font-semibold text-stone-800 dark:text-stone-100 mb-4">
              Thinkspace
            </h1>
            <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
              A calm, distraction-free space for your thoughts. 
              Write freely, reflect deeply, and let your ideas flow.
            </p>
          </div>
          
          <button
            onClick={onStartWriting}
            className="btn-primary text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Start Writing
          </button>
          
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-6">
            Your thoughts are private and stored securely on your device
          </p>
        </div>
      </div>
    </div>
  );
};