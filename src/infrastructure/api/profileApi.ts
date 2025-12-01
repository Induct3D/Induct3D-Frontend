// src/infrastructure/api/profileApi.ts
import { induct3dApi } from "./induct3dApi";
import { ApiResponse } from "../schemas/ApiResponseSchema";

export interface Profile {
    username: string;
    email: string;
    name: string;
    surname: string;
    role: "ADMIN" | "CREATOR" | "USER" | string;
}

export interface UpdateProfileDTO {
    name: string;
    surname: string;
}

// 🔹 Tipos de respuesta del backend
type ProfileApiResponse = ApiResponse<Profile>;
type DeleteProfileApiResponse = ApiResponse<{ message?: string }>;

export const profileApi = induct3dApi.injectEndpoints({
    endpoints: (build) => ({
        // ▶ Obtener perfil
        getProfile: build.query<ProfileApiResponse, void>({
            query: () => ({ url: "/api/user/profile", method: "GET" }),
            providesTags: ["Profile"],
        }),

        // ▶ Actualizar perfil
        updateProfile: build.mutation<ProfileApiResponse, UpdateProfileDTO>({
            query: (body) => ({
                url: "/api/user/profile",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Profile"],
        }),

        // ▶ Eliminar perfil
        deleteProfile: build.mutation<DeleteProfileApiResponse, void>({
            query: () => ({
                url: "/api/user/profile",
                method: "DELETE",
            }),
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useDeleteProfileMutation,
} = profileApi;
