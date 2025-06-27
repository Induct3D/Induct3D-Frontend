import {
    FaPaintBrush,
    FaRegCommentDots,
    FaPhotoVideo,
    FaWalking,
    FaMousePointer,
    FaMapMarkedAlt,
} from "react-icons/fa";
import { IconType } from "react-icons";

export interface FeatureItem {
    title: string;
    description: string;
    icon: IconType;
}

export const FEATURES: FeatureItem[] = [
    {
        title: "Recorridos 3D personalizables",
        description: "Cambia colores de muros, pisos y objetos para adaptar el ambiente a tus necesidades.",
        icon: FaPaintBrush,
    },
    {
        title: "Narración del personaje guía",
        description: "El personaje guía lee el contenido en voz alta, brindando una experiencia más inmersiva.",
        icon: FaRegCommentDots,
    },
    {
        title: "Contenido multimedia integrado",
        description: "Agrega textos, imágenes y videos fácilmente dentro del recorrido.",
        icon: FaPhotoVideo,
    },
    {
        title: "Vista en primera persona (FPS)",
        description: "Explora los escenarios como si estuvieras dentro de ellos, moviéndote libremente.",
        icon: FaWalking,
    },
    {
        title: "Editor sin código",
        description: "Diseña y personaliza sin conocimientos técnicos gracias a una interfaz visual intuitiva.",
        icon: FaMousePointer,
    },
    {
        title: "Movimiento libre e inmersivo",
        description: "Controla tanto al personaje como a la cámara para una navegación natural y fluida.",
        icon: FaMapMarkedAlt,
    },
];
