import { useState, useEffect } from "react";
import { Video, BookOpen, Film, Layers, MessageSquare, AlignJustify, Users, TextQuote, TypeIcon } from "lucide-react";

export default function Videos() {
  // Efecto para scroll automático a la sección guardada en localStorage
  useEffect(() => {
    // Pequeño retraso para asegurar que la página se ha cargado completamente
    const timer = setTimeout(() => {
      const sectionId = localStorage.getItem('scrollToSectionVideo');
      
      if (sectionId) {
        // Limpiar el localStorage después de usarlo
        localStorage.removeItem('scrollToSectionVideo');
        
        // Buscar y hacer scroll a la sección
        const element = document.querySelector(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 300); // Un retraso de 300ms para dar tiempo a que se cargue la página
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#4A6FA5] mb-6">Biblioteca de Videos</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Recursos audiovisuales para todos los niveles
          </h2>
          
          <p className="text-gray-600 mb-6">
            Nuestra colección de videos está diseñada para ayudarte a mejorar tu comprensión 
            auditiva y aprender alemán de forma dinámica. Todos los videos están organizados 
            por nivel de dificultad y categoría.
          </p>
          
          {/* Tabla de contenidos */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Contenido</h3>
            <ul className="space-y-2">
              <li>
                <a href="#saludos-videos" className="text-[#4A6FA5] hover:underline">1. Saludos y expresiones</a>
              </li>
              <li>
                <a href="#sustantivos-videos" className="text-[#4A6FA5] hover:underline">2. Sustantivos y artículos</a>
              </li>
              <li>
                <a href="#pronombres-videos" className="text-[#4A6FA5] hover:underline">3. Pronombres personales</a>
              </li>
              <li>
                <a href="#plural-videos" className="text-[#4A6FA5] hover:underline">4. Formación del plural</a>
              </li>
              <li>
                <a href="#expresiones-videos" className="text-[#4A6FA5] hover:underline">5. Expresiones útiles</a>
              </li>
            </ul>
          </div>
          
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
              {/* Video card 1 */}
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
              
              {/* Video card 2 */}
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
              {/* Video card 1 */}
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
              
              {/* Video card 2 */}
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
              {/* Video card 1 */}
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
              
              {/* Video card 2 */}
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
              {/* Video card 1 */}
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-blue-100 text-[#4A6FA5] text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel A2</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Reglas básicas del plural</h3>
                  <p className="text-sm text-gray-600 mb-2">Las diferentes terminaciones para formar el plural</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Layers className="w-4 h-4 mr-1" />
                    <span>8:15 min</span>
                  </div>
                </div>
              </div>
              
              {/* Video card 2 */}
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-blue-100 text-[#4A6FA5] text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel A2</span>
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
              {/* Video card 1 */}
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
              
              {/* Video card 2 */}
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
          
          {/* Próximamente */}
          <div className="mt-10 p-6 border border-dashed border-gray-300 rounded-lg text-center">
            <Video className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">Más videos en camino</h3>
            <p className="text-gray-500">
              Estamos preparando más contenido audiovisual para todos los niveles.
              ¡Vuelve pronto para descubrir nuevos recursos!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}