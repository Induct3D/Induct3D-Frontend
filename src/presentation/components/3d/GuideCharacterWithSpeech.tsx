import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type Vector3 = { x: number; y: number; z: number };
type PredefinedStep = { id: string; position: Vector3[] };
type Step = { stepId: string; messages: string[] };

export default function GuideCharacterWithSpeech({
                                                     predefinedSteps,
                                                     steps,
                                                     onVisibleMessageChange,
                                                 }: {
    predefinedSteps: PredefinedStep[];
    steps: Step[];
    onVisibleMessageChange?: (msg: string) => void;
}) {
    const { scene, animations } = useGLTF("/Men.glb");
    const { actions } = useAnimations(animations, scene);
    const { camera, gl } = useThree();

    const groupRef = useRef<THREE.Group>(null);

    const first = predefinedSteps?.[0]?.position?.[0];
    const position = useRef(
        new THREE.Vector3(first?.x ?? 0, first?.y ?? 2.45, first?.z ?? 0)
    );
    const targetPosition = useRef<THREE.Vector3 | null>(null);

    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [currentPosIndex, setCurrentPosIndex] = useState(0);
    const [moving, setMoving] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [visibleMessage, setVisibleMessage] = useState("");
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    // Nuevo estado para bloquear reinicio tras fin total
    const [finishedTour, setFinishedTour] = useState(false);

    const currentStepId = predefinedSteps[currentStepIndex]?.id;
    const currentMessages = steps.find((s) => s.stepId === currentStepId)?.messages || [];

    useEffect(() => {
        if (onVisibleMessageChange) {
            onVisibleMessageChange(visibleMessage);
        }
    }, [visibleMessage, onVisibleMessageChange]);

    useFrame(() => {
        if (!groupRef.current) return;

        groupRef.current.position.copy(position.current);

        if (targetPosition.current) {
            const look = targetPosition.current.clone();
            look.y = position.current.y;
            groupRef.current.lookAt(look);
        } else if (!moving) {
            const look = camera.position.clone();
            look.y = position.current.y;
            groupRef.current.lookAt(look);
        }
    });

    useEffect(() => {
        const domElement = gl.domElement;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code !== "Space") return;
            if (document.pointerLockElement !== domElement) return;

            if (finishedTour) return; // bloqueo si finalizó todo

            if (moving) return;

            if (isSpeaking) {
                if (currentMessageIndex < currentMessages.length - 1) {
                    const nextMsgIndex = currentMessageIndex + 1;
                    setCurrentMessageIndex(nextMsgIndex);
                    speakMessage(currentMessages[nextMsgIndex]);
                    setVisibleMessage(currentMessages[nextMsgIndex]);
                } else {
                    setIsSpeaking(false);
                    setVisibleMessage("");
                    if (currentStepIndex < predefinedSteps.length - 1) {
                        setCurrentStepIndex((i) => i + 1);
                        setCurrentPosIndex(0);
                        setCurrentMessageIndex(0);
                    } else {
                        // Último paso terminado
                        setFinishedTour(true);
                    }
                }
                return;
            }

            if (!moving && !isSpeaking) {
                setMoving(true);
                setCurrentPosIndex(0);
                setCurrentMessageIndex(0);
                if (actions["walk"]) {
                    actions["idle"]?.stop();
                    actions["walk"].reset().fadeIn(0.2).play();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [
        moving,
        isSpeaking,
        currentMessageIndex,
        currentMessages,
        currentStepIndex,
        predefinedSteps.length,
        finishedTour,
        actions,
        gl,
    ]);

    useEffect(() => {
        if (!moving) return;

        let frameId: number;

        const move = () => {
            if (!moving) return;

            const positions = predefinedSteps[currentStepIndex]?.position;
            if (!positions || currentPosIndex >= positions.length) {
                setMoving(false);
                if (currentMessages.length > 0) {
                    setIsSpeaking(true);
                    setVisibleMessage(currentMessages[0]);
                    speakMessage(currentMessages[0]);
                }
                if (actions["walk"]) actions["walk"].fadeOut(0.2);
                if (actions["idle"]) actions["idle"].reset().fadeIn(0.2).play();
                return;
            }

            const target = positions[currentPosIndex];
            if (!target) return;

            if (!targetPosition.current) {
                targetPosition.current = new THREE.Vector3(target.x, target.y, target.z);
            }

            const distance = position.current.distanceTo(targetPosition.current);
            const speed = 0.03;

            if (distance < 0.05) {
                targetPosition.current = null;
                setCurrentPosIndex((i) => i + 1);
            } else {
                const dir = targetPosition.current
                    .clone()
                    .sub(position.current)
                    .normalize()
                    .multiplyScalar(speed);
                position.current.add(dir);
            }

            frameId = requestAnimationFrame(move);
        };

        frameId = requestAnimationFrame(move);

        return () => cancelAnimationFrame(frameId);
    }, [moving, currentPosIndex, currentStepIndex, predefinedSteps, actions]);

    function speakMessage(msg: string) {
        const utterance = new SpeechSynthesisUtterance(msg);
        utterance.lang = "es-PE";
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
    }

    return (
        <>
            <group ref={groupRef}>
                <primitive object={scene} scale={0.18} />
            </group>
        </>
    );
}
