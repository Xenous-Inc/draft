const ActionTypes = {
    auth: {
        signIn: 'ACTION_AUTH_SIGN_IN',
        signUp: 'ACTION_AUTH_SIGN_UP',
        logOut: 'ACTION_AUTH_LOG_OUT',
    }
}

const Postfixes = {
    request: '_REQUEST',
    success: '_SUCCESS',
    fail: '_FAIL',
}

export const AuthActionTypes = {
    signIn: {
        raw: ActionTypes.auth.signIn,
        request: ActionTypes.auth.signIn + Postfixes.request,
        success: ActionTypes.auth.signIn + Postfixes.success,
        fail: ActionTypes.auth.signIn + Postfixes.fail,
    },
    logOut: {
        raw: ActionTypes.auth.logOut,
        request: ActionTypes.auth.logOut + Postfixes.request,
        success: ActionTypes.auth.logOut + Postfixes.success,
        fail: ActionTypes.auth.logOut + Postfixes.fail,
    },
};