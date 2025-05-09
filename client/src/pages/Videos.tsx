import { Video, BookOpen, Film, Layers } from "lucide-react";

export default function Videos() {
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
            por nivel de dificultad.
          </p>
          
          {/* Selector de nivel */}
          <div className="flex flex-wrap gap-4 mb-10">
            <div className="flex items-center px-4 py-2 bg-[#4A6FA5] text-white rounded-full">
              <div className="w-6 h-6 rounded-full bg-white text-[#4A6FA5] flex items-center justify-center font-bold mr-2">A</div>
              <span>Principiante</span>
            </div>
            
            <div className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-full">
              <div className="w-6 h-6 rounded-full bg-white text-gray-700 flex items-center justify-center font-bold mr-2">B</div>
              <span>Intermedio</span>
            </div>
            
            <div className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-full">
              <div className="w-6 h-6 rounded-full bg-white text-gray-700 flex items-center justify-center font-bold mr-2">C</div>
              <span>Avanzado</span>
            </div>
          </div>
          
          {/* Videos placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Video card 1 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-gray-200 h-40 flex items-center justify-center">
                <Film className="w-12 h-12 text-gray-500" />
              </div>
              <div className="p-4">
                <span className="inline-block bg-blue-100 text-[#4A6FA5] text-xs font-medium px-2.5 py-0.5 rounded mb-2">Nivel A1</span>
                <h3 className="text-lg font-medium text-gray-800 mb-1">Saludos y presentaciones</h3>
                <p className="text-sm text-gray-600 mb-2">Aprende a presentarte y saludar en alemán</p>
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
                <h3 className="text-lg font-medium text-gray-800 mb-1">Números del 1-20</h3>
                <p className="text-sm text-gray-600 mb-2">Aprende a contar en alemán</p>
                <div className="flex items-center text-gray-500 text-xs">
                  <Layers className="w-4 h-4 mr-1" />
                  <span>4:15 min</span>
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