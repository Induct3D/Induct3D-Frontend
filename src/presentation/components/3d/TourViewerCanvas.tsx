import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import FPSController from "../Camera/FPSController.tsx";
import GuideCharacterWithSpeech from "../GuideCharacter/GuideCharacterWithSpeech.tsx";
import StepBoardHtml from "./StepBoardHtml";
import {TourViewerCanvasProps} from "../../../infrastructure/interfaces/TourTypes.ts";
import SceneModel from "./SceneModel.tsx";

export default function TourViewerCanvas({
                                             glbUrl,
                                             predefinedSteps,
                                             steps,
                                             materialColors,
                                             userStart,
                                         }: TourViewerCanvasProps) {
    const [subtitle, setSubtitle] = useState("");

    return (
        <>
            {/* Canvas para el modelo */}
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
                {steps.map((step) => {
                    if (!step.boardMedia) return null;

                    const stepMeta = predefinedSteps.find((ps) => ps.id === step.stepId);
                    if (!stepMeta || !stepMeta.hasBoard || !stepMeta.boardConfig) return null;

                    const base = stepMeta.boardConfig.position;
                    const rot = stepMeta.boardConfig.rotation ?? { x: 0, y: 0, z: 0 };
                    const scale = stepMeta.boardConfig.scale ?? 1;

// Desplazamiento de 0.5 m hacia adelante en base a la rotación Y
                    const offsetZ = 0.02;
                    const cosY = Math.cos(rot.y);
                    const sinY = Math.sin(rot.y);

                    const adjustedPos: [number, number, number] = [
                        base.x + offsetZ * sinY,
                        base.y,
                        base.z + offsetZ * cosY
                    ];

                    return (
                        <StepBoardHtml
                            key={step.stepId}
                            position={adjustedPos}
                            rotation={[rot.x, rot.y, rot.z]}
                            scale={scale}
                            html={step.boardMedia.html}
                        />
                    );
                })}

            </Canvas>

            {/* Subtítulo fijo abajo */}
            {subtitle && (
                <div
                    className="
            fixed bottom-8
            left-1/2 transform -translate-x-1/2
            bg-black/70 text-white
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

            {/* Mensaje de indicaciones en la parte superior izquierda */}
            <div
                className="
          fixed top-8 left-8 bg-black/50 text-white px-4 py-3 rounded-lg
          max-w-xs text-sm z-50"
            >
                <p className="mb-2"><strong>Movimientos:</strong></p>
                <p>- Haz clic en el área del modelo (clic en el canvas) para mover la cámara con el mouse.</p>
                <p className="mt-2">- Usa las teclas: W (adelante), A (izquierda), S (atrás), D (derecha).</p>
                <p className="mt-2">- Presiona espacio para avanzar al siguiente paso.</p>
            </div>
        </>
    );
}
