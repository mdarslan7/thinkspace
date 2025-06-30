import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { JournalEntry } from '../types/journal';

interface EntryItemProps {
  entry: JournalEntry;
}

export const EntryItem: React.FC<EntryItemProps> = ({ entry }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const previewText = entry.content.slice(0, 120);
  const needsExpansion = entry.content.length > 120;

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      <div
        className="cursor-pointer"
        onClick={() => needsExpansion && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-1">
              {formatDate(entry.date)}
            </p>
            {entry.prompt && (
              <p className="text-sm italic text-sage-600 dark:text-sage-400 mb-2">
                "{entry.prompt}"
              </p>
            )}
          </div>
          {needsExpansion && (
            <button className="p-1 hover:bg-cream-100 dark:hover:bg-stone-700 rounded focus-ring">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-stone-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-stone-400" />
              )}
            </button>
          )}
        </div>
        
        <div className="font-serif text-stone-700 dark:text-stone-200 leading-relaxed">
          {isExpanded || !needsExpansion ? (
            <p className="whitespace-pre-wrap">{entry.content}</p>
          ) : (
            <p className="whitespace-pre-wrap">
              {previewText}
              {needsExpansion && (
                <span className="text-stone-400 dark:text-stone-500">...</span>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};