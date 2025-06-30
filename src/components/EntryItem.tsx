import React, { useState } from "react";
import { ChevronDown, ChevronRight, Trash2 } from "lucide-react";
import { JournalEntry } from "../types/journal";

interface EntryItemProps {
  entry: JournalEntry;
  onDeleteEntry: (entryId: string) => void;
}

export const EntryItem: React.FC<EntryItemProps> = ({
  entry,
  onDeleteEntry,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const previewText = entry.content.slice(0, 120);
  const needsExpansion = entry.content.length > 120;

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteEntry(entry.id);
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      {showDeleteConfirm ? (
        <div className="p-4">
          <p className="text-sm text-red-700 dark:text-red-300 mb-4">
            Are you sure you want to delete this entry? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={handleConfirmDelete}
              className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 focus-ring"
            >
              Yes, delete it
            </button>
            <button
              onClick={handleCancelDelete}
              className="px-3 py-1 text-sm rounded bg-stone-200 text-stone-700 hover:bg-stone-300 transition-colors duration-200 focus-ring"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div
            className="cursor-pointer"
            onClick={() => needsExpansion && setIsExpanded(!isExpanded)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className="text-sm text-stone-500 dark:text-stone-400 mb-1">
                  {formatDate(entry.date)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {needsExpansion && (
                  <button className="p-1 hover:bg-cream-100 dark:hover:bg-stone-700 rounded focus-ring">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-stone-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-stone-400" />
                    )}
                  </button>
                )}
                <button
                  onClick={handleDeleteClick}
                  className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded focus-ring text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                  title="Delete entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="font-serif text-stone-700 dark:text-stone-200 leading-relaxed">
              {isExpanded || !needsExpansion ? (
                <p className="whitespace-pre-wrap">{entry.content}</p>
              ) : (
                <p className="whitespace-pre-wrap">
                  {previewText}
                  {needsExpansion && (
                    <span className="text-stone-400 dark:text-stone-500">
                      ...
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
