// src/presentation/components/RichTextEditor.tsx
import { useEffect } from "react";
import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Youtube from "@tiptap/extension-youtube";
import type { Level } from "@tiptap/extension-heading";

const MENU_BUTTON_CLASS = "px-2 py-1 rounded hover:bg-gray-200 text-sm";

interface RichTextEditorProps {
    initialJSON?: JSONContent;
    onUpdateContent: (json: JSONContent) => void;
}

export default function RichTextEditor({
                                           initialJSON,
                                           onUpdateContent,
                                       }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
            }),
            Underline,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Link.configure({ openOnClick: false }),
            Image.configure({
                inline: false,
                allowBase64: true,
            }),
            Youtube.configure({
                HTMLAttributes: {
                    width: 560,
                    height: 315,
                    allowfullscreen: "true",
                },
            }),
        ],
        content: initialJSON || "",
        editorProps: {
            attributes: {
                class:
                    "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none",
            },
        },
        onUpdate({ editor }) {
            const json = editor.getJSON();
            onUpdateContent(json);
        },
    });

    useEffect(() => {
        if (editor && initialJSON) {
            editor.commands.setContent(initialJSON);
        }
    }, [editor, initialJSON]);

    if (!editor) {
        return null;
    }

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-2 py-1 flex flex-wrap gap-1">
                {/* Negrita */}
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`${MENU_BUTTON_CLASS} ${
                        editor.isActive("bold") ? "bg-gray-300" : ""
                    }`}
                    title="Negrita"
                >
                    <strong>B</strong>
                </button>
                {/* Cursiva */}
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`${MENU_BUTTON_CLASS} ${
                        editor.isActive("italic") ? "bg-gray-300" : ""
                    }`}
                    title="Cursiva"
                >
                    <em>I</em>
                </button>
                {/* Subrayado */}
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`${MENU_BUTTON_CLASS} ${
                        editor.isActive("underline") ? "bg-gray-300" : ""
                    }`}
                    title="Subrayado"
                >
                    <u>U</u>
                </button>
                {/* Tachado */}
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`${MENU_BUTTON_CLASS} ${
                        editor.isActive("strike") ? "bg-gray-300" : ""
                    }`}
                    title="Tachado"
                >
                    <s>S</s>
                </button>
                {/* Encabezados */}
                <select
                    value={
                        editor.isActive("heading", { level: 1 })
                            ? "h1"
                            : editor.isActive("heading", { level: 2 })
                                ? "h2"
                                : editor.isActive("heading", { level: 3 })
                                    ? "h3"
                                    : "paragraph"
                    }
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === "paragraph") {
                            editor.chain().focus().setParagraph().run();
                        } else {
                            const level = parseInt(value.replace("h", "")) as Level;
                            editor.chain().focus().toggleHeading({ level }).run();
                        }
                    }}
                    className="border px-1 py-1 rounded text-sm"
                    title="Encabezado"
                >
                    <option value="paragraph">Texto normal</option>
                    <option value="h1">Título 1</option>
                    <option value="h2">Título 2</option>
                    <option value="h3">Título 3</option>
                </select>
                {/* Lista con viñetas */}
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`${MENU_BUTTON_CLASS} ${
                        editor.isActive("bulletList") ? "bg-gray-300" : ""
                    }`}
                    title="Lista con viñetas"
                >
                    • List
                </button>
                {/* Lista numerada */}
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`${MENU_BUTTON_CLASS} ${
                        editor.isActive("orderedList") ? "bg-gray-300" : ""
                    }`}
                    title="Lista numerada"
                >
                    1. List
                </button>
                {/* Alinear izquierda */}
                <button
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    className={`${MENU_BUTTON_CLASS} ${
                        editor.isActive({ textAlign: "left" }) ? "bg-gray-300" : ""
                    }`}
                    title="Alinear izquierda"
                >
                    ←
                </button>
                {/* Centrar */}
                <button
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    className={`${MENU_BUTTON_CLASS} ${
                        editor.isActive({ textAlign: "center" }) ? "bg-gray-300" : ""
                    }`}
                    title="Centrar"
                >
                    ↔
                </button>
                {/* Alinear derecha */}
                <button
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    className={`${MENU_BUTTON_CLASS} ${
                        editor.isActive({ textAlign: "right" }) ? "bg-gray-300" : ""
                    }`}
                    title="Alinear derecha"
                >
                    →
                </button>
                {/* Insertar enlace */}
                <button
                    onClick={() => {
                        const url = prompt("Introduce la URL:");
                        if (url) {
                            editor
                                .chain()
                                .focus()
                                .extendMarkRange("link")
                                .setLink({ href: url })
                                .run();
                        }
                    }}
                    className={`${MENU_BUTTON_CLASS} ${
                        editor.isActive("link") ? "bg-gray-300" : ""
                    }`}
                    title="Insertar enlace"
                >
                    🔗
                </button>
                {/* Insertar imagen */}
                <button
                    onClick={() => {
                        const url = prompt("URL de la imagen:");
                        if (url) {
                            editor.chain().focus().setImage({ src: url }).run();
                        }
                    }}
                    className={`${MENU_BUTTON_CLASS} ${
                        editor.isActive("image") ? "bg-gray-300" : ""
                    }`}
                    title="Insertar imagen"
                >
                    🖼
                </button>
                {/* Insertar YouTube */}
                <button
                    onClick={() => {
                        const url = prompt(
                            "Introduce la URL de YouTube (p. ej. https://youtu.be/abc123):"
                        );
                        if (url) {
                            // Insertamos directamente el nodo YouTube
                            editor
                                .chain()
                                .focus()
                                .insertContent({ type: "youtube", attrs: { src: url } })
                                .run();
                        }
                    }}
                    className={`${MENU_BUTTON_CLASS} ${
                        editor.isActive("youtube") ? "bg-gray-300" : ""
                    }`}
                    title="Insertar YouTube"
                >
                    📺
                </button>
                {/* Bloque de código */}
                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={`${MENU_BUTTON_CLASS} ${
                        editor.isActive("codeBlock") ? "bg-gray-300" : ""
                    }`}
                    title="Bloque de código"
                >
                    {"</>"}
                </button>
                {/* Cita */}
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`${MENU_BUTTON_CLASS} ${
                        editor.isActive("blockquote") ? "bg-gray-300" : ""
                    }`}
                    title="Cita"
                >
                    ❝ ❞
                </button>
            </div>

            <EditorContent editor={editor} className="min-h-[200px] p-2" />
        </div>
    );
}
