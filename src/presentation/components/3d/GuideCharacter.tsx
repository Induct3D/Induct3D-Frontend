import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type Step = {
    id: string;
    position: { x: number; y: number; z: number }[];
};

export default function GuideCharacter({ steps }: { steps: Step[] }) {
    const { scene, animations } = useGLTF("/Men.glb");
    const { actions } = useAnimations(animations, scene);
    const { camera, gl } = useThree();

    const groupRef = useRef<THREE.Group>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [moving, setMoving] = useState(false);
    const [currentPosIndex, setCurrentPosIndex] = useState(0);
    const targetPosition = useRef<THREE.Vector3 | null>(null);

    const first = steps?.[0]?.position?.[0];
    const position = useRef(new THREE.Vector3(first?.x ?? 0, first?.y ?? 2.45, first?.z ?? 0));

    // Aplica posición y rotación en cada frame
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.position.copy(position.current);

            // Mira al target en XZ, manteniendo su altura
            if (targetPosition.current) {
                const look = targetPosition.current.clone();
                look.y = position.current.y;
                groupRef.current.lookAt(look);
            } else if (!moving) {
                const look = camera.position.clone();
                look.y = position.current.y;
                groupRef.current.lookAt(look);
            }

        }
    });

    // Iniciar movimiento con barra espaciadora
    useEffect(() => {
        const domElement = gl.domElement;

        const handleKeyDown = (e: KeyboardEvent) => {
            const isPointerLocked = document.pointerLockElement === domElement;
            if (e.code === "Space" && isPointerLocked && !moving && currentStep < steps.length) {
                setMoving(true);
                setCurrentPosIndex(0);
                if (actions["walk"]) {
                    actions["idle"]?.stop();
                    actions["walk"].reset().fadeIn(0.2).play();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [moving, currentStep, steps.length, actions, gl]);

    // Movimiento progresivo paso a paso
    useEffect(() => {
        let frameId: number;

        const move = () => {
            if (!moving || currentStep >= steps.length) return;

            const stepPositions = steps[currentStep].position;
            const target = stepPositions[currentPosIndex];

            if (!target) {
                setMoving(false);
                setCurrentStep((prev) => prev + 1);
                if (actions["walk"]) actions["walk"].fadeOut(0.2);
                if (actions["idle"]) actions["idle"].reset().fadeIn(0.2).play();
                return;
            }

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

        if (moving) {
            frameId = requestAnimationFrame(move);
        }

        return () => cancelAnimationFrame(frameId);
    }, [moving, currentPosIndex, currentStep, steps, actions]);

    return (
        <group ref={groupRef}>
            <primitive object={scene} scale={0.18} />
        </group>
    );
}
