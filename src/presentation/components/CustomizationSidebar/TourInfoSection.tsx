// src/presentation/components/CustomizationSidebar/TourInfoSection.tsx

type TourInfoSectionProps = {
    tourName: string;
    setTourName: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
    hasPassword: boolean;
    setHasPassword: (value: boolean) => void;
    password: string;
    setPassword: (value: string) => void;
};

export default function TourInfoSection({
                                            tourName,
                                            setTourName,
                                            description,
                                            setDescription,
                                            hasPassword,
                                            setHasPassword,
                                            password,
                                            setPassword,
                                        }: TourInfoSectionProps) {
    return (
        <section className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Información del recorrido</h3>

            {/* Nombre */}
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del recorrido
            </label>
            <input
                type="text"
                value={tourName}
                onChange={(e) => setTourName(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm mb-3"
                placeholder="Ingresa un nombre atractivo"
            />

            {/* Descripción */}
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
            </label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm mb-3 resize-none"
                rows={3}
                placeholder="Describe brevemente el recorrido"
            />

            {/* Protección con contraseña */}
            <div className="mt-2 border-t pt-3">
                <div className="flex items-center gap-2 mb-2">
                    <input
                        id="hasPassword"
                        type="checkbox"
                        checked={hasPassword}
                        onChange={(e) => {
                            const checked = e.target.checked;
                            setHasPassword(checked);
                            if (!checked) setPassword("");
                        }}
                        className="h-4 w-4 text-[#A71C20] border-gray-300 rounded"
                    />
                    <label
                        htmlFor="hasPassword"
                        className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                        Proteger recorrido con contraseña
                    </label>
                </div>

                {hasPassword && (
                    <div className="mt-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Contraseña del recorrido
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded-md px-3 py-2 text-sm"
                            placeholder="Escribe una contraseña"
                        />
                        <p className="text-[11px] text-gray-500 mt-1">
                            Las personas deberán ingresar esta contraseña para ver el recorrido.
                        </p>
                    </div>
                )}
            </div>

        </section>
    );
}
