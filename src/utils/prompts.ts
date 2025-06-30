import { DailyPrompt } from '../types/journal';

export const DAILY_PROMPTS: DailyPrompt[] = [
  {
    id: '1',
    text: "What's on your mind today?"
  },
  {
    id: '2',
    text: "What are you grateful for right now?"
  },
  {
    id: '3',
    text: "What's bringing you joy lately?"
  },
  {
    id: '4',
    text: "What would you like to let go of today?"
  },
  {
    id: '5',
    text: "What small moment made you smile recently?"
  }
];

export const getTodaysPrompt = (): DailyPrompt => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const promptIndex = dayOfYear % DAILY_PROMPTS.length;
  return DAILY_PROMPTS[promptIndex];
};