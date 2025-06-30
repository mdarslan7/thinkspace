import { DailyPrompt } from "../types/journal";

export const DAILY_PROMPTS: DailyPrompt[] = [
  {
    id: "1",
    text: "What are you grateful for right now?",
  },
  {
    id: "2",
    text: "What's bringing you peace today?",
  },
  {
    id: "3",
    text: "What small moment made you smile recently?",
  },
  {
    id: "4",
    text: "What would you like to let go of today?",
  },
  {
    id: "5",
    text: "What's something you learned about yourself lately?",
  },
  {
    id: "6",
    text: "What are you looking forward to?",
  },
  {
    id: "7",
    text: "What's challenging you right now, and how are you growing from it?",
  },
  {
    id: "8",
    text: "What does self-care look like for you today?",
  },
  {
    id: "9",
    text: "What's one thing you're proud of accomplishing recently?",
  },
  {
    id: "10",
    text: "How do you want to show up in the world today?",
  },
];

export const getTodaysPrompt = (): DailyPrompt => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const promptIndex = dayOfYear % DAILY_PROMPTS.length;
  return DAILY_PROMPTS[promptIndex];
};
