import { useState } from "react";
import VocabularySection from "@/components/VocabularySection";
import PronounsSection from "@/components/PronounsSection";
import VerbsSection from "@/components/VerbsSection";
import { useDifficulty } from "../context/DifficultyContext";
import { Difficulty } from "@shared/schema";

export default function Home() {
  // Usar el contexto global de dificultad en lugar del estado local
  const { currentDifficulty } = useDifficulty();

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      {/* Se elimina el selector de dificultad de aquí ya que se ha movido al banner */}
      
      <VocabularySection sharedDifficulty={currentDifficulty} />
      <PronounsSection sharedDifficulty={currentDifficulty} />
      <VerbsSection sharedDifficulty={currentDifficulty} />
    </div>
  );
}