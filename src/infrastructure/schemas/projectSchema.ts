import { z } from "zod";

export const ProjectSchema = z.object({
    id: z.string(),
    title: z.string().min(1),
    description: z.string().min(1),
    imageUrl: z.string().url(),
});

export type Project = z.infer<typeof ProjectSchema>;
