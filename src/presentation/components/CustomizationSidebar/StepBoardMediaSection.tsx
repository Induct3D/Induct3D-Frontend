// // src/presentation/components/CustomizationSidebar/StepBoardMediaSection.tsx
// import React from "react";
// import { FaTrash } from "react-icons/fa";
// import { StepMessage } from "./types";
//
// interface Props {
//     step: StepMessage;
//     newBoardUrl: string;
//     setNewBoardUrl: (url: string) => void;
//     fileInputsRef: React.MutableRefObject<Record<string, HTMLInputElement | null>>;
//     onBoardTypeChange: (stepId: string, type: "image" | "video" /*| "richText"*/) => void;
//     onUploadImage: (stepId: string, file: File) => void;
//     onAddBoardUrl: (stepId: string) => void;
//     onDeleteBoardUrl: (stepId: string, index: number) => void;
//     // onUpdateEditorContent?: (stepId: string, json: any) => void; // para richText
// }
//
// export default function StepBoardMediaSection({
//                                                   step,
//                                                   newBoardUrl,
//                                                   setNewBoardUrl,
//                                                   fileInputsRef,
//                                                   onBoardTypeChange,
//                                                   onUploadImage,
//                                                   onAddBoardUrl,
//                                                   onDeleteBoardUrl,
//                                               }: Props) {
//     return (
//         <div className="mt-4 w-full">
//             <label className="block font-medium text-gray-700 mb-1 text-sm">
//                 Tipo de contenido en pizarra
//             </label>
//
//             <select
//                 value={step.boardMedia?.type}
//                 onChange={(e) =>
//                     onBoardTypeChange(
//                         step.stepId,
//                         e.target.value as "image" | "video" /*| "richText"*/
//                     )
//                 }
//                 className="w-full border px-2 py-1 rounded text-sm mb-2"
//             >
//                 <option value="image">Imagen</option>
//                 <option value="video">Video</option>
//                 {/* <option value="richText">Texto enriquecido</option> */}
//             </select>
//
//             {step.boardMedia?.type === "video" ? (
//                 <div className="flex gap-2 mb-2">
//                     <input
//                         type="text"
//                         placeholder="URL del video"
//                         value={newBoardUrl}
//                         onChange={(e) => setNewBoardUrl(e.target.value)}
//                         className="flex-1 border px-2 py-1 rounded text-sm"
//                     />
//                     <button
//                         onClick={() => onAddBoardUrl(step.stepId)}
//                         className="bg-[#A71C20] text-white px-2 py-1 rounded text-xs"
//                     >
//                         Añadir
//                     </button>
//                 </div>
//             ) : step.boardMedia?.type === "image" ? (
//                 <div className="mb-2">
//                     <button
//                         onClick={() => fileInputsRef.current[step.stepId]?.click()}
//                         className="bg-[#A71C20] text-white text-xs px-3 py-1 rounded hover:opacity-90"
//                     >
//                         Subir imagen
//                     </button>
//                     <input
//                         type="file"
//                         accept="image/*"
//                         style={{ display: "none" }}
//                         ref={(el) => {
//                             fileInputsRef.current[step.stepId] = el;
//                         }}
//                         onChange={(e) => {
//                             const file = e.target.files?.[0];
//                             if (file) onUploadImage(step.stepId, file);
//                         }}
//                     />
//                 </div>
//             ) : (
//                 // Aquí podemos montar TipTap u otro editor, ocupando todo el ancho
//                 // y una altura razonable (p. ej. h-40). Por ahora solo placeholder.
//                 <div className="mb-2">
//                     <div className="w-full h-40 border border-gray-300 rounded p-2">
//                         {/* <RichTextEditor
//               initialJSON={step.boardMedia?.content}
//               onUpdate={(json) => onUpdateEditorContent!(step.stepId, json)}
//             /> */}
//                         <p className="text-center text-gray-500 text-xs">
//                             Aquí irá el editor enriquecido (400 × 160px aprox.)
//                         </p>
//                     </div>
//                 </div>
//             )}
//
//             <div className="mt-2 flex gap-2 overflow-x-auto">
//                 {step.boardMedia?.urls.map((url, idx) => (
//                     <div
//                         key={idx}
//                         className="relative w-20 h-20 rounded overflow-hidden border border-gray-300"
//                     >
//                         <img
//                             src={url}
//                             alt={`preview-${idx}`}
//                             className="object-cover w-full h-full"
//                         />
//                         <button
//                             onClick={() => onDeleteBoardUrl(step.stepId, idx)}
//                             className="absolute top-0 right-0 bg-black bg-opacity-60 text-white p-1 text-xs"
//                             title="Eliminar"
//                         >
//                             <FaTrash size={10} />
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
