// src/presentation/components/CustomizationSidebar/StepMessagesSection.tsx
import { FaPlay, FaTrash } from "react-icons/fa";
import { StepMessage, StringMapSetter } from "./types";

interface Props {
    step: StepMessage;
    newMessagesPerStep: Record<string, string>;
    setNewMessagesPerStep: StringMapSetter; // <-- Cambiamos aquí
    onAddMessage: (stepId: string, message: string) => void;
    onDeleteMessage: (stepId: string, index: number) => void;
    onSpeak: (text: string) => void;
}

export default function StepMessagesSection({
                                                step,
                                                newMessagesPerStep,
                                                setNewMessagesPerStep,
                                                onAddMessage,
                                                onDeleteMessage,
                                                onSpeak,
                                            }: Props) {
    return (
        <div className="mt-2">
            <ul className="space-y-2">
                {step.messages.map((msg, i) => (
                    <li key={i} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={msg}
                            onChange={(e) => {
                                // Para actualizar el mensaje en la posición i,
                                // es preferible exponer un callback onUpdateMessages en el padre,
                                // pero podemos reenviar borrando y volviendo a agregar:
                                onDeleteMessage(step.stepId, i);
                                onAddMessage(step.stepId, e.target.value);
                            }}
                            className="flex-1 border px-2 py-1 rounded text-sm"
                        />
                        <button
                            onClick={() => onSpeak(msg)}
                            className="text-[#A71C20] hover:scale-110 transition"
                            title="Reproducir"
                        >
                            <FaPlay size={14} />
                        </button>
                        <button
                            onClick={() => onDeleteMessage(step.stepId, i)}
                            className="text-red-600 hover:scale-110 transition text-xs"
                            title="Eliminar"
                        >
                            <FaTrash size={12} />
                        </button>
                    </li>
                ))}
            </ul>
            <div className="mt-2 flex gap-2">
                <input
                    type="text"
                    placeholder="Nuevo mensaje"
                    value={newMessagesPerStep[step.stepId] || ""}
                    onChange={(e) =>
                        setNewMessagesPerStep((prev) => ({
                            ...prev,
                            [step.stepId]: e.target.value,
                        }))
                    }
                    className="flex-1 border px-2 py-1 rounded text-sm"
                />
                <button
                    onClick={() => {
                        onAddMessage(step.stepId, newMessagesPerStep[step.stepId] || "");
                        setNewMessagesPerStep((prev) => ({
                            ...prev,
                            [step.stepId]: "",
                        }));
                    }}
                    className="bg-[#A71C20] text-white px-2 py-1 rounded text-xs"
                >
                    Añadir
                </button>
            </div>
        </div>
    );
}
