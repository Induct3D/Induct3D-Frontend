// src/infrastructure/schemas/CreateTourSchema.ts
import { z } from "zod";

export const CreateTourSchema = z
    .object({
        tourName: z.string().min(1, "El nombre es obligatorio"),
        description: z.string().min(1, "La descripción es obligatoria"),
        templateId: z.string().min(1, "La plantilla es obligatoria"),

        // 🆕 Protección con contraseña
        hasPassword: z.boolean(),
        password: z.string().nullable().optional(),

        materialColors: z.record(
            z.string(),
            z.string().regex(/^#([0-9a-fA-F]{6})$/, "Color inválido")
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
    })
    .superRefine((data, ctx) => {
        // Si hasPassword es true, password NO puede ser vacío
        if (data.hasPassword) {
            if (!data.password || data.password.trim().length === 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["password"],
                    message:
                        "Debes ingresar una contraseña si activas la protección.",
                });
            }
        }
    });

export type CreateTourDTO = z.infer<typeof CreateTourSchema>;
