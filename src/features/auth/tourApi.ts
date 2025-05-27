import { induct3dApi } from "../../infrastructure/api/induct3dApi";
import {CreateTourDTO} from "../../infrastructure/schemas/CreateTourSchema.ts";
import {Tour} from "../../infrastructure/schemas/TourSchema.ts";
import {TourByIdResponse} from "../../infrastructure/schemas/TourByIdSchema.ts";

export const tourApi = induct3dApi.injectEndpoints({
    endpoints: (builder) => ({
        createTour: builder.mutation<void, CreateTourDTO>({
            query: (data) => ({
                url: "/api/tours/create",
                method: "POST",
                body: data,
            }),
        }),
        getMyTours: builder.query<Tour[], void>({
            query: () => "/api/tours/my",
        }),
        getTourById: builder.query<TourByIdResponse, string>({
            query: (id) => `/api/tours/${id}`,
        }),
        uploadBoardImage: builder.mutation<{ url: string }, File>({
            query: (file) => {
                const formData = new FormData();
                formData.append("file", file);
                return {
                    url: "/api/pictures/upload",
                    method: "POST",
                    body: formData,
                };
            },
        }),

    }),
});

export const {
    useCreateTourMutation,
    useGetMyToursQuery,
    useGetTourByIdQuery,
    useUploadBoardImageMutation,
} = tourApi;
