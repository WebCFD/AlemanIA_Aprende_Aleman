import { useState } from "react";
import VocabularyCard from "./VocabularyCard";
import { useDifficulty } from "../context/DifficultyContext";
import { Difficulty } from "@shared/schema";

interface VocabularySectionProps {
  sharedDifficulty?: Difficulty; // Hacemos el prop opcional
}

export default function VocabularySection({ sharedDifficulty }: VocabularySectionProps) {
  // Usamos el contexto si no se proporciona la dificultad como prop
  const { currentDifficulty } = useDifficulty();
  // Aseguramos que siempre tengamos un valor válido para difficulty, currentDifficulty nunca será undefined
  const difficulty = sharedDifficulty ?? currentDifficulty;
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const handleCorrectAnswer = () => {
    setCorrectCount(prev => prev + 1);
  };

  const handleIncorrectAnswer = () => {
    setIncorrectCount(prev => prev + 1);
  };

  return (
    <section id="vocabulario" className="mb-16">
      <div className="text-center mb-10">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#4A6FA5] mb-4">
          Aprende Vocabulario
        </h2>
        <p className="text-neutral-300 max-w-2xl mx-auto">
          Practica con las palabras más usadas en alemán según tu nivel. Traduce del alemán al español y mejora tu vocabulario.
        </p>
      </div>

      <VocabularyCard 
        difficulty={difficulty}
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        onCorrectAnswer={handleCorrectAnswer}
        onIncorrectAnswer={handleIncorrectAnswer}
      />
    </section>
  );
}
