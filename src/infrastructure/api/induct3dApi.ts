// src/infrastructure/api/induct3dApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import type { QueryReturnValue } from '@reduxjs/toolkit/query'

// ---- Helpers token ----
const getToken = () => localStorage.getItem('token')
const setToken = (t?: string | null) => {
    if (!t) localStorage.removeItem('token')
    else localStorage.setItem('token', t)
}

const rawBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include', // útil si usas refresh por cookie httpOnly
    prepareHeaders: (headers) => {
        const token = getToken()
        if (token) headers.set('Authorization', `Bearer ${token}`)
        return headers
    },
})

let isRefreshing = false
let waiters: Array<() => void> = []

const baseQueryWithReauth: typeof rawBaseQuery = async (args, api, extra) => {
    let result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta> =
        await rawBaseQuery(args, api, extra)

    if (result.error && result.error.status === 401) {
        if (!isRefreshing) {
            isRefreshing = true
            try {
                const refreshRes = await rawBaseQuery(
                    { url: '/auth/refresh', method: 'POST' },
                    api,
                    extra
                )

                const data: any = refreshRes.data
                if (data?.token) {
                    setToken(data.token)
                    // Despertar a los que esperaban
                    waiters.forEach((cb) => cb())
                    waiters = []
                    // Reintento original
                    result = await rawBaseQuery(args, api, extra)
                } else {
                    throw new Error('No se recibió nuevo token')
                }
            } catch {
                // Limpieza mínima; el guard redirige a login
                setToken(null)
            } finally {
                isRefreshing = false
            }
        } else {
            // Espera a que termine el refresh en curso
            result = await new Promise<
                QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
            >((resolve) => {
                waiters.push(async () => {
                    const r = await rawBaseQuery(args, api, extra)
                    resolve(r)
                })
            })
        }
    }

    return result
}

export const induct3dApi = createApi({
    reducerPath: 'induct3dApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Tours', 'Profile'],
    endpoints: () => ({}),
})
