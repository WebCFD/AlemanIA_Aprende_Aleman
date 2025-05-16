import { useState } from "react";
import { Users, Heart, BookOpen, MailIcon, Target, Coffee, MessageSquare } from "lucide-react";
import luisTaboadaImg from "../assets/LuisTaboada.png";
import juanReinaImg from "../assets/JuanReina.png";
import FeedbackDialog from "../components/FeedbackDialog";

export default function QuienesSomos() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#4A6FA5] mb-6">Quiénes Somos</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Misión */}
          <h3 className="text-xl font-semibold text-[#4A6FA5] mb-6 flex items-center">
            <Target className="w-5 h-5 mr-2" /> 
            Nuestra misión
          </h3>
          
          <p className="text-gray-600 mb-10">
            AlemanIA nace con el objetivo de hacer el aprendizaje del alemán, accesible y efectivo. 
            Combinamos la potencia de la inteligencia artificial con métodos pedagógicos probados. 
            Aprender un idioma debe ser una experiencia personalizada, adaptada a tus necesidades. 
            Deja que nuestra experiencia te sirva de ayuda.
          </p>
          
          {/* Equipo */}
          <h3 className="text-xl font-semibold text-[#4A6FA5] mb-6 flex items-center">
            <Users className="w-5 h-5 mr-2" /> 
            Nuestro equipo
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Perfil de Luis Taboada */}
            <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-5 mx-auto flex justify-center">
                <img 
                  src={luisTaboadaImg} 
                  alt="Luis Taboada" 
                  className="w-28 h-28 object-cover rounded-full border-2 border-[#4A6FA5] object-[center_top]"
                />
              </div>
              <h4 className="text-lg font-bold text-center text-gray-800 mb-2">Luis Taboada</h4>
              <p className="text-sm text-center text-[#4A6FA5] font-medium mb-3">Del diccionario a la fluidez: tu guía confiable en alemán</p>
              <p className="text-sm text-gray-600 mb-3">
                Del "Was ist das?" al "Natürlich!" – Luis ha recorrido todo el camino.Periodista y traductor certificado con años viviendo en Alemania, combina rigor lingüístico con métodos que funcionan para hispanohablantes. Cuando no está desglosando el Konjunktiv II, disfruta de buena música y apoya incondicionalmente a su equipo local desde las gradas.
              </p>
              <div className="bg-blue-50 p-3 rounded-lg italic text-sm text-gray-700">
                ¿Dudas con el alemán? Luis las ha tenido todas... y las ha resuelto.
              </div>
            </div>
            
            {/* Perfil de Juan Reina */}
            <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-5 mx-auto flex justify-center">
                <img 
                  src={juanReinaImg} 
                  alt="Juan Reina" 
                  className="w-28 h-28 object-cover rounded-full border-2 border-[#4A6FA5] object-[center_top]"
                />
              </div>
              <h4 className="text-lg font-bold text-center text-gray-800 mb-2">Juan Reina</h4>
              <p className="text-sm text-center text-[#4A6FA5] font-medium mb-3">Ingeniero Mecánico, manos con grasa, mente llena de código, y corazón de innovación</p>
              <p className="text-sm text-gray-600 mb-3">
                Juan combina tecnología en varios mundos. Ingeniero con experiencia en cinco países y actualmente residente en Suiza, transforma código informático en motores de combustión mientras sueña con abrir su propio taller de reparación algún día. Cuando no está explorando las fronteras de la termodinámica o desarrollando proyectos web, se dedica a aprender alemán, pero no le va muy bien.
              </p>
              <div className="bg-blue-50 p-3 rounded-lg italic text-sm text-gray-700">
                ¿Tecnología e idiomas? Juan conecta mundos que parecen distantes.
              </div>
            </div>
          </div>
          
          {/* Contacto */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#4A6FA5] mb-4 flex items-center">
              <MailIcon className="w-5 h-5 mr-2" /> 
              Contáctanos
            </h3>
            
            <p className="text-gray-700 mb-6">
              ¿Tienes preguntas, sugerencias o comentarios? ¡Nos encantaría saber de ti!
              Puedes escribirnos a través de nuestro formulario de feedback o directamente 
              a nuestro correo electrónico.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setIsFeedbackOpen(true)}
                className="inline-flex items-center px-6 py-3 bg-[#5272A8] text-white rounded-full hover:bg-[#4A6FA5] transition-colors"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                <span>Tu feedback nos interesa</span>
              </button>
              
              <button 
                className="inline-flex items-center px-6 py-3 bg-[#F7931A] text-white rounded-full hover:bg-[#E67E0D] transition-colors"
              >
                <Coffee className="w-5 h-5 mr-2" />
                <span>Invítanos a un café</span>
              </button>
            </div>
            
            {/* Diálogo de Feedback */}
            <FeedbackDialog open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen} />
          </div>
        </div>
      </div>
    </div>
  );
}