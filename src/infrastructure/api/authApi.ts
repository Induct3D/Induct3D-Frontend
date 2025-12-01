// src/infrastructure/api/authApi.ts
import { induct3dApi } from "./induct3dApi.ts";
import { RegisterDTO } from "../schemas/RegisterSchema.ts";
import { MessageResponse } from "../schemas/MessageResponseSchema.ts";
import { LoginResponse } from "../schemas/LoginResponseSchema.ts";
import { LoginDTO } from "../schemas/LoginSchema.ts";
import { RecoverRequestDTO, ResetPasswordPayload } from "../schemas/RecoverPasswordSchema.ts";
import {ApiResponse} from "../schemas/ApiResponseSchema.ts";

// 🔹 Tipos de "data" dentro del wrapper
type RefreshData = { token: string };
type ValidateTokenData = { status: "OK" | "UNAUTHORIZED"; message: string };

// 🔹 Respuestas finales del backend (data + meta)
type RegisterApiResponse = ApiResponse<MessageResponse>;
type LoginApiResponse = ApiResponse<LoginResponse>;
type MessageApiResponse = ApiResponse<MessageResponse>;
type RefreshApiResponse = ApiResponse<RefreshData>;
type ValidateTokenApiResponse = ApiResponse<ValidateTokenData>;

export const authApi = induct3dApi.injectEndpoints({
    endpoints: (builder) => ({
        // ▶ Registrar Usuario
        register: builder.mutation<RegisterApiResponse, RegisterDTO>({
            query: (data) => ({
                url: "/auth/create",
                method: "POST",
                body: data,
            }),
        }),

        // ▶ Iniciar Sesion
        login: builder.mutation<LoginApiResponse, LoginDTO>({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
            }),
            // guarda token al hacer login
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    // ahora el token viene en data.data.token
                    const token = data?.data?.token;
                    const role = data?.data?.role as string | undefined;

                    if (token) localStorage.setItem("token", token);
                    if (role) localStorage.setItem("role", role);
                } catch {
                    /* empty */
                }
            },
        }),

        // ▶ Recuperación de contraseña: enviar código
        requestResetCode: builder.mutation<MessageApiResponse, RecoverRequestDTO>({
            query: (data) => ({
                url: "/auth/reset-request",
                method: "POST",
                body: data,
            }),
        }),

        // ▶ Recuperación de contraseña: resetear
        resetPassword: builder.mutation<MessageApiResponse, ResetPasswordPayload>({
            query: (data) => ({
                url: "/auth/reset-password",
                method: "POST",
                body: data,
            }),
        }),

        // ▶ Validar código de recuperación
        validateResetCode: builder.query<
            MessageApiResponse,
            { email: string; code: string }
        >({
            query: ({ email, code }) => ({
                url: `/auth/validate-code/${email}/${code}`,
                method: "GET",
            }),
        }),

        // ▶ Refresh token
        refresh: builder.mutation<RefreshApiResponse, void>({
            query: () => ({ url: "/auth/refresh", method: "POST" }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const token = data?.data?.token;
                    if (token) localStorage.setItem("token", token);
                } catch {
                    /* empty */
                }
            },
        }),

        // ▶ Validar token
        validateToken: builder.query<ValidateTokenApiResponse, void>({
            query: () => ({ url: "/auth/validate-token", method: "GET" }),
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useRequestResetCodeMutation,
    useResetPasswordMutation,
    useLazyValidateResetCodeQuery,
    useRefreshMutation,
    useLazyValidateTokenQuery,
} = authApi;
