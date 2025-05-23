import { useState } from "react";
import { useDispatch } from "react-redux";
import {setVoiceText} from "../../../infrastructure/slices/selectedTemplateSlice.ts";

export default function CharacterEditor() {
    const [text, setText] = useState("");
    const dispatch = useDispatch();

    const speak = (message: string) => {
        if (!message.trim()) return;
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = "es-PE";
        utterance.rate = 1;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
    };

    const handleBlur = () => {
        dispatch(setVoiceText(text));
    };

    return (
        <details open className="mb-4">
            <summary className="font-semibold text-gray-800 cursor-pointer mb-2">
                Narración del personaje guía
            </summary>

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={handleBlur}
                placeholder="Escribe aquí lo que dirá el personaje..."
                className="w-full border rounded p-2 resize-none h-28 text-sm"
            />

            <button
                onClick={() => speak(text)}
                className="mt-2 bg-[#A71C20] text-white px-4 py-2 rounded hover:opacity-90 transition"
            >
                Previsualizar voz
            </button>
        </details>
    );
}
