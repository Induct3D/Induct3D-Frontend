import { induct3dApi } from "./induct3dApi"

export interface Profile {
    username: string
    email: string
    name: string
    surname: string
    role: "ADMIN" | "CREATOR" | "USER" | string
}

export interface UpdateProfileDTO {
    name: string
    surname: string
}

export const profileApi = induct3dApi.injectEndpoints({
    endpoints: (build) => ({
        getProfile: build.query<Profile, void>({
            query: () => ({ url: "/api/user/profile", method: "GET" }),
            providesTags: ["Profile"],
        }),
        updateProfile: build.mutation<Profile, UpdateProfileDTO>({
            query: (body) => ({ url: "/api/user/profile", method: "PUT", body }),
            invalidatesTags: ["Profile"],
        }),
        deleteProfile: build.mutation<{ message?: string }, void>({
            query: () => ({ url: "/api/user/profile", method: "DELETE" }),
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useDeleteProfileMutation,
} = profileApi
