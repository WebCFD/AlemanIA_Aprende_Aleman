import { useState, useEffect } from "react";
import { Video, BookOpen, Film, Layers, MessageSquare, AlignJustify, Users, TextQuote, TypeIcon, Clock } from "lucide-react";
import { useDifficulty } from "../context/DifficultyContext";

export default function Videos() {
  const { currentDifficulty } = useDifficulty();

  // Función para obtener descripción del nivel
  const getLevelDescription = () => {
    switch (currentDifficulty) {
      case "A":
        return {
          title: "Videos Nivel Principiante (A1-A2)",
          description: "Videos básicos para comenzar tu aprendizaje del alemán con contenido visual y auditivo.",
          quote: "Ver y escuchar es la mejor forma de aprender un idioma nuevo."
        };
      case "B":
        return {
          title: "Videos Nivel Intermedio (B1-B2)", 
          description: "Videos intermedios para profundizar en gramática y conversación alemana.",
          quote: "La práctica audiovisual consolida el conocimiento intermedio."
        };
      case "C":
        return {
          title: "Videos Nivel Avanzado (C1-C2)",
          description: "Videos avanzados para perfeccionar tu dominio del alemán con contenido complejo.",
          quote: "La maestría se alcanza con contenido auténtico y desafiante."
        };
      default:
        return {
          title: "Videos Nivel Principiante (A1-A2)",
          description: "Videos básicos para comenzar tu aprendizaje del alemán.",
          quote: "Ver y escuchar es la mejor forma de aprender."
        };
    }
  };

  // Función para obtener tabla de contenidos según el nivel
  const getTableOfContents = () => {
    switch (currentDifficulty) {
      case "A":
        return [
          { id: "saludos-videos", title: "1. Saludos básicos" },
          { id: "sustantivos-videos", title: "2. Sustantivos y mayúsculas" },
          { id: "pronombres-videos", title: "3. Pronombres personales" },
          { id: "plural-videos", title: "4. Formación del plural" },
          { id: "expresiones-videos", title: "5. Expresiones útiles" },
          { id: "tiempo-presente-videos", title: "6. Tiempo presente" }
        ];
      case "B":
        return [
          { id: "casos-videos", title: "1. Casos alemanes (Nominativ, Akkusativ)" },
          { id: "verbos-modales-videos", title: "2. Verbos modales" },
          { id: "preposiciones-videos", title: "3. Preposiciones con casos" },
          { id: "orden-palabras-videos", title: "4. Orden de palabras" },
          { id: "tiempo-pasado-videos", title: "5. Tiempo pasado (Perfekt)" }
        ];
      case "C":
        return [
          { id: "casos-avanzados-videos", title: "1. Todos los casos (Dativ, Genitiv)" },
          { id: "subjuntivo-videos", title: "2. Subjuntivo (Konjunktiv I y II)" },
          { id: "voz-pasiva-videos", title: "3. Voz pasiva (Passiv)" },
          { id: "subordinadas-videos", title: "4. Oraciones subordinadas complejas" },
          { id: "idiomaticas-videos", title: "5. Expresiones idiomáticas avanzadas" }
        ];
      default:
        return [
          { id: "saludos-videos", title: "1. Saludos básicos" },
          { id: "sustantivos-videos", title: "2. Sustantivos y mayúsculas" },
          { id: "pronombres-videos", title: "3. Pronombres personales" },
          { id: "plural-videos", title: "4. Formación del plural" },
          { id: "expresiones-videos", title: "5. Expresiones útiles" },
          { id: "tiempo-presente-videos", title: "6. Tiempo presente" }
        ];
    }
  };

  // Función para renderizar contenido específico por nivel
  const renderLevelSpecificContent = () => {
    if (currentDifficulty === "A") {
      return (
        <>
          {/* Contenido nivel A - placeholder */}
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 font-medium">
              📺 Contenido del Nivel A - En desarrollo
            </p>
            <p className="text-blue-700 text-sm mt-2">
              Aquí se añadirá el contenido específico de videos para el nivel principiante.
            </p>
          </div>
        </>
      );
    } else if (currentDifficulty === "B") {
      return (
        <>
          {/* Contenido nivel B - placeholder */}
          <div className="mb-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-orange-800 font-medium">
              📚 Contenido del Nivel B - En desarrollo
            </p>
            <p className="text-orange-700 text-sm mt-2">
              Aquí se añadirá el contenido específico de videos para el nivel intermedio.
            </p>
          </div>
        </>
      );
    } else if (currentDifficulty === "C") {
      return (
        <>
          {/* Contenido nivel C - placeholder */}
          <div className="mb-8 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-purple-800 font-medium">
              🎓 Contenido del Nivel C - En desarrollo
            </p>
            <p className="text-purple-700 text-sm mt-2">
              Aquí se añadirá el contenido específico de videos para el nivel avanzado.
            </p>
          </div>
        </>
      );
    }
  };

  // Efecto para scroll automático a la sección guardada en localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      const sectionId = localStorage.getItem('scrollToSectionVideo');
      
      if (sectionId) {
        localStorage.removeItem('scrollToSectionVideo');
        
        const element = document.querySelector(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#4A6FA5] mb-6">Biblioteca de Videos</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {getLevelDescription().title}
          </h2>
          
          <p className="text-gray-600 mb-6">
            {getLevelDescription().description}
          </p>
          
          <div className="border-l-4 border-[#4A6FA5] pl-4 py-2 bg-blue-50 mb-6">
            <p className="italic text-gray-700">
              "{getLevelDescription().quote}"
            </p>
          </div>

          {/* Tabla de contenidos */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Contenido</h3>
            <ul className="space-y-2">
              {getTableOfContents().map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-[#4A6FA5] hover:underline">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Renderizar contenido específico por nivel */}
          {renderLevelSpecificContent()}
        </div>
      </div>
    </div>
  );
}