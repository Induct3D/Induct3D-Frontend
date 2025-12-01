// src/presentation/pages/admin/Dashboard.tsx

import { useState, useEffect } from "react";
import { Link } from "react-router";
import AdminTourCard from "../../components/Cards/AdminTourCardPlaceholder";
import RejectTourModal from "../../components/Modals/RejectTourModal";
import {
    useApproveTourMutation,
    useGetAdminToursQuery,
    useRejectTourMutation,
} from "../../../infrastructure/api/tourApi.ts";

type FeedbackState = {
    type: "success" | "error";
    message: string;
} | null;

export default function AdminDashboard() {
    const { data, isLoading, isError } = useGetAdminToursQuery();
    const [approveTour] = useApproveTourMutation();
    const [rejectTour, { isLoading: isRejecting }] = useRejectTourMutation();

    const [feedback, setFeedback] = useState<FeedbackState>(null);

    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [tourToReject, setTourToReject] = useState<string | null>(null);

    const tours = data?.data ?? [];
    const firstSix = tours.slice(0, 6);

    // 🔄 Ocultar feedback automáticamente
    useEffect(() => {
        if (!feedback) return;

        const timeout = setTimeout(() => {
            setFeedback(null);
        }, 4000);

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
            // el modal se cierra desde el propio RejectTourModal (onClose)
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
                Panel de administración
            </h2>
            <p className="text-gray-600 mb-4">
                Resumen rápido de recorridos.
            </p>

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

            {isLoading && <p className="text-gray-500">Cargando recorridos...</p>}
            {isError && <p className="text-red-600">Error cargando recorridos.</p>}

            {!isLoading && !isError && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {firstSix.map((tour) => (
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

                    {tours.length > 6 && (
                        <div className="mt-6 flex justify-center">
                            <Link
                                to="/admin/recorridos"
                                className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
                            >
                                Ver más recorridos
                            </Link>
                        </div>
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
