import { z } from "zod";

export const CreateTourSchema = z.object({
    tourName: z.string().min(1),
    description: z.string().min(1),
    templateId: z.string().min(1),
    materialColors: z.record(z.string(), z.string().regex(/^#([0-9a-fA-F]{6})$/)),
    voiceText: z.string().min(1),
});

export type CreateTourDTO = z.infer<typeof CreateTourSchema>;
