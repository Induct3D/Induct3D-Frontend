import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedTemplateState {
    id: string | null;
    glbUrl: string | null;
    voiceText: string;
}

const initialState: SelectedTemplateState = {
    id: null,
    glbUrl: null,
    voiceText: "",
};

const selectedTemplateSlice = createSlice({
    name: "selectedTemplate",
    initialState,
    reducers: {
        setSelectedTemplate(state, action: PayloadAction<{ id: string; glbUrl: string }>) {
            state.id = action.payload.id;
            state.glbUrl = action.payload.glbUrl;
        },
        setVoiceText(state, action: PayloadAction<string>) {
            state.voiceText = action.payload;
        },
        clearSelectedTemplate(state) {
            state.id = null;
            state.glbUrl = null;
            state.voiceText = "";
        },
    },
});

export const { setSelectedTemplate, setVoiceText, clearSelectedTemplate } = selectedTemplateSlice.actions;
export default selectedTemplateSlice.reducer;
