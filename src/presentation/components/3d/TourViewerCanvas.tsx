// src/presentation/components/3d/TourViewerCanvas.tsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import FPSController from "../Camera/FPSController.tsx";
import GuideCharacterWithSpeech from "../GuideCharacter/GuideCharacterWithSpeech.tsx";
import StepBoardHtml from "./StepBoardHtml";
import { TourViewerCanvasProps } from "../../../infrastructure/interfaces/TourTypes.ts";
import SceneModel from "./SceneModel.tsx";

type MenuView = "main" | "instructions";

export default function TourViewerCanvas({
                                             glbUrl,
                                             predefinedSteps,
                                             steps,
                                             materialColors,
                                             userStart,
                                             tourTitle,
                                             isAdmin = false,
                                             onAdminApprove,
                                             onAdminReject,
                                         }: TourViewerCanvasProps) {
    const [subtitle, setSubtitle] = useState("");
    const [isPaused, setIsPaused] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [menuView, setMenuView] = useState<MenuView>("main");

    const navigate = useNavigate();

    // Volver del submenú de instrucciones al menú principal con ESC (solo en pausa)
    useEffect(() => {
        if (!isPaused || menuView !== "instructions") return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setMenuView("main");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isPaused, menuView]);

    // Iniciar recorrido desde el menú de inicio
    const handleStart = () => {
        const canvas = document.getElementById(
            "tour-viewer-canvas",
        ) as HTMLCanvasElement | null;

        if (canvas && canvas.requestPointerLock) {
            canvas.requestPointerLock();
        }

        setHasStarted(true);
        setIsPaused(false);
        setMenuView("main");
    };

    // Continuar desde el menú de pausa
    const handleContinue = () => {
        const canvas = document.getElementById(
            "tour-viewer-canvas",
        ) as HTMLCanvasElement | null;

        if (canvas && canvas.requestPointerLock) {
            canvas.requestPointerLock();
        }

        setIsPaused(false);
        setMenuView("main");
    };

    const handleShowInstructionsFromMenu = () => {
        setMenuView("instructions");
    };

    return (
        <>
            <Canvas id="tour-viewer-canvas" camera={{ fov: 50 }}>
                <ambientLight intensity={2.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Physics gravity={[0, -9.81, 0]} debug={false}>
                    <RigidBody type="fixed" colliders="trimesh">
                        <React.Suspense fallback={null}>
                            {glbUrl && glbUrl.endsWith(".glb") && (
                                <SceneModel
                                    glbUrl={glbUrl}
                                    materialColors={materialColors}
                                />
                            )}
                        </React.Suspense>
                    </RigidBody>

                    <FPSController
                        userStart={userStart}
                        isPaused={!hasStarted || isPaused}
                        onPointerUnlock={() => {
                            if (hasStarted) {
                                setIsPaused(true);
                                setMenuView("main");
                            }
                        }}
                    />

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

                    const stepMeta = predefinedSteps.find(
                        (ps) => ps.id === step.stepId,
                    );
                    if (!stepMeta || !stepMeta.hasBoard || !stepMeta.boardConfig)
                        return null;

                    const base = stepMeta.boardConfig.position;
                    const rot =
                        stepMeta.boardConfig.rotation ?? {
                            x: 0,
                            y: 0,
                            z: 0,
                        };
                    const scale = stepMeta.boardConfig.scale ?? 1;

                    const offsetZ = 0.02;
                    const cosY = Math.cos(rot.y);
                    const sinY = Math.sin(rot.y);

                    const adjustedPos: [number, number, number] = [
                        base.x + offsetZ * sinY,
                        base.y,
                        base.z + offsetZ * cosY,
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

            {/* Subtítulos solo si ya empezó y no está en pausa */}
            {subtitle && hasStarted && !isPaused && (
                <div
                    className="
                        fixed bottom-6
                        left-1/2 -translate-x-1/2
                        bg-black/70 text-white
                        px-6 py-3
                        rounded-lg
                        max-w-2xl w-[70%]
                        text-base leading-relaxed
                        text-center
                        select-none
                        pointer-events-none
                        z-40"
                >
                    {subtitle}
                </div>
            )}

            {/* MENÚ DE INICIO (antes de empezar el recorrido) */}
            {!hasStarted && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                            {tourTitle}
                        </h1>
                        <p className="text-sm text-gray-600 text-center mb-6">
                            Revisa las instrucciones y presiona{" "}
                            <span className="font-semibold">“Iniciar recorrido”</span> para
                            comenzar.
                        </p>

                        <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm text-gray-800 mb-6">
                            <p className="font-semibold mb-2">Movimientos básicos</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Haz clic en el recorrido para activar el control con el mouse.</li>
                                <li>
                                    Usa <strong>W</strong> para avanzar, <strong>S</strong> para
                                    retroceder, <strong>A</strong> para ir a la izquierda y{" "}
                                    <strong>D</strong> para la derecha.
                                </li>
                                <li>
                                    Mueve el mouse para girar la cámara mientras el cursor esté
                                    bloqueado.
                                </li>
                            </ul>

                            <p className="font-semibold mt-4 mb-2">Navegación por pasos</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>
                                    Presiona <strong>Espacio</strong> para avanzar al siguiente paso
                                    del recorrido.
                                </li>
                            </ul>

                            <p className="font-semibold mt-4 mb-2">Pausa y salida</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>
                                    Presiona <strong>Esc</strong> para salir del control del mouse y
                                    abrir el menú de pausa.
                                </li>
                                <li>
                                    Desde el menú podrás continuar, revisar las instrucciones o
                                    volver a la pantalla anterior.
                                </li>
                            </ul>
                        </div>

                        <div className="flex justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                            >
                                Volver
                            </button>
                            <button
                                type="button"
                                onClick={handleStart}
                                className="px-6 py-2.5 rounded-lg bg-[#A71C20] text-white text-sm font-semibold hover:opacity-90 transition"
                            >
                                Iniciar recorrido
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MENÚ DE PAUSA (solo si ya empezó y está en pausa) */}
            {hasStarted && isPaused && menuView === "main" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                            Pausa
                        </h2>
                        <p className="text-sm text-gray-600 text-center mb-6">
                            El recorrido está en pausa. Puedes continuar, revisar las
                            instrucciones o volver a la pantalla anterior.
                        </p>

                        <div className="flex flex-col gap-3">
                            <button
                                type="button"
                                onClick={handleContinue}
                                className="w-full py-2.5 rounded-lg bg-[#A71C20] text-white font-semibold hover:opacity-90 transition"
                            >
                                Continuar recorrido
                            </button>

                            <button
                                type="button"
                                onClick={handleShowInstructionsFromMenu}
                                className="w-full py-2.5 rounded-lg border border-gray-300 text-gray-800 font-medium hover:bg-gray-50 transition"
                            >
                                Ver instrucciones
                            </button>

                            {/* Botones extra SOLO para admin */}
                            {isAdmin && (
                                <>
                                    <button
                                        type="button"
                                        onClick={onAdminApprove}
                                        className="w-full py-2.5 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                                    >
                                        Aprobar recorrido
                                    </button>
                                    <button
                                        type="button"
                                        onClick={onAdminReject}
                                        className="w-full py-2.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                                    >
                                        Rechazar recorrido
                                    </button>
                                </>
                            )}

                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="w-full py-2.5 rounded-lg bg-gray-800 text-white font-medium hover:bg-gray-700 transition"
                            >
                                Volver
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Vista de instrucciones dentro del menú de pausa */}
            {hasStarted && isPaused && menuView === "instructions" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                            Instrucciones
                        </h2>
                        <p className="text-sm text-gray-600 text-center mb-4">
                            Revisa cómo moverte e interactuar dentro del recorrido.
                        </p>

                        <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm text-gray-800 mb-6">
                            <p className="font-semibold mb-2">Movimientos básicos</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Haz clic en el recorrido para activar el control con el mouse.</li>
                                <li>
                                    Usa <strong>W</strong> para avanzar, <strong>S</strong> para
                                    retroceder, <strong>A</strong> para ir a la izquierda y{" "}
                                    <strong>D</strong> para la derecha.
                                </li>
                                <li>
                                    Mueve el mouse para girar la cámara mientras el cursor esté
                                    bloqueado.
                                </li>
                            </ul>

                            <p className="font-semibold mt-4 mb-2">Navegación por pasos</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>
                                    Presiona <strong>Espacio</strong> para avanzar al siguiente paso
                                    del recorrido.
                                </li>
                            </ul>

                            <p className="font-semibold mt-4 mb-2">Pausa y salida</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>
                                    Presiona <strong>Esc</strong> para salir del control del mouse y
                                    abrir el menú de pausa.
                                </li>
                                <li>
                                    Desde el menú puedes continuar, ver instrucciones o volver a la
                                    pantalla anterior.
                                </li>
                            </ul>
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={() => setMenuView("main")}
                                className="px-6 py-2.5 rounded-lg bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 transition"
                            >
                                Volver al menú
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
