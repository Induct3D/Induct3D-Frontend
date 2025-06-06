// src/presentation/components/CustomizationSidebar/MaterialColorsSection.tsx
import { MaterialMap, ColorMap, ColorMapSetter } from "./types";

interface Props {
    materials: MaterialMap;
    selectedColors: ColorMap;
    setSelectedColors: ColorMapSetter;
}

const getDisplayName = (raw: string) => raw.replace(/edit\s*/i, "").trim();

export default function MaterialColorsSection({
                                                  materials,
                                                  selectedColors,
                                                  setSelectedColors,
                                              }: Props) {
    return (
        <details open className="mb-4">
            <summary className="font-semibold text-gray-800 cursor-pointer mb-2">
                Colores de materiales
            </summary>

            {/* Grid de 2 columnas (en pantallas pequeñas se mantendrá 1 columna) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(materials).map(([name]) => (
                    <div key={name} className="flex flex-col">
                        <label className="block font-medium text-gray-700 mb-1 text-sm">
                            {getDisplayName(name)}
                        </label>
                        <input
                            type="color"
                            value={selectedColors[name] || "#ffffff"}
                            onChange={(e) =>
                                setSelectedColors((prev) => ({
                                    ...prev,
                                    [name]: e.target.value,
                                }))
                            }
                            className="w-full h-8 cursor-pointer"
                        />
                    </div>
                ))}
            </div>
        </details>
    );
}
