import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterDTO, RegisterSchema } from "../../infrastructure/schemas/RegisterSchema";
import { Link } from "react-router";

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterDTO>({
        resolver: zodResolver(RegisterSchema),
    });

    const onSubmit = (data: RegisterDTO) => {
        console.log("Registro exitoso:", data);
        // Aquí puedes hacer la petición al backend
    };

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
                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                        <input
                            {...register("firstName")}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A71C20]"
                        />
                        {errors.firstName && <p className="text-sm text-red-600 mt-1">{errors.firstName.message}</p>}
                    </div>

                    {/* Apellido */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                        <input
                            {...register("lastName")}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A71C20]"
                        />
                        {errors.lastName && <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p>}
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
