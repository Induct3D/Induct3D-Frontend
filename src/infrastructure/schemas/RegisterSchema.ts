import { z } from "zod";

// Solo letras, incluyendo tildes y ñ/Ñ
const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/;

// Username: debe contener al menos una letra (puede tener números o símbolos)
const usernameRegex = /^(?=.*[A-Za-z]).{6,}$/;

export const RegisterSchema = z
    .object({
        username: z
            .string()
            .min(6, "El nombre de usuario debe tener al menos 6 caracteres")
            .regex(usernameRegex, "El nombre de usuario debe contener al menos una letra"),
        name: z
            .string()
            .min(1, "El nombre es obligatorio")
            .regex(nombreRegex, "El nombre solo puede contener letras sin espacios ni caracteres especiales"),
        surname: z
            .string()
            .min(1, "El apellido es obligatorio")
            .regex(nombreRegex, "El apellido solo puede contener letras sin espacios ni caracteres especiales"),
        email: z
            .string()
            .min(1, "El correo es obligatorio")
            .email("Correo electrónico inválido"),
        password: z
            .string()
            .min(6, "La contraseña debe tener al menos 6 caracteres")
            .regex(/[a-z]/, "Debe contener una letra minúscula")
            .regex(/[A-Z]/, "Debe contener una letra mayúscula")
            .regex(/[0-9]/, "Debe contener un número"),
        confirmPassword: z.string(),

        // ✅ Checkboxes legales
        acceptTerms: z.literal(true, {
            errorMap: () => ({ message: "Debes aceptar los Términos y Condiciones" }),
        }),
        acceptPrivacy: z.literal(true, {
            errorMap: () => ({ message: "Debes aceptar la Política de Privacidad" }),
        }),
        acceptConsent: z.literal(true, {
            errorMap: () => ({ message: "Debes aceptar el Consentimiento Informado" }),
        }),

        // ✅ Metadatos de consentimiento (se setean en el submit)
        consentVersion: z.string(),
        consentTimestamp: z.string(), // ISO 8601
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });


export type RegisterDTO = z.infer<typeof RegisterSchema>;
