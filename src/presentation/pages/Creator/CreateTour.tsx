import ModelViewerCanvas from "../../sections/Creator/ModelViewerCanvas.tsx";
import CustomizationSidebar from "../../components/CustomizationSidebar/CustomizationSidebar.tsx";
import { useSearchParams } from "react-router";
import {useGetTemplateByIdQuery} from "../../../features/auth/templateApi.ts";


export default function CreateTour() {
    const [searchParams] = useSearchParams();
    const templateId = searchParams.get("template") ?? "";

    const { data: template, error, isLoading } = useGetTemplateByIdQuery(templateId);

    if (isLoading) return <p>Cargando plantilla...</p>;
    if (error || !template)
        return <p className="text-red-600 p-4">Error al cargar plantilla.</p>;


    // Zod validó y tipó template, usa las props con los nombres correctos
    return (
        <div className="flex h-full">
            <div className="flex-1 bg-gray-100">
                <ModelViewerCanvas
                    glbUrl={template.glbUrl}
                    predefinedSteps={template.predefinedSteps}
                    userStart={template.userStart}
                />
            </div>
            <CustomizationSidebar
                glbUrl={template.glbUrl}
                predefinedSteps={template.predefinedSteps}
                templateId={templateId}
            />
        </div>
    );
}
