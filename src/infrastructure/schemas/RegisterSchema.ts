import { z } from "zod";

export const RegisterSchema = z
    .object({
        username: z.string().min(1, "El nombre de usuario es obligatorio"),
        name: z.string().min(1, "El nombre es obligatorio"),
        surname: z.string().min(1, "El apellido es obligatorio"),
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
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });

export type RegisterDTO = z.infer<typeof RegisterSchema>;
