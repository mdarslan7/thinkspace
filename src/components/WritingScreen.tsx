import React, { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { JournalEntry } from "../types/journal";
import { getTodaysPrompt } from "../utils/prompts";
import {
  saveCurrentEntry,
  loadCurrentEntry,
  clearCurrentEntry,
} from "../utils/storage";
import { EntryList } from "./EntryList";
// import { StorageInfo } from "./StorageInfo";
import { ThemeToggle } from "./ThemeToggle";

interface WritingScreenProps {
  entries: JournalEntry[];
  onSaveEntry: (content: string, prompt?: string) => void;
  onDeleteEntry: (entryId: string) => void;
  onBack: () => void;
}

export const WritingScreen: React.FC<WritingScreenProps> = ({
  entries,
  onSaveEntry,
  onDeleteEntry,
  onBack,
}) => {
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const todaysPrompt = getTodaysPrompt();

  // Load current entry on mount
  useEffect(() => {
    const savedContent = loadCurrentEntry();
    setContent(savedContent);
  }, []);

  // Auto-save current content
  useEffect(() => {
    const timer = setTimeout(() => {
      saveCurrentEntry(content);
    }, 1000);

    return () => clearTimeout(timer);
  }, [content]);

  const handleSave = useCallback(async () => {
    if (!content.trim()) return;

    setIsSaving(true);

    try {
      onSaveEntry(content.trim(), todaysPrompt.text);
      setContent("");
      clearCurrentEntry();

      // Brief delay to show save feedback
      setTimeout(() => {
        setIsSaving(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to save entry:", error);
      setIsSaving(false);
    }
  }, [content, onSaveEntry, todaysPrompt.text]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-sage-50 dark:from-stone-900 dark:to-stone-800">
      {/* Header */}
      <div className="sticky top-0 bg-cream-50/80 dark:bg-stone-900/80 backdrop-blur-sm border-b border-cream-200 dark:border-stone-700 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-stone-600 dark:text-stone-300 hover:text-stone-800 dark:hover:text-stone-100 transition-colors focus-ring rounded-lg px-2 py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={!content.trim() || isSaving}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 focus-ring ${
                content.trim() && !isSaving
                  ? "bg-sage-600 hover:bg-sage-700 text-white shadow-sm hover:shadow-md"
                  : "bg-stone-200 dark:bg-stone-700 text-stone-400 dark:text-stone-500 cursor-not-allowed"
              }`}
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saved!" : "Save Entry"}
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Writing Area */}
        <div className="mb-12">
          {/* Daily Prompt */}
          <div className="mb-6">
            <p className="text-sage-600 dark:text-sage-400 font-serif text-lg italic text-center">
              "{todaysPrompt.text}"
            </p>
          </div>

          {/* Textarea */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Let your thoughts flow..."
            className="textarea-main"
            autoFocus
          />

          {/* Word count and tips */}
          <div className="flex justify-between items-center mt-3 text-sm text-stone-500 dark:text-stone-400">
            <span>
              {
                content
                  .trim()
                  .split(/\s+/)
                  .filter((word) => word.length > 0).length
              }{" "}
              words
            </span>
            <span className="hidden sm:block">
              Tip: Press Cmd/Ctrl + S to save
            </span>
          </div>
        </div>

        {/* Past Entries */}
        <EntryList entries={entries} onDeleteEntry={onDeleteEntry} />

        {/* Storage Information */}
        {/* <StorageInfo /> */}
      </div>
    </div>
  );
};
