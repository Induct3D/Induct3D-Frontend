import { z } from "zod";

export const LoginSchema = z.object({
    email: z
        .string()
        .min(1, "El correo es obligatorio")
        .email("Correo no válido"),

    password: z
        .string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .regex(/[a-z]/, "Debe contener una letra minúscula")
        .regex(/[A-Z]/, "Debe contener una letra mayúscula")
        .regex(/[0-9]/, "Debe contener al menos un número"),
});

export type LoginDTO = z.infer<typeof LoginSchema>;
