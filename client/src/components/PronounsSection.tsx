import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import DifficultySelector from "./DifficultySelector";
import PronounCard from "./PronounCard";
import { Difficulty } from "@shared/schema";

export default function PronounsSection() {
  const [difficulty, setDifficulty] = useState<Difficulty>("A");
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [incorrectCount, setIncorrectCount] = useState<number>(0);
  const [showFullExercise, setShowFullExercise] = useState<boolean>(false);

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
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Practica con pronombres y declinaciones</h2>
        <p className="text-gray-600">
          Completa las frases con el pronombre o artículo correcto para practicar la gramática alemana.
        </p>
      </div>
      
      {showFullExercise ? (
        <PronounCard
          difficulty={difficulty}
          correctCount={correctCount}
          incorrectCount={incorrectCount}
          onCorrectAnswer={handleCorrectAnswer}
          onIncorrectAnswer={handleIncorrectAnswer}
        />
      ) : (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-blue-800 mb-3">¡Nuevo ejercicio disponible!</h3>
          <p className="text-blue-700 mb-4">
            Practica el uso de pronombres y artículos en frases alemanas completas.
          </p>
          <button
            onClick={() => setShowFullExercise(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium transition-colors"
          >
            Comenzar ejercicio
          </button>
        </div>
      )}
      
      <div className="mt-8 bg-amber-50 border border-amber-100 rounded-lg p-4 text-sm text-amber-800">
        <p className="font-semibold mb-1">¿Por qué es importante?</p>
        <p>
          Los pronombres personales (ich, du, er/sie/es...) y los artículos (der, die, das...) son fundamentales 
          en alemán. A diferencia del español, los sustantivos tienen género gramatical que afecta a los artículos
          y otros elementos de la oración.
        </p>
      </div>
    </section>
  );
}