export default function HowItWorksSection() {
    return (
        <div className="container mx-auto" id="how-it-works" >
            <section className="w-full bg-gray-50 py-20 px-6 md:px-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
                    ¿Cómo funciona <span className="text-[#A71C20]">Induct3D</span>?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Paso 1 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 mb-4 bg-[#A71C20] text-white flex items-center justify-center rounded-full text-2xl font-bold shadow-md">
                            1
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Elige tu escenario</h3>
                        <p className="text-gray-600">
                            Selecciona una plantilla 3D prediseñada, como una oficina, aula o showroom, para comenzar tu recorrido.
                        </p>
                    </div>

                    {/* Paso 2 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 mb-4 bg-[#A71C20] text-white flex items-center justify-center rounded-full text-2xl font-bold shadow-md">
                            2
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Personaliza tu experiencia</h3>
                        <p className="text-gray-600">
                            Cambia colores, texturas, elige un personaje guía y agrega actividades gamificadas como trivias o acertijos.
                        </p>
                    </div>

                    {/* Paso 3 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 mb-4 bg-[#A71C20] text-white flex items-center justify-center rounded-full text-2xl font-bold shadow-md">
                            3
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Publica y comparte</h3>
                        <p className="text-gray-600">
                            Guarda tu recorrido, publícalo de forma libre o protégelo con contraseña. Comparte el enlace fácilmente.
                        </p>
                    </div>
                </div>
            </section>

        </div>
    )
}