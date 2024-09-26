export interface IResponse {
    status: string
    message: string
}

export interface IAuthResponse {
    status: string;
    message: string;
    token: string;
    role: string;
}