import { useState } from "react";
import AdminTourCardPlaceholder from "../../components/Cards/AdminTourCardPlaceholder";

export default function ManageTours() {
    // Estado seleccionado (en inglés, para el backend)
    const [status, setStatus] = useState<string>("");

    const statusOptions = [
        { label: "Todos los estados", value: "" },
        { label: "Pendiente", value: "PENDING" },
        { label: "Aprobado", value: "APPROVED" },
        { label: "Rechazado", value: "REJECTED" },
        { label: "Inactivo", value: "INACTIVE" },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestionar recorridos</h2>

            {/* Filtros */}
            <div className="mb-6 flex flex-wrap gap-3 items-center">
                <input
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-64"
                    placeholder="Buscar por nombre o ID (pendiente)"
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2"
                >
                    {statusOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Grid de cards (placeholder por ahora) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                    <AdminTourCardPlaceholder key={i} />
                ))}
            </div>
        </div>
    );
}
