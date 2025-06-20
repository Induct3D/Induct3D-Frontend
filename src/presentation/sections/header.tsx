import {Link, useLocation} from "react-router";

export default function Header() {
    const location = useLocation();

    // Función para detectar si la ruta está activa
    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="w-full  flex items-center justify-between px-6 py-4 bg-white shadow-md z-50">
            {/* Logo */}
            <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold text-gray-800">
                    Induct3D
                </Link>
            </div>

            {/* Centro - Navegación */}
            <nav className="hidden md:flex gap-8 text-base font-medium">
                <Link
                    to="/"
                    className={`pb-1 ${
                        isActive('/') ? 'text-[#A71C20] border-b-2 border-[#A71C20]' : 'text-gray-700'
                    } hover:text-[#A71C20] transition`}
                >
                    Inicio
                </Link>

                <Link
                    to="/recorridos"
                    className={`pb-1 ${
                        isActive('/recorridos') ? 'text-[#A71C20] border-b-2 border-[#A71C20]' : 'text-gray-700'
                    } hover:text-[#A71C20] transition`}
                >
                    Recorridos
                </Link>
            </nav>

            {/* Botón login */}
            <button type="button">
                <Link
                    to="/iniciar-sesion"
                    className="bg-[#A71C20] text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                >
                    Iniciar sesión
                </Link>
            </button>
        </header>

    )
}