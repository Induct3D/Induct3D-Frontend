export interface TemplateResponse {
    id: string;
    name: string;
    description: string;
    images: string[];
    glbUrl: string;
    userId: {
        timestamp: number;
        date: string;
    };
}