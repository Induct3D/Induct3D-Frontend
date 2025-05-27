import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useSelector } from "react-redux";
import { RootState } from "../../../infrastructure/store/store.ts";
import { CreateTourSchema } from "../../../infrastructure/schemas/CreateTourSchema";
import {useCreateTourMutation, useUploadBoardImageMutation} from "../../../features/auth/tourApi.ts";
import { useNavigate } from "react-router";
import { FaPlay, FaTrash } from "react-icons/fa";

export default function CustomizationSidebar({
                                                 glbUrl,
                                                 predefinedSteps,
                                             }: {
    glbUrl: string;
    predefinedSteps: { id: string; position: { x: number; y: number; z: number }[]; hasBoard?: boolean }[];
}) {
    const templateId = useSelector((state: RootState) => state.selectedTemplate.id);
    const { materials: loadedMaterials } = useGLTF(glbUrl || " ");
    const [materials, setMaterials] = useState<Record<string, THREE.MeshStandardMaterial>>({});
    const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});

    const [tourName, setTourName] = useState("");
    const [description, setDescription] = useState("");

    const [createTour] = useCreateTourMutation();
    const navigate = useNavigate();

    const [stepMessages, setStepMessages] = useState<{
        stepId: string;
        messages: string[];
        boardMedia?: {
            type: "image" | "video";
            urls: string[];
        };
    }[]>(
        predefinedSteps.map((step) => ({
            stepId: step.id,
            messages: [],
            ...(step.hasBoard ? { boardMedia: { type: "image", urls: [] } } : {})
        }))
    );

    const [newMessagesPerStep, setNewMessagesPerStep] = useState<Record<string, string>>({});
    const [newBoardUrls, setNewBoardUrls] = useState<Record<string, string>>({});
    const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

    const [uploadBoardImage] = useUploadBoardImageMutation();

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
                    ? { ...step, messages: step.messages.filter((_, i) => i !== index) }
                    : step
            )
        );
    };

    const handleBoardTypeChange = (stepId: string, type: "image" | "video") => {
        setStepMessages((prev) =>
            prev.map((step) =>
                step.stepId === stepId && step.boardMedia
                    ? { ...step, boardMedia: { ...step.boardMedia, type, urls: [] } }
                    : step
            )
        );
    };

    const handleUploadImage = async (stepId: string, file: File) => {
        try {
            const response = await uploadBoardImage(file).unwrap();
            const imageUrl = response.url;
            setStepMessages((prev) =>
                prev.map((step) =>
                    step.stepId === stepId && step.boardMedia
                        ? {
                            ...step,
                            boardMedia: {
                                ...step.boardMedia,
                                urls: [...step.boardMedia.urls, imageUrl],
                            },
                        }
                        : step
                )
            );
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            alert("Hubo un error al subir la imagen. Inténtalo nuevamente.");
        }
    };

    const handleDeleteBoardUrl = (stepId: string, index: number) => {
        setStepMessages((prev) =>
            prev.map((step) =>
                step.stepId === stepId && step.boardMedia
                    ? {
                        ...step,
                        boardMedia: {
                            ...step.boardMedia,
                            urls: step.boardMedia.urls.filter((_, i) => i !== index),
                        },
                    }
                    : step
            )
        );
    };

    const handleAddBoardUrl = (stepId: string) => {
        const url = newBoardUrls[stepId];
        if (!url) return;
        setStepMessages((prev) =>
            prev.map((step) =>
                step.stepId === stepId && step.boardMedia
                    ? { ...step, boardMedia: { ...step.boardMedia, urls: [...step.boardMedia.urls, url] } }
                    : step
            )
        );
        setNewBoardUrls((prev) => ({ ...prev, [stepId]: "" }));
    };

    const speak = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "es-ES";
        speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        const editable = Object.entries(loadedMaterials).filter(
            ([name, mat]) =>
                mat instanceof THREE.MeshStandardMaterial && name.toLowerCase().includes("edit")
        );

        setMaterials(Object.fromEntries(editable) as Record<string, THREE.MeshStandardMaterial>);

        const initialColors: Record<string, string> = {};
        for (const [name, mat] of editable) {
            if (mat instanceof THREE.MeshStandardMaterial && mat.color) {
                initialColors[name] = `#${mat.color.getHexString()}`;
            }
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

    const getDisplayName = (raw: string) => raw.replace(/edit\s*/i, "").trim();

    const handleSave = async () => {
        const payload = {
            tourName,
            description,
            templateId,
            materialColors: selectedColors,
            steps: stepMessages,
        };

        // 🧾 Mostrar en consola lo que se enviará al backend
        console.log("Payload a enviar al backend:", JSON.stringify(payload, null, 2));

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
        <aside className="w-80 border-l bg-white p-6 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-[#A71C20]">Personaliza tu ambiente</h2>

            <div className="mb-4">
                <label className="block font-medium text-gray-700 mb-1">Nombre del recorrido</label>
                <input
                    type="text"
                    value={tourName}
                    onChange={(e) => setTourName(e.target.value)}
                    className="w-full border rounded p-2 text-sm"
                />
            </div>

            <div className="mb-6">
                <label className="block font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border rounded p-2 text-sm resize-none h-20"
                />
            </div>

            <details open className="mb-4">
                <summary className="font-semibold text-gray-800 cursor-pointer mb-2">
                    Colores de materiales
                </summary>
                {Object.entries(materials).map(([name]) => (
                    <div key={name} className="mb-4">
                        <label className="block font-medium text-gray-700 mb-1">
                            {getDisplayName(name)}
                        </label>
                        <input
                            type="color"
                            value={selectedColors[name] || "#ffffff"}
                            onChange={(e) =>
                                setSelectedColors((prev) => ({ ...prev, [name]: e.target.value }))
                            }
                            className="w-full h-10 cursor-pointer"
                        />
                    </div>
                ))}
            </details>

            <details open className="mb-4">
                <summary className="font-semibold text-gray-800 cursor-pointer mb-2">
                    🗣 Narración del recorrido
                </summary>

                {stepMessages.map((step) => (
                    <details key={step.stepId} className="mb-2 border rounded-lg p-3 bg-gray-50">
                        <summary className="font-semibold text-[#A71C20] cursor-pointer">
                            Paso: {step.stepId}
                        </summary>
                        <ul className="mt-2 space-y-2">
                            {step.messages.map((msg, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={msg}
                                        onChange={(e) => {
                                            const updated = [...step.messages];
                                            updated[i] = e.target.value;
                                            setStepMessages((prev) =>
                                                prev.map((s) =>
                                                    s.stepId === step.stepId ? { ...s, messages: updated } : s
                                                )
                                            );
                                        }}
                                        className="flex-1 border px-2 py-1 rounded text-sm"
                                    />
                                    <button
                                        onClick={() => speak(msg)}
                                        className="text-[#A71C20] hover:scale-110 transition"
                                        title="Reproducir"
                                    >
                                        <FaPlay size={14} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteMessage(step.stepId, i)}
                                        className="text-red-600 hover:scale-110 transition text-xs"
                                        title="Eliminar"
                                    >
                                        🗑
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
                                    setNewMessagesPerStep((prev) => ({ ...prev, [step.stepId]: e.target.value }))
                                }
                                className="flex-1 border px-2 py-1 rounded text-sm"
                            />
                            <button
                                onClick={() => {
                                    handleAddMessage(step.stepId, newMessagesPerStep[step.stepId] || "");
                                    setNewMessagesPerStep((prev) => ({ ...prev, [step.stepId]: "" }));
                                }}
                                className="bg-[#A71C20] text-white px-2 py-1 rounded text-xs"
                            >
                                Añadir
                            </button>
                        </div>

                        {step.boardMedia && (
                            <div className="mt-4">
                                <label className="block font-medium text-gray-700 mb-1">Tipo de contenido en pizarra</label>
                                <select
                                    value={step.boardMedia.type}
                                    onChange={(e) => handleBoardTypeChange(step.stepId, e.target.value as "image" | "video")}
                                    className="w-full border px-2 py-1 rounded text-sm mb-2"
                                >
                                    <option value="image">Imagen</option>
                                    <option value="video">Video</option>
                                </select>
                                {step.boardMedia.type === "video" ? (
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="URL del video"
                                            value={newBoardUrls[step.stepId] || ""}
                                            onChange={(e) =>
                                                setNewBoardUrls((prev) => ({ ...prev, [step.stepId]: e.target.value }))
                                            }
                                            className="flex-1 border px-2 py-1 rounded text-sm"
                                        />
                                        <button
                                            onClick={() => handleAddBoardUrl(step.stepId)}
                                            className="bg-[#A71C20] text-white px-2 py-1 rounded text-xs"
                                        >
                                            Añadir</button>
                                    </div>
                                ) : (
                                    <div className="mt-2">
                                        <button
                                            onClick={() => fileInputs.current[step.stepId]?.click()}
                                            className="bg-[#A71C20] text-white text-xs px-3 py-1 rounded hover:opacity-90"
                                        >
                                            Subir imagen
                                        </button>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={(el) => {
                                                fileInputs.current[step.stepId] = el;
                                            }}
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) handleUploadImage(step.stepId, file);
                                            }}
                                            className="hidden"
                                        />
                                    </div>
                                )}
                                <div className="mt-2 flex gap-2 overflow-x-auto">
                                    {step.boardMedia.urls.map((url, idx) => (
                                        <div key={idx} className="relative w-20 h-20 rounded overflow-hidden border border-gray-300">
                                            <img
                                                src={url}
                                                alt={`preview-${idx}`}
                                                className="object-cover w-full h-full"
                                            />
                                            <button
                                                onClick={() => handleDeleteBoardUrl(step.stepId, idx)}
                                                className="absolute top-0 right-0 bg-black bg-opacity-60 text-white p-1 text-xs"
                                                title="Eliminar"
                                            >
                                                <FaTrash size={10} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </details>
                ))}
            </details>

            <button
                onClick={handleSave}
                className="mt-4 w-full bg-[#A71C20] text-white px-4 py-2 rounded hover:opacity-90 transition"
            >
                Guardar recorrido
            </button>
        </aside>
    );
}