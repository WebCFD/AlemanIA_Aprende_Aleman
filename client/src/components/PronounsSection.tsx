import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import PronounCard from "./PronounCard";
import { Difficulty } from "@shared/schema";

interface PronounsSectionProps {
  sharedDifficulty: Difficulty;
}

export default function PronounsSection({ sharedDifficulty }: PronounsSectionProps) {
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
        difficulty={sharedDifficulty}
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        onCorrectAnswer={handleCorrectAnswer}
        onIncorrectAnswer={handleIncorrectAnswer}
      />
    </section>
  );
}