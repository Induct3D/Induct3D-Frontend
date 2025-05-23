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
    }),
});

export const { useGetMyTemplatesQuery } = templateApi;
