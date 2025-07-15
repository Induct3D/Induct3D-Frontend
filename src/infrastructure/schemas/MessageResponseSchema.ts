import { z } from "zod"

export const MessageResponseSchema = z.object({
    status: z.string(),
    message: z.string()
})

export type MessageResponse = z.infer<typeof MessageResponseSchema>
