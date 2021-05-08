export interface ISignInApiPayload {
    phone: string;
    code: string | undefined;
}

export interface ISignInApiResponse {
    token: string | null;
    response_code: number;
}
