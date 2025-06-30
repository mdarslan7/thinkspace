export interface JournalEntry {
  id: string;
  content: string;
  date: Date;
  prompt?: string;
}

export interface DailyPrompt {
  id: string;
  text: string;
}

export type Theme = 'light' | 'dark';