import { useState, useEffect } from "react";
import { Video, BookOpen, Film, Layers, MessageSquare, AlignJustify, Users, TextQuote, TypeIcon, Clock, X } from "lucide-react";
import { useDifficulty } from "../context/DifficultyContext";
import saludosVideoThumbnail from "@assets/image_1749204521832.png";
import presentacionVideoThumbnail from "@assets/image_1749204660165.png";

export default function Videos() {
  const { currentDifficulty } = useDifficulty();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVideoUrl, setModalVideoUrl] = useState("");
  const [originalVideoUrl, setOriginalVideoUrl] = useState("");

  // Función para convertir URL de YouTube a formato embebido que evita restricciones
  const convertToEmbedUrl = (youtubeUrl: string) => {
    // Extrae el ID del video de diferentes formatos de URL de YouTube
    let videoId = '';
    
    if (youtubeUrl.includes('youtu.be/')) {
      videoId = youtubeUrl.split('youtu.be/')[1].split('?')[0].split('&')[0];
    } else if (youtubeUrl.includes('youtube.com/watch?v=')) {
      videoId = youtubeUrl.split('v=')[1].split('&')[0];
    } else if (youtubeUrl.includes('youtube.com/embed/')) {
      videoId = youtubeUrl.split('embed/')[1].split('?')[0];
    }
    
    // Limpia cualquier parámetro adicional del ID
    videoId = videoId.split('&')[0].split('?')[0].split('#')[0];
    
    // Usa parámetros optimizados para máxima compatibilidad
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&fs=1&cc_load_policy=0&iv_load_policy=3&enablejsapi=1`;
  };

  const openVideoModal = (youtubeUrl: string) => {
    const embedUrl = convertToEmbedUrl(youtubeUrl);
    setModalVideoUrl(embedUrl);
    setOriginalVideoUrl(youtubeUrl);
    setIsModalOpen(true);
  };

  const openVideoInNewTab = (youtubeUrl: string) => {
    window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalVideoUrl("");
    setOriginalVideoUrl("");
  };

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
              <button 
                onClick={() => openVideoModal("https://youtu.be/VQ7F_6Op8jc")}
                className="border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow block bg-white w-full text-left"
              >
                <div className="relative h-48 flex items-center justify-center overflow-hidden">
                  <img 
                    src={saludosVideoThumbnail} 
                    alt="Los Saludos en Alemán - Miniatura del video"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  <div className="relative z-10 bg-red-600 hover:bg-red-700 transition-colors rounded-full p-4 shadow-lg">
                    <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
                  </div>
                  
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    11:57
                  </div>
                  
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">
                    YouTube
                  </div>
                </div>
                <div className="p-4">
                  <span className="inline-block bg-blue-100 text-[#4A6FA5] text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel A1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Saludos básicos en alemán</h3>
                  <p className="text-sm text-gray-600">Hallo, Guten Tag, Auf Wiedersehen</p>
                </div>
              </button>
              
              <button 
                onClick={() => openVideoModal("https://youtu.be/r94aqLUO0wo")}
                className="border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow block bg-white w-full text-left"
              >
                <div className="relative h-48 flex items-center justify-center overflow-hidden">
                  <img 
                    src={presentacionVideoThumbnail} 
                    alt="Introduce Yourself in German - Miniatura del video"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  <div className="relative z-10 bg-red-600 hover:bg-red-700 transition-colors rounded-full p-4 shadow-lg">
                    <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
                  </div>
                  
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    2:55
                  </div>
                  
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">
                    YouTube
                  </div>
                </div>
                <div className="p-4">
                  <span className="inline-block bg-blue-100 text-[#4A6FA5] text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel A1</span>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Presentaciones personales</h3>
                  <p className="text-sm text-gray-600">Cómo presentarte en alemán</p>
                </div>
              </button>
            </div>
          </div>
        </>
      );
    } else if (currentDifficulty === "B") {
      return (
        <>
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

  // Efecto para scroll automático
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
    <>
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

            {renderLevelSpecificContent()}
          </div>
        </div>
      </div>

      {/* Modal para reproducir videos */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Video Tutorial</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openVideoInNewTab(originalVideoUrl)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Abrir en YouTube
                </button>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="relative">
              <iframe
                src={modalVideoUrl}
                className="w-full h-[60vh]"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video Tutorial"
              ></iframe>
              {/* Mensaje de fallback si el video no carga */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                <div className="text-center p-4">
                  <p className="text-gray-600 mb-2">¿El video no se reproduce?</p>
                  <button
                    onClick={() => openVideoInNewTab(originalVideoUrl)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors pointer-events-auto"
                  >
                    Ver en YouTube
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}