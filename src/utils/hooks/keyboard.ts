import { useEffect } from 'react';
import { Keyboard } from 'react-native';

export const useKeyboardShow = (keyboardShowEffect: () => void) => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', keyboardShowEffect);
    useEffect(() => () => keyboardShowListener.remove(), []);
};

export const useKeyboardHide = (keyboardHideEffect: () => void) => {
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', keyboardHideEffect);
    useEffect(() => () => keyboardHideListener.remove(), []);
};