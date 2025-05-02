import {Link} from "react-router";

export default function JoinNowSection() {
    return (
        <div className="container mx-auto">
            <section className="w-full bg-[#A71C20] text-white py-20 px-6 md:px-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    ¿Listo para crear tu primer recorrido 3D interactivo?
                </h2>
                <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10">
                    Diseña experiencias inmersivas con ambientes personalizables, personajes guía y actividades gamificadas. ¡Empieza en minutos!
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <Link
                        to="/iniciar-sesion"
                        className="bg-white text-[#A71C20] font-semibold px-6 py-3 rounded-lg shadow hover:opacity-90 transition"
                    >
                        Iniciar sesión
                    </Link>
                    <Link
                        to="/registrarse"
                        className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-[#A71C20] transition"
                    >
                        Crear cuenta
                    </Link>
                </div>
            </section>

        </div>
    )
}