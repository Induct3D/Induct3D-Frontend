// presentation/components/Modals/InsertYoutubeModal.tsx
import { useState } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onInsert: (url: string) => void;
}

export default function InsertYoutubeModal({ isOpen, onClose, onInsert }: Props) {
    const [url, setUrl] = useState("");

    const handleInsert = () => {
        if (url) {
            onInsert(url);
            onClose();
        }
    };

    return !isOpen ? null : (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-lg p-4 w-[380px] shadow-lg space-y-4">
                <h2 className="text-lg font-bold text-gray-800">Insertar video de YouTube</h2>

                <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="https://youtube.com/watch?v=..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="text-gray-500 hover:underline">Cancelar</button>
                    <button
                        onClick={handleInsert}
                        disabled={!url}
                        className="bg-[#A71C20] text-white px-4 py-1 rounded hover:bg-[#901b1b]"
                    >
                        Insertar
                    </button>
                </div>
            </div>
        </div>
    );
}
