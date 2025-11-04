// src/presentation/components/modals/ConfirmAccountDeleteModal.tsx
interface Props {
    isOpen: boolean
    username?: string
    email?: string
    onCancel: () => void
    onConfirm: () => void
}

export default function ConfirmAccountDeleteModal({
                                                      isOpen,
                                                      username,
                                                      email,
                                                      onCancel,
                                                      onConfirm,
                                                  }: Props) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 shadow-lg w-[380px] text-center">
                <h2 className="text-xl font-semibold text-[#A71C20]">¿Eliminar tu cuenta?</h2>
                <p className="mt-2 text-gray-700">
                    Esta acción es <strong>permanente</strong> y eliminará tu perfil y datos asociados.
                </p>
                <div className="mt-3 text-sm text-gray-600">
                    <div><span className="text-gray-500">Usuario:</span> <b>{username}</b></div>
                    <div><span className="text-gray-500">Email:</span> <b>{email}</b></div>
                </div>

                <div className="flex justify-center gap-3 mt-6">
                    <button
                        onClick={onCancel}
                        className="px-4 py-1 text-gray-600 border rounded hover:bg-gray-100"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-1 bg-[#A71C20] text-white rounded hover:opacity-95 cursor-pointer"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    )
}
