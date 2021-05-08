import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import apiMiddleware from './middlewares/api.middleware';

// @ts-ignore
const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => [...getDefaultMiddleware(), apiMiddleware],
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;


/**
 * @usage use it when you use useDispatch like that:
 * const dispatch: AppDispatch = useDispatch()
 */
// @ts-ignore
export type AppDispatch = typeof store.dispatch;