interface Props {
    isOpen: boolean
    message: string
}

export default function SuccessModal({ isOpen, message }: Props) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div
                className="bg-white rounded-lg shadow-lg p-6 w-[350px] text-center
                   transform transition-all duration-300 ease-out
                   scale-100 opacity-100 animate-modal-fade"
            >
                <h2 className="text-xl font-semibold text-[#10B981] mb-2">Éxito</h2>
                <p className="text-gray-700">{message}</p>
            </div>
        </div>
    )
}