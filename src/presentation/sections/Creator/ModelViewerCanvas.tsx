import {useGLTF, OrbitControls} from "@react-three/drei";
import * as THREE from "three";
import {Canvas} from "@react-three/fiber";
import {Suspense, useEffect} from "react";
import {Physics, RigidBody} from "@react-three/rapier";
import FPSController from "../../components/3d/FPSController.tsx";
import GuideCharacter from "../../components/3d/GuideCharacter.tsx";
import { useStore } from "../../../infrastructure/store/positionStore.ts";

function SceneModel({ glbUrl }: { glbUrl: string }) {
    const { scene } = useGLTF(glbUrl);

    useEffect(() => {

        // Recentrar en X y Z
        const box = new THREE.Box3().setFromObject(scene);
        const center = new THREE.Vector3();
        box.getCenter(center);

        // Centrar en X y Z, pero dejar Y en 2.3
        scene.position.x -= center.x;
        scene.position.z -= center.z;
        scene.position.y = 2.3;
    }, [scene]);

    return <primitive object={scene} />;
}



export default function ModelViewerCanvas({ glbUrl }: { glbUrl: string }) {
    const { position } = useStore();

    return (
        <div className="relative w-full h-full">
            <Canvas camera={{ position: [0, 1.6, 20], fov: 50 }}>
                <ambientLight intensity={2.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />

                <Physics gravity={[0, -9.81, 0]} debug={false}>
                    <RigidBody type="fixed" colliders="trimesh">
                        <Suspense fallback={null}>
                            {glbUrl && glbUrl.endsWith(".glb") && <SceneModel glbUrl={glbUrl} />}
                        </Suspense>
                    </RigidBody>

                    <FPSController />
                    <GuideCharacter />

                    {/* Piso visual */}
                    <RigidBody type="fixed" colliders="cuboid">
                        <mesh position={[0, 2.39, 0]}>
                            <boxGeometry args={[100, 0.1, 100]} />
                            <meshStandardMaterial visible={false} />
                        </mesh>
                    </RigidBody>
                </Physics>

                <OrbitControls />
            </Canvas>

            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 text-xs rounded z-50">
                <p>x: {position.x.toFixed(2)}</p>
                <p>y: {position.y.toFixed(2)}</p>
                <p>z: {position.z.toFixed(2)}</p>
            </div>
        </div>
    );
}