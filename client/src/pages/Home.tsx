import { useState, useEffect } from "react";
import VocabularySection from "@/components/VocabularySection";
import PronounsSection from "@/components/PronounsSection";
import VerbsSection from "@/components/VerbsSection";
import DifficultySelector from "@/components/DifficultySelector";
import { Difficulty } from "@shared/schema";

export default function Home() {
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>("A");

  // Efecto para asegurar que la página se cargue desde la parte superior
  useEffect(() => {
    console.log('Home useEffect ejecutado', { 
      scrollY: window.scrollY,
      hash: window.location.hash,
      href: window.location.href,
      documentHeight: document.body.scrollHeight
    });
    window.scrollTo(0, 0);
    console.log('Home después de scrollTo', { scrollY: window.scrollY });
  }, []);

  const handleDifficultyChange = (difficulty: Difficulty) => {
    setCurrentDifficulty(difficulty);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mb-8">
        <DifficultySelector 
          currentDifficulty={currentDifficulty} 
          onDifficultyChange={handleDifficultyChange} 
        />
      </div>
      
      <VocabularySection sharedDifficulty={currentDifficulty} />
      <PronounsSection sharedDifficulty={currentDifficulty} />
      <VerbsSection sharedDifficulty={currentDifficulty} />
    </div>
  );
}
