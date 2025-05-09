import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import {Link, useNavigate } from "react-router"
import {LoginDTO, LoginSchema} from "../../infrastructure/schemas/LoginSchema.ts";
import { useLoginMutation } from "../../features/auth/authApi.ts";
import {getErrorMessage} from "../../infrastructure/utils/getErrorMessage.ts";

export default function Login() {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginDTO>({
        resolver: zodResolver(LoginSchema)
    })

    const [loginUser, { isLoading, isSuccess, isError, error, data }] = useLoginMutation()

    const onSubmit = (formData: LoginDTO) => {
        loginUser(formData)
    }

    useEffect(() => {
        if (isSuccess && data?.token) {
            localStorage.setItem("token", data.token)
            console.log("Login exitoso. Token guardado.")
            navigate("/dashboard")
        }
    }, [isSuccess, data, navigate])

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-gray-50 px-4">
            <Link
                to="/"
                className="absolute top-6 left-6 text-sm text-[#A71C20] font-medium hover:underline"
            >
                ← Volver a la página principal
            </Link>

            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-[#A71C20] mb-6">Iniciar sesión</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Usuario */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de usuario:</label>
                        <input
                            type="text"
                            {...register("username")}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A71C20]"
                        />
                        {errors.username && (
                            <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>
                        )}
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña:</label>
                        <input
                            type="password"
                            {...register("password")}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A71C20]"
                        />
                        {errors.password && (
                            <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Mensajes de estado */}
                    {isLoading && <p className="text-sm text-gray-500">Iniciando sesión...</p>}
                    {isError && (
                        <p className="text-sm text-red-600">{getErrorMessage(error)}</p>
                    )}

                    {/* ¿Olvidaste tu contraseña? */}
                    <div className="text-right text-sm">
                        <Link to="/recuperar-contrasena" className="text-[#A71C20] hover:underline">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>

                    {/* Botón */}
                    <button
                        type="submit"
                        className="w-full bg-[#A71C20] text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
                        disabled={isLoading}
                    >
                        Iniciar sesión
                    </button>
                </form>

                {/* Separador */}
                <div className="my-6 flex items-center justify-between">
                    <hr className="flex-grow border-gray-300" />
                    <hr className="mx-2 border-gray-300 border-2 bg-gray-300 rounded-full w-2 h-2" />
                    <hr className="flex-grow border-gray-300" />
                </div>

                <div className="text-center">
                    <Link
                        to="/registrarse"
                        className="w-full block text-center border border-[#A71C20] text-[#A71C20] font-semibold py-2 rounded-lg hover:bg-[#A71C20]/10 transition"
                    >
                        Crear cuenta
                    </Link>
                </div>
            </div>
        </div>
    )
}
