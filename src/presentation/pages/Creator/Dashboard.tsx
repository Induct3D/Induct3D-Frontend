import CreateProjectCard from "../../components/CreateProjectCard";
import ProjectCard from "../../components/ProjectCard.tsx";
import {useState} from "react";
import {useNavigate} from "react-router";
import SelectTemplateModal from "../../components/Modals/SelectTemplateModal.tsx";
import { useGetMyToursQuery } from "../../../features/auth/tourApi.ts";

export default function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const { data: tours = [], isLoading } = useGetMyToursQuery();

    const handleConfirmTemplate = (templateId: string | null) => {
        if (templateId) {
            setIsModalOpen(false);
            navigate(`/dashboard/crear?template=${templateId}`);
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
                            imageUrl="/default-thumbnail.png"
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
