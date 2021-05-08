import { useRef, useState } from 'react';
import { Animated } from 'react-native';

export interface IUseAnimatedHookData<T> {
    current: Animated.AnimatedInterpolation;
    animateToStart: (duration: number) => void;
    animateToEnd: (duration: number) => void;
    setStartValue: (value: T) => void;
    setEndValue: (value: T) => void;
}

export const useAnimated = <T = string | number>(start: T, end: T): IUseAnimatedHookData<T> => {
    const isAnimatedToEnd = useRef(new Animated.Value(0)).current;
    const [startValue, setStartValue] = useState<T>(start);
    const [endValue, setEndValue] = useState<T>(end);
    
    return {
        current: isAnimatedToEnd.interpolate({
            inputRange: [0, 1],
            // @ts-ignore
            outputRange: [startValue, endValue],
        }),
        animateToStart: (duration: number) => {
            Animated.timing(isAnimatedToEnd, {
                useNativeDriver: false,
                duration,
                toValue: 0,
            }).start();
        },
        animateToEnd: (duration: number) => {
            Animated.timing(isAnimatedToEnd, {
                useNativeDriver: false,
                duration,
                toValue: 1,
            }).start();
        },
        setStartValue,
        setEndValue,
    };
};