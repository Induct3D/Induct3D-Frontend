import { useGetAllToursQuery } from "../../features/auth/tourApi";
import ToursCard from "../components/ToursCard";

export default function Tours() {
    const { data: tours, isLoading, isError } = useGetAllToursQuery();

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Explora los recorridos disponibles</h1>
                <p className="text-gray-600 mb-10">
                    Vive experiencias 3D creadas por otros usuarios de Induct3D. Haz clic en cualquier recorrido para comenzar.
                </p>

                {isLoading && <p className="text-gray-500">Cargando recorridos...</p>}
                {isError && <p className="text-red-500">Error al cargar los recorridos</p>}

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {tours?.map((tour) => (
                        <ToursCard
                            key={tour.tourId}
                            id={tour.tourId}
                            title={tour.tourName}
                            description={tour.description}
                            imageUrl="/img/OfficeTemplate/TopOfficeTemplate.png" // o una propiedad futura
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
