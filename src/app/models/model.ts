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

export interface DecodedToken {
    id: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
}
