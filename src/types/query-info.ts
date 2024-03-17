export interface ErrorInfo {
    message: string;
    tryAgain: () => void;
}

export enum QueryStatus {
    PENDING,
    FINISHED,
}
