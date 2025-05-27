import { z } from "zod";

export const TourByIdSchema = z.object({
    tourId: z.string(),
    tourName: z.string().nullable(),
    description: z.string(),
    materialColors: z.record(z.string(), z.string().regex(/^#([0-9a-fA-F]{6})$/)),
    glbUrl: z.string().url(),
    steps: z.array(
        z.object({
            stepId: z.string(),
            messages: z.array(z.string()),
            boardMedia: z
                .object({
                    type: z.enum(["image", "video"]),
                    urls: z.array(z.string().url()),
                })
                .nullable(),
        })
    ),
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

export type TourByIdResponse = z.infer<typeof TourByIdSchema>;
