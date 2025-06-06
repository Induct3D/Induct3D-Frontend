import { z } from "zod";

export const TourSchema = z.object({
    tourId: z.string(),
    tourName: z.string(),
    description: z.string(),
    materialColors: z.record(z.string(), z.string().regex(/^#([0-9a-fA-F]{6})$/)),
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
});

export type Tour = z.infer<typeof TourSchema>;
