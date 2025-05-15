import { dummyProjects } from "../../../infrastructure/constants/dummyProjects";
import CreateProjectCard from "../../components/CreateProjectCard";
import ProjectCard from "../../components/ProjectCard.tsx";
import {useState} from "react";
import {useNavigate} from "react-router";
import SelectTemplateModal from "../../components/Modals/SelectTemplateModal.tsx";

export default function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <CreateProjectCard onClick={() => setIsModalOpen(true)} />

                {dummyProjects?.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                ))}
            </div>
        </div>
    );
}
