import { induct3dApi } from "../../infrastructure/api/induct3dApi";
import { TemplateResponse } from "../../infrastructure/schemas/TemplateResponse";
import {TemplateDTO, TemplateSchema} from "../../infrastructure/schemas/TemplateSchema";

export const templateApi = induct3dApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyTemplates: builder.query<TemplateResponse[], void>({
            query: () => ({
                url: "/api/templates",
                method: "GET",
            }),
        }),
        getGlbUrlByTemplateId: builder.query<string, string>({
            query: (templateId) => ({
                url: `/api/templates/${templateId}/glb`,
                responseHandler: (response) => response.text(),
            }),
        }),
        getTemplateById: builder.query<TemplateDTO, string>({
            query: (templateId) => `/api/templates/${templateId}`,
            transformResponse: (response: unknown) => {
                const parsed = TemplateSchema.safeParse(response);
                if (!parsed.success) {
                    throw new Error("Invalid template data");
                }
                return parsed.data;
            },
        }),
    }),
});

export const {
    useGetMyTemplatesQuery,
    useGetGlbUrlByTemplateIdQuery,
    useGetTemplateByIdQuery,
} = templateApi;
