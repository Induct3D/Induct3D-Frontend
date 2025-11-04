export default function AdminTourCardPlaceholder() {
    return (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-white shadow-sm min-h-[160px] flex flex-col justify-center items-center">
            <div className="h-6 w-1/2 bg-gray-200 rounded mb-3" />
            <div className="h-4 w-2/3 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-1/3 bg-gray-200 rounded" />
            {/* Nota: aquí luego insertaremos la card real de admin */}
        </div>
    );
}
