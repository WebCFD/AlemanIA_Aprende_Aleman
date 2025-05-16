import { useState } from "react";
import DifficultySelector from "./DifficultySelector";
import VocabularyCard from "./VocabularyCard";
import { Difficulty } from "@shared/schema";

export default function VocabularySection() {
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>("A");
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const handleDifficultyChange = (difficulty: Difficulty) => {
    setCurrentDifficulty(difficulty);
  };

  const handleCorrectAnswer = () => {
    setCorrectCount(prev => prev + 1);
  };

  const handleIncorrectAnswer = () => {
    setIncorrectCount(prev => prev + 1);
  };

  return (
    <section id="vocabulario" className="mb-16">
      <div className="mb-8">
        <DifficultySelector 
          currentDifficulty={currentDifficulty} 
          onDifficultyChange={handleDifficultyChange} 
        />
      </div>

      <div className="text-center mb-10">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#4A6FA5] mb-4">
          Aprende Vocabulario
        </h2>
        <p className="text-neutral-300 max-w-2xl mx-auto">
          Practica con las palabras más usadas en alemán según tu nivel. Traduce del alemán al español y mejora tu vocabulario.
        </p>
      </div>

      <VocabularyCard 
        difficulty={currentDifficulty}
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        onCorrectAnswer={handleCorrectAnswer}
        onIncorrectAnswer={handleIncorrectAnswer}
      />
    </section>
  );
}
