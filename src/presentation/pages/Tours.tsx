import {toursData} from "../../infrastructure/constants/toursData.ts";
import ToursCard from "../components/ToursCard.tsx";

export default function Tours() {
    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Explora los recorridos disponibles</h1>
                <p className="text-gray-600 mb-10">
                    Vive experiencias 3D creadas por otros usuarios de Induct3D. Haz clic en cualquier recorrido para comenzar.
                </p>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {toursData.map((tour) => (
                        <ToursCard key={tour.id} {...tour} />
                    ))}
                </div>
            </div>
        </div>
    );
}
