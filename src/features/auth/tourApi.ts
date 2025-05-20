import { induct3dApi } from "../../infrastructure/api/induct3dApi";
import {CreateTourDTO} from "../../infrastructure/schemas/CreateTourSchema.ts";

export const tourApi = induct3dApi.injectEndpoints({
    endpoints: (builder) => ({
        createTour: builder.mutation<void, CreateTourDTO>({
            query: (data) => ({
                url: "/api/tours/create",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useCreateTourMutation } = tourApi;
