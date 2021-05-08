type Method = 'POST' | 'GET';

export interface IApiRequest<D = any> {
    rest: string;
    method: Method;
    data: D;
}

export interface IApiResponse<RD> {
    success: boolean;
    response: RD | null;
    error: IApiError | null;
}

export interface IApiError {
    statusCode: number;
    message: string | null;
}
