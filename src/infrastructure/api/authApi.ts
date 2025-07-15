import {induct3dApi} from "./induct3dApi.ts";
import {RegisterDTO} from "../schemas/RegisterSchema.ts";
import {MessageResponse} from "../schemas/MessageResponseSchema.ts";
import {LoginResponse} from "../schemas/LoginResponseSchema.ts";
import {LoginDTO} from "../schemas/LoginSchema.ts";
import {
    RecoverRequestDTO,
    ResetPasswordPayload
} from "../schemas/RecoverPasswordSchema.ts";

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
        validateResetCode: builder.query<MessageResponse, { email: string; code: string }>({
            query: ({ email, code }) => ({
                url: `/auth/validate-code/${email}/${code}`,
                method: "GET",
            }),
        }),
    }),
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useRequestResetCodeMutation,
    useResetPasswordMutation,
    useLazyValidateResetCodeQuery
} = authApi;
