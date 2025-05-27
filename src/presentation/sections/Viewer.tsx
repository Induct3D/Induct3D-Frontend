// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, useGLTF } from '@react-three/drei';
// import {Suspense, useState} from "react";
//
// function Model({ path, color }: { path: string, color: string }) {
//     const { scene, materials } = useGLTF(path);
//     materials["Wall1"].color.set(color);
//     return <primitive object={scene} />;
// }
//
// export default function ViewerPage() {
//     const [wallColor, setWallColor] = useState("#00ff2a");
//
//     return (
//         <>
//             <input
//                 type="color"
//                 value={wallColor}
//                 onChange={(e) => setWallColor(e.target.value)}
//                 className="absolute top-4 left-4 z-50"
//             />
//             <div className="w-full h-screen bg-gray-900">
//                 <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
//                     <ambientLight intensity={1} />
//                     <directionalLight position={[10, 10, 5]} intensity={1} />
//                     <Suspense fallback={null}>
//                         <Model path="/ModeloDeOficina.glb" color={wallColor} />
//                     </Suspense>
//                     <OrbitControls />
//                 </Canvas>
//             </div>
//         </>
//     );
// }
//
