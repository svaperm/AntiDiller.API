export interface User {
    email: string;
    rating: number;
    reports: Report[];
}

export interface Report {
    id: number;
    description: string;
    reportPhoto: string;
    status: string;
    latitude: number;
    longitude: number;
    reportStatus: ReportStatus;
}

export interface ReportPhoto {
    photo: string; // base64
}

export interface ReportStatus {
    id: number;
    name: string;
}