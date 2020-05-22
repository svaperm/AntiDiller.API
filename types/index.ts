export interface User {
    email: string;
    rating: number;
    reports: Report[];
}

export interface Report {
    description: string;
    reportPhoto: ReportPhoto;
    status: string;
    latitude: number;
    longitude: number;
}

export interface ReportPhoto {
    photo: string; // base64
}