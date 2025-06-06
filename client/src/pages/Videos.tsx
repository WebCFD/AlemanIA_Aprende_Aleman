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
          {/* Sección 1: Saludos básicos */}
          <div id="saludos-videos" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <MessageSquare className="w-5 h-5 mr-2" /> 
              1. Saludos básicos
            </h3>
            
            <p className="mb-4 text-gray-700">
              Videos para aprender los saludos y expresiones más comunes en alemán.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-blue-100 text-[#4A6FA5] text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel A1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Saludos básicos en alemán</h3>
                  <p className="text-sm text-gray-600 mb-2">Hallo, Guten Tag, Auf Wiedersehen</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>5:30 min</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-blue-100 text-[#4A6FA5] text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel A1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Presentaciones personales</h3>
                  <p className="text-sm text-gray-600 mb-2">Cómo presentarte en alemán</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>6:15 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección 2: Sustantivos y mayúsculas */}
          <div id="sustantivos-videos" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <BookOpen className="w-5 h-5 mr-2" /> 
              2. Sustantivos y mayúsculas
            </h3>
            
            <p className="mb-4 text-gray-700">
              Aprende el uso de los artículos en alemán y las reglas de sustantivos.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-blue-100 text-[#4A6FA5] text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel A1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Los artículos: der, die, das</h3>
                  <p className="text-sm text-gray-600 mb-2">Guía completa del género en alemán</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>8:45 min</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-blue-100 text-[#4A6FA5] text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel A1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Sustantivos con mayúscula</h3>
                  <p className="text-sm text-gray-600 mb-2">Regla fundamental del alemán</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>4:20 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección 6: Tiempo presente */}
          <div id="tiempo-presente-videos" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <Clock className="w-5 h-5 mr-2" /> 
              6. Tiempo presente
            </h3>
            
            <p className="mb-4 text-gray-700">
              Videos sobre conjugaciones en tiempo presente alemán.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-blue-100 text-[#4A6FA5] text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel A1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Verbos regulares</h3>
                  <p className="text-sm text-gray-600 mb-2">Conjugación básica: machen, lernen, spielen</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>7:20 min</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-blue-100 text-[#4A6FA5] text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel A1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Verbos sein y haben</h3>
                  <p className="text-sm text-gray-600 mb-2">Los verbos más importantes del alemán</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>9:15 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (currentDifficulty === "B") {
      return (
        <>
          {/* Sección 1: Casos alemanes */}
          <div id="casos-videos" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <BookOpen className="w-5 h-5 mr-2" /> 
              1. Casos alemanes (Nominativ, Akkusativ)
            </h3>
            
            <p className="mb-4 text-gray-700">
              Videos explicativos sobre el sistema de casos alemán.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-orange-100 text-orange-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel B1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Introducción a los casos</h3>
                  <p className="text-sm text-gray-600 mb-2">Nominativ vs Akkusativ explicado</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>12:30 min</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-orange-100 text-orange-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel B1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Artículos en casos</h3>
                  <p className="text-sm text-gray-600 mb-2">der/den, die/die, das/das</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>10:45 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección 2: Verbos modales */}
          <div id="verbos-modales-videos" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <TypeIcon className="w-5 h-5 mr-2" /> 
              2. Verbos modales
            </h3>
            
            <p className="mb-4 text-gray-700">
              Videos sobre können, müssen, wollen y otros verbos modales.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-orange-100 text-orange-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel B1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">können, müssen, wollen</h3>
                  <p className="text-sm text-gray-600 mb-2">Los tres verbos modales principales</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>15:20 min</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-orange-100 text-orange-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel B2</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Otros verbos modales</h3>
                  <p className="text-sm text-gray-600 mb-2">dürfen, sollen, mögen en contexto</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>11:40 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (currentDifficulty === "C") {
      return (
        <>
          {/* Sección 1: Todos los casos */}
          <div id="casos-avanzados-videos" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <BookOpen className="w-5 h-5 mr-2" /> 
              1. Todos los casos (Dativ, Genitiv)
            </h3>
            
            <p className="mb-4 text-gray-700">
              Videos avanzados sobre Dativ y Genitiv en alemán.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-purple-100 text-purple-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel C1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Dativ completo</h3>
                  <p className="text-sm text-gray-600 mb-2">Objeto indirecto y preposiciones</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>18:30 min</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-purple-100 text-purple-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel C2</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Genitiv en contextos formales</h3>
                  <p className="text-sm text-gray-600 mb-2">Posesión y textos académicos</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>16:45 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección 2: Subjuntivo */}
          <div id="subjuntivo-videos" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <MessageSquare className="w-5 h-5 mr-2" /> 
              2. Subjuntivo (Konjunktiv I y II)
            </h3>
            
            <p className="mb-4 text-gray-700">
              Videos sobre el subjuntivo alemán en sus dos formas.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-purple-100 text-purple-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel C1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Konjunktiv II</h3>
                  <p className="text-sm text-gray-600 mb-2">Hipótesis y cortesía</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>22:15 min</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-purple-100 text-purple-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel C2</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Konjunktiv I</h3>
                  <p className="text-sm text-gray-600 mb-2">Discurso indirecto formal</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>19:30 min</span>
                  </div>
                </div>
              </div>
            </div>
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