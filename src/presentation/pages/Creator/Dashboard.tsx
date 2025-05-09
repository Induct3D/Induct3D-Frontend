import { dummyProjects } from "../../../infrastructure/constants/dummyProjects";
import CreateProjectCard from "../../components/CreateProjectCard";
import ProjectCard from "../../components/ProjectCard.tsx";

export default function Dashboard() {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Tus recorridos
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card para crear nuevo proyecto */}
                <CreateProjectCard />

                {/* Cards de proyectos existentes */}
                {dummyProjects?.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                ))}
            </div>
        </div>
    );
}
