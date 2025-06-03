// src/presentation/components/CustomizationSidebar/SaveButtonSection.tsx

interface Props {
    onSave: () => void;
}

export default function SaveButtonSection({ onSave }: Props) {
    return (
        <button
            onClick={onSave}
            className="mt-4 w-full bg-[#A71C20] text-white px-4 py-2 rounded hover:opacity-90 transition"
        >
            Guardar recorrido
        </button>
    );
}
