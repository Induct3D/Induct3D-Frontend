// src/infrastructure/schemas/TourByIdSchema.ts
import { z } from "zod";

export const TourByIdSchema = z.object({
    tourId: z.string(),
    templateId: z.string(),
    tourName: z.string().nullable(),
    description: z.string(),

    hasPassword: z.boolean().default(false),

    // 🆕 la contraseña que viene del backend (puede ser null)
    password: z.string().nullable().optional(),

    materialColors: z.record(
        z.string(),
        z.string().regex(/^#([0-9a-fA-F]{6})$/)
    ),
    steps: z.array(
        z.object({
            stepId: z.string(),
            messages: z.array(z.string()),
            boardMedia: z
                .object({
                    html: z.string().nullable(),
                })
                .nullable(),
        })
    ),
    glbUrl: z.string(),
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
            hasBoard: z.boolean().nullable(),
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
                .nullable(),
        })
    ),
});

export type TourByIdResponse = z.infer<typeof TourByIdSchema>;
