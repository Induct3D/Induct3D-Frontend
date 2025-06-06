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
            hasBoard: z.boolean().nullable().optional(), // puede ser null o undefined
            boardConfig: z
                .object({
                    position: z.object({
                        x: z.number(),
                        y: z.number(),
                        z: z.number(),
                    }),
                    rotation: z
                        .object({
                            x: z.number(),
                            y: z.number(),
                            z: z.number(),
                        })
                        .optional(),
                    scale: z.number().optional(),
                })
                .nullable()
                .optional(),
        })
    ),
});

export type TemplateDTO = z.infer<typeof TemplateSchema>;
