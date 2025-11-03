// src/infrastructure/api/authApi.ts
import { induct3dApi } from "./induct3dApi.ts";
import { RegisterDTO } from "../schemas/RegisterSchema.ts";
import { MessageResponse } from "../schemas/MessageResponseSchema.ts";
import { LoginResponse } from "../schemas/LoginResponseSchema.ts";
import { LoginDTO } from "../schemas/LoginSchema.ts";
import { RecoverRequestDTO, ResetPasswordPayload } from "../schemas/RecoverPasswordSchema.ts";

// Tipos simples para refresh/validate
type RefreshResponse = { token: string }
type ValidateResponse = { status: 'OK' | 'UNAUTHORIZED'; message: string }

export const authApi = induct3dApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<MessageResponse, RegisterDTO>({
            query: (data) => ({
                url: '/auth/create',
                method: 'POST',
                body: data
            }),
        }),

        login: builder.mutation<LoginResponse, LoginDTO>({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data
            }),
            // guarda token al hacer login (si tu LoginResponse lo trae)
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const {data} = await queryFulfilled
                    // Ajusta si tu LoginResponse expone el token en otra propiedad
                    if (data?.token) localStorage.setItem('token', data.token)
                    if (data?.role) localStorage.setItem('role', data.role)
                } catch { /* empty */ }
            }
        }),

        // Recuperación de contraseña
        requestResetCode: builder.mutation<MessageResponse, RecoverRequestDTO>({
            query: (data) => ({
                url: '/auth/reset-request',
                method: 'POST',
                body: data,
            }),
        }),
        resetPassword: builder.mutation<MessageResponse, ResetPasswordPayload>({
            query: (data) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body: data,
            }),
        }),
        validateResetCode: builder.query<MessageResponse, { email: string; code: string }>({
            query: ({ email, code }) => ({
                url: `/auth/validate-code/${email}/${code}`,
                method: 'GET',
            }),
        }),

        // ---- Nuevos endpoints para sesión ----
        refresh: builder.mutation<RefreshResponse, void>({
            query: () => ({ url: '/auth/refresh', method: 'POST' }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    if (data?.token) localStorage.setItem('token', data.token)
                } catch { /* empty */ }
            }
        }),

        validateToken: builder.query<ValidateResponse, void>({
            query: () => ({ url: '/auth/validate-token', method: 'GET' }),
        }),
    }),
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useRequestResetCodeMutation,
    useResetPasswordMutation,
    useLazyValidateResetCodeQuery,

    // nuevos hooks
    useRefreshMutation,
    useLazyValidateTokenQuery,
} = authApi;
