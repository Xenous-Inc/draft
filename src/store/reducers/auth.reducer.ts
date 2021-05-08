import { createReducer } from '@reduxjs/toolkit';
// import {
//     ILogOutActionFail,
//     ISignInActionFail,
//     ISignInActionSuccess,
//     ISignUpActionFail,
//     ISignUpActionSuccess,
//     LOG_OUT_ACTIONS,
//     SIGN_IN_ACTIONS,
//     SIGN_UP_ACTIONS,
// } from '../actions/auth/types';
import { IApiError } from '../../api/types';
import {SignInRequestActions} from "../actions/auth/actions";

export interface IAuthState {
    isLoading: boolean;
    
    token: string | null;
    
    verificationRequired: boolean | null;
    
    error: IApiError | null;
}

const initialState: IAuthState = {
    isLoading: false,
    token: null,
    verificationRequired: null,
    error: null,
} as IAuthState;

/*const authReducer = createReducer<IAuthState>(initialState, {
    // // * Sign In * //
    // [SIGN_IN_ACTIONS.START]: () => ({
    //     ...initialState,
    //     isLoading: true,
    // }),
    // [SIGN_IN_ACTIONS.SUCCESS]: (state, action: ISignInActionSuccess) => {
    //     state.isLoading = false;
    //     state.token = action.payload.token;
    //     return state;
    // },
    // [SIGN_IN_ACTIONS.FAIL]: (state, action: ISignInActionFail) => {
    //     state.isLoading = false;
    //     state.error = action.payload.error;
    //     return state;
    // },
    // // * Sign Up * //
    // [SIGN_UP_ACTIONS.START]: () => ({
    //     ...initialState,
    //     isLoading: true,
    // }),
    // [SIGN_UP_ACTIONS.SUCCESS]: (state, action: ISignUpActionSuccess) => {
    //     state.isLoading = false;
    //     state.token = action.payload.token;
    //     return state;
    // },
    // [SIGN_UP_ACTIONS.FAIL]: (state, action: ISignUpActionFail) => {
    //     state.isLoading = false;
    //     state.error = action.payload.error;
    //     return state;
    // },
    // // * Log Out * //
    // [LOG_OUT_ACTIONS.START]: () => ({
    //     ...initialState,
    //     isLoading: true,
    // }),
    // [LOG_OUT_ACTIONS.SUCCESS]: state => {
    //     state.isLoading = false;
    //     return state;
    // },
    // [LOG_OUT_ACTIONS.FAIL]: (state, action: ILogOutActionFail) => {
    //     state.isLoading = false;
    //     state.error = action.payload.error;
    //     return state;
    // },
});*/

const authReducer = createReducer(initialState, builder => {
    builder
        .addCase(SignInRequestActions.request, state => {
            state.isLoading = true;
        })
        .addCase(SignInRequestActions.success, (state, action) => {
            state.isLoading = false;
            state.token = action.payload.token;
        })
        .addCase(SignInRequestActions.fail, ((state, action) => {
            state.isLoading = false;
            state.verificationRequired = action.payload.message === 'Locked';
        }));
});

export default authReducer;