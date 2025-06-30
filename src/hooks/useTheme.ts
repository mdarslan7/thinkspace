import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Theme } from '../types/journal';

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>('thinkspace-theme', 'light');

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
}