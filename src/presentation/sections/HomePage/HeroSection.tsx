import {Link} from "react-router";

export default function HeroSection() {
    return (
        <section className="w-full bg-gray-50 min-h-[90vh] flex flex-col justify-center items-center text-center px-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight max-w-4xl">
                Crea recorridos 3D <span className="text-[#A71C20]">interactivos</span> <br />
                sin saber programar
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
                Diseña experiencias de inducción personalizadas en ambientes 3D, con personajes, juegos y narración automatizada.
            </p>

            <div className="mt-8 flex gap-4">
                <a
                    href="#how-it-works"
                    className="bg-[#A71C20] text-white px-6 py-3 rounded-lg text-base md:text-lg font-semibold hover:opacity-90 transition"
                >
                    Descubre cómo funciona
                </a>
                <Link
                    to="/recorridos"
                    className="border border-[#A71C20] text-[#A71C20] px-6 py-3 rounded-lg text-base md:text-lg font-semibold hover:bg-[#A71C20]/10 transition"
                >
                    Explora recorridos
                </Link>
            </div>
        </section>
    )
}