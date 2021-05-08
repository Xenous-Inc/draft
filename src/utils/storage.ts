import AsyncStorage from '@react-native-async-storage/async-storage';
import storageKeys from "../constants/storageKeys";

export const saveToken = async (token: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(storageKeys.token, token);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
};

export const removeToken = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(storageKeys.token);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getToken = async (): Promise<string | undefined | null> => {
    try {
        const token = await AsyncStorage.getItem(storageKeys.token);
        return Promise.resolve(token);
    } catch (error) {
        return Promise.reject(error);
    }
};