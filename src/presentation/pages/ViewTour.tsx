import { useParams } from "react-router";
import { useGetTourByIdQuery } from "../../features/auth/tourApi";
import TourViewerCanvas from "../components/3d/TourViewerCanvas.tsx";
import { useState } from "react";

export default function ViewTour() {
    const { id } = useParams<{ id: string }>();
    const { data: tour, error, isLoading } = useGetTourByIdQuery(id ?? "");

    const [showCrosshair] = useState(true); // Control de visibilidad de la mira

    if (isLoading) return <p>Cargando recorrido...</p>;
    if (error || !tour) return <p className="text-red-600 p-4">Error al cargar recorrido.</p>;

    return (
        <div className="w-full h-screen relative"> {/* relative para asegurar que el div de la mira esté posicionado sobre el canvas */}

            {/* Mira */}
            {showCrosshair && (
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2 z-50"></div>
            )}

            {/* Componente principal de la escena */}
            <TourViewerCanvas
                glbUrl={tour.glbUrl}
                predefinedSteps={tour.predefinedSteps}
                steps={tour.steps}
                materialColors={tour.materialColors}
                userStart={tour.userStart}
            />
        </div>
    );
}
