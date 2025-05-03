import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {ResetPasswordDTO, ResetPasswordSchema} from "../../../infrastructure/schemas/recoverPasswordSchema.ts";
import {useNavigate} from "react-router";

export default function RecoverStep3() {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordDTO>({
        resolver: zodResolver(ResetPasswordSchema),
    });

    const onSubmit = (data: ResetPasswordDTO) => {
        console.log("🔐 Nueva contraseña guardada:", data.password);
        navigate("/iniciar-sesion");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm">
            <h2 className="text-xl font-semibold text-gray-800">Establece una nueva contraseña</h2>

            <div>
                <input
                    type="password"
                    {...register("password")}
                    placeholder="Nueva contraseña"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#A71C20]"
                />
                {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
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
