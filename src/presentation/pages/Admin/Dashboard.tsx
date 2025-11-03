import AdminTourCardPlaceholder from "../../components/Cards/AdminTourCardPlaceholder";

export default function AdminDashboard() {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Panel de administración</h2>
            <p className="text-gray-600 mb-4">Resumen rápido de recorridos (pendiente de integrar).</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <AdminTourCardPlaceholder key={i} />
                ))}
            </div>
        </div>
    );
}
