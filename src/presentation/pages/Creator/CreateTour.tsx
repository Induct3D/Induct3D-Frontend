import { useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export default function CreateTourPage() {
    const [materials, setMaterials] = useState<Record<string, THREE.MeshStandardMaterial>>({});
    const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});

    const { scene, materials: loadedMaterials } = useGLTF("/ModeloDeOficina.glb"); // simulado

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

    // Actualizar colores en tiempo real
    useEffect(() => {
        for (const key in selectedColors) {
            if (materials[key]) {
                materials[key].color.set(selectedColors[key]);
            }
        }
    }, [selectedColors, materials]);

    // Utilidad para mostrar nombre limpio sin "Edit"
    const getDisplayName = (raw: string) => raw.replace(/edit\s*/i, "").trim();

    return (
        <div className="flex h-screen">
            {/* Canvas 3D */}
            <div className="flex-1 bg-gray-100">
                <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
                    <ambientLight intensity={1} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <Suspense fallback={null}>
                        <primitive object={scene} />
                    </Suspense>
                    <OrbitControls />
                </Canvas>
            </div>

            {/* Barra lateral */}
            <aside className="w-80 border-l bg-white p-6 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4 text-[#A71C20]">Personaliza tu ambiente</h2>
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
            </aside>
        </div>
    );
}
