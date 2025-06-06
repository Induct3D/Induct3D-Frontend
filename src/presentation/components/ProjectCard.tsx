import { FiEye, FiTrash2 } from "react-icons/fi";
import {Link} from "react-router";

type Props = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    onDelete: () => void;
};

export default function ProjectCard({ id, title, imageUrl, description, onDelete }: Props) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
            <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{description}</p>
                </div>

                <div className="flex gap-3 mt-4">
                    <Link
                        to={`/recorrido/${id}`}
                        className="text-sm text-green-600 hover:underline flex items-center gap-1"
                    >
                        <FiEye /> Ver
                    </Link>
                    <button
                        onClick={onDelete}
                        className="text-sm text-red-600 hover:underline flex items-center gap-1"
                    >
                        <FiTrash2 /> Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}
