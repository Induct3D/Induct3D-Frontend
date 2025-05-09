export default function WhatIsSection() {
    return (
        <div className="container mx-auto">
            <section className="w-full bg-white py-20 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-10">
                {/* Texto a la izquierda */}
                <div className="flex-1 text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        ¿Qué es <span className="text-[#A71C20]">Induct3D</span>?
                    </h2>

                    <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
                        <strong>Induct3D</strong> es una aplicación web para diseñar recorridos de inducción en ambientes 3D de forma simple, atractiva y sin código.
                        Personaliza escenarios, elige un personaje guía y agrega juegos interactivos para que tu proceso de inducción sea inolvidable.
                    </p>
                </div>

                {/* Imagen a la derecha */}
                <div className="flex-1 max-w-md">
                    <img
                        src="/Preview.png"
                        alt="Vista previa de Induct3D"
                        className="rounded-xl shadow-lg w-full object-cover"
                    />
                </div>
            </section>
        </div>
    )
}