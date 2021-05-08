import {AppDispatch} from "../index";
import {IApiRequest} from "../../api/types";
import {PayloadAction} from "@reduxjs/toolkit";

const URA = process.env.API_URL;

// @ts-ignore
const middleware = ({ dispatch }: { dispatch: AppDispatch }) => (next: any) => (action: PayloadAction<IApiRequest>) => {
    const { rest, method, data } = action.payload;
    const { token } = data;
    
    if(!rest) {
        next(action);
        return;
    }
    
    let url = URA + rest;
    next({
        ...action,
        type: action.type + '_REQUEST',
    });
    
    fetch(
        url,
        {
            method,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: method === 'GET' ? undefined : JSON.stringify(data),
        }
    )
        .then(async response => {
            const data = await response.json();
            console.log('MIDDLEWARE', 'data', data);
            switch (response.status) {
                case 200:
                    next({
                        type: action.type + '_SUCCESS',
                        payload: data.response
                    });
                    break;
                default:
                    next({
                        type: action.type + '_FAIL',
                        payload: data.error
                    });
            }
        })
        .catch(error => {
            console.log('MIDDLEWARE', 'error', error);
            next({
                type: action.type + '_FAIL',
                payload: {message: error.toString()}
            });
        });
    
    return;
}

export default middleware;