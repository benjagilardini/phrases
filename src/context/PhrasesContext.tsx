import React, { createContext, useContext, useState, PropsWithChildren } from "react";
import { Phrase } from "../interfaces";
import { phrasesMock } from "../mocks/phrasesMock";

type PhrasesContextType = {
  phrases: Phrase[];
  addPhrase: (text: string, author?: string) => void;
  updatePhrase: (id: string, updates: Partial<Pick<Phrase, "text" | "author">>) => void;
  toggleFavorite: (id: string) => void;
  removePhrase: (id: string) => void;
  clearPhrases: () => void;
};

const PhrasesContext = createContext<PhrasesContextType | null>(null);

export const PhrasesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [phrases, setPhrases] = useState<Phrase[]>(phrasesMock);

  const addPhrase = (text: string, author = "Anónimo") => {
    const newPhrase: Phrase = {
      id: crypto.randomUUID(),
      text: text.trim(),
      author: author.trim() || "Anónimo",
      createdAt: new Date().toISOString(),
      favorite: false,
    };
    setPhrases((prev) => [newPhrase, ...prev]);
  };

  const updatePhrase: PhrasesContextType["updatePhrase"] = (id, updates) => {
    setPhrases((prev) =>
      prev.map((phrase) =>
        phrase.id === id
          ? {
              ...phrase,
              ...(updates.text !== undefined ? { text: updates.text.trim() } : null),
              ...(updates.author !== undefined ? { author: updates.author.trim() || "Anónimo" } : null),
            }
          : phrase
      )
    );
  };

  const toggleFavorite: PhrasesContextType["toggleFavorite"] = (id) => {
    setPhrases((prev) =>
      prev.map((phrase) => (phrase.id === id ? { ...phrase, favorite: !phrase.favorite } : phrase))
    );
  };

  const removePhrase = (id: string) => {
    setPhrases((prev) => prev.filter((p) => p.id !== id));
  };

  const clearPhrases = () => setPhrases([]);

  return (
    <PhrasesContext.Provider
      value={{
        phrases,
        addPhrase,
        updatePhrase,
        toggleFavorite,
        removePhrase,
        clearPhrases,
      }}
    >
      {children}
    </PhrasesContext.Provider>
  );
};

export const usePhrases = () => {
  const context = useContext(PhrasesContext);
  if (!context) throw new Error("usePhrases must be used inside <PhrasesProvider>");
  return context;
};
