import { z } from "zod";

export const TourSchema = z.object({
    tourId: z.string(),
    tourName: z.string(),
    description: z.string(),
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
});

export const TourStatusSchema = z.enum(["APPROVED", "PENDING", "REJECTED"]);

export const MyTourSchema = z.object({
    tourId: z.string(),
    tourName: z.string(),
    description: z.string(),
    status: TourStatusSchema,
    rejectionReason: z.string().nullable(),
});

export type MyTour = z.infer<typeof MyTourSchema>;

export type Tour = z.infer<typeof TourSchema>;
