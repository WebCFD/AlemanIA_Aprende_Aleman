import { useState } from "react";
import PrepositionsCard from "./PrepositionsCardNew";
import { useDifficulty } from "../context/DifficultyContext";
import { Difficulty } from "@shared/schema";

interface PrepositionsSectionProps {
  sharedDifficulty?: Difficulty; // Prop opcional
}

export default function PrepositionsSection({ sharedDifficulty }: PrepositionsSectionProps) {
  // Usamos el contexto si no se proporciona la dificultad como prop
  const { currentDifficulty } = useDifficulty();
  // Aseguramos que siempre tengamos un valor válido para difficulty
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
    <section id="prepositions" className="mt-12 mb-16">
      <div className="text-center mb-10">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#4A6FA5] mb-4">
          Practica las preposiciones alemanas
        </h2>
        <p className="text-neutral-300 max-w-2xl mx-auto">
          Aprende las preposiciones más usadas en alemán y cómo utilizarlas correctamente en frases.
        </p>
      </div>

      <PrepositionsCard 
        difficulty={difficulty}
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        onCorrectAnswer={handleCorrectAnswer}
        onIncorrectAnswer={handleIncorrectAnswer}
      />
    </section>
  );
}