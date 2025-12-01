// src/presentation/pages/creator/EditTour.tsx
import { useGetTourByIdQuery } from "../../../infrastructure/api/tourApi.ts";
import ModelViewerCanvas from "../../sections/Creator/ModelViewerCanvas";
import { useParams } from "react-router";
import CustomizationSidebarEditor from "../../sections/CustomizationSidebar/CustomizationSidebarEditor.tsx";

export default function EditTour() {
    const { id } = useParams<{ id: string }>();
    const { data: tour, isLoading, error } = useGetTourByIdQuery(id ?? "", {
        refetchOnMountOrArgChange: true,
    });

    if (isLoading) return <p>Cargando recorrido...</p>;
    if (error || !tour)
        return <p className="text-red-600 p-4">Error al cargar recorrido.</p>;

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
                templateId={tour.templateId}
                tourId={tour.tourId}
                initialName={tour.tourName ?? ""}
                initialDescription={tour.description}
                initialColors={tour.materialColors}
                initialSteps={tour.steps.map((s) => ({
                    stepId: s.stepId,
                    messages: s.messages,
                    // 🔧 BoardMedia del editor siempre con html: string
                    boardMedia:
                        s.boardMedia && s.boardMedia.html
                            ? { html: s.boardMedia.html }
                            : undefined,
                }))}
                initialHasPassword={tour.hasPassword ?? false}
                initialPassword={tour.password ?? null}
            />
        </div>
    );
}
