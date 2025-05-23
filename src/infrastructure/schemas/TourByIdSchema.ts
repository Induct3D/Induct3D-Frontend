import { z } from "zod";

export const TourByIdSchema = z.object({
    tourId: z.string(),
    tourName: z.string().nullable(),
    description: z.string(),
    voiceText: z.string(),
    materialColors: z.record(z.string(), z.string().regex(/^#([0-9a-fA-F]{6})$/)),
    glbUrl: z.string().url(),
});

export type TourByIdResponse = z.infer<typeof TourByIdSchema>;
