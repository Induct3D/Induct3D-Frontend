interface Props {
    isOpen: boolean;
    tourTitle: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function ConfirmDeleteModal({ isOpen, tourTitle, onCancel, onConfirm }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 shadow-lg w-[350px] text-center">
                <h2 className="text-xl font-semibold text-red-600">¿Eliminar recorrido?</h2>
                <p className="mt-2 text-gray-700">
                    Estás a punto de eliminar el recorrido <strong>{tourTitle}</strong>. ¿Deseas continuar?
                </p>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onCancel}
                        className="px-4 py-1 text-gray-600 border rounded hover:bg-gray-100"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}
