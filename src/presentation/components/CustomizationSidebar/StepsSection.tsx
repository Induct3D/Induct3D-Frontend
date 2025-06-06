// src/presentation/components/CustomizationSidebar/StepsSection.tsx
import { StepMessage, StringMapSetter } from "./types";
import StepMessagesSection from "./StepMessagesSection";
import EditorAvanzado from "../EditorAvanzado";

interface Props {
    stepMessages: StepMessage[];
    newMessagesPerStep: Record<string, string>;
    setNewMessagesPerStep: StringMapSetter;
    onAddMessage: (stepId: string, message: string) => void;
    onDeleteMessage: (stepId: string, index: number) => void;
    onSpeak: (text: string) => void;
    onUpdateEditorContent: (stepId: string, html: string) => void;
}

export default function StepsSection({
                                         stepMessages,
                                         newMessagesPerStep,
                                         setNewMessagesPerStep,
                                         onAddMessage,
                                         onDeleteMessage,
                                         onSpeak,
                                         onUpdateEditorContent,
                                     }: Props) {
    return (
        <details open className="mb-4">
            <summary className="font-semibold text-gray-800 cursor-pointer mb-2 p-2">
                🗣 Narración del recorrido
            </summary>

            {stepMessages.map((step) => (
                <details
                    key={step.stepId}
                    className="mb-4 border rounded-lg bg-gray-50 w-full"
                >
                    <summary className="font-semibold text-[#A71C20] cursor-pointer p-3">
                        Paso: {step.stepId}
                    </summary>

                    <div className="px-3 pb-3 w-full">
                        {/* 1) Mensajes por paso */}
                        <StepMessagesSection
                            step={step}
                            newMessagesPerStep={newMessagesPerStep}
                            setNewMessagesPerStep={setNewMessagesPerStep}
                            onAddMessage={onAddMessage}
                            onDeleteMessage={onDeleteMessage}
                            onSpeak={onSpeak}
                        />

                        {/* 2) Solo mostramos el editor si el paso tiene pizarra (boardMedia) */}
                        {step.boardMedia && (
                            <div className="mt-4 w-full">
                                <EditorAvanzado
                                    initialHTML={step.boardMedia.html}
                                    onUpdateContent={(html) =>
                                        onUpdateEditorContent(step.stepId, html)
                                    }
                                />
                            </div>
                        )}
                    </div>
                </details>
            ))}
        </details>
    );
}
