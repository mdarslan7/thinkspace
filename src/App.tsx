import { useState, useEffect } from "react";
import { HomePage } from "./components/HomePage";
import { WritingScreen } from "./components/WritingScreen";
import { JournalEntry } from "./types/journal";
import { loadEntries, saveEntries, deleteEntry } from "./utils/storage";

type Screen = "home" | "writing";

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  // Load entries on app start
  useEffect(() => {
    const loadedEntries = loadEntries();
    setEntries(loadedEntries);
  }, []);

  const handleSaveEntry = (content: string, prompt?: string) => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      content,
      date: new Date(),
      prompt,
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    saveEntries(updatedEntries);
  };

  const handleDeleteEntry = (entryId: string) => {
    const updatedEntries = deleteEntry(entryId, entries);
    setEntries(updatedEntries);
  };

  const handleStartWriting = () => {
    setCurrentScreen("writing");
  };

  const handleBackToHome = () => {
    setCurrentScreen("home");
  };

  return (
    <>
      {currentScreen === "home" && (
        <HomePage onStartWriting={handleStartWriting} />
      )}
      {currentScreen === "writing" && (
        <WritingScreen
          entries={entries}
          onSaveEntry={handleSaveEntry}
          onDeleteEntry={handleDeleteEntry}
          onBack={handleBackToHome}
        />
      )}
    </>
  );
}

export default App;
