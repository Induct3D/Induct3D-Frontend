import {induct3dApi} from "../../infrastructure/api/induct3dApi.ts";
import {RegisterDTO} from "../../infrastructure/schemas/RegisterSchema.ts";
import {MessageResponse} from "../../infrastructure/schemas/messageResponseSchema.ts";
import {LoginResponse} from "../../infrastructure/schemas/LoginResponseSchema.ts";
import {LoginDTO} from "../../infrastructure/schemas/LoginSchema.ts";
import {
    RecoverRequestDTO,
    ResetPasswordPayload
} from "../../infrastructure/schemas/recoverPasswordSchema.ts";

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
        }),
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
    }),
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useRequestResetCodeMutation,
    useResetPasswordMutation
} = authApi;
