import {createApiAction, createRequestedActionsContainer} from "../../tools";
import {ISignInApiPayload, ISignInApiResponse} from "../../../api/types/auth.types";
import {AuthActionTypes} from "../../types";
import {AuthRests} from "../../../api/rests";

export const SignInAction = createApiAction<ISignInApiPayload>(AuthActionTypes.signIn.raw);

export const SignIn = (raw: ISignInApiPayload) => {
    return SignInAction({
        rest: AuthRests.signIn,
        method: 'POST',
        data: raw,
    });
}

export const SignInRequestActions = createRequestedActionsContainer<ISignInApiResponse>(
    AuthActionTypes.signIn.request,
    AuthActionTypes.signIn.success,
    AuthActionTypes.signIn.fail
);