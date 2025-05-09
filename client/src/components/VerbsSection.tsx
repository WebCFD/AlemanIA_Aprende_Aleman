export default function VerbsSection() {
  return (
    <section id="verbos" className="mb-16">
      <div className="text-center mb-10">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#4A6FA5] mb-4">
          Aprende a Conjugar Verbos
        </h2>
        <p className="text-neutral-300 max-w-2xl mx-auto">
          Practica la conjugación de verbos alemanes en diferentes tiempos verbales.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden relative">
        <div className="h-64 bg-gradient-to-r from-[#6B8CB8] to-[#4A6FA5]"></div>
        
        <div className="absolute inset-0 bg-[#4A6FA5] bg-opacity-70 flex items-center justify-center">
          <div className="text-center text-white p-6">
            <div className="material-icons text-5xl mb-4">construction</div>
            <h3 className="font-heading font-bold text-2xl mb-2">Próximamente</h3>
            <p className="max-w-md mx-auto">
              Estamos trabajando en esta sección. ¡Vuelve pronto para aprender a conjugar verbos en alemán!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
