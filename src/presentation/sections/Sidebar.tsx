import { useState } from "react";
import { NavLink, useNavigate } from "react-router"; // mismo paquete que usas
import { FiHome, FiPlusSquare, FiLogOut, FiChevronLeft, FiChevronRight, FiUser } from "react-icons/fi";
import Logo from "/img/LogoInduct3D.png"

const navItems = [
    { path: "/dashboard", label: "Inicio", icon: <FiHome />, end: true }, // <-- end
    { path: "/dashboard/perfil", label: "Perfil", icon: <FiUser /> },
];

export default function Sidebar({ onOpenModal }: { onOpenModal: () => void }) {
    const navigate = useNavigate()
    const [expanded, setExpanded] = useState(true)
    const toggleSidebar = () => setExpanded((p) => !p)

    const baseClasses = "flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition"

    return (
        <aside className={`h-screen bg-white border-r border-gray-200 p-4 flex flex-col justify-between transition-all duration-300 ${expanded ? "w-64" : "w-20"}`}>
            <div>
                <button onClick={toggleSidebar} className="mb-6 text-[#A71C20] hover:bg-gray-100 p-2 rounded transition self-end">
                    {expanded ? <FiChevronLeft /> : <FiChevronRight />}
                </button>

                <div className="mb-6 pl-2 flex items-center justify-start h-8">
                    {expanded ? <h1 className="text-xl font-bold text-[#A71C20]">Induct3D</h1> : <img src={Logo} alt="Logo Induct3D" className="h-6 w-auto" />}
                </div>

                <nav className="space-y-4">
                    {navItems.map(item => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end} // <-- solo exacto para “/dashboard”
                            className={({ isActive }) =>
                                `${baseClasses} ${isActive ? "bg-[#A71C20] text-white" : "text-gray-700 hover:bg-gray-100"}`
                            }
                        >
                            <span className="text-lg">{item.icon}</span>
                            {expanded && <span>{item.label}</span>}
                        </NavLink>
                    ))}

                    <button onClick={onOpenModal} className={`${baseClasses} text-gray-700 hover:bg-gray-100 w-full`}>
                        <FiPlusSquare className="text-lg" />
                        {expanded && <span>Crear recorrido</span>}
                    </button>
                </nav>
            </div>

            <button
                onClick={() => { localStorage.removeItem("token"); navigate("/") }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition w-full text-left"
            >
                <FiLogOut className="text-lg" />
                {expanded && <span>Cerrar sesión</span>}
            </button>
        </aside>
    )
}
