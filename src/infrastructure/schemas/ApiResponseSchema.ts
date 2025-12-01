// src/infrastructure/schemas/ApiResponseSchema.ts

// Meta de paginación
export interface PaginationMeta {
    hasPrevPage: boolean;
    hasNextPage: boolean;
    totalItems: number;
    limit: number;
    totalPages: number;
    page: number;
}

// Meta general: mensaje/estado + opcionalmente paginación
export interface Meta extends Partial<PaginationMeta> {
    message?: string;
    status?: string;
    [key: string]: unknown;
}

// Wrapper genérico para TODAS las respuestas del backend
export interface ApiResponse<T> {
    data: T;
    meta?: Meta;
}
