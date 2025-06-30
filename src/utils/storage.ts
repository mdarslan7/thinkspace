import { JournalEntry } from '../types/journal';

const STORAGE_KEY = 'thinkspace-entries';
const CURRENT_ENTRY_KEY = 'thinkspace-current-entry';

export const saveEntries = (entries: JournalEntry[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Failed to save entries:', error);
  }
};

export const loadEntries = (): JournalEntry[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const entries = JSON.parse(stored);
    return entries.map((entry: any) => ({
      ...entry,
      date: new Date(entry.date)
    }));
  } catch (error) {
    console.error('Failed to load entries:', error);
    return [];
  }
};

export const saveCurrentEntry = (content: string): void => {
  try {
    localStorage.setItem(CURRENT_ENTRY_KEY, content);
  } catch (error) {
    console.error('Failed to save current entry:', error);
  }
};

export const loadCurrentEntry = (): string => {
  try {
    return localStorage.getItem(CURRENT_ENTRY_KEY) || '';
  } catch (error) {
    console.error('Failed to load current entry:', error);
    return '';
  }
};

export const clearCurrentEntry = (): void => {
  try {
    localStorage.removeItem(CURRENT_ENTRY_KEY);
  } catch (error) {
    console.error('Failed to clear current entry:', error);
  }
};