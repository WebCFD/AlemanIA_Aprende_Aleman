import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Difficulty } from '@shared/schema';

interface DifficultyContextType {
  currentDifficulty: Difficulty;
  setCurrentDifficulty: (difficulty: Difficulty) => void;
}

const DifficultyContext = createContext<DifficultyContextType | undefined>(undefined);

export function DifficultyProvider({ children }: { children: ReactNode }) {
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>('A');

  return (
    <DifficultyContext.Provider value={{ currentDifficulty, setCurrentDifficulty }}>
      {children}
    </DifficultyContext.Provider>
  );
}

export function useDifficulty() {
  const context = useContext(DifficultyContext);
  
  if (context === undefined) {
    throw new Error('useDifficulty must be used within a DifficultyProvider');
  }
  
  return context;
}