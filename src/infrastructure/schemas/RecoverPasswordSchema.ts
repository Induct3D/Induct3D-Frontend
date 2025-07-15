import { z } from "zod";

// 1. Enviar correo
export const RecoverRequestSchema = z.object({
    email: z.string().min(1, "Correo obligatorio").email("Correo inválido"),
});

// 2. Verificar código de 6 dígitos
export const VerifyCodeSchema = z.object({
    code: z
        .string()
        .length(6, "El código debe tener 6 dígitos")
        .regex(/^\d+$/, "El código debe contener solo números"),
});

// 3. Restablecer contraseña
export const ResetPasswordSchema = z
    .object({
        newPassword: z
            .string()
            .min(6, "Mínimo 6 caracteres")
            .regex(/[a-z]/, "Debe contener minúscula")
            .regex(/[A-Z]/, "Debe contener mayúscula")
            .regex(/[0-9]/, "Debe contener número"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Las contraseñas no coinciden",
    });


// Este es el que se usa SOLO en el mutation
export type ResetPasswordPayload = {
    email: string;
    code: string;
    newPassword: string;
};


export type RecoverRequestDTO = z.infer<typeof RecoverRequestSchema>;
export type VerifyCodeDTO = z.infer<typeof VerifyCodeSchema>;
export type ResetPasswordDTO = z.infer<typeof ResetPasswordSchema>;
