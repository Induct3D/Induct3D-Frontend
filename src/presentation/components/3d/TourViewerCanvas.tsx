import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import FPSController from "../../components/3d/FPSController";
import GuideCharacterWithSpeech from "../../components/3d/GuideCharacterWithSpeech";
import { useGLTF } from "@react-three/drei";
import { Box3, Vector3 as ThreeVector3, MeshStandardMaterial } from "three";

type LocalVector3 = { x: number; y: number; z: number };
type Step = {
    stepId: string;
    messages: string[];
    boardMedia?: {
        type: "image" | "video";
        urls: string[];
    } | null;
};
type PredefinedStep = {
    id: string;
    position: LocalVector3[];
    hasBoard?: boolean;
};

type Props = {
    glbUrl: string;
    predefinedSteps: PredefinedStep[];
    steps: Step[];
    materialColors: Record<string, string>;
    userStart: LocalVector3;
};

function SceneModel({
                        glbUrl,
                        materialColors,
                    }: {
    glbUrl: string;
    materialColors: Record<string, string>;
}) {
    const { scene, materials } = useGLTF(glbUrl);

    useEffect(() => {
        const box = new Box3().setFromObject(scene);
        const center = new ThreeVector3();
        box.getCenter(center);

        scene.position.x -= center.x;
        scene.position.z -= center.z;
        scene.position.y = 2.30;

        // Aplica colores personalizados
        Object.entries(materialColors).forEach(([matName, colorHex]) => {
            // Algunos materiales pueden no existir o no ser MeshStandardMaterial
            const mat = materials[matName];
            if (mat && (mat as MeshStandardMaterial).color) {
                (mat as MeshStandardMaterial).color.set(colorHex);
            }
        });
    }, [scene, materials, materialColors]);

    return <primitive object={scene} />;
}

export default function TourViewerCanvas({
                                             glbUrl,
                                             predefinedSteps,
                                             steps,
                                             materialColors,
                                             userStart,
                                         }: Props) {
    const [subtitle, setSubtitle] = useState("");

    return (
        <>
            <Canvas camera={{ fov: 50 }}>
                <ambientLight intensity={2.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Physics gravity={[0, -9.81, 0]} debug={false}>
                    <RigidBody type="fixed" colliders="trimesh">
                        <React.Suspense fallback={null}>
                            {glbUrl && glbUrl.endsWith(".glb") && (
                                <SceneModel glbUrl={glbUrl} materialColors={materialColors} />
                            )}
                        </React.Suspense>
                    </RigidBody>

                    <FPSController userStart={userStart} />

                    <GuideCharacterWithSpeech
                        predefinedSteps={predefinedSteps}
                        steps={steps}
                        onVisibleMessageChange={setSubtitle}
                    />

                    <RigidBody type="fixed" colliders="cuboid">
                        <mesh position={[0, 2.39, 0]}>
                            <boxGeometry args={[100, 0.1, 100]} />
                            <meshStandardMaterial visible={false} />
                        </mesh>
                    </RigidBody>
                </Physics>
            </Canvas>

            {/* Subtítulo fijo abajo */}
            {subtitle && (
                <div
                    className="
            fixed bottom-8
            left-1/2 transform -translate-x-1/2
            bg-black bg-opacity-70 text-white
            px-6 py-3
            rounded-lg
            max-w-md w-1/3
            text-center
            text-lg
            select-none
            pointer-events-none
            z-50"
                >
                    {subtitle}
                </div>
            )}
        </>
    );
}
