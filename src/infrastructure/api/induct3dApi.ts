// src/infrastructure/api/induct3dApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// API base configurada para usar baseUrl desde .env
export const induct3dApi = createApi({
    reducerPath: 'induct3dApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token')
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ["Tours"], // Puedes agregar luego: ['User', 'Tour', etc.]
    endpoints: () => ({}) // Se inyectan después
})
