// src/presentation/components/EditorAvanzado.tsx
import {useEffect, JSX, useRef, useState} from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import InsertImageModal from "./Modals/InsertImageModal";
import InsertYoutubeModal from "./Modals/InsertYoutubeModal.tsx";
import {useUploadBoardImageMutation} from "../../features/auth/tourApi.ts";

interface EditorAvanzadoProps {
    initialHTML?: string;
    onUpdateContent?: (html: string) => void;
}

export default function EditorAvanzado({
                                           initialHTML,
                                           onUpdateContent,
                                       }: EditorAvanzadoProps): JSX.Element {
    const initialized = useRef(false);
    const [isImageModalOpen, setImageModalOpen] = useState(false);
    const [isYoutubeModalOpen, setYoutubeModalOpen] = useState(false);
    const [uploadImage] = useUploadBoardImageMutation();

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: { keepMarks: true, keepAttributes: false },
                orderedList: { keepMarks: true, keepAttributes: false },
            }),
            Underline,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Link.configure({ openOnClick: false }),
            Image.configure({ inline: false, allowBase64: true }),
            Youtube.configure({
                controls: false,
                nocookie: true,
                width: 420,
                height: 236,
                HTMLAttributes: {
                    class: "rounded shadow-md mx-auto",
                    style: "max-width: 100%; height: auto;",
                },
            }),
        ],
        content:
            initialHTML ||
            `<p>Esta es una <strong>pizarra</strong> para que puedas explicar los conceptos que desees o agregar imágenes y videos.</p>`,
        editorProps: {
            attributes: {
                class: "prose prose-sm focus:outline-none px-2 py-2",
            },
        },
        onUpdate({ editor }) {
            const html = editor.getHTML();
            if (onUpdateContent) onUpdateContent(html);
        },
    });

    useEffect(() => {
        if (editor && initialHTML && !initialized.current) {
            editor.commands.setContent(initialHTML, true);
            initialized.current = true;
        }
    }, [editor, initialHTML]);

    useEffect(() => {
        if (editor) {
            editor.commands.focus();
        }
    }, [editor]);

    if (!editor) {
        return <div className="text-gray-500">Cargando editor…</div>;
    }

    const handleGuardar = () => {
        const html = editor.getHTML();
        console.log("Contenido TipTap como HTML:", html);
        if (onUpdateContent) onUpdateContent(html);
    };

    const handleImageInsert = (url: string) => {
        editor.chain().focus().setImage({ src: url }).run();
    };

    const handleYoutubeInsert = (url: string) => {
        editor.chain().focus().insertContent({
            type: "youtube",
            attrs: { src: url, width: 420, height: 236 },
        }).run();
    };

    const handleUploadImage = async (file: File): Promise<string> => {
        const result = await uploadImage(file).unwrap();
        return result.url;
    };

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-3 py-2 flex flex-wrap gap-2">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={`px-2 py-1 rounded ${
                        editor.isActive("bold")
                            ? "bg-[#A71C20] text-white"
                            : "bg-white text-gray-700 hover:bg-gray-200"
                    }`}
                    title="Negrita"
                >
                    <strong>B</strong>
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={`px-2 py-1 rounded ${
                        editor.isActive("italic")
                            ? "bg-[#A71C20] text-white"
                            : "bg-white text-gray-700 hover:bg-gray-200"
                    }`}
                    title="Cursiva"
                >
                    <em>I</em>
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editor.can().chain().focus().toggleStrike().run()}
                    className={`px-2 py-1 rounded ${
                        editor.isActive("strike")
                            ? "bg-[#A71C20] text-white"
                            : "bg-white text-gray-700 hover:bg-gray-200"
                    }`}
                    title="Tachado"
                >
                    <s>S</s>
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editor.can().chain().focus().toggleCode().run()}
                    className={`px-2 py-1 rounded ${
                        editor.isActive("code")
                            ? "bg-[#A71C20] text-white"
                            : "bg-white text-gray-700 hover:bg-gray-200"
                    }`}
                    title="Código en línea"
                >
                    {"</>"}
                </button>

                <button
                    onClick={() =>
                        editor.chain().focus().unsetAllMarks().clearNodes().run()
                    }
                    className="px-2 py-1 rounded bg-white text-gray-700 hover:bg-gray-200"
                    title="Limpiar formatos"
                >
                    🧹 Limpiar
                </button>

                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={`px-2 py-1 rounded ${
                        editor.isActive("paragraph")
                            ? "bg-[#A71C20] text-white"
                            : "bg-white text-gray-700 hover:bg-gray-200"
                    }`}
                    title="Párrafo"
                >
                    Párrafo
                </button>

                {([1, 2, 3] as const).map((lvl) => (
                    <button
                        key={lvl}
                        onClick={() =>
                            editor.chain().focus().toggleHeading({ level: lvl }).run()
                        }
                        className={`px-2 py-1 rounded ${
                            editor.isActive("heading", { level: lvl })
                                ? "bg-[#A71C20] text-white"
                                : "bg-white text-gray-700 hover:bg-gray-200"
                        }`}
                        title={`Encabezado ${lvl}`}
                    >
                        H{lvl}
                    </button>
                ))}

                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-2 py-1 rounded ${
                        editor.isActive("bulletList")
                            ? "bg-[#A71C20] text-white"
                            : "bg-white text-gray-700 hover:bg-gray-200"
                    }`}
                    title="Lista con viñetas"
                >
                    • Lista
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`px-2 py-1 rounded ${
                        editor.isActive("orderedList")
                            ? "bg-[#A71C20] text-white"
                            : "bg-white text-gray-700 hover:bg-gray-200"
                    }`}
                    title="Lista numerada"
                >
                    1. Lista
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={`px-2 py-1 rounded ${
                        editor.isActive("codeBlock")
                            ? "bg-[#A71C20] text-white"
                            : "bg-white text-gray-700 hover:bg-gray-200"
                    }`}
                    title="Bloque de código"
                >
                    {"{}"}
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`px-2 py-1 rounded ${
                        editor.isActive("blockquote")
                            ? "bg-[#A71C20] text-white"
                            : "bg-white text-gray-700 hover:bg-gray-200"
                    }`}
                    title="Cita"
                >
                    ❝ Cita
                </button>

                <button
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    className="px-2 py-1 rounded bg-white text-gray-700 hover:bg-gray-200"
                    title="Línea horizontal"
                >
                    ― Línea
                </button>

                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                    className="px-2 py-1 rounded bg-white text-gray-700 hover:bg-gray-200 disabled:opacity-50"
                    title="Deshacer"
                >
                    ↺
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                    className="px-2 py-1 rounded bg-white text-gray-700 hover:bg-gray-200 disabled:opacity-50"
                    title="Rehacer"
                >
                    ↻
                </button>

                <button
                    onClick={() => setImageModalOpen(true)}
                    className="px-2 py-1 rounded bg-white text-gray-700 hover:bg-gray-200"
                    title="Insertar imagen"
                >
                    🖼 Imagen
                </button>

                <button
                    onClick={() => setYoutubeModalOpen(true)}
                    className="px-2 py-1 rounded bg-white text-gray-700 hover:bg-gray-200"
                    title="Insertar vídeo de YouTube"
                >
                    📺 YouTube
                </button>

                <button
                    onClick={handleGuardar}
                    className="ml-auto px-3 py-1 rounded bg-[#A71C20] text-white hover:bg-[#93201f]"
                    title="Guardar contenido como HTML"
                >
                    Guardar
                </button>
            </div>

            <EditorContent
                editor={editor}
                className="min-h-[250px] p-4 prose prose-sm focus:outline-none"
            />

            <InsertImageModal
                isOpen={isImageModalOpen}
                onClose={() => setImageModalOpen(false)}
                onInsert={handleImageInsert}
                uploadImage={handleUploadImage}
            />

            <InsertYoutubeModal
                isOpen={isYoutubeModalOpen}
                onClose={() => setYoutubeModalOpen(false)}
                onInsert={handleYoutubeInsert}
            />
        </div>
    );
}
