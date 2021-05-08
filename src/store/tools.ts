import { ActionCreatorWithPayload, createAction, PayloadActionCreator } from "@reduxjs/toolkit";
import {IApiError, IApiRequest} from "../api/types";

export const createApiAction = <P = any, T extends string = string>(type: T): ActionCreatorWithPayload<IApiRequest<P>> => {
    return createAction<IApiRequest<P>>(type);
};

type RequestedActionsContainer<RD=any> = {
    request: PayloadActionCreator,
    success: PayloadActionCreator<RD>,
    fail: PayloadActionCreator<IApiError>,
}

export const createRequestedActionsContainer = <RD={}>(
    request: string,
    success: string,
    fail: string
): RequestedActionsContainer<RD> => {
    return {
        request : createAction(request),
        success : createAction<RD>(success),
        fail : createAction<RD>(fail)
    } as RequestedActionsContainer<RD>;
};