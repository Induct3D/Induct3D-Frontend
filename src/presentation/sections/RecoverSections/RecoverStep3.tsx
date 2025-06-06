import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordDTO, ResetPasswordSchema } from "../../../infrastructure/schemas/recoverPasswordSchema.ts";
import { useNavigate } from "react-router";
import { useResetPasswordMutation } from "../../../features/auth/authApi.ts";

interface Props {
    email: string;
    code: string;
}

export default function RecoverStep3({ email, code }: Props) {
    const navigate = useNavigate();
    const [resetPassword] = useResetPasswordMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordDTO>({
        resolver: zodResolver(ResetPasswordSchema),
    });

    const onSubmit = async (data: ResetPasswordDTO) => {
        try {
            await resetPassword({
                email,
                code,
                newPassword: data.newPassword,
            }).unwrap();

            alert("Contraseña actualizada correctamente");
            navigate("/iniciar-sesion");
        } catch (err) {
            const error = err as { data?: { message?: string } };
            alert(error.data?.message || "Error al actualizar contraseña");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm">
            <h2 className="text-xl font-semibold text-gray-800">Establece una nueva contraseña</h2>

            <div>
                <input
                    type="password"
                    {...register("newPassword")}
                    placeholder="Nueva contraseña"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#A71C20]"
                />
                {errors.newPassword && (
                    <p className="text-sm text-red-600 mt-1">{errors.newPassword.message}</p>
                )}
            </div>

            <div>
                <input
                    type="password"
                    {...register("confirmPassword")}
                    placeholder="Confirmar contraseña"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#A71C20]"
                />
                {errors.confirmPassword && (
                    <p className="text-sm text-red-600 mt-1">{errors.confirmPassword.message}</p>
                )}
            </div>

            <button
                type="submit"
                className="w-full bg-[#A71C20] text-white py-2 rounded-lg font-semibold"
            >
                Guardar nueva contraseña
            </button>
        </form>
    );
}
