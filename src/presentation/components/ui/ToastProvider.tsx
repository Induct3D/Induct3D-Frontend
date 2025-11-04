import { createContext, useCallback, useContext, useState, ReactNode } from "react";

type Toast = { id: number; title?: string; message: string; variant?: "success"|"error"|"info" };
type Ctx = { showToast: (t: Omit<Toast, "id">) => void };

const ToastCtx = createContext<Ctx | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((t: Omit<Toast, "id">) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, ...t }]);
        // Autoclose a 3.5s
        setTimeout(() => setToasts(prev => prev.filter(x => x.id !== id)), 3500);
    }, []);

    return (
        <ToastCtx.Provider value={{ showToast }}>
            {children}
            {/* Contenedor visual */}
            <div className="fixed top-4 right-4 z-[9999] space-y-3">
                {toasts.map(t => (
                    <div
                        key={t.id}
                        className={`rounded-lg px-4 py-3 shadow-lg text-white ${
                            t.variant === "error" ? "bg-red-600"
                                : t.variant === "success" ? "bg-green-600"
                                    : "bg-gray-800"
                        }`}
                        role="status"
                        aria-live="polite"
                    >
                        {t.title && <div className="font-semibold">{t.title}</div>}
                        <div className="text-sm">{t.message}</div>
                    </div>
                ))}
            </div>
        </ToastCtx.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastCtx);
    if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
    return ctx;
}
