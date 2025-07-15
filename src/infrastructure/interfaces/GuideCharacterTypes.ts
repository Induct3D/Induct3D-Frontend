export type Vector3 = {
    x: number;
    y: number;
    z: number
};

export type PredefinedStep = {
    id: string;
    position: Vector3[]
};

export type Step = {
    stepId: string;
    messages: string[]
};

export type GuideCharacterStep = {
    id: string;
    position: { x: number; y: number; z: number }[];
};