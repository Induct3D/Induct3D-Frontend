// src/presentation/pages/Dashboard/Dashboard.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import CreateProjectCard from "../../components/Cards/CreateProjectCard.tsx";
import ProjectCard from "../../components/Cards/ProjectCard.tsx";
import SelectTemplateModal from "../../components/Modals/SelectTemplateModal.tsx";
import ConfirmDeleteModal from "../../components/Modals/ConfirmDeleteModal.tsx";
import {
    useDeleteTourMutation,
    useGetMyToursQuery,
} from "../../../infrastructure/api/tourApi.ts";

export default function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const [tourToDelete, setTourToDelete] = useState<{
        id: string;
        title: string;
    } | null>(null);

    const [deleteTour] = useDeleteTourMutation();

    // 👉 paginación local
    const [page, setPage] = useState(1);

    // 👉 ahora el hook devuelve ApiResponse<Tour[]>
    const {
        data,
        isLoading,
        isFetching,
        isError,
    } = useGetMyToursQuery(page);

    const tours = data?.data ?? [];
    const meta = data?.meta;
    const totalPages = meta?.totalPages ?? 1;
    const currentPage = meta?.page ?? page;

    const handleConfirmTemplate = (templateId: string | null) => {
        if (templateId) {
            setIsModalOpen(false);
            navigate(`/dashboard/crear?template=${templateId}`);
        }
    };

    const handleDelete = async () => {
        if (!tourToDelete) return;
        try {
            await deleteTour(tourToDelete.id).unwrap();
            setTourToDelete(null);
        } catch (error) {
            console.error("Error al eliminar el tour:", error);
            alert("No se pudo eliminar el recorrido");
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) setPage((p) => p - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setPage((p) => p + 1);
    };

    return (
        <div>
            <SelectTemplateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmTemplate}
            />

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Tus recorridos
            </h2>

            {isLoading ? (
                <p className="text-gray-600">Cargando recorridos...</p>
            ) : isError ? (
                <p className="text-red-600">
                    Ocurrió un error al cargar tus recorridos.
                </p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Card para crear un nuevo tour */}
                        <CreateProjectCard onClick={() => setIsModalOpen(true)} />

                        {tours.length === 0 ? (
                            <p className="text-gray-600 col-span-full">
                                Aún no has creado recorridos.
                            </p>
                        ) : (
                            tours.map((tour) => (
                                <ProjectCard
                                    key={tour.tourId}
                                    id={tour.tourId}
                                    title={tour.tourName || "Sin título"}
                                    description={tour.description}
                                    imageUrl="/img/LateralOfficeTemplate.png"
                                    onDelete={() =>
                                        setTourToDelete({
                                            id: tour.tourId,
                                            title: tour.tourName,
                                        })
                                    }
                                />
                            ))
                        )}
                    </div>

                    {/* Controles de paginación */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-8">
                            <button
                                onClick={handlePrev}
                                disabled={currentPage === 1 || isFetching}
                                className="px-4 py-2 border rounded-lg disabled:opacity-50"
                            >
                                Anterior
                            </button>
                            <span className="text-gray-700">
                Página {currentPage} de {totalPages}
              </span>
                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages || isFetching}
                                className="px-4 py-2 border rounded-lg disabled:opacity-50"
                            >
                                Siguiente
                            </button>
                        </div>
                    )}
                </>
            )}

            <ConfirmDeleteModal
                isOpen={!!tourToDelete}
                tourTitle={tourToDelete?.title || ""}
                onCancel={() => setTourToDelete(null)}
                onConfirm={handleDelete}
            />
        </div>
    );
}
