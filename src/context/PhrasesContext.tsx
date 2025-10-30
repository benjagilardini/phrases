import React, { createContext, useContext, useState, PropsWithChildren } from "react";
import { Phrase } from "../interfaces";
import { phrasesMock } from "../mocks/phrasesMock";

type PhrasesContextType = {
  phrases: Phrase[];
  addPhrase: (text: string) => void;
  removePhrase: (id: string) => void;
  clearPhrases: () => void;
};

const PhrasesContext = createContext<PhrasesContextType | null>(null);

export const PhrasesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [phrases, setPhrases] = useState<Phrase[]>(phrasesMock);

  const addPhrase = (text: string) => {
    const newPhrase = { id: crypto.randomUUID(), text };
    setPhrases((prev) => [newPhrase, ...prev]);
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
