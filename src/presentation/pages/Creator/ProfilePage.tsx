import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    useDeleteProfileMutation,
    useGetProfileQuery,
    useUpdateProfileMutation,
    Profile,
} from "../../../infrastructure/api/profileApi";
import {
    ProfileUpdateSchema,
    ProfileUpdateDTO,
} from "../../../infrastructure/schemas/ProfileSchema";
import { useNavigate } from "react-router";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// 🧩 Modales
import SuccessModal from "../../components/Modals/SuccessModal";
import ConfirmAccountDeleteModal from "../../components/Modals/ConfirmAccountDeleteModal";

export default function ProfilePage() {
    const navigate = useNavigate();

    // ahora data es ProfileApiResponse | undefined
    const {
        data: profileResponse,
        isLoading,
        isError,
        refetch,
    } = useGetProfileQuery();

    const [updateProfile, { isLoading: isSaving }] =
        useUpdateProfileMutation();
    const [deleteProfile, { isLoading: isDeleting }] =
        useDeleteProfileMutation();

    // Perfil real
    const profile: Profile | undefined = profileResponse?.data;

    // Modales
    const [successOpen, setSuccessOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProfileUpdateDTO>({
        resolver: zodResolver(ProfileUpdateSchema),
        defaultValues: useMemo(
            () => ({
                name: profile?.name ?? "",
                surname: profile?.surname ?? "",
            }),
            [profile],
        ),
    });

    useEffect(() => {
        if (profile) {
            reset({ name: profile.name, surname: profile.surname });
        }
    }, [profile, reset]);

    const onSubmit = async (form: ProfileUpdateDTO) => {
        try {
            await updateProfile(form).unwrap();
            await refetch();
            setSuccessMessage("Perfil actualizado correctamente.");
            setSuccessOpen(true);
            setTimeout(() => setSuccessOpen(false), 1400);
        } catch {
            setSuccessMessage("No se pudo actualizar el perfil.");
            setSuccessOpen(true);
            setTimeout(() => setSuccessOpen(false), 1600);
        }
    };

    const requestDelete = () => setConfirmDeleteOpen(true);

    const confirmDelete = async () => {
        try {
            await deleteProfile().unwrap();
            setConfirmDeleteOpen(false);
            setSuccessMessage("Tu perfil fue eliminado. Cerrando sesión…");
            setSuccessOpen(true);
            setTimeout(() => {
                localStorage.removeItem("token");
                setSuccessOpen(false);
                navigate("/");
            }, 1200);
        } catch {
            setConfirmDeleteOpen(false);
            setSuccessMessage("No se pudo eliminar el perfil.");
            setSuccessOpen(true);
            setTimeout(() => setSuccessOpen(false), 1600);
        }
    };

    const downloadPdf = () => {
        if (!profile) return;

        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Induct3D - Datos de Perfil", 14, 18);
        doc.setFontSize(10);
        const emitido = new Date().toLocaleString();
        doc.text(`Emitido: ${emitido}`, 14, 26);
        doc.text(
            "Documento generado por solicitud del titular (ARCO - Acceso).",
            14,
            32,
        );
        autoTable(doc, {
            startY: 40,
            head: [["Campo", "Valor"]],
            body: [
                ["Usuario", profile.username],
                ["Email", profile.email],
                ["Nombre", profile.name],
                ["Apellido", profile.surname],
                ["Rol", profile.role],
            ],
            styles: { fontSize: 11 },
            headStyles: { fillColor: [167, 28, 32] },
        });
        const pageHeight = doc.internal.pageSize.getHeight();
        doc.setFontSize(9);
        doc.text(
            "Para rectificación o cancelación use las opciones del perfil.",
            14,
            pageHeight - 14,
        );
        doc.save("mis-datos-perfil.pdf");
    };

    if (isLoading) return <div className="p-6">Cargando perfil...</div>;
    if (isError || !profile)
        return (
            <div className="p-6 text-red-600">
                No se pudo cargar el perfil.
            </div>
        );

    return (
        <>
            <div className="p-6 space-y-6">
                <header className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-[#A71C20]">
                        Mi perfil
                    </h1>
                </header>

                {/* Acceso */}
                <section className="bg-white border rounded-2xl p-4 shadow-sm">
                    <h2 className="text-lg font-medium mb-3">Datos actuales</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                            <span className="text-gray-500">Usuario:</span>{" "}
                            <span className="font-medium">{profile.username}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Email:</span>{" "}
                            <span className="font-medium">{profile.email}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Nombre:</span>{" "}
                            <span className="font-medium">{profile.name}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Apellido:</span>{" "}
                            <span className="font-medium">{profile.surname}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Rol:</span>{" "}
                            <span className="font-medium">{profile.role}</span>
                        </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                        <button
                            onClick={downloadPdf}
                            className="px-3 py-2 rounded-lg border hover:bg-gray-50"
                        >
                            Descargar PDF
                        </button>
                        <button
                            onClick={() => refetch()}
                            className="px-3 py-2 rounded-lg border hover:bg-gray-50"
                        >
                            Refrescar
                        </button>
                    </div>
                </section>

                {/* Rectificación */}
                <section className="bg-white border rounded-2xl p-4 shadow-sm">
                    <h2 className="text-lg font-medium mb-3">Editar perfil</h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Nombre
                            </label>
                            <input
                                className="w-full border rounded-lg px-3 py-2"
                                {...register("name")}
                                placeholder="Nombre"
                            />
                            {errors.name && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Apellido
                            </label>
                            <input
                                className="w-full border rounded-lg px-3 py-2"
                                {...register("surname")}
                                placeholder="Apellido"
                            />
                            {errors.surname && (
                                <p className="text-xs text-red-600 mt-1">
                                    {errors.surname.message}
                                </p>
                            )}
                        </div>
                        <div className="md:col-span-2 flex gap-2">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="px-4 py-2 rounded-lg text-white bg-[#A71C20] hover:opacity-95 disabled:opacity-60"
                            >
                                {isSaving ? "Guardando..." : "Guardar cambios"}
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    reset({
                                        name: profile.name,
                                        surname: profile.surname,
                                    })
                                }
                                className="px-4 py-2 rounded-lg border hover:bg-gray-50"
                            >
                                Restablecer
                            </button>
                        </div>
                    </form>
                </section>

                {/* Cancelación */}
                <section className="bg-white border rounded-2xl p-4 shadow-sm">
                    <h2 className="text-lg font-medium mb-3 text-red-700">
                        Eliminar mi perfil
                    </h2>
                    <p className="text-sm text-gray-600 mb-3">
                        Esta acción es permanente y eliminará tu cuenta y datos
                        asociados según la política vigente.
                    </p>
                    <button
                        onClick={requestDelete}
                        disabled={isDeleting}
                        className="px-4 py-2 rounded-lg border border-red-600 text-red-700 hover:bg-red-50 disabled:opacity-60"
                    >
                        {isDeleting ? "Eliminando..." : "Eliminar perfil"}
                    </button>
                </section>
            </div>

            {/* Modales */}
            <ConfirmAccountDeleteModal
                isOpen={confirmDeleteOpen}
                username={profile.username}
                email={profile.email}
                onCancel={() => setConfirmDeleteOpen(false)}
                onConfirm={confirmDelete}
            />

            <SuccessModal isOpen={successOpen} message={successMessage} />
        </>
    );
}
