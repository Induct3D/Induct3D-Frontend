import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterDTO, RegisterSchema } from "../../infrastructure/schemas/RegisterSchema";
import { Link, useNavigate} from "react-router";
import {useRegisterMutation} from "../../infrastructure/api/authApi.ts";
import {useEffect} from "react";
import {getErrorMessage} from "../../infrastructure/utils/getErrorMessage.ts";

const CONSENT_VERSION = "v2025-10-28"; // mantener sincronizado con tu texto legal

export default function Register() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterDTO>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            // metadatos se setean al enviar
            consentVersion: "",
            consentTimestamp: "",
        }
    });

    const [registerUser, { isLoading, isSuccess, isError, error, data }] = useRegisterMutation();

    const onSubmit = (formData: RegisterDTO) => {
        // Setear metadatos de consentimiento just-in-time
        const nowIso = new Date().toISOString();
        const payload: RegisterDTO = {
            ...formData,
            consentVersion: CONSENT_VERSION,
            consentTimestamp: nowIso,
        };

        registerUser(payload);
    };

    useEffect(() => {
        if (isLoading) {
            console.log("Registrando usuario...");
        }
        if (isSuccess && data) {
            console.log("Registro exitoso:", data.data.message);
            navigate("/iniciar-sesion");
        }
        if (isError) {
            console.error("Error en el registro:", error);
        }
    }, [isLoading, isSuccess, isError, data, error, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            {/* ← Volver a la página principal */}
            <Link
                to="/"
                className="absolute top-6 left-6 text-sm text-[#A71C20] font-medium hover:underline"
            >
                ← Volver a la página principal
            </Link>

            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-[#A71C20] mb-6">
                    Crear cuenta en Induct3D
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Nombre de usuario */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de usuario</label>
                        <input
                            {...register("username")}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A71C20]"
                        />
                        {errors.username && <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>}
                    </div>

                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                        <input
                            {...register("name")}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A71C20]"
                        />
                        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Apellido */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                        <input
                            {...register("surname")}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A71C20]"
                        />
                        {errors.surname && <p className="text-sm text-red-600 mt-1">{errors.surname.message}</p>}
                    </div>

                    {/* Correo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                        <input
                            type="email"
                            {...register("email")}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A71C20]"
                        />
                        {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                        <input
                            type="password"
                            {...register("password")}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A71C20]"
                        />
                        {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Confirmar contraseña */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
                        <input
                            type="password"
                            {...register("confirmPassword")}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A71C20]"
                        />
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-600 mt-1">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    {/* ✅ Checkboxes legales (obligatorios) */}
                    <div className="mt-4 space-y-3">
                        <label className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                {...register("acceptTerms")}
                                className="mt-1 h-4 w-4 rounded border-gray-300 text-[#A71C20] focus:ring-[#A71C20]"
                            />
                            <span className="text-sm text-gray-700">
                Acepto los{" "}
                                <a href="/terms" target="_blank" className="text-[#A71C20] underline">Términos y Condiciones</a>.
              </span>
                        </label>
                        {errors.acceptTerms && <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>}

                        <label className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                {...register("acceptPrivacy")}
                                className="mt-1 h-4 w-4 rounded border-gray-300 text-[#A71C20] focus:ring-[#A71C20]"
                            />
                            <span className="text-sm text-gray-700">
                He leído la{" "}
                                <a href="/privacy" target="_blank" className="text-[#A71C20] underline">Política de Privacidad</a>.
              </span>
                        </label>
                        {errors.acceptPrivacy && <p className="text-sm text-red-600">{errors.acceptPrivacy.message}</p>}

                        <label className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                {...register("acceptConsent")}
                                className="mt-1 h-4 w-4 rounded border-gray-300 text-[#A71C20] focus:ring-[#A71C20]"
                            />
                            <span className="text-sm text-gray-700">
                Acepto el{" "}
                                <a href="/consent" target="_blank" className="text-[#A71C20] underline">Consentimiento Informado</a>.
              </span>
                        </label>
                        {errors.acceptConsent && <p className="text-sm text-red-600">{errors.acceptConsent.message}</p>}
                    </div>

                    {/* Errores / estados */}
                    {isLoading && <p className="text-sm text-gray-500">Registrando...</p>}
                    {isError && (
                        <p className="text-sm text-red-600">
                            {getErrorMessage(error)}
                        </p>
                    )}

                    {/* Botones */}
                    <div className="flex justify-between gap-4 mt-6">
                        <Link
                            to="/"
                            className="w-full text-center border border-gray-400 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            className="w-full bg-[#A71C20] text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
                        >
                            Registrarse
                        </button>
                    </div>
                </form>

                {/* Separador */}
                <div className="my-6 flex items-center justify-between">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-4 text-gray-400 text-sm">o</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Redirección a login */}
                <div className="text-center text-sm">
                    ¿Ya tienes una cuenta?{" "}
                    <Link to="/iniciar-sesion" className="text-[#A71C20] font-semibold hover:underline">
                        Inicia sesión aquí
                    </Link>
                </div>
            </div>
        </div>
    );
}
