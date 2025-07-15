import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { Box3, Vector3 as ThreeVector3, MeshStandardMaterial } from "three";
import { SceneModelProps } from "../../../infrastructure/interfaces/TourTypes";

export default function SceneModel({ glbUrl, materialColors }: SceneModelProps) {
    const { scene, materials } = useGLTF(glbUrl);

    useEffect(() => {
        const box = new Box3().setFromObject(scene);
        const center = new ThreeVector3();
        box.getCenter(center);

        scene.position.x -= center.x;
        scene.position.z -= center.z;
        scene.position.y = 2.3;

        Object.entries(materialColors).forEach(([matName, colorHex]) => {
            const mat = materials[matName];
            if (mat && (mat as MeshStandardMaterial).color) {
                (mat as MeshStandardMaterial).color.set(colorHex);
            }
        });

        // Debug de pizarras
        ["Cube", "Pizarra_step_4"].forEach((name) => {
            const pizarra = scene.getObjectByName(name);
            if (pizarra) {
                const worldPos = new ThreeVector3();
                pizarra.getWorldPosition(worldPos);
                const rot = pizarra.rotation;
                const box = new Box3().setFromObject(pizarra);
                const size = new ThreeVector3();
                box.getSize(size);

                console.log(`🧱 ${name}`);
                console.log("🔹 Position:", {
                    x: parseFloat(worldPos.x.toFixed(2)),
                    y: parseFloat(worldPos.y.toFixed(2)),
                    z: parseFloat(worldPos.z.toFixed(2)),
                });
                console.log("🔹 Rotation (rad):", {
                    x: parseFloat(rot.x.toFixed(2)),
                    y: parseFloat(rot.y.toFixed(2)),
                    z: parseFloat(rot.z.toFixed(2)),
                });
                console.log("🔹 Size (bounding box):", {
                    width: parseFloat(size.x.toFixed(2)),
                    height: parseFloat(size.y.toFixed(2)),
                    depth: parseFloat(size.z.toFixed(2)),
                });
            } else {
                console.warn(`⚠️ No se encontró ${name}`);
            }
        });
    }, [scene, materials, materialColors]);

    return <primitive object={scene} />;
}
