import { configureStore } from '@reduxjs/toolkit'
import { induct3dApi } from '../api/induct3dApi'
import selectedTemplateReducer from "../slices/selectedTemplateSlice";

export const store = configureStore({
    reducer: {
        [induct3dApi.reducerPath]: induct3dApi.reducer,
        selectedTemplate: selectedTemplateReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(induct3dApi.middleware)
})
