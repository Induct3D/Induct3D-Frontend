// TourTypes.ts
type LocalVector3 = { x: number; y: number; z: number };

type Step = {
    stepId: string;
    messages: string[];
    boardMedia?: {
        html: string;
    } | null;
};

type PredefinedStep = {
    id: string;
    position: LocalVector3[];
    hasBoard?: boolean | null;
    boardConfig?: {
        position: LocalVector3;
        rotation?: LocalVector3;
        scale?: number;
    } | null;
};

export type TourViewerCanvasProps = {
    glbUrl: string;
    predefinedSteps: PredefinedStep[];
    steps: Step[];
    materialColors: Record<string, string>;
    userStart: LocalVector3;
    tourTitle: string;
    isAdmin?: boolean;
    onAdminApprove?: () => void;
    onAdminReject?: () => void;
    requiresPassword?: boolean;
    tourPassword?: string | null;
};

export type SceneModelProps = {
    glbUrl: string;
    materialColors: Record<string, string>;
};