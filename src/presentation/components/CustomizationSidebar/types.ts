// src/presentation/components/CustomizationSidebar/types.ts
import { MeshStandardMaterial } from "three";
import { Dispatch, SetStateAction } from "react";

export interface BoardMedia {
    html: string; // el HTML completo generado por TipTap
}

export interface StepMessage {
    stepId: string;
    messages: string[];
    boardMedia?: BoardMedia;
}

export interface PredefinedStep {
    id: string;
    position: { x: number; y: number; z: number }[];
    hasBoard?: boolean;
}

export type MaterialMap = Record<string, MeshStandardMaterial>;
export type ColorMap = Record<string, string>;
export type ColorMapSetter = Dispatch<SetStateAction<ColorMap>>;
export type StringMapSetter = Dispatch<SetStateAction<Record<string, string>>>;
