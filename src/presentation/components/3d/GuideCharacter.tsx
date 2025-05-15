import {useAnimations, useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export default function GuideCharacter() {
    const { scene, animations } = useGLTF("/Men.glb");
    const { actions } = useAnimations(animations, scene);

    useEffect(() => {
        if (actions["idle"]) {
            actions["idle"].play();
        }
    }, [actions]);

    return (
        <primitive
            object={scene}
            scale={0.18}
            position={[2, 1.6, -2]}
        />
    );
}
