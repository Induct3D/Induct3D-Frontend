import { induct3dApi } from "../../infrastructure/api/induct3dApi";
import { TemplateResponse } from "../../infrastructure/schemas/TemplateSchema";

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
    }),
});

export const {
    useGetMyTemplatesQuery,
    useGetGlbUrlByTemplateIdQuery,
} = templateApi;
