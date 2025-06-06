import CreateProjectCard from "../../components/CreateProjectCard";
import ProjectCard from "../../components/ProjectCard.tsx";
import {useState} from "react";
import {useNavigate} from "react-router";
import SelectTemplateModal from "../../components/Modals/SelectTemplateModal.tsx";
import {useDeleteTourMutation, useGetMyToursQuery } from "../../../features/auth/tourApi.ts";
import ConfirmDeleteModal from "../../components/Modals/ConfirmDeleteModal.tsx";

export default function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const [tourToDelete, setTourToDelete] = useState<{ id: string; title: string } | null>(null);
    const [deleteTour] = useDeleteTourMutation();

    const { data: tours = [], isLoading } = useGetMyToursQuery();

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
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CreateProjectCard onClick={() => setIsModalOpen(true)} />

                    {tours.map((tour) => (
                        <ProjectCard
                            key={tour.tourId}
                            id={tour.tourId}
                            title={tour.tourName || "Sin título"}
                            description={tour.description}
                            imageUrl="/img/OfficeTemplate/LateralOfficeTemplate.png"
                            onDelete={() => setTourToDelete({ id: tour.tourId, title: tour.tourName })}
                        />
                    ))}
                </div>
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
