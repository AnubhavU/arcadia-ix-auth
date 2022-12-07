
export type ErrorMessageType = 'success' | 'error' | 'warning' | 'info';

export interface ErrorStateMessageParam {
    title: any;
    message: any;
    type: ErrorMessageType;
}

export interface CloseErrorMessage {
    state: boolean;
}

