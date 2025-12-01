// src/presentation/pages/admin/AdminViewTour.tsx

import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import {
    useGetTourByIdQuery,
    useApproveTourMutation,
    useRejectTourMutation,
} from "../../../infrastructure/api/tourApi.ts";
import TourViewerCanvas from "../../components/3d/TourViewerCanvas.tsx";
import RejectTourModal from "../../components/Modals/RejectTourModal";

type FeedbackState = {
    type: "success" | "error";
    message: string;
} | null;

export default function AdminViewTour() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const {
        data: tour,
        isLoading,
        error,
    } = useGetTourByIdQuery(id ?? "", {
        refetchOnMountOrArgChange: true,
    });

    const [approveTour] = useApproveTourMutation();
    const [rejectTour, { isLoading: isRejecting }] = useRejectTourMutation();

    const [feedback, setFeedback] = useState<FeedbackState>(null);

    const [rejectModalOpen, setRejectModalOpen] = useState(false);

    // Ocultar feedback automáticamente (solo para errores)
    useEffect(() => {
        if (!feedback) return;
        const t = setTimeout(() => setFeedback(null), 4000);
        return () => clearTimeout(t);
    }, [feedback]);

    if (!id) {
        return (
            <p className="text-red-600 p-4">
                URL inválida: falta el ID del recorrido.
            </p>
        );
    }

    if (isLoading) return <p className="p-4">Cargando recorrido...</p>;

    if (error || !tour) {
        console.error("Error cargando tour:", error, tour);
        return (
            <p className="text-red-600 p-4">
                Error al cargar recorrido.
            </p>
        );
    }

    const handleApprove = async () => {
        try {
            await approveTour(id).unwrap();
            // ✅ al aprobar, ir directo al dashboard admin
            navigate("/admin");
        } catch (err) {
            const errorData = err as { data?: { message?: string } };
            setFeedback({
                type: "error",
                message:
                    errorData?.data?.message ||
                    "No se pudo aprobar el recorrido. Inténtalo nuevamente.",
            });
        }
    };

    const openRejectModal = () => {
        setRejectModalOpen(true);
    };

    const closeRejectModal = () => {
        setRejectModalOpen(false);
    };

    const handleConfirmReject = async (reason: string) => {
        try {
            await rejectTour({ id, reason }).unwrap();
            // ✅ al rechazar (con razón) ir al dashboard admin
            navigate("/admin");
        } catch (err) {
            const errorData = err as { data?: { message?: string } };
            setFeedback({
                type: "error",
                message:
                    errorData?.data?.message ||
                    "No se pudo rechazar el recorrido. Inténtalo nuevamente.",
            });
        }
    };

    return (
        <div className="w-full h-screen relative">
            {/* Alertas propias SOLO para errores */}
            {feedback && (
                <div
                    className={`absolute top-4 left-1/2 -translate-x-1/2 z-[70] rounded-lg px-4 py-3 text-sm ${
                        feedback.type === "success"
                            ? "bg-green-50 text-green-800 border border-green-200"
                            : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                >
                    {feedback.message}
                </div>
            )}

            {/* Viewer 3D en modo admin */}
            <TourViewerCanvas
                glbUrl={tour.glbUrl}
                predefinedSteps={tour.predefinedSteps}
                steps={tour.steps}
                materialColors={tour.materialColors}
                userStart={tour.userStart}
                tourTitle={tour.tourName ?? "Recorrido sin título"}
                isAdmin={true}
                onAdminApprove={handleApprove}
                onAdminReject={openRejectModal}
            />


            {/* Modal de rechazo (encima de todo) */}
            <RejectTourModal
                isOpen={rejectModalOpen}
                onClose={closeRejectModal}
                onConfirm={handleConfirmReject}
                loading={isRejecting}
            />
        </div>
    );
}
