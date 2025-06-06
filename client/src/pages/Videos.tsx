import { useState, useEffect } from "react";
import { Video, BookOpen, Film, Layers, MessageSquare, AlignJustify, Users, TextQuote, TypeIcon, Clock } from "lucide-react";
import { useDifficulty } from "../context/DifficultyContext";
import { DetailedDifficultySelector } from "../components/DifficultySelector";

export default function Videos() {
  const { currentDifficulty } = useDifficulty();
  
  // Función para obtener la descripción del nivel
  const getLevelDescription = () => {
    switch (currentDifficulty) {
      case "A":
        return {
          title: "Videos para Principiantes (Nivel A)",
          description: "Videos básicos para aprender los fundamentos del alemán. Contenido diseñado para estudiantes que empiezan desde cero.",
          quote: "Los fundamentos sólidos son la base del éxito en el aprendizaje."
        };
      case "B":
        return {
          title: "Videos Intermedios (Nivel B)",
          description: "Contenido audiovisual para estudiantes que ya dominan lo básico y quieren profundizar en la gramática alemana.",
          quote: "La práctica constante lleva a la perfección."
        };
      case "C":
        return {
          title: "Videos Avanzados (Nivel C)",
          description: "Videos complejos para estudiantes avanzados que buscan dominar los aspectos más sofisticados del alemán.",
          quote: "La excelencia se alcanza cuando no hay nada más que quitar, solo perfeccionar."
        };
      default:
        return {
          title: "Videos para Principiantes (Nivel A)",
          description: "Videos básicos para aprender los fundamentos del alemán. Contenido diseñado para estudiantes que empiezan desde cero.",
          quote: "Los fundamentos sólidos son la base del éxito en el aprendizaje."
        };
    }
  };

  // Función para obtener la tabla de contenidos según el nivel
  const getTableOfContents = () => {
    switch (currentDifficulty) {
      case "A":
        return [
          { id: "saludos-videos", title: "1. Saludos y expresiones" },
          { id: "sustantivos-videos", title: "2. Sustantivos y artículos" },
          { id: "pronombres-videos", title: "3. Pronombres personales" },
          { id: "plural-videos", title: "4. Formación del plural" },
          { id: "expresiones-videos", title: "5. Expresiones útiles" },
          { id: "presente-videos", title: "6. Tiempo presente" }
        ];
      case "B":
        return [
          { id: "casos-videos", title: "1. Casos alemanes (Nominativ, Akkusativ)" },
          { id: "modales-videos", title: "2. Verbos modales" },
          { id: "preposiciones-videos", title: "3. Preposiciones con casos" },
          { id: "orden-videos", title: "4. Orden de palabras" },
          { id: "pasado-videos", title: "5. Tiempo pasado (Perfekt)" }
        ];
      case "C":
        return [
          { id: "casos-avanzados-videos", title: "1. Todos los casos (Dativ, Genitiv)" },
          { id: "subjuntivo-videos", title: "2. Subjuntivo (Konjunktiv I y II)" },
          { id: "pasiva-videos", title: "3. Voz pasiva (Passiv)" },
          { id: "subordinadas-videos", title: "4. Oraciones subordinadas complejas" },
          { id: "idiomaticas-videos", title: "5. Expresiones idiomáticas avanzadas" }
        ];
      default:
        return [
          { id: "saludos-videos", title: "1. Saludos y expresiones" },
          { id: "sustantivos-videos", title: "2. Sustantivos y artículos" },
          { id: "pronombres-videos", title: "3. Pronombres personales" },
          { id: "plural-videos", title: "4. Formación del plural" },
          { id: "expresiones-videos", title: "5. Expresiones útiles" },
          { id: "presente-videos", title: "6. Tiempo presente" }
        ];
    }
  };

  // Función para renderizar contenido específico por nivel
  const renderLevelSpecificContent = () => {
    if (currentDifficulty === "A") {
      return (
        <>
          {/* Sección 1: Saludos y expresiones */}
          <div id="saludos-videos" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <MessageSquare className="w-5 h-5 mr-2" /> 
              1. Saludos y expresiones
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

          {/* Sección 2: Sustantivos y artículos */}
          <div id="sustantivos-videos" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <AlignJustify className="w-5 h-5 mr-2" /> 
              2. Sustantivos y artículos
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
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Artículos der, die, das</h3>
                  <p className="text-sm text-gray-600 mb-2">Cómo usar correctamente los artículos en alemán</p>
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
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Mayúsculas en sustantivos</h3>
                  <p className="text-sm text-gray-600 mb-2">Por qué los sustantivos alemanes siempre van con mayúscula</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>4:45 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección 3: Pronombres personales */}
          <div id="pronombres-videos" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <Users className="w-5 h-5 mr-2" /> 
              3. Pronombres personales
            </h3>
            
            <p className="mb-4 text-gray-700">
              Videos sobre los pronombres personales en alemán y su uso.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-blue-100 text-[#4A6FA5] text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel A1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Pronombres personales básicos</h3>
                  <p className="text-sm text-gray-600 mb-2">Ich, du, er, sie, es, wir, ihr, sie, Sie</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>6:10 min</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-blue-100 text-[#4A6FA5] text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel A1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Tratamiento formal e informal</h3>
                  <p className="text-sm text-gray-600 mb-2">Cuando usar du y Sie en alemán</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>5:30 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección 4: Formación del plural */}
          <div id="plural-videos" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <TextQuote className="w-5 h-5 mr-2" /> 
              4. Formación del plural
            </h3>
            
            <p className="mb-4 text-gray-700">
              Aprende las diferentes formas de crear plurales en alemán.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-orange-100 text-orange-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel A2</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Reglas básicas del plural</h3>
                  <p className="text-sm text-gray-600 mb-2">Las diferentes terminaciones para formar el plural</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>8:15 min</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-orange-100 text-orange-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel A2</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Plurales irregulares</h3>
                  <p className="text-sm text-gray-600 mb-2">Excepciones y casos especiales</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>7:30 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección 5: Expresiones útiles */}
          <div id="expresiones-videos" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <TypeIcon className="w-5 h-5 mr-2" /> 
              5. Expresiones útiles
            </h3>
            
            <p className="mb-4 text-gray-700">
              Videos con expresiones y frases útiles para el día a día.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-blue-100 text-[#4A6FA5] text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel A1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">En el restaurante</h3>
                  <p className="text-sm text-gray-600 mb-2">Cómo pedir comida y bebida en alemán</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>7:45 min</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-blue-100 text-[#4A6FA5] text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel A1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">De compras</h3>
                  <p className="text-sm text-gray-600 mb-2">Expresiones útiles para ir de compras</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>6:50 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección 6: Tiempo presente */}
          <div id="presente-videos" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <Clock className="w-5 h-5 mr-2" /> 
              6. Tiempo presente
            </h3>
            
            <p className="mb-4 text-gray-700">
              Videos sobre conjugaciones en tiempo presente y verbos fundamentales.
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
                    <span>8:20 min</span>
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
                    <span>6:35 min</span>
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
          {/* Casos alemanes */}
          <div id="casos-videos" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <BookOpen className="w-5 h-5 mr-2" /> 
              1. Casos alemanes (Nominativ, Akkusativ)
            </h3>
            
            <p className="mb-4 text-gray-700">
              Videos explicativos sobre el sistema de casos alemán para nivel intermedio.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-orange-100 text-orange-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel B1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Introducción a los casos</h3>
                  <p className="text-sm text-gray-600 mb-2">Conceptos fundamentales del sistema de casos</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>12:15 min</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-orange-100 text-orange-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel B1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Akkusativ en práctica</h3>
                  <p className="text-sm text-gray-600 mb-2">Ejemplos y ejercicios del caso acusativo</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>10:30 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Verbos modales */}
          <div id="modales-videos" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <TypeIcon className="w-5 h-5 mr-2" /> 
              2. Verbos modales
            </h3>
            
            <p className="mb-4 text-gray-700">
              Domina los verbos modales alemanes con explicaciones detalladas.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-orange-100 text-orange-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel B1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">können, müssen, wollen</h3>
                  <p className="text-sm text-gray-600 mb-2">Los verbos modales más importantes</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>14:45 min</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-orange-100 text-orange-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel B1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">sollen, dürfen, mögen</h3>
                  <p className="text-sm text-gray-600 mb-2">Verbos modales adicionales y sus matices</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>11:20 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preposiciones con casos */}
          <div id="preposiciones-videos" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <AlignJustify className="w-5 h-5 mr-2" /> 
              3. Preposiciones con casos
            </h3>
            
            <p className="mb-4 text-gray-700">
              Aprende qué casos requiere cada preposición alemana.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-orange-100 text-orange-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel B1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Preposiciones con Akkusativ</h3>
                  <p className="text-sm text-gray-600 mb-2">durch, für, gegen, ohne, um</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>9:40 min</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-orange-100 text-orange-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel B1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Preposiciones mixtas</h3>
                  <p className="text-sm text-gray-600 mb-2">in, auf, an, unter - movimiento vs ubicación</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>13:25 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Orden de palabras */}
          <div id="orden-videos" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <Users className="w-5 h-5 mr-2" /> 
              4. Orden de palabras
            </h3>
            
            <p className="mb-4 text-gray-700">
              Domina la estructura de las oraciones alemanas.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-orange-100 text-orange-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel B1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Posición del verbo</h3>
                  <p className="text-sm text-gray-600 mb-2">Verbo en segunda posición y casos especiales</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>11:50 min</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-orange-100 text-orange-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel B1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Te-Ka-Mo-Lo</h3>
                  <p className="text-sm text-gray-600 mb-2">Orden de elementos en la oración</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>8:30 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tiempo pasado */}
          <div id="pasado-videos" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <TextQuote className="w-5 h-5 mr-2" /> 
              5. Tiempo pasado (Perfekt)
            </h3>
            
            <p className="mb-4 text-gray-700">
              Aprende a formar y usar el tiempo pasado alemán más común.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-orange-100 text-orange-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel B1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Perfekt con haben</h3>
                  <p className="text-sm text-gray-600 mb-2">La mayoría de verbos forman el Perfekt con haben</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>12:10 min</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-orange-100 text-orange-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel B1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Perfekt con sein</h3>
                  <p className="text-sm text-gray-600 mb-2">Verbos de movimiento y cambio de estado</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>10:45 min</span>
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
          {/* Todos los casos */}
          <div id="casos-avanzados-videos" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <BookOpen className="w-5 h-5 mr-2" /> 
              1. Todos los casos (Dativ, Genitiv)
            </h3>
            
            <p className="mb-4 text-gray-700">
              Videos avanzados sobre el sistema completo de casos alemanes.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-purple-100 text-purple-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel C1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Dativ en detalle</h3>
                  <p className="text-sm text-gray-600 mb-2">Objeto indirecto y preposiciones con Dativ</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>15:30 min</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-purple-100 text-purple-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel C1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Genitiv y posesión</h3>
                  <p className="text-sm text-gray-600 mb-2">Expresiones de posesión y uso formal del Genitiv</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>18:20 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subjuntivo */}
          <div id="subjuntivo-videos" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <MessageSquare className="w-5 h-5 mr-2" /> 
              2. Subjuntivo (Konjunktiv I y II)
            </h3>
            
            <p className="mb-4 text-gray-700">
              Domina el subjuntivo alemán para expresiones complejas.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-purple-100 text-purple-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel C1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Konjunktiv II</h3>
                  <p className="text-sm text-gray-600 mb-2">Hipótesis, deseos y cortesía</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>16:45 min</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-purple-100 text-purple-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel C1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Konjunktiv I</h3>
                  <p className="text-sm text-gray-600 mb-2">Discurso indirecto y uso periodístico</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>14:15 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Voz pasiva */}
          <div id="pasiva-videos" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <TypeIcon className="w-5 h-5 mr-2" /> 
              3. Voz pasiva (Passiv)
            </h3>
            
            <p className="mb-4 text-gray-700">
              Comprende y usa la voz pasiva alemana en todos sus aspectos.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-purple-100 text-purple-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel C1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Vorgangspassiv</h3>
                  <p className="text-sm text-gray-600 mb-2">Formación con werden + participio</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>13:40 min</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-purple-100 text-purple-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel C1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Zustandspassiv</h3>
                  <p className="text-sm text-gray-600 mb-2">Resultado de acciones con sein + participio</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>11:55 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Oraciones subordinadas */}
          <div id="subordinadas-videos" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <AlignJustify className="w-5 h-5 mr-2" /> 
              4. Oraciones subordinadas complejas
            </h3>
            
            <p className="mb-4 text-gray-700">
              Construye oraciones complejas con múltiples subordinadas.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-purple-100 text-purple-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel C2</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Conjunciones complejas</h3>
                  <p className="text-sm text-gray-600 mb-2">obwohl, nachdem, bevor, damit, etc.</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>17:25 min</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-purple-100 text-purple-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel C2</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Oraciones anidadas</h3>
                  <p className="text-sm text-gray-600 mb-2">Múltiples niveles de subordinación</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>19:10 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Expresiones idiomáticas */}
          <div id="idiomaticas-videos" className="mb-12 pt-2">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-3 flex items-center border-b pb-2">
              <Users className="w-5 h-5 mr-2" /> 
              5. Expresiones idiomáticas avanzadas
            </h3>
            
            <p className="mb-4 text-gray-700">
              Expresiones y modismos para sonar como un hablante nativo.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-purple-100 text-purple-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel C2</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Modismos cotidianos</h3>
                  <p className="text-sm text-gray-600 mb-2">Expresiones coloquiales del alemán moderno</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>14:50 min</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-purple-100 text-purple-600 text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel C2</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Lenguaje formal</h3>
                  <p className="text-sm text-gray-600 mb-2">Expresiones para contextos académicos y profesionales</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>16:30 min</span>
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold text-[#4A6FA5] mb-4 md:mb-0">Videos</h1>
          <DetailedDifficultySelector />
        </div>
        
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

          {/* Próximamente */}
          <div className="mt-10 p-6 border border-dashed border-gray-300 rounded-lg text-center">
            <Video className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">Más videos en camino</h3>
            <p className="text-gray-500">
              Estamos preparando más contenido audiovisual para todos los niveles.
              ¡Vuelve pronto para descubrir nuevos recursos!
            </p>
          </div>

          {/* Volver al inicio */}
          <div className="mt-8 text-center">
            <a 
              href="#top" 
              className="inline-flex items-center px-4 py-2 bg-[#4A6FA5] text-white rounded-lg hover:bg-[#3a5a95] transition-colors"
            >
              <Users className="w-4 h-4 mr-2" />
              Volver al inicio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}