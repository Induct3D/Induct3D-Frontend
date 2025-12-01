// src/infrastructure/api/tourApi.ts
import { induct3dApi } from "./induct3dApi.ts";
import { CreateTourDTO } from "../schemas/CreateTourSchema.ts";
import { Tour } from "../schemas/TourSchema.ts";
import { TourByIdResponse } from "../schemas/TourByIdSchema.ts";
import { ApiResponse } from "../schemas/ApiResponseSchema.ts";
import { MessageResponse } from "../schemas/MessageResponseSchema.ts";

// 🔹 Tipos de respuesta
type ToursListApiResponse = ApiResponse<Tour[]>;
type TourDetailApiResponse = ApiResponse<TourByIdResponse>;
type CreateTourApiResponse = ApiResponse<TourByIdResponse>;
type UploadImageApiResponse = ApiResponse<{ url: string }>;
type SimpleMessageApiResponse = ApiResponse<MessageResponse>;

export const tourApi = induct3dApi.injectEndpoints({
    endpoints: (builder) => ({
        // ▶ Crear tour
        createTour: builder.mutation<CreateTourApiResponse, CreateTourDTO>({
            query: (data) => ({
                url: "/api/tours/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Tours"],
        }),

        // ▶ Mis tours (CREATOR) con paginación (size = 9)
        getMyTours: builder.query<ToursListApiResponse, number | void>({
            query: (page = 1) => ({
                url: "/api/tours/my",
                method: "GET",
                params: {
                    page,
                    size: 9,
                },
            }),
            providesTags: ["Tours"],
        }),

        // ▶ Todos los tours públicos (VISITOR) con paginación (size = 9)
        getAllTours: builder.query<ToursListApiResponse, number | void>({
            query: (page = 1) => ({
                url: "/api/tours",
                method: "GET",
                params: {
                    page,
                    size: 9,
                },
            }),
            providesTags: ["Tours"],
        }),

        // ▶ Detalle de tour
        getTourById: builder.query<TourDetailApiResponse, string>({
            query: (id) => `/api/tours/${id}`,
        }),

        // ▶ Upload de imagen del tablero
        uploadBoardImage: builder.mutation<UploadImageApiResponse, File>({
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

        // ▶ Eliminar tour
        deleteTour: builder.mutation<SimpleMessageApiResponse, string>({
            query: (tourId) => ({
                url: `/api/tours/${tourId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Tours"],
        }),

        // ▶ Actualizar tour
        updateTour: builder.mutation<
            SimpleMessageApiResponse,
            { id: string; data: CreateTourDTO }
        >({
            query: ({ id, data }) => ({
                url: `/api/tours/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Tours"],
        }),
    }),
});

export const {
    useCreateTourMutation,
    useGetMyToursQuery,
    useGetTourByIdQuery,
    useUploadBoardImageMutation,
    useGetAllToursQuery,
    useDeleteTourMutation,
    useUpdateTourMutation,
} = tourApi;
