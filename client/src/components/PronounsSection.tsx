import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import PronounCard from "./PronounCard";
import { useDifficulty } from "../context/DifficultyContext";
import { Difficulty } from "@shared/schema";

interface PronounsSectionProps {
  sharedDifficulty?: Difficulty; // Hacemos el prop opcional
}

export default function PronounsSection({ sharedDifficulty }: PronounsSectionProps) {
  // Usamos el contexto si no se proporciona la dificultad como prop
  const { currentDifficulty } = useDifficulty();
  // Aseguramos que siempre tengamos un valor válido para difficulty, currentDifficulty nunca será undefined
  const difficulty = sharedDifficulty ?? currentDifficulty;
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [incorrectCount, setIncorrectCount] = useState<number>(0);

  const handleCorrectAnswer = () => {
    setCorrectCount(count => count + 1);
  };

  const handleIncorrectAnswer = () => {
    setIncorrectCount(count => count + 1);
  };

  return (
    <section id="pronouns" className="mt-12 mb-16">
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