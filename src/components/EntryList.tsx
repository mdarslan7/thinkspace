import React from 'react';
import { JournalEntry } from '../types/journal';
import { EntryItem } from './EntryItem';

interface EntryListProps {
  entries: JournalEntry[];
}

export const EntryList: React.FC<EntryListProps> = ({ entries }) => {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-stone-500 dark:text-stone-400 font-serif text-lg">
          Your journal entries will appear here
        </p>
        <p className="text-stone-400 dark:text-stone-500 text-sm mt-2">
          Start writing to create your first entry
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-serif font-semibold text-stone-800 dark:text-stone-100 mb-6">
        Past Entries
      </h2>
      {entries.map((entry) => (
        <EntryItem key={entry.id} entry={entry} />
      ))}
    </div>
  );
};