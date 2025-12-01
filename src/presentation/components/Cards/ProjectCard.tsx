import { FiEye, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router";
import { MdEdit } from "react-icons/md";

type TourStatus = "APPROVED" | "PENDING" | "REJECTED";

type Props = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    status: TourStatus;
    rejectionReason?: string | null;
    onDelete: () => void;
};

export default function ProjectCard({
                                        id,
                                        title,
                                        imageUrl,
                                        description,
                                        status,
                                        rejectionReason,
                                        onDelete,
                                    }: Props) {
    const statusConfig: Record<
        TourStatus,
        { label: string; badgeClass: string; dotClass: string }
    > = {
        APPROVED: {
            label: "Aprobado",
            badgeClass: "bg-green-100 text-green-700",
            dotClass: "bg-green-500",
        },
        PENDING: {
            label: "Pendiente",
            badgeClass: "bg-yellow-100 text-yellow-700",
            dotClass: "bg-yellow-500",
        },
        REJECTED: {
            label: "Rechazado",
            badgeClass: "bg-red-100 text-red-700",
            dotClass: "bg-red-500",
        },
    };

    const { label, badgeClass, dotClass } = statusConfig[status];

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="relative">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-55 object-cover"
                />
                {/* Badge de estado */}
                <div className="absolute top-2 right-2">
                    <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${badgeClass}`}
                    >
                        <span className={`w-2 h-2 rounded-full ${dotClass}`} />
                        {label}
                    </span>
                </div>
            </div>

            <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{description}</p>

                    {/* Mensaje para recorridos rechazados */}
                    {status === "REJECTED" && (
                        <div className="mt-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded-md p-2">
                            <p className="font-semibold">Motivo de rechazo:</p>
                            <p>
                                {rejectionReason
                                    ? rejectionReason
                                    : "El recorrido fue rechazado pero no se especificó el motivo."}
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex gap-3 mt-4">
                    <Link
                        to={`/recorrido/${id}`}
                        className="text-sm text-green-600 hover:underline flex items-center gap-1"
                    >
                        <FiEye /> Ver
                    </Link>
                    <Link
                        to={`/dashboard/editar/${id}`}
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                    >
                        <MdEdit /> Editar
                    </Link>
                    <button
                        onClick={onDelete}
                        className="text-sm text-red-600 hover:underline flex items-center gap-1"
                    >
                        <FiTrash2 /> Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}
