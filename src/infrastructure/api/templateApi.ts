// src/infrastructure/api/templateApi.ts
import { induct3dApi } from "./induct3dApi.ts";
import { TemplateDTO, TemplateSchema } from "../schemas/TemplateSchema.ts";
import { ApiResponse } from "../schemas/ApiResponseSchema.ts";

// 👇 Tipos de respuesta del backend
export type TemplatesListApiResponse = ApiResponse<TemplateDTO[]>;
export type TemplateDetailApiResponse = ApiResponse<TemplateDTO>;

export const templateApi = induct3dApi.injectEndpoints({
    endpoints: (builder) => ({
        // ▶ Obtener todos los templates del usuario (o globales, según tu backend)
        getMyTemplates: builder.query<TemplatesListApiResponse, void>({
            query: () => ({
                url: "/api/templates",
                method: "GET",
            }),
            // Validamos el array con Zod
            transformResponse: (response: ApiResponse<unknown>): TemplatesListApiResponse => {
                const parsed = TemplateSchema.array().safeParse(response.data);
                if (!parsed.success) {
                    console.error("Template list validation error:", parsed.error);
                    throw new Error("Invalid templates data");
                }

                return {
                    ...response,
                    data: parsed.data, // ahora sí TemplateDTO[]
                };
            },
        }),

        // ▶ Obtener un template por su id
        getTemplateById: builder.query<TemplateDetailApiResponse, string>({
            query: (templateId) => ({
                url: `/api/templates/${templateId}`,
                method: "GET",
            }),
            transformResponse: (response: ApiResponse<unknown>): TemplateDetailApiResponse => {
                const parsed = TemplateSchema.safeParse(response.data);
                if (!parsed.success) {
                    console.error("Template detail validation error:", parsed.error);
                    throw new Error("Invalid template data");
                }

                return {
                    ...response,
                    data: parsed.data, // TemplateDTO
                };
            },
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetMyTemplatesQuery,
    useGetTemplateByIdQuery,
} = templateApi;
