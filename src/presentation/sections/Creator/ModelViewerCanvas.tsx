import { useGLTF, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../infrastructure/store/store.ts";
import {Physics, RigidBody} from "@react-three/rapier";
import FPSController from "../../components/3d/FPSController.tsx";

function SceneModel() {
    const glbUrl = useSelector((state: RootState) => state.selectedTemplate.glbUrl);
    const { scene } = useGLTF(glbUrl || "");

    return (
        <group position={[0, 1.5, 0]}>
            <primitive object={scene} />
        </group>
    );
}

export default function ModelViewerCanvas() {
    return (
        <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
            <ambientLight intensity={2.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />

            <Physics gravity={[0, -9.81, 0]} debug={false}>
                <Suspense fallback={null}>
                    <SceneModel />
                </Suspense>
                <FPSController />

                <RigidBody type="fixed" colliders="cuboid">
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[100, 1, 100]} />
                        <meshStandardMaterial visible={false} />
                    </mesh>
                </RigidBody>
            </Physics>

            {/* Puedes quitar esto si estás usando rotación FPS */}
             <OrbitControls />
        </Canvas>
    );
}

