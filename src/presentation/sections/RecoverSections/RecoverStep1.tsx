import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import {RecoverRequestDTO, RecoverRequestSchema} from "../../../infrastructure/schemas/recoverPasswordSchema.ts";

interface Props {
    onNext: () => void;
}

export default function RecoverStep1({ onNext }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<RecoverRequestDTO>({
        resolver: zodResolver(RecoverRequestSchema),
    });

    const onSubmit = (data: RecoverRequestDTO) => {
        console.log("📨 Enviando código a:", data.email);
        onNext();
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

            <button type="submit" className="w-full bg-[#A71C20] text-white py-2 rounded-lg font-semibold">
                Enviar código
            </button>
        </form>
    );
}
