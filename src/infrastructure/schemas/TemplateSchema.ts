import { z } from "zod";

export const TemplateSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    images: z.array(z.string().url()),
    glbUrl: z.string().url(),
    userId: z.string().nullable(),
    userStart: z.object({
        x: z.number(),
        y: z.number(),
        z: z.number(),
    }),
    predefinedSteps: z.array(
        z.object({
            id: z.string(),
            position: z.array(
                z.object({
                    x: z.number(),
                    y: z.number(),
                    z: z.number(),
                })
            ),
            hasBoard: z.boolean().optional(),
        })
    ),
});

export type TemplateDTO = z.infer<typeof TemplateSchema>;
