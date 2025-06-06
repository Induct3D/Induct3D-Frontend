// src/presentation/components/EditorAvanzado.tsx
import { useEffect, JSX } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";

interface EditorAvanzadoProps {
    initialHTML?: string;
    onUpdateContent?: (html: string) => void;
}

export default function EditorAvanzado({
                                           initialHTML,
                                           onUpdateContent,
                                       }: EditorAvanzadoProps): JSX.Element {
    const editor = useEditor({
        extensions: [
            // Solo usamos StarterKit, que incluye Document, Paragraph, Text, HardBreak, Dropcursor, etc.
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
                HTMLAttributes: {
                    class: "rounded shadow-md",
                    width: "640",
                    height: "360",
                },
            }),
            // No agregamos HardBreak porque ya viene en StarterKit
        ],
        content:
            initialHTML ||
            `<h2>Bienvenido</h2><p>Este es un <strong>editor avanzado</strong> con TipTap. Inserta imágenes y vídeos de YouTube.</p>`,
        editorProps: {
            attributes: {
                class: "prose prose-sm focus:outline-none px-2 py-2",
            },
            // **Comentamos handleDOMEvents temporalmente** para verificar espacio
            // handleDOMEvents: {
            //   keydown: (view, event) => {
            //     if (event.key === "Enter") {
            //       if (event.shiftKey) {
            //         event.preventDefault();
            //         view.dispatch(
            //           view.state.tr.replaceSelectionWith(
            //             view.state.schema.nodes.hardBreak.create()
            //           )
            //         );
            //         return true;
            //       }
            //       return false;
            //     }
            //     return false;
            //   },
            // },
        },
        onUpdate({ editor }) {
            const html = editor.getHTML();
            if (onUpdateContent) onUpdateContent(html);
        },
    });

    // Forzar el focus al montar para que el editor esté listo para tipear sin clics extra
    useEffect(() => {
        if (editor) {
            editor.commands.focus();
            if (initialHTML) {
                editor.commands.setContent(initialHTML, true);
            }
        }
    }, [editor, initialHTML]);

    if (!editor) {
        return <div className="text-gray-500">Cargando editor…</div>;
    }

    const handleGuardar = () => {
        const html = editor.getHTML();
        console.log("Contenido TipTap como HTML:", html);
        if (onUpdateContent) onUpdateContent(html);
    };

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
            {/* Barra de herramientas (idéntica a la tuya) */}
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
                    onClick={() => {
                        const url = window.prompt("URL de la imagen:");
                        if (url) {
                            editor.chain().focus().setImage({ src: url }).run();
                        }
                    }}
                    className="px-2 py-1 rounded bg-white text-gray-700 hover:bg-gray-200"
                    title="Insertar imagen"
                >
                    🖼 Imagen
                </button>

                <button
                    onClick={() => {
                        const url = window.prompt("URL de YouTube:");
                        if (url) {
                            editor
                                .chain()
                                .focus()
                                .insertContent({
                                    type: "youtube",
                                    attrs: { src: url, width: 640, height: 360 },
                                })
                                .run();
                        }
                    }}
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

            {/* Área de edición */}
            <EditorContent
                editor={editor}
                className="min-h-[250px] p-4 prose prose-sm focus:outline-none"
            />
        </div>
    );
}
