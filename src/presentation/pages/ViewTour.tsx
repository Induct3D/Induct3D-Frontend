import { useParams } from "react-router";
import {useGetTourByIdQuery} from "../../features/auth/tourApi.ts";
import ViewerCanvas from "../components/3d/ViewerCanvas.tsx";

export default function ViewTour() {
    const { id } = useParams();
    const { data, isLoading, error } = useGetTourByIdQuery(id || "");

    if (isLoading) return <p className="p-6">Cargando recorrido...</p>;
    if (error || !data) return <p className="p-6 text-red-600">Error al cargar el recorrido.</p>;

    return (
        <div className="w-full h-screen">
            <ViewerCanvas
                glbUrl={data.glbUrl}
                materialColors={data.materialColors}
                voiceText={data.voiceText}
            />
        </div>
    );
}
