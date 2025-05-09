import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import {Suspense} from "react";

function Model({ path }: { path: string }) {
    const { scene } = useGLTF(path);
    return <primitive object={scene} />;
}

export default function ViewerPage() {
    return (
        <div className="w-full h-screen bg-gray-900">
            <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
                <ambientLight intensity={1} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Suspense fallback={null}>
                    <Model path="/ModeloDeOficina.glb" />
                </Suspense>
                <OrbitControls />
            </Canvas>
        </div>
    );
}
