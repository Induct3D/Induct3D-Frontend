import { useGetTourByIdQuery } from "../../../features/auth/tourApi";
import ModelViewerCanvas from "../../sections/Creator/ModelViewerCanvas";
import {useParams} from "react-router";
import CustomizationSidebarEditor from "../../components/CustomizationSidebar/CustomizationSidebarEditor.tsx";

export default function EditTour() {
    const { id } = useParams<{ id: string }>();
    const { data: tour, isLoading, error } = useGetTourByIdQuery(id ?? "", {
        refetchOnMountOrArgChange: true,
    });

    if (isLoading) return <p>Cargando recorrido...</p>;
    if (error || !tour) return <p className="text-red-600 p-4">Error al cargar recorrido.</p>;

    return (
        <div className="flex h-full">
            <div className="flex-1 bg-gray-100">
                <ModelViewerCanvas
                    glbUrl={tour.glbUrl}
                    predefinedSteps={tour.predefinedSteps}
                    userStart={tour.userStart}
                />
            </div>
            <CustomizationSidebarEditor
                glbUrl={tour.glbUrl}
                predefinedSteps={tour.predefinedSteps}
                templateId={tour.tourId} // si es que aún tienes acceso, o tour.tourId
                tourId={tour.tourId}
                initialName={tour.tourName ?? ""}
                initialDescription={tour.description}
                initialColors={tour.materialColors}
                initialSteps={tour.steps.map((s) => ({
                    stepId: s.stepId,
                    messages: s.messages,
                    boardMedia: s.boardMedia ?? undefined, // 👈 esta es la clave
                }))}
            />
        </div>
    );
}
