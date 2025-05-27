import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { useGetMyTemplatesQuery } from "../../../features/auth/templateApi";
import {useNavigate} from "react-router";
import {setSelectedTemplate} from "../../../infrastructure/slices/selectedTemplateSlice.ts";


interface SelectTemplateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (templateId: string | null) => void;
}

export default function SelectTemplateModal({ isOpen, onClose }: SelectTemplateModalProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [activeSlide, setActiveSlide] = useState<Record<string, number>>({});

    const { data: templates = [], isLoading } = useGetMyTemplatesQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSelect = (id: string) => {
        setSelectedId(id);
    };

    const handleNext = (id: string) => {
        const template = templates.find(t => t.id === id);
        if (!template) return;
        setActiveSlide((prev) => ({
            ...prev,
            [id]: ((prev[id] || 0) + 1) % template.images.length
        }));
    };

    const handlePrev = (id: string) => {
        const template = templates.find(t => t.id === id);
        if (!template) return;
        setActiveSlide((prev) => ({
            ...prev,
            [id]: ((prev[id] || 0) - 1 + template.images.length) % template.images.length
        }));
    };

    const handleConfirm = () => {
        const selectedTemplate = templates.find((t) => t.id === selectedId);
        if (selectedTemplate) {
            dispatch(setSelectedTemplate({
                id: selectedTemplate.id,
                glbUrl: selectedTemplate.glbUrl,
            }));
            onClose();
            navigate(`/dashboard/crear?template=${selectedTemplate.id}`);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-5xl rounded-xl bg-white shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <Dialog.Title className="text-xl font-semibold">Selecciona una plantilla</Dialog.Title>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto pr-2">
                        {isLoading ? (
                            <p className="text-center col-span-3">Cargando plantillas...</p>
                        ) : (
                            templates.map((template) => (
                                <div
                                    key={template.id}
                                    onClick={() => handleSelect(template.id)}
                                    className={`border rounded-xl p-4 cursor-pointer transition duration-200 hover:shadow-md ${selectedId === template.id ? "ring-2 ring-[#A71C20]" : ""}`}
                                >
                                    <div className="relative mb-3">
                                        <img
                                            src={template.images[activeSlide[template.id] || 0]}
                                            alt={template.name}
                                            className="w-full h-48 object-cover rounded-md"
                                        />
                                        {template.images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handlePrev(template.id); }}
                                                    className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 rounded-full p-1 cursor-pointer"
                                                >
                                                    <ChevronLeft size={20} />
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleNext(template.id); }}
                                                    className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 rounded-full p-1 cursor-pointer"
                                                >
                                                    <ChevronRight size={20} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                    <h3 className="font-medium text-lg mb-1">{template.name}</h3>
                                    <p className="text-sm text-gray-600">{template.description}</p>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="flex justify-end mt-6">
                        <button
                            onClick={handleConfirm}
                            disabled={!selectedId}
                            className={`px-6 py-2 rounded-md text-white transition duration-150 ${selectedId ? "bg-[#A71C20] hover:opacity-90 cursor-pointer" : "bg-gray-400 cursor-not-allowed"}`}
                        >
                            Usar esta plantilla
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}