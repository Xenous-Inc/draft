import {ITestsState} from "../../store/reducers/tests.reducer";
import {AppDispatch, RootState} from "../../store";
import {useDispatch, useSelector} from "react-redux";
import {GetTestsAll, GetTestsOne} from "../../store/actions/tests.actions";
import {IMapTitleState} from "../../store/reducers/map.reducer";
import {GetMapTitle} from "../../store/actions/maps.actions";

interface IUseGetTests extends ITestsState {
    get: (testId: string) => void;
    getAll: () => void;
}

export const useGetTests = (): IUseGetTests => {
    const dispatch: AppDispatch = useDispatch();
    
    const { isLoading, tests, error } = useSelector<RootState, ITestsState>(store => store.tests);
    // const signIn = (phone: string, code: string | undefined) => dispatch(SignIn({ phone, code }));
    
    const get = (testId: string) => dispatch(GetTestsOne({ testId }));
    const getAll = (token: string) => dispatch(GetTestsAll({ token }));
    
    return {isLoading, tests, error, get, getAll };
}

interface IUseGetMapTitle extends IMapTitleState {
    getTitle: (coordinates: Array<number>) => void;
}

export const useGetMapTitle = (): IUseGetMapTitle => {
    const dispatch: AppDispatch = useDispatch();
    
    const { isLoading, city, country, error } = useSelector<RootState, IMapTitleState>(store => store.map);
    
    const getTitle = (coordinates: Array<number>) => dispatch(GetMapTitle({ coordinates }));
    
    return {isLoading, city, country, error, getTitle };
}
