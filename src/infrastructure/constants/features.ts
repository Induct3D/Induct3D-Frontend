import {
    FaPaintBrush,
    FaUserTie,
    FaPuzzlePiece,
    FaLock,
    FaCodeBranch,
    FaTabletAlt,
} from "react-icons/fa";
import {IconType} from "react-icons";

export interface FeatureItem {
    title: string;
    description: string;
    icon: IconType;
}

export const FEATURES:FeatureItem[] = [
    {
        title: "Recorridos 3D personalizables",
        description: "Cambia colores, texturas y configura escenarios únicos desde el navegador.",
        icon: FaPaintBrush,
    },
    {
        title: "Personajes guía narrativos",
        description: "Elige un personaje y personaliza lo que dice para guiar al usuario en el recorrido.",
        icon: FaUserTie,
    },
    {
        title: "Minijuegos interactivos",
        description: "Integra trivias, acertijos y otros juegos para hacer la experiencia más atractiva.",
        icon: FaPuzzlePiece,
    },
    {
        title: "Acceso protegido con contraseña",
        description: "Comparte tu recorrido públicamente o restringe el acceso con una clave.",
        icon: FaLock,
    },
    {
        title: "Editor sin código",
        description: "Diseña con total libertad sin necesidad de saber programar.",
        icon: FaCodeBranch,
    },
    {
        title: "Multidispositivo",
        description: "Compatible con navegadores modernos en escritorio, tablet o móvil.",
        icon: FaTabletAlt,
    },
];
