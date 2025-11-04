import { z } from "zod"

export const ProfileUpdateSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    surname: z.string().min(1, "El apellido es requerido"),
})

export type ProfileUpdateDTO = z.infer<typeof ProfileUpdateSchema>
