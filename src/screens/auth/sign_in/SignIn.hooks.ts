import {useEffect, useState} from "react";
import {IAuthState} from "../../../store/reducers/auth.reducer";
import {AppDispatch, RootState} from "../../../store";
import {useDispatch, useSelector} from "react-redux";
import {SignIn, SignInAction} from "../../../store/actions/auth/actions";

interface IUseSignIn extends IAuthState {
    signIn: (phone: string, code: string | undefined) => void;
}

export const useSignIn = (): IUseSignIn => {
    const dispatch: AppDispatch = useDispatch();
    
    const { isLoading, token, verificationRequired, error } = useSelector<RootState, IAuthState>(store => store.auth);
    const signIn = (phone: string, code: string | undefined) => dispatch(SignIn({ phone, code }));
    
    return {isLoading, token, verificationRequired, error, signIn };
}

export const useCredentials = () => {
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    
    return { phone, setPhone, code, setCode };
}