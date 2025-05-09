import { configureStore } from '@reduxjs/toolkit'
import { induct3dApi } from '../api/induct3dApi'

export const store = configureStore({
    reducer: {
        [induct3dApi.reducerPath]: induct3dApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(induct3dApi.middleware)
})

// Tipos para TS
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
