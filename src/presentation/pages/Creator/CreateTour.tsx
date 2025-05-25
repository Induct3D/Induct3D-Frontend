import ModelViewerCanvas from "../../sections/Creator/ModelViewerCanvas.tsx";
import CustomizationSidebar from "../../sections/Creator/CustomizationSidebar.tsx";
import { useSearchParams } from "react-router";
import {useGetGlbUrlByTemplateIdQuery} from "../../../features/auth/templateApi.ts";

export default function CreateTour() {
    const [searchParams] = useSearchParams();
    const templateId = searchParams.get("template");
    const { data: glbUrl, isLoading, error } = useGetGlbUrlByTemplateIdQuery(templateId ?? "");

    if (isLoading) return <p>Cargando modelo...</p>;
    if (error || !glbUrl || !glbUrl.endsWith(".glb")) {
        return <p className="text-red-600 p-4">Error al cargar el modelo.</p>;
    }
    return (
        <div className="flex h-full ">
            <div className="flex-1 bg-gray-100">
                <ModelViewerCanvas glbUrl={glbUrl} />
            </div>
            <CustomizationSidebar />
        </div>
    );
}

