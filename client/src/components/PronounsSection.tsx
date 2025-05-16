import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import DifficultySelector from "./DifficultySelector";
import PronounCard from "./PronounCard";
import { Difficulty } from "@shared/schema";

export default function PronounsSection() {
  const [difficulty, setDifficulty] = useState<Difficulty>("A");
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [incorrectCount, setIncorrectCount] = useState<number>(0);

  const handleDifficultyChange = (difficulty: Difficulty) => {
    setDifficulty(difficulty);
  };

  const handleCorrectAnswer = () => {
    setCorrectCount(count => count + 1);
  };

  const handleIncorrectAnswer = () => {
    setIncorrectCount(count => count + 1);
  };

  return (
    <section id="pronouns" className="mt-12 mb-16">
      <div className="mb-8">
        <DifficultySelector 
          currentDifficulty={difficulty} 
          onDifficultyChange={handleDifficultyChange} 
        />
      </div>

      <div className="text-center mb-10">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#4A6FA5] mb-4">
          Practica con pronombres y declinaciones
        </h2>
        <p className="text-neutral-300 max-w-2xl mx-auto">
          Completa las frases con el pronombre o artículo correcto para practicar la gramática alemana.
        </p>
      </div>
      
      <PronounCard
        difficulty={difficulty}
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        onCorrectAnswer={handleCorrectAnswer}
        onIncorrectAnswer={handleIncorrectAnswer}
      />
    </section>
  );
}