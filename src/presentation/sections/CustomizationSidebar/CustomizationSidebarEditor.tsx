import { useEffect, useState } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useUpdateTourMutation } from "../../../infrastructure/api/tourApi.ts";
import { useNavigate } from "react-router";
import TourInfoSection from "../../components/CustomizationSidebar/TourInfoSection.tsx";
import MaterialColorsSection from "../../components/CustomizationSidebar/MaterialColorsSection.tsx";
import StepsSection from "../../components/CustomizationSidebar/StepsSection.tsx";
import SaveButtonSection from "../../components/CustomizationSidebar/SaveButtonSection.tsx";
import SuccessModal from "../../components/Modals/SuccessModal.tsx";
import {
    StepMessage,
    MaterialMap,
    ColorMap,
    BoardMedia,
    EditorProps,
} from "../../../infrastructure/interfaces/CustomizationSidebarTypes.ts";

export default function CustomizationSidebarEditor({
                                                       glbUrl,
                                                       templateId,
                                                       tourId,
                                                       initialName,
                                                       initialDescription,
                                                       initialColors,
                                                       initialSteps,
                                                   }: EditorProps) {
    const navigate = useNavigate();
    const [updateTour] = useUpdateTourMutation();

    const { materials: loadedMaterials } = useGLTF(glbUrl || " ");
    const [materials, setMaterials] = useState<MaterialMap>({});
    const [selectedColors, setSelectedColors] = useState<ColorMap>(initialColors);
    const [showSuccess, setShowSuccess] = useState(false);

    const [tourName, setTourName] = useState(initialName);
    const [description, setDescription] = useState(initialDescription);
    const [stepMessages, setStepMessages] = useState<StepMessage[]>(initialSteps);
    const [newMessagesPerStep, setNewMessagesPerStep] = useState<Record<string, string>>({});

    useEffect(() => {
        const editableEntries = Object.entries(loadedMaterials).filter(
            ([name, mat]) =>
                mat instanceof THREE.MeshStandardMaterial &&
                name.toLowerCase().includes("edit")
        ) as [string, THREE.MeshStandardMaterial][];
        const matMap: MaterialMap = Object.fromEntries(editableEntries);
        setMaterials(matMap);
    }, [loadedMaterials]);

    useEffect(() => {
        for (const key in selectedColors) {
            if (materials[key]) {
                materials[key].color.set(selectedColors[key]);
            }
        }
    }, [selectedColors, materials]);

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

    const handleSave = async () => {
        const payload = {
            tourName,
            description,
            templateId,
            materialColors: selectedColors,
            steps: stepMessages,
        };

        try {
            await updateTour({ id: tourId, data: payload }).unwrap();
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                navigate("/dashboard");
            }, 2000);
        } catch (error) {
            console.error("Error al actualizar el recorrido:", error);
            alert("Hubo un problema al actualizar el recorrido.");
        }
    };


    return (
        <aside className="w-[420px] border-l bg-white p-6 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-[#A71C20]">
                Editar recorrido (ID: {tourId})
            </h2>

            <TourInfoSection
                tourName={tourName}
                setTourName={setTourName}
                description={description}
                setDescription={setDescription}
            />

            <MaterialColorsSection
                materials={materials}
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
            />

            <StepsSection
                stepMessages={stepMessages}
                newMessagesPerStep={newMessagesPerStep}
                setNewMessagesPerStep={setNewMessagesPerStep}
                onAddMessage={handleAddMessage}
                onDeleteMessage={handleDeleteMessage}
                onSpeak={speak}
                onUpdateEditorContent={handleUpdateEditorContent}
            />

            <SaveButtonSection onSave={handleSave} />

            {showSuccess && (
                <SuccessModal
                    isOpen={showSuccess}
                    message="Tu recorrido fue actualizado correctamente."
                />
            )}
        </aside>
    );
}
