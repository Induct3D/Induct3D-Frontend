// src/presentation/components/Cards/AdminTourCardPlaceholder.tsx
import { Link } from "react-router";

type AdminTourStatus = "APPROVED" | "REJECTED" | null;

interface AdminTourCardProps {
    id: string;
    title: string;
    description: string;
    status: AdminTourStatus;
    imageUrl?: string;
    onApprove?: (id: string) => void;
    onReject?: (id: string) => void; // 👉 abrir modal desde el padre
}

function getStatusConfig(status: AdminTourStatus) {
    if (status === "APPROVED") {
        return { label: "Aprobado", badgeClass: "bg-green-100 text-green-800 border-green-300" };
    }
    if (status === "REJECTED") {
        return { label: "Rechazado", badgeClass: "bg-red-100 text-red-800 border-red-300" };
    }
    return { label: "Pendiente", badgeClass: "bg-yellow-100 text-yellow-800 border-yellow-300" };
}

export default function AdminTourCard({
                                          id,
                                          title,
                                          description,
                                          status,
                                          imageUrl,
                                          onApprove,
                                          onReject,
                                      }: AdminTourCardProps) {
    const { label, badgeClass } = getStatusConfig(status);

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
            <div className="relative w-full h-40 bg-gray-100">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-100" />
                )}

                <span
                    className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full border ${badgeClass}`}
                >
                    {label}
                </span>
            </div>

            <div className="p-4 flex flex-col gap-3 flex-1">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                        {description}
                    </p>
                </div>

                <div className="mt-auto flex flex-wrap gap-2">
                    <Link
                        to={`/admin/recorrido/${id}`}
                        className="flex-1 min-w-[90px] text-center bg-[#A71C20] text-white text-sm font-semibold py-2 px-3 rounded hover:opacity-90 transition"
                    >
                        Ver
                    </Link>

                    <button
                        type="button"
                        onClick={() => onApprove?.(id)}
                        className="flex-1 min-w-[90px] text-center bg-green-600 text-white text-sm font-semibold py-2 px-3 rounded hover:bg-green-700 transition"
                    >
                        Aprobar
                    </button>

                    <button
                        type="button"
                        onClick={() => onReject?.(id)}
                        className="flex-1 min-w-[90px] text-center bg-red-600 text-white text-sm font-semibold py-2 px-3 rounded hover:bg-red-700 transition"
                    >
                        Desaprobar
                    </button>
                </div>
            </div>
        </div>
    );
}
