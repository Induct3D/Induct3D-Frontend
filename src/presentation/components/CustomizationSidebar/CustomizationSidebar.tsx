// src/presentation/components/CustomizationSidebar/index.tsx
import { useEffect, useState } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { CreateTourSchema } from "../../../infrastructure/schemas/CreateTourSchema";
import { useCreateTourMutation } from "../../../features/auth/tourApi";
import { useNavigate } from "react-router";
import TourInfoSection from "./TourInfoSection";
import MaterialColorsSection from "./MaterialColorsSection";
import StepsSection from "./StepsSection";
import SaveButtonSection from "./SaveButtonSection";
import {
    PredefinedStep,
    StepMessage,
    MaterialMap,
    ColorMap,
    BoardMedia,
} from "./types";

interface CustomizationSidebarProps {
    glbUrl: string;
    predefinedSteps: PredefinedStep[];
    templateId: string;
}

export default function CustomizationSidebar({
                                                 glbUrl,
                                                 predefinedSteps,
                                                 templateId,
                                             }: CustomizationSidebarProps) {
    const navigate = useNavigate();
    const [createTour] = useCreateTourMutation();

    // --------------- GLTF & MATERIALES ---------------
    const { materials: loadedMaterials } = useGLTF(glbUrl || " ");
    const [materials, setMaterials] = useState<MaterialMap>({});
    const [selectedColors, setSelectedColors] = useState<ColorMap>({});

    useEffect(() => {
        const editableEntries = Object.entries(loadedMaterials).filter(
            ([name, mat]) =>
                mat instanceof THREE.MeshStandardMaterial &&
                name.toLowerCase().includes("edit")
        ) as [string, THREE.MeshStandardMaterial][];

        const matMap: MaterialMap = Object.fromEntries(editableEntries);
        setMaterials(matMap);

        const initialColors: ColorMap = {};
        for (const [name, mat] of editableEntries) {
            initialColors[name] = `#${mat.color.getHexString()}`;
        }
        setSelectedColors(initialColors);
    }, [loadedMaterials]);

    useEffect(() => {
        for (const key in selectedColors) {
            if (materials[key]) {
                materials[key].color.set(selectedColors[key]);
            }
        }
    }, [selectedColors, materials]);

    // --------------- ESTADO DEL TOUR ---------------
    const [tourName, setTourName] = useState("");
    const [description, setDescription] = useState("");

    // --------------- ESTADO DE STEPS ---------------
    const [stepMessages, setStepMessages] = useState<StepMessage[]>(
        predefinedSteps.map((step) => ({
            stepId: step.id,
            messages: [] as string[],
            ...(step.hasBoard ? { boardMedia: { html: "" } as BoardMedia } : {}),
        }))
    );
    const [newMessagesPerStep, setNewMessagesPerStep] = useState<
        Record<string, string>
    >({});

    const speak = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "es-ES";
        speechSynthesis.speak(utterance);
    };

    const handleAddMessage = (stepId: string, message: string) => {
        if (!message) return;
        setStepMessages((prev) =>
            prev.map((step) =>
                step.stepId === stepId
                    ? { ...step, messages: [...step.messages, message] }
                    : step
            )
        );
    };

    const handleDeleteMessage = (stepId: string, index: number) => {
        setStepMessages((prev) =>
            prev.map((step) =>
                step.stepId === stepId
                    ? {
                        ...step,
                        messages: step.messages.filter((_, i) => i !== index),
                    }
                    : step
            )
        );
    };

    const handleUpdateEditorContent = (stepId: string, html: string) => {
        setStepMessages((prev) =>
            prev.map((step) =>
                step.stepId === stepId
                    ? { ...step, boardMedia: { html } as BoardMedia }
                    : step
            )
        );
    };

    // --------------- SAVE & VALIDACIÓN ---------------
    const handleSave = async () => {
        if (!templateId) {
            alert("Debes indicar una plantilla válida.");
            return;
        }

        const payload = {
            tourName,
            description,
            templateId,
            materialColors: selectedColors,
            steps: stepMessages,
        };

        console.log(
            "Payload a enviar al backend:",
            JSON.stringify(payload, null, 2)
        );
        const parsed = CreateTourSchema.safeParse(payload);
        if (!parsed.success) {
            console.error("Error de validación:", parsed.error.format());
            return;
        }

        try {
            await createTour(parsed.data).unwrap();
            alert("Recorrido guardado exitosamente");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error al guardar el recorrido:", error);
            alert("Hubo un problema al guardar el recorrido");
        }
    };

    return (
        <aside className="w-[420px] border-l bg-white p-6 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-[#A71C20]">
                Personaliza tu ambiente (Plantilla: {templateId})
            </h2>

            {/* 1. Sección de info básica del tour */}
            <TourInfoSection
                tourName={tourName}
                setTourName={setTourName}
                description={description}
                setDescription={setDescription}
            />

            {/* 2. Sección de selección de colores */}
            <MaterialColorsSection
                materials={materials}
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
            />

            {/* 3. Sección de pasos (mensajes + contenido enriquecido si aplica) */}
            <StepsSection
                stepMessages={stepMessages}
                newMessagesPerStep={newMessagesPerStep}
                setNewMessagesPerStep={setNewMessagesPerStep}
                onAddMessage={handleAddMessage}
                onDeleteMessage={handleDeleteMessage}
                onSpeak={speak}
                onUpdateEditorContent={handleUpdateEditorContent}
            />

            {/* 4. Botón de guardar */}
            <SaveButtonSection onSave={handleSave} />
        </aside>
    );
}
