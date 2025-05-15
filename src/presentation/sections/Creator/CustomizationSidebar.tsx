import { useEffect, useState } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/store/store.ts";
import CharacterEditor from "./CharacterEditor";

export default function CustomizationSidebar() {
    const glbUrl = useSelector((state: RootState) => state.selectedTemplate.glbUrl);
    const templateId = useSelector((state: RootState) => state.selectedTemplate.id);
    const voiceText = useSelector((state: RootState) => state.selectedTemplate.voiceText);
    const { materials: loadedMaterials } = useGLTF(glbUrl || " ");
    const [materials, setMaterials] = useState<Record<string, THREE.MeshStandardMaterial>>({});
    const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        const editable = Object.entries(loadedMaterials).filter(
            ([name, mat]) =>
                mat instanceof THREE.MeshStandardMaterial && name.toLowerCase().includes("edit")
        );

        setMaterials(Object.fromEntries(editable) as Record<string, THREE.MeshStandardMaterial>);

        const initialColors: Record<string, string> = {};
        for (const [name, mat] of editable) {
            if (mat instanceof THREE.MeshStandardMaterial && mat.color) {
                initialColors[name] = `#${mat.color.getHexString()}`;
            }
        }
        setSelectedColors(initialColors);
    }, [loadedMaterials]);

    useEffect(() => {
        for (const key in selectedColors) {
            if (materials[key]) {
                materials[key].color.set(selectedColors[key]);
            }
        }
    }, [selectedColors, materials]);

    const getDisplayName = (raw: string) => raw.replace(/edit\s*/i, "").trim();

    const handleSave = () => {
        const payload = {
            name,
            description,
            templateId,
            materialColors: selectedColors,
            voiceText,
        };
        console.log("Guardando recorrido:", payload);
        // Aquí irá la petición POST al backend en el siguiente paso
    };

    return (
        <aside className="w-80 border-l bg-white p-6 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-[#A71C20]">Personaliza tu ambiente</h2>

            <div className="mb-4">
                <label className="block font-medium text-gray-700 mb-1">Nombre del recorrido</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border rounded p-2 text-sm"
                />
            </div>

            <div className="mb-6">
                <label className="block font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border rounded p-2 text-sm resize-none h-20"
                />
            </div>

            <details open className="mb-4">
                <summary className="font-semibold text-gray-800 cursor-pointer mb-2">
                    Colores de materiales
                </summary>
                {Object.entries(materials).map(([name]) => (
                    <div key={name} className="mb-4">
                        <label className="block font-medium text-gray-700 mb-1">
                            {getDisplayName(name)}
                        </label>
                        <input
                            type="color"
                            value={selectedColors[name] || "#ffffff"}
                            onChange={(e) =>
                                setSelectedColors((prev) => ({ ...prev, [name]: e.target.value }))
                            }
                            className="w-full h-10 cursor-pointer"
                        />
                    </div>
                ))}
            </details>

            <CharacterEditor />

            <button
                onClick={handleSave}
                className="mt-4 w-full bg-[#A71C20] text-white px-4 py-2 rounded hover:opacity-90 transition"
            >
                Guardar recorrido
            </button>
        </aside>
    );
}
