import { JournalEntry } from "../types/journal";

const STORAGE_KEY = "thinkspace-entries";
const CURRENT_ENTRY_KEY = "thinkspace-current-entry";

export const saveEntries = (entries: JournalEntry[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error("Failed to save entries:", error);
  }
};

export const loadEntries = (): JournalEntry[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const entries = JSON.parse(stored);
    return entries.map((entry: JournalEntry & { date: string | Date }) => ({
      ...entry,
      date: new Date(entry.date),
    }));
  } catch (error) {
    console.error("Failed to load entries:", error);
    return [];
  }
};

export const saveCurrentEntry = (content: string): void => {
  try {
    localStorage.setItem(CURRENT_ENTRY_KEY, content);
  } catch (error) {
    console.error("Failed to save current entry:", error);
  }
};

export const loadCurrentEntry = (): string => {
  try {
    return localStorage.getItem(CURRENT_ENTRY_KEY) || "";
  } catch (error) {
    console.error("Failed to load current entry:", error);
    return "";
  }
};

export const clearCurrentEntry = (): void => {
  try {
    localStorage.removeItem(CURRENT_ENTRY_KEY);
  } catch (error) {
    console.error("Failed to clear current entry:", error);
  }
};

export const deleteEntry = (
  entryId: string,
  entries: JournalEntry[]
): JournalEntry[] => {
  const updatedEntries = entries.filter((entry) => entry.id !== entryId);
  saveEntries(updatedEntries);
  return updatedEntries;
};

export const getStorageInfo = () => {
  try {
    const entries = loadEntries();
    const entriesSize = new Blob([JSON.stringify(entries)]).size;
    const currentEntrySize = new Blob([loadCurrentEntry()]).size;
    const totalSize = entriesSize + currentEntrySize;

    // LocalStorage limit is typically 5-10MB, let's assume 5MB for safety
    const storageLimit = 5 * 1024 * 1024; // 5MB in bytes
    const usagePercentage = (totalSize / storageLimit) * 100;

    return {
      entryCount: entries.length,
      totalSizeBytes: totalSize,
      totalSizeKB: Math.round(totalSize / 1024),
      usagePercentage: Math.round(usagePercentage * 100) / 100,
      approximateRemainingEntries: Math.floor(
        (storageLimit - totalSize) / (entriesSize / entries.length || 1000)
      ),
    };
  } catch (error) {
    console.error("Failed to get storage info:", error);
    return {
      entryCount: 0,
      totalSizeBytes: 0,
      totalSizeKB: 0,
      usagePercentage: 0,
      approximateRemainingEntries: 0,
    };
  }
};
