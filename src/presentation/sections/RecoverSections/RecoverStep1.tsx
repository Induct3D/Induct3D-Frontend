import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { RecoverRequestDTO, RecoverRequestSchema } from "../../../infrastructure/schemas/recoverPasswordSchema.ts";
import { useRequestResetCodeMutation } from "../../../features/auth/authApi.ts";

interface Props {
    onNext: () => void;
    setEmail: (email: string) => void;
}

export default function RecoverStep1({ onNext, setEmail }: Props) {
    const [requestResetCode, { isLoading }] = useRequestResetCodeMutation();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RecoverRequestDTO>({
        resolver: zodResolver(RecoverRequestSchema),
    });

    const onSubmit = async (data: RecoverRequestDTO) => {
        try {
            await requestResetCode(data).unwrap();
            setEmail(data.email);
            onNext();
        } catch (err) {
            const error = err as { data?: { message?: string } };
            alert(error.data?.message || "Error al enviar el código");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm">
            <Link to="/iniciar-sesion" className="text-sm text-[#A71C20] font-medium hover:underline">
                ← Volver al inicio de sesión
            </Link>

            <h2 className="text-xl font-semibold text-gray-800">Recuperar contraseña</h2>
            <p className="text-sm text-gray-600">Ingresa tu correo para enviarte un código de verificación.</p>

            <div>
                <input
                    {...register("email")}
                    placeholder="Correo electrónico"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#A71C20]"
                />
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 rounded-lg font-semibold text-white transition ${
                    isLoading ? "bg-[#A71C20]/50 cursor-not-allowed" : "bg-[#A71C20] hover:opacity-90"
                }`}
            >
                {isLoading ? "Enviando..." : "Enviar código"}
            </button>
        </form>
    );
}
