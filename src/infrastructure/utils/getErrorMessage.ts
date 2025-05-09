import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import type { SerializedError } from "@reduxjs/toolkit"

export function getErrorMessage(error: unknown): string {
    if (typeof error === "object" && error !== null) {
        // RTK Query: FetchBaseQueryError
        if ("status" in error && "data" in error) {
            const fetchError = error as FetchBaseQueryError
            const data = fetchError.data as { message?: string }
            return data?.message ?? "Error desconocido del servidor"
        }

        // RTK Query: SerializedError (fallback)
        if ("message" in error) {
            const serialized = error as SerializedError
            return serialized.message ?? "Error serializado"
        }
    }

    return "Ocurrió un error inesperado"
}
