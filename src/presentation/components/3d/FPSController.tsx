import { useFrame, useThree } from "@react-three/fiber";
import { CapsuleCollider, RapierRigidBody, RigidBody, useRapier } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {useStore} from "../../../infrastructure/store/positionStore.ts";

export default function FPSController() {
    const { camera, gl } = useThree();
    useRapier();
    const body = useRef<RapierRigidBody>(null);
    const velocity = 4;
    const direction = new THREE.Vector3();
    const keys = useRef({ w: false, a: false, s: false, d: false });

    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isActive, setIsActive] = useState(false);
    const [isCanvasFocused, setIsCanvasFocused] = useState(false);

    const setCameraPosition = useStore((state) => state.setPosition);

    // Activar movimiento al hacer click en el canvas
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const clickedInsideCanvas = e.target === gl.domElement;
            if (clickedInsideCanvas) {
                gl.domElement.requestPointerLock();
                setIsCanvasFocused(true);
            } else {
                setIsCanvasFocused(false);
            }
        };

        window.addEventListener("mousedown", handleClick);
        return () => window.removeEventListener("mousedown", handleClick);
    }, [gl]);

    // Salir con Esc
    useEffect(() => {
        const handlePointerLockChange = () => {
            const isLocked = document.pointerLockElement === gl.domElement;
            setIsActive(isLocked);
        };
        document.addEventListener("pointerlockchange", handlePointerLockChange);
        return () => document.removeEventListener("pointerlockchange", handlePointerLockChange);
    }, [gl]);

    // Movimiento del mouse
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isActive) return;
            setRotation((prev) => ({
                x: THREE.MathUtils.clamp(prev.x - e.movementY * 0.002, -Math.PI / 2, Math.PI / 2),
                y: (prev.y - e.movementX * 0.002) % (Math.PI * 2),
            }));
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isActive]);

    // Movimiento con teclado
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isCanvasFocused) return;
            if (e.key in keys.current) keys.current[e.key as keyof typeof keys.current] = true;
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key in keys.current) keys.current[e.key as keyof typeof keys.current] = false;
        };
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [isCanvasFocused]);

    useFrame(() => {
        if (!body.current) return;

        const pos = body.current.translation();
        setCameraPosition({ x: pos.x, y: pos.y, z: pos.z });
        camera.position.set(pos.x, pos.y + 0.65, pos.z);

        camera.rotation.order = "YXZ";
        camera.rotation.y = rotation.y;
        camera.rotation.x = rotation.x;

        if (!isCanvasFocused) return;

        const forward = keys.current.w ? -1 : keys.current.s ? 1 : 0;
        const right = keys.current.d ? 1 : keys.current.a ? -1 : 0;

        direction.set(right, 0, forward)
            .normalize()
            .applyAxisAngle(new THREE.Vector3(0, 1, 0), rotation.y);

        body.current.setLinvel({ x: direction.x * velocity, y: 0, z: direction.z * velocity }, true);
    });

    return (
        <RigidBody
            ref={body}
            mass={1}
            type="dynamic"
            position={[0, 3, 0]}
            enabledRotations={[false, false, false]}
        >
            <CapsuleCollider args={[0.05, 0.8]} />
            <mesh>
                <capsuleGeometry args={[0.05, 0.85, 8, 16]} />
                <meshBasicMaterial color="orange"/>
            </mesh>
        </RigidBody>

    );
}
