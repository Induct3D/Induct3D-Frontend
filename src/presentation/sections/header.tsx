import { Link, useLocation } from "react-router";

export default function Header() {
    const location = useLocation();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Detectar ruta activa
    const isActive = (path: string) => location.pathname === path;

    // Determinar destino del botón según rol
    const getDashboardPath = () => {
        if (!token) return "/iniciar-sesion";
        if (role === "ADMIN") return "/admin";
        if (role === "CREATOR") return "/dashboard";
        return "/iniciar-sesion";
    };

    // Determinar texto del botón según rol
    const getButtonText = () => {
        if (!token) return "Iniciar sesión";
        if (role === "ADMIN") return "Ir al Panel de Admin";
        if (role === "CREATOR") return "Ir al Dashboard";
        return "Ir al Dashboard";
    };

    return (
        <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md z-50">
            {/* Logo */}
            <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold text-gray-800">
                    Induct<strong className="text-[#A71C20]">3D</strong>
                </Link>
            </div>

            {/* Navegación */}
            <nav className="hidden md:flex gap-8 text-base font-medium">
                <Link
                    to="/"
                    className={`pb-1 ${
                        isActive("/")
                            ? "text-[#A71C20] border-b-2 border-[#A71C20]"
                            : "text-gray-700"
                    } hover:text-[#A71C20] transition`}
                >
                    Inicio
                </Link>

                <Link
                    to="/recorridos"
                    className={`pb-1 ${
                        isActive("/recorridos")
                            ? "text-[#A71C20] border-b-2 border-[#A71C20]"
                            : "text-gray-700"
                    } hover:text-[#A71C20] transition`}
                >
                    Recorridos
                </Link>
            </nav>

            {/* Botón login / dashboard / admin */}
            <button type="button">
                <Link
                    to={getDashboardPath()}
                    className="bg-[#A71C20] text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                >
                    {getButtonText()}
                </Link>
            </button>
        </header>
    );
}
