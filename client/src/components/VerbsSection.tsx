import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import VerbsCard from "./VerbsCard";
import { Difficulty } from "@shared/schema";

interface VerbsSectionProps {
  sharedDifficulty: Difficulty;
}

export default function VerbsSection({ sharedDifficulty }: VerbsSectionProps) {
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [incorrectCount, setIncorrectCount] = useState<number>(0);

  const handleCorrectAnswer = () => {
    setCorrectCount(count => count + 1);
  };

  const handleIncorrectAnswer = () => {
    setIncorrectCount(count => count + 1);
  };

  return (
    <section id="verbs" className="mt-12 mb-16">
      <div className="text-center mb-10">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#4A6FA5] mb-4">
          Practica la conjugación de verbos
        </h2>
        <p className="text-neutral-300 max-w-2xl mx-auto">
          Conjuga correctamente los verbos alemanes en presente para mejorar tu fluidez y gramática.
        </p>
      </div>
      
      <VerbsCard
        difficulty={sharedDifficulty}
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        onCorrectAnswer={handleCorrectAnswer}
        onIncorrectAnswer={handleIncorrectAnswer}
      />
    </section>
  );
}