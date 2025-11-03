import { z } from "zod";

export const LoginResponseSchema = z.object({
    token: z.string(),
    role: z.enum(["ADMIN", "CREATOR"]), 
});

export type UserRole = z.infer<typeof LoginResponseSchema.shape.role>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
