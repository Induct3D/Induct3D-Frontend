import { useState } from "react";
import { Link, useLocation } from "react-router";
import { FiHome, FiPlusSquare, FiSettings, FiLogOut, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const navItems = [
    { path: "/dashboard", label: "Inicio", icon: <FiHome /> },
    { path: "/dashboard/crear", label: "Crear recorrido", icon: <FiPlusSquare /> },
    { path: "/dashboard/configuracion", label: "Configuración", icon: <FiSettings /> },
];

export default function Sidebar() {
    const location = useLocation();
    const [expanded, setExpanded] = useState(true);

    const toggleSidebar = () => setExpanded((prev) => !prev);

    return (
        <aside
            className={`h-screen bg-white border-r border-gray-200 p-4 flex flex-col justify-between transition-all duration-300 ${
                expanded ? "w-64" : "w-20"
            }`}
        >
            <div>
                {/* Botón toggle */}
                <button
                    onClick={toggleSidebar}
                    className="mb-6 text-[#A71C20] hover:bg-gray-100 p-2 rounded transition self-end"
                >
                    {expanded ? <FiChevronLeft /> : <FiChevronRight />}
                </button>

                {/* Logo (condicional) */}
                {expanded && (
                    <h1 className="text-xl font-bold text-[#A71C20] mb-6 pl-2">Induct3D</h1>
                )}

                {/* Navegación */}
                <nav className="space-y-4">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition ${
                                    isActive
                                        ? "bg-[#A71C20] text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                <span className="text-lg">{item.icon}</span>
                                {expanded && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Cerrar sesión */}
            <Link
                to="/"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition"
            >
                <FiLogOut className="text-lg" />
                {expanded && <span>Cerrar sesión</span>}
            </Link>
        </aside>
    );
}
