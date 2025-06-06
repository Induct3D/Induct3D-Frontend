// src/presentation/components/CustomizationSidebar/TourInfoSection.tsx

interface Props {
    tourName: string;
    setTourName: (name: string) => void;
    description: string;
    setDescription: (desc: string) => void;
}

export default function TourInfoSection({
                                            tourName,
                                            setTourName,
                                            description,
                                            setDescription,
                                        }: Props) {
    return (
        <div className="mb-6">
            <div className="mb-4">
                <label className="block font-medium text-gray-700 mb-1">
                    Nombre del recorrido
                </label>
                <input
                    type="text"
                    value={tourName}
                    onChange={(e) => setTourName(e.target.value)}
                    className="w-full border rounded p-2 text-sm"
                />
            </div>
            <div>
                <label className="block font-medium text-gray-700 mb-1">
                    Descripción
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border rounded p-2 text-sm resize-none h-20"
                />
            </div>
        </div>
    );
}
