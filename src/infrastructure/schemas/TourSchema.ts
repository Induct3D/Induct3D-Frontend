export interface Tour {
    tourId: string;
    templateId: {
        timestamp: number;
        date: string;
    };
    userId: {
        timestamp: number;
        date: string;
    };
    tourName: string | null;
    description: string;
    voiceText: string;
    materialColors: Record<string, string>;
}
