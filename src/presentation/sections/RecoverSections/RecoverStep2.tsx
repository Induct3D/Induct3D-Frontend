import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerifyCodeDTO, VerifyCodeSchema } from "../../../infrastructure/schemas/RecoverPasswordSchema.ts";
import {useLazyValidateResetCodeQuery} from "../../../infrastructure/api/authApi.ts";

interface Props {
    onNext: () => void;
    setCode: (code: string) => void;
    email: string;
}

export default function RecoverStep2({ onNext, setCode, email }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<VerifyCodeDTO>({
        resolver: zodResolver(VerifyCodeSchema),
    });

    const [triggerValidateCode, { isFetching, error }] = useLazyValidateResetCodeQuery();

    const onSubmit = async (data: VerifyCodeDTO) => {
        try {
            const result = await triggerValidateCode({ email, code: data.code }).unwrap();
            console.log(result)
            setCode(data.code);
            onNext();
        } catch {
            alert("Código inválido o expirado.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm text-center">
            <h2 className="text-xl font-semibold text-gray-800">Ingresa el código</h2>
            <p className="text-sm text-gray-600">Revisa tu correo y escribe los 6 dígitos aquí:</p>

            <div>
                <input
                    type="text"
                    maxLength={6}
                    {...register("code")}
                    placeholder="Ejemplo: 123456"
                    className="w-full text-center border border-gray-300 rounded-lg px-4 py-2 text-lg tracking-widest focus:ring-2 focus:ring-[#A71C20]"
                />
                {errors.code && <p className="text-sm text-red-600 mt-1">{errors.code.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isFetching}
                className="w-full bg-[#A71C20] text-white py-2 rounded-lg font-semibold"
            >
                {isFetching ? "Verificando..." : "Verificar código"}
            </button>

            {error && <p className="text-sm text-red-600 mt-2">Error al validar el código.</p>}
        </form>
    );
}
