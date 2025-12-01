import { useState, useEffect } from "react";

interface RejectTourModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (reason: string) => void;
    loading?: boolean;
}

export default function RejectTourModal({
                                            isOpen,
                                            onClose,
                                            onConfirm,
                                            loading = false,
                                        }: RejectTourModalProps) {
    const [reason, setReason] = useState("");

    // limpiar al abrir/cerrar
    useEffect(() => {
        if (!isOpen) {
            setReason("");
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!reason.trim() || loading) return;
        onConfirm(reason.trim());
        onClose(); // 👈 cerrar el modal inmediatamente después de confirmar
    };

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Rechazar recorrido
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                    Indica el motivo por el cual estás rechazando este recorrido. Este
                    mensaje puede usarse como referencia para el creador.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#A71C20]/70"
                        placeholder='Ej: "El recorrido está incompleto en varias secciones..."'
                    />

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={!reason.trim() || loading}
                            className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white font-semibold disabled:opacity-60 hover:bg-red-700 transition"
                        >
                            {loading ? "Rechazando..." : "Confirmar rechazo"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
