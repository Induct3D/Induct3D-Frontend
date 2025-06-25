import { z } from "zod"

// Username: debe contener al menos una letra (puede tener números o símbolos)
const usernameRegex = /^(?=.*[A-Za-z]).{6,}$/;

export const LoginSchema = z.object({
    username: z
        .string()
        .min(6, "El nombre de usuario debe tener al menos 6 caracteres")
        .regex(usernameRegex, "El nombre de usuario debe contener al menos una letra"),

    password: z
        .string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .regex(/[a-z]/, "Debe contener una letra minúscula")
        .regex(/[A-Z]/, "Debe contener una letra mayúscula")
        .regex(/[0-9]/, "Debe contener al menos un número"),
})

export type LoginDTO = z.infer<typeof LoginSchema>
