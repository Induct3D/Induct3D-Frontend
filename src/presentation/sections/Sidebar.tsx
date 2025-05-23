import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FiHome, FiPlusSquare,  FiLogOut, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Logo from "/LogoInduct3D.png"

const navItems = [
    { path: "/dashboard", label: "Inicio", icon: <FiHome /> },
    // { path: "/dashboard/configuracion", label: "Configuración", icon: <FiSettings /> },
];

export default function Sidebar({ onOpenModal }: { onOpenModal: () => void }) {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }

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
                <div className="mb-6 pl-2 flex items-center justify-start h-8">
                    {expanded ? (
                        <h1 className="text-xl font-bold text-[#A71C20]">Induct3D</h1>
                    ) : (
                        <img src={Logo} alt="Logo Induct3D" className="h-6 w-auto" />
                    )}
                </div>


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
                    <button
                        onClick={onOpenModal}
                        className={`flex items-center gap-3 px-3 py-2 mb-2 rounded-lg font-medium transition text-gray-700 hover:bg-gray-100 w-full`}
                    >
                        <FiPlusSquare className="text-lg" />
                        {expanded && <span>Crear recorrido</span>}
                    </button>
                </nav>
            </div>

            {/* Cerrar sesión */}
            <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition w-full text-left"
            >
                <FiLogOut className="text-lg" />
                {expanded && <span>Cerrar sesión</span>}
            </button>
        </aside>
    );
}
