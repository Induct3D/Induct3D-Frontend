import { FiPlus } from "react-icons/fi";

interface CreateProjectCardProps {
    onClick: () => void;
}

export default function CreateProjectCard({ onClick }: CreateProjectCardProps) {
    return (
        <div
            onClick={onClick}
            className="border-2 border-dashed border-[#A71C20] flex flex-col items-center justify-center cursor-pointer rounded-lg hover:bg-[#A71C20]/5 transition min-h-[220px] p-6"
        >
            <FiPlus className="text-4xl text-[#A71C20]" />
            <p className="mt-2 text-[#A71C20] font-medium text-center">Crear nuevo recorrido</p>
        </div>
    );
}
