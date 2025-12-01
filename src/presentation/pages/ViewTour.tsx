// src/presentation/pages/ViewTour.tsx

import { useParams } from "react-router";
import { useGetTourByIdQuery } from "../../infrastructure/api/tourApi.ts";
import TourViewerCanvas from "../components/3d/TourViewerCanvas.tsx";
import { useState } from "react";

export default function ViewTour() {
    const { id } = useParams<{ id: string }>();
    const [showCrosshair] = useState(true);

    const {
        data: tour,
        isLoading,
        error,
    } = useGetTourByIdQuery(id ?? "", {
        refetchOnMountOrArgChange: true,
    });

    if (!id) {
        return (
            <p className="text-red-600 p-4">
                URL inválida: falta el ID del recorrido.
            </p>
        );
    }

    if (isLoading) return <p>Cargando recorrido...</p>;
    if (error || !tour) {
        console.error("Error cargando tour:", error, tour);
        return (
            <p className="text-red-600 p-4">
                Error al cargar recorrido.
            </p>
        );
    }

    return (
        <div className="w-full h-screen relative">
            {/* Mira */}
            {showCrosshair && (
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2 z-50" />
            )}

            {/* Escena 3D */}
            <TourViewerCanvas
                glbUrl={tour.glbUrl}
                predefinedSteps={tour.predefinedSteps}
                steps={tour.steps}
                materialColors={tour.materialColors}
                userStart={tour.userStart}
                tourTitle={tour.tourName} // 👈 aquí va el título
            />
        </div>
    );
}
