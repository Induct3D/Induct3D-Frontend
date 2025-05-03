import { Link } from "react-router";

interface ToursCardProps {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
}

export default function ToursCard({ id, title, description, imageUrl }: ToursCardProps) {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-48 object-cover"
            />

            <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{description}</p>
                </div>

                <Link
                    to={`/recorrido/${id}`}
                    className="mt-4 inline-block text-center bg-[#A71C20] text-white font-semibold py-2 px-4 rounded hover:opacity-90 transition"
                >
                    Ver recorrido
                </Link>
            </div>
        </div>
    );
}
