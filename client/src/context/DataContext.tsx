import React, { createContext, useContext, useEffect, useState } from 'react';
import { Word, Sentence, Verb, Difficulty } from '@shared/schema';

interface DataContextType {
  vocabularyData: Record<Difficulty, Word | null>;
  sentenceData: Record<Difficulty, any | null>;
  verbData: Record<Difficulty, any | null>;
  setVocabularyData: (difficulty: Difficulty, data: Word) => void;
  setSentenceData: (difficulty: Difficulty, data: any) => void;
  setVerbData: (difficulty: Difficulty, data: any) => void;
  refreshVocabulary: (difficulty: Difficulty) => void;
  refreshSentence: (difficulty: Difficulty) => void;
  refreshVerb: (difficulty: Difficulty) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [vocabularyData, setVocabularyDataState] = useState<Record<Difficulty, Word | null>>({
    A: null,
    B: null,
    C: null,
  });

  const [sentenceData, setSentenceDataState] = useState<Record<Difficulty, any | null>>({
    A: null,
    B: null,
    C: null,
  });

  const [verbData, setVerbDataState] = useState<Record<Difficulty, any | null>>({
    A: null,
    B: null,
    C: null,
  });

  const setVocabularyData = (difficulty: Difficulty, data: Word) => {
    setVocabularyDataState(prev => ({ ...prev, [difficulty]: data }));
  };

  const setSentenceData = (difficulty: Difficulty, data: any) => {
    setSentenceDataState(prev => ({ ...prev, [difficulty]: data }));
  };

  const setVerbData = (difficulty: Difficulty, data: any) => {
    setVerbDataState(prev => ({ ...prev, [difficulty]: data }));
  };

  const refreshVocabulary = async (difficulty: Difficulty) => {
    try {
      const response = await fetch(`/api/vocabulary/random?difficulty=${difficulty}`);
      const data = await response.json();
      setVocabularyData(difficulty, data);
    } catch (error) {
      console.error('Error fetching vocabulary:', error);
    }
  };

  const refreshSentence = async (difficulty: Difficulty) => {
    try {
      const response = await fetch(`/api/sentences/random?difficulty=${difficulty}`);
      const data = await response.json();
      setSentenceData(difficulty, data);
    } catch (error) {
      console.error('Error fetching sentence:', error);
    }
  };

  const refreshVerb = async (difficulty: Difficulty) => {
    try {
      const response = await fetch(`/api/verbs/random?difficulty=${difficulty}`);
      const data = await response.json();
      setVerbData(difficulty, data);
    } catch (error) {
      console.error('Error fetching verb:', error);
    }
  };

  return (
    <DataContext.Provider value={{
      vocabularyData,
      sentenceData,
      verbData,
      setVocabularyData,
      setSentenceData,
      setVerbData,
      refreshVocabulary,
      refreshSentence,
      refreshVerb,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}