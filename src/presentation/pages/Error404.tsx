import {Link} from "react-router";

export default function Error404() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 text-center">
            <h1 className="text-7xl font-extrabold text-[#A71C20] mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                Página no encontrada
            </h2>
            <p className="text-gray-600 text-base md:text-lg mb-8 max-w-md">
                Lo sentimos, la página que estás buscando no existe o ha sido movida.
            </p>

            <Link
                to="/"
                className="bg-[#A71C20] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
                Volver al inicio
            </Link>
        </div>
    )
}