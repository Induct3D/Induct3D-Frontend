// src/presentation/pages/admin/ManageTours.tsx

import { useState, useEffect } from "react";
import {
    useGetAdminToursQuery,
    useApproveTourMutation,
    useRejectTourMutation,
} from "../../../infrastructure/api/tourApi.ts";
import AdminTourCard from "../../components/Cards/AdminTourCardPlaceholder";
import RejectTourModal from "../../components/Modals/RejectTourModal";

type FeedbackState = {
    type: "success" | "error";
    message: string;
} | null;

export default function ManageTours() {
    const [status, setStatus] = useState<string>("");
    const [feedback, setFeedback] = useState<FeedbackState>(null);

    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [tourToReject, setTourToReject] = useState<string | null>(null);

    const { data, isLoading, isError } = useGetAdminToursQuery();
    const [approveTour] = useApproveTourMutation();
    const [rejectTour, { isLoading: isRejecting }] = useRejectTourMutation();

    const tours = data?.data ?? [];

    const filtered = status
        ? tours.filter((t) => (t.status ?? "PENDING") === status)
        : tours;

    const statusOptions = [
        { label: "Todos los estados", value: "" },
        { label: "Pendiente", value: "PENDING" },
        { label: "Aprobado", value: "APPROVED" },
        { label: "Rechazado", value: "REJECTED" },
        { label: "Inactivo", value: "INACTIVE" },
    ];

    // 🔄 Ocultar feedback automáticamente después de unos segundos
    useEffect(() => {
        if (!feedback) return;

        const timeout = setTimeout(() => {
            setFeedback(null);
        }, 4000); // 4 segundos visible

        return () => clearTimeout(timeout);
    }, [feedback]);

    const handleApprove = async (id: string) => {
        try {
            const res = await approveTour(id).unwrap();
            setFeedback({
                type: "success",
                message: res.data.message || "Tour aprobado correctamente.",
            });
        } catch (err) {
            const error = err as { data?: { message?: string } };
            setFeedback({
                type: "error",
                message:
                    error?.data?.message ||
                    "No se pudo aprobar el recorrido. Inténtalo nuevamente.",
            });
        }
    };

    const openRejectModal = (id: string) => {
        setTourToReject(id);
        setRejectModalOpen(true);
    };

    const closeRejectModal = () => {
        setRejectModalOpen(false);
        setTourToReject(null);
    };

    const handleConfirmReject = async (reason: string) => {
        if (!tourToReject) return;

        try {
            const res = await rejectTour({ id: tourToReject, reason }).unwrap();
            setFeedback({
                type: "success",
                message: res.data.message || "Tour rechazado correctamente.",
            });
            // ❌ ya no llamamos closeRejectModal aquí
        } catch (err) {
            const error = err as { data?: { message?: string } };
            setFeedback({
                type: "error",
                message:
                    error?.data?.message ||
                    "No se pudo rechazar el recorrido. Inténtalo nuevamente.",
            });
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Gestionar recorridos
            </h2>

            {/* Alertas propias */}
            {feedback && (
                <div
                    className={`mb-4 rounded-lg px-4 py-3 text-sm ${
                        feedback.type === "success"
                            ? "bg-green-50 text-green-800 border border-green-200"
                            : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                >
                    {feedback.message}
                </div>
            )}

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

            {isLoading && <p className="text-gray-500">Cargando recorridos...</p>}
            {isError && <p className="text-red-600">Error al cargar los recorridos.</p>}

            {!isLoading && !isError && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((tour) => (
                            <AdminTourCard
                                key={tour.tourId}
                                id={tour.tourId}
                                title={tour.tourName}
                                description={tour.description}
                                status={tour.status}
                                imageUrl={"/img/TopOfficeTemplate.png"}
                                onApprove={handleApprove}
                                onReject={openRejectModal}
                            />
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <p className="text-gray-500 mt-4">
                            No se encontraron recorridos con ese filtro.
                        </p>
                    )}
                </>
            )}

            {/* Modal de rechazo */}
            <RejectTourModal
                isOpen={rejectModalOpen}
                onClose={closeRejectModal}
                onConfirm={handleConfirmReject}
                loading={isRejecting}
            />
        </div>
    );
}
