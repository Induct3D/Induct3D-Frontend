// import { Canvas, useThree } from "@react-three/fiber";
// import { Suspense, useEffect, useState } from "react";
// import { Physics, RigidBody } from "@react-three/rapier";
// import { useGLTF } from "@react-three/drei";
// import * as THREE from "three";
// import GuideCharacter from "./GuideCharacter";
// import FPSController from "./FPSController";
//
// type Props = {
//     glbUrl: string;
//     materialColors: Record<string, string>;
//     voiceText: string;
// };
//
// function SceneModel({ glbUrl, materialColors }: Omit<Props, "voiceText">) {
//     const { scene, materials } = useGLTF(glbUrl);
//
//     useEffect(() => {
//         Object.entries(materialColors).forEach(([name, color]) => {
//             const mat = materials[name];
//             if (mat instanceof THREE.MeshStandardMaterial) {
//                 mat.color.set(color);
//             }
//         });
//     }, [materialColors, materials]);
//
//     return (
//         <group position={[0, 1.5, 0]}>
//             <primitive object={scene} />
//         </group>
//     );
// }
//
// function VoiceOnClick({ text, onStart, onEnd }: {
//     text: string;
//     onStart: () => void;
//     onEnd: () => void;
// }) {
//     const { gl } = useThree();
//     const [hasSpoken, setHasSpoken] = useState(false);
//
//     useEffect(() => {
//         const handleClick = () => {
//             if (!hasSpoken && text.trim()) {
//                 const utterance = new SpeechSynthesisUtterance(text);
//                 utterance.lang = "es-PE";
//                 utterance.onstart = onStart;
//                 utterance.onend = onEnd;
//
//                 speechSynthesis.cancel();
//                 speechSynthesis.speak(utterance);
//                 setHasSpoken(true);
//             }
//         };
//
//         gl.domElement.addEventListener("click", handleClick);
//         return () => {
//             gl.domElement.removeEventListener("click", handleClick);
//         };
//     }, [gl, text, hasSpoken, onStart, onEnd]);
//
//     return null;
// }
//
//
// export default function ViewerCanvas({ glbUrl, materialColors, voiceText }: Props) {
//     const [isSpeaking, setIsSpeaking] = useState(false);
//
//     return (
//         <div className="relative w-full h-full">
//             <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
//                 <ambientLight intensity={2.5} />
//                 <directionalLight position={[10, 10, 5]} intensity={1} />
//
//                 <Physics gravity={[0, -9.81, 0]}>
//                     <Suspense fallback={null}>
//                         <SceneModel glbUrl={glbUrl} materialColors={materialColors} />
//                         <GuideCharacter />
//                         <VoiceOnClick
//                             text={voiceText}
//                             onStart={() => setIsSpeaking(true)}
//                             onEnd={() => setIsSpeaking(false)}
//                         />
//                     </Suspense>
//
//                     <FPSController />
//
//                     <RigidBody type="fixed" colliders="cuboid">
//                         <mesh position={[0, 0, 0]}>
//                             <boxGeometry args={[100, 1, 100]} />
//                             <meshStandardMaterial visible={false} />
//                         </mesh>
//                     </RigidBody>
//                 </Physics>
//             </Canvas>
//
//             {isSpeaking && (
//                 <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-6 py-3 rounded-md text-sm max-w-xl text-center pointer-events-none">
//                     {voiceText}
//                 </div>
//             )}
//         </div>
//     );
// }
//
