import { z } from "zod"

export const MessageResponseSchema = z.object({
    status: z.string(),  // podrías refinarlo a: z.enum(["OK", "ERROR"]) si quieres
    message: z.string()
})

export type MessageResponse = z.infer<typeof MessageResponseSchema>
