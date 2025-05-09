import { z } from "zod"

export const LoginSchema = z.object({
    username: z.string().min(1, "El nombre de usuario es obligatorio"),

    password: z
        .string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .regex(/[a-z]/, "Debe contener una letra minúscula")
        .regex(/[A-Z]/, "Debe contener una letra mayúscula")
        .regex(/[0-9]/, "Debe contener al menos un número"),
})

export type LoginDTO = z.infer<typeof LoginSchema>
