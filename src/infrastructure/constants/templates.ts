export interface Template {
    id: string;
    name: string;
    description: string;
    images: string[];
}

export const mockTemplates: Template[] = [
    {
        id: "template-1",
        name: "Oficina Moderna",
        description: "Ambiente 3D con escritorios, sillas y paredes blancas.",
        images: [
            "/img/OfficeTemplate/DetailOfficeTemplate.png",
            "/img/OfficeTemplate/LateralOfficeTemplate.png",
            "/img/OfficeTemplate/TopOfficeTemplate.png",
        ],
    },
    {
        id: "template-2",
        name: "Laboratorio Escolar",
        description: "Diseño de aula con mesas de ciencia y estanterías.",
        images: [
            "/previews/lab/top.png",
            "/previews/lab/front.png",
        ],
    },
];
