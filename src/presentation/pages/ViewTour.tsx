import { useParams } from "react-router";
import { useGetTourByIdQuery } from "../../features/auth/tourApi";
import TourViewerCanvas from "../components/3d/TourViewerCanvas.tsx";


export default function ViewTour() {
    const { id } = useParams<{ id: string }>();
    const { data: tour, error, isLoading } = useGetTourByIdQuery(id ?? "");

    if (isLoading) return <p>Cargando recorrido...</p>;
    if (error || !tour) return <p className="text-red-600 p-4">Error al cargar recorrido.</p>;

    return (
        <div className="w-full h-screen">
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
