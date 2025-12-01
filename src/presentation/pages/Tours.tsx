import { useState } from "react";
import { useGetAllToursQuery } from "../../infrastructure/api/tourApi.ts";
import ToursCard from "../components/Cards/ToursCard.tsx";

export default function Tours() {
    // página actual (para la paginación de 9 en 9)
    const [page, setPage] = useState(1);

    // ahora el hook recibe page y devuelve ApiResponse<Tour[]>
    const { data, isLoading, isError, isFetching } = useGetAllToursQuery(page);

    const tours = data?.data ?? [];
    const meta = data?.meta;
    const totalPages = meta?.totalPages ?? 1;
    const currentPage = meta?.page ?? page;

    const handlePrev = () => {
        if (currentPage > 1) setPage((p) => p - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setPage((p) => p + 1);
    };

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Explora los recorridos disponibles
                </h1>
                <p className="text-gray-600 mb-10">
                    Vive experiencias 3D creadas por otros usuarios de Induct3D. Haz clic
                    en cualquier recorrido para comenzar.
                </p>

                {isLoading && (
                    <p className="text-gray-500">Cargando recorridos...</p>
                )}
                {isError && (
                    <p className="text-red-500">Error al cargar los recorridos</p>
                )}

                {!isLoading && !isError && tours.length === 0 && (
                    <p className="text-gray-500">
                        No hay recorridos disponibles por el momento.
                    </p>
                )}

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {tours.map((tour) => (
                        <ToursCard
                            key={tour.tourId}
                            id={tour.tourId}
                            title={tour.tourName}
                            description={tour.description}
                            imageUrl="/img/TopOfficeTemplate.png"
                        />
                    ))}
                </div>

                {/* Controles de paginación */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={handlePrev}
                            disabled={currentPage === 1 || isFetching}
                            className="px-4 py-2 border rounded-md disabled:opacity-50"
                        >
                            Anterior
                        </button>
                        <span className="text-gray-700">
              Página {currentPage} de {totalPages}
            </span>
                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages || isFetching}
                            className="px-4 py-2 border rounded-md disabled:opacity-50"
                        >
                            Siguiente
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
