import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordDTO, ResetPasswordSchema } from "../../../infrastructure/schemas/RecoverPasswordSchema";
import { useNavigate } from "react-router";
import { useResetPasswordMutation } from "../../../infrastructure/api/authApi";
import { useState } from "react";
import {useToast} from "../../components/ui/ToastProvider.tsx";

interface Props {
    email: string;
    code: string;
}

export default function RecoverStep3({ email, code }: Props) {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordDTO>({
        resolver: zodResolver(ResetPasswordSchema),
    });

    const onSubmit = async (data: ResetPasswordDTO) => {
        try {
            await resetPassword({ email, code, newPassword: data.newPassword }).unwrap();
            showToast({ variant: "success", message: "Contraseña actualizada correctamente." });
            navigate("/iniciar-sesion");
        } catch (err) {
            const error = err as { data?: { message?: string } };
            showToast({ variant: "error", message: error.data?.message || "Error al actualizar contraseña." });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm">
            <h2 className="text-xl font-semibold text-gray-800">Establece una nueva contraseña</h2>

            <div className="relative">
                <input
                    type={show ? "text" : "password"}
                    {...register("newPassword")}
                    placeholder="Nueva contraseña"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-[#A71C20]"
                />
                <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-2.5 text-sm text-gray-500">
                    {show ? "Ocultar" : "Ver"}
                </button>
                {errors.newPassword && <p className="text-sm text-red-600 mt-1">{errors.newPassword.message}</p>}
            </div>

            <div className="relative">
                <input
                    type={show2 ? "text" : "password"}
                    {...register("confirmPassword")}
                    placeholder="Confirmar contraseña"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-[#A71C20]"
                />
                <button type="button" onClick={() => setShow2(s => !s)} className="absolute right-3 top-2.5 text-sm text-gray-500">
                    {show2 ? "Ocultar" : "Ver"}
                </button>
                {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#A71C20] text-white py-2 rounded-lg font-semibold disabled:opacity-60"
            >
                {isLoading ? "Guardando..." : "Guardar nueva contraseña"}
            </button>
        </form>
    );
}
