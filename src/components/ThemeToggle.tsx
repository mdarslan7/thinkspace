import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-cream-200 dark:bg-stone-700 hover:bg-cream-300 dark:hover:bg-stone-600 transition-colors duration-200 focus-ring"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-stone-600 dark:text-stone-300" />
      ) : (
        <Sun className="w-5 h-5 text-stone-600 dark:text-stone-300" />
      )}
    </button>
  );
};