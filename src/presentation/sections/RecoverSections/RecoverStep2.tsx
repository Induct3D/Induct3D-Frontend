import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    VerifyCodeDTO,
    VerifyCodeSchema,
} from "../../../infrastructure/schemas/RecoverPasswordSchema.ts";
import {
    useLazyValidateResetCodeQuery,
    useRequestResetCodeMutation,
} from "../../../infrastructure/api/authApi.ts";
import {useToast} from "../../components/ui/ToastProvider.tsx";

interface Props {
    onNext: () => void;
    setCode: (code: string) => void;
    email: string;
}

export default function RecoverStep2({ onNext, setCode, email }: Props) {
    const { showToast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<VerifyCodeDTO>({
        resolver: zodResolver(VerifyCodeSchema),
    });

    // Validación (lazy query existente en tu proyecto)
    const [triggerValidateCode, { isFetching }] = useLazyValidateResetCodeQuery();

    // Reenviar código
    const [requestResetCode, { isLoading: isResending }] =
        useRequestResetCodeMutation();

    // Cooldown para "Reenviar código"
    const [cooldown, setCooldown] = useState(0);
    useEffect(() => {
        if (!cooldown) return;
        const id = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
        return () => clearInterval(id);
    }, [cooldown]);

    const onSubmit = async (data: VerifyCodeDTO) => {
        try {
            // Sanea el input (quita espacios/guiones y recorta)
            const sanitized = data.code.replace(/[\s-]/g, "").trim();
            setValue("code", sanitized, { shouldDirty: false, shouldValidate: true });

            // Llama a la validación
            await triggerValidateCode({ email, code: sanitized }).unwrap();

            setCode(sanitized);
            showToast({ variant: "success", message: "Código verificado." });
            onNext();
        } catch (e) {
            showToast({ variant: "error", message: "Código inválido o expirado." });
        }
    };

    const handleResend = async () => {
        try {
            await requestResetCode({ email }).unwrap();
            setCooldown(60);
            showToast({
                variant: "info",
                message: "Te reenviamos un nuevo código.",
            });
        } catch {
            showToast({
                variant: "error",
                message: "No pudimos reenviar el código. Intenta en un momento.",
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 w-full max-w-sm text-center"
        >
            <h2 className="text-xl font-semibold text-gray-800">Ingresa el código</h2>
            <p className="text-sm text-gray-600">
                Revisa tu correo y escribe los 6 dígitos aquí:
            </p>

            <div>
                <input
                    type="text"
                    maxLength={6}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    {...register("code")}
                    placeholder="Ejemplo: 123456"
                    className="w-full text-center border border-gray-300 rounded-lg px-4 py-2 text-lg tracking-widest focus:ring-2 focus:ring-[#A71C20]"
                />
                {errors.code && (
                    <p className="text-sm text-red-600 mt-1">{errors.code.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isFetching}
                className="w-full bg-[#A71C20] text-white py-2 rounded-lg font-semibold disabled:opacity-60"
            >
                {isFetching ? "Verificando..." : "Verificar código"}
            </button>

            <button
                type="button"
                onClick={handleResend}
                disabled={isResending || cooldown > 0}
                className="text-sm text-[#A71C20] hover:underline disabled:opacity-50"
            >
                {cooldown > 0 ? `Reenviar código en ${cooldown}s` : "Reenviar código"}
            </button>
        </form>
    );
}
