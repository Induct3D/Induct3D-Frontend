import { Link } from "react-router";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import {Project} from "../../infrastructure/schemas/projectSchema.ts";

type Props = Project;

export default function ProjectCard({ id, title, imageUrl, description }: Props) {
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
                        to={`/dashboard/editar/${id}`}
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                    >
                        <FiEdit /> Editar
                    </Link>
                    <Link
                        to={`/recorrido/${id}`}
                        className="text-sm text-green-600 hover:underline flex items-center gap-1"
                    >
                        <FiEye /> Ver
                    </Link>
                    <button
                        onClick={() => console.log("Eliminar", id)}
                        className="text-sm text-red-600 hover:underline flex items-center gap-1"
                    >
                        <FiTrash2 /> Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}
