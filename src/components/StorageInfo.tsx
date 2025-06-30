import React from "react";
import { getStorageInfo } from "../utils/storage";

export const StorageInfo: React.FC = () => {
  const storageInfo = getStorageInfo();

  return (
    <div className="bg-cream-50 dark:bg-stone-800 border border-cream-200 dark:border-stone-700 rounded-lg p-4 mt-6">
      <h3 className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-3">
        Storage Information
      </h3>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-stone-500 dark:text-stone-400">Total Entries</p>
          <p className="text-stone-700 dark:text-stone-200 font-medium">
            {storageInfo.entryCount}
          </p>
        </div>

        <div>
          <p className="text-stone-500 dark:text-stone-400">Storage Used</p>
          <p className="text-stone-700 dark:text-stone-200 font-medium">
            {storageInfo.totalSizeKB} KB ({storageInfo.usagePercentage}%)
          </p>
        </div>

        <div className="col-span-2">
          <p className="text-stone-500 dark:text-stone-400 mb-2">
            Storage Usage
          </p>
          <div className="w-full bg-stone-200 dark:bg-stone-600 rounded-full h-2">
            <div
              className="bg-sage-500 dark:bg-sage-400 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(storageInfo.usagePercentage, 100)}%`,
              }}
            />
          </div>
        </div>

        {storageInfo.approximateRemainingEntries > 0 && (
          <div className="col-span-2">
            <p className="text-stone-500 dark:text-stone-400">
              Approximate Remaining Entries
            </p>
            <p className="text-stone-700 dark:text-stone-200 font-medium">
              ~{storageInfo.approximateRemainingEntries}
            </p>
          </div>
        )}
      </div>

      <div className="mt-3 p-3 bg-cream-100 dark:bg-stone-700 rounded text-xs text-stone-600 dark:text-stone-300">
        <p>
          <strong>Local Storage:</strong> Your entries are stored locally in
          your browser. Typical limit is ~5MB. Clear browser data will remove
          all entries.
        </p>
      </div>
    </div>
  );
};
