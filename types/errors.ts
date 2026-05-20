export interface NestError {
    message: string | string[];
    error: string;
    statusCode: number;
}