// presentation/components/Modals/InsertImageModal.tsx
import { useState } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onInsert: (url: string) => void;
    uploadImage: (file: File) => Promise<string>;
}

export default function InsertImageModal({ isOpen, onClose, onInsert, uploadImage }: Props) {
    const [mode, setMode] = useState<"link" | "upload">("link");
    const [imageUrl, setImageUrl] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleInsert = async () => {
        if (mode === "link" && imageUrl) {
            onInsert(imageUrl);
            onClose();
        } else if (mode === "upload" && file) {
            setIsUploading(true);
            try {
                const url = await uploadImage(file);
                onInsert(url);
                onClose();
            } finally {
                setIsUploading(false);
            }
        }
    };

    return !isOpen ? null : (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-lg p-4 w-[380px] shadow-lg space-y-4">
                <h2 className="text-lg font-bold text-gray-800">Insertar Imagen</h2>

                <div className="flex gap-2">
                    <button
                        className={`flex-1 py-1 rounded ${mode === "link" ? "bg-[#A71C20] text-white" : "bg-gray-200"}`}
                        onClick={() => setMode("link")}
                    >
                        Desde link
                    </button>
                    <button
                        className={`flex-1 py-1 rounded ${mode === "upload" ? "bg-[#A71C20] text-white" : "bg-gray-200"}`}
                        onClick={() => setMode("upload")}
                    >
                        Subir archivo
                    </button>
                </div>

                {mode === "link" ? (
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="https://ejemplo.com/imagen.jpg"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                ) : (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                )}

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="text-gray-500 hover:underline">Cancelar</button>
                    <button
                        onClick={handleInsert}
                        disabled={mode === "link" ? !imageUrl : !file || isUploading}
                        className="bg-[#A71C20] text-white px-4 py-1 rounded hover:bg-[#901b1b]"
                    >
                        {isUploading ? "Subiendo..." : "Insertar"}
                    </button>
                </div>
            </div>
        </div>
    );
}
