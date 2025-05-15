import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedTemplateState {
    id: string | null;
    glbUrl: string | null;
}

const initialState: SelectedTemplateState = {
    id: null,
    glbUrl: null,
};

const selectedTemplateSlice = createSlice({
    name: "selectedTemplate",
    initialState,
    reducers: {
        setSelectedTemplate(state, action: PayloadAction<{ id: string; glbUrl: string }>) {
            state.id = action.payload.id;
            state.glbUrl = action.payload.glbUrl;
        },
        clearSelectedTemplate(state) {
            state.id = null;
            state.glbUrl = null;
        },
    },
});

export const { setSelectedTemplate, clearSelectedTemplate } = selectedTemplateSlice.actions;
export default selectedTemplateSlice.reducer;