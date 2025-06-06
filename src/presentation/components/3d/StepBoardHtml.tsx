import { Html } from "@react-three/drei";

interface StepBoardHtmlProps {
    position: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
    html: string;
}

export default function StepBoardHtml({
                                          position,
                                          rotation = [0, 0, 0],
                                          scale = 1,
                                          html,
                                      }: StepBoardHtmlProps) {
    return (
        <Html
            position={position}
            rotation={rotation}
            transform
            scale={scale}
            occlude
            distanceFactor={3}
            style={{ pointerEvents: "auto" }}
        >
            <div
                className="max-w-md max-h-80 overflow-auto bg-white/90 p-4 rounded-lg shadow-lg"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </Html>
    );
}
