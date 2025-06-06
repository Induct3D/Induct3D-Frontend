// src/infrastructure/schemas/CreateTourSchema.ts
import { z } from "zod";

export const CreateTourSchema = z.object({
    tourName: z.string().min(1),
    description: z.string().min(1),
    templateId: z.string().min(1),
    materialColors: z.record(
        z.string(),
        z.string().regex(/^#([0-9a-fA-F]{6})$/)
    ),
    steps: z.array(
        z.object({
            stepId: z.string().min(1),
            messages: z.array(z.string().min(1)),
            boardMedia: z
                .object({
                    html: z.string().min(0),
                })
                .optional(),
        })
    ),
});

export type CreateTourDTO = z.infer<typeof CreateTourSchema>;
