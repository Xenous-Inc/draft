import { createReducer } from '@reduxjs/toolkit';
import { IApiError } from '../../api/types';
import {SignInRequestActions} from "../actions/auth.actions";

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
            state.verificationRequired = action.payload === 'Locked';
        }));
});

export default authReducer;