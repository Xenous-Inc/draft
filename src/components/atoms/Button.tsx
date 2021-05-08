import React, { useMemo } from 'react';
import {
    Animated,
    GestureResponderEvent,
    Image,
    ImageSourcePropType,
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    ViewStyle,
} from 'react-native';
import colors from '../../styles/colors';
import durations from '../../styles/durations';
import sizes from '../../styles/sizes';
import { darkenColor, setAlpha } from '../../utils/colors';
import { useAnimated } from '../../utils/hooks/animations';
import Space from "./Space";

type TMode = 'contained' | 'outlined';

export interface IButton {
    mode: TMode;
    title?: string;
    icon?: ImageSourcePropType;
    iconSize?: number;
    color?: string;
    borderColor?: string;
    backgroundColor?: string;
    disabled?: boolean;
    textStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    onPress?(event: GestureResponderEvent): void;
    onLongPress?(event: GestureResponderEvent): void;
}

const Button: React.FC<IButton> = props => {
    const {
        mode,
        title,
        icon,
        iconSize,
        color = mode === 'contained' ? colors.TEXT_LIGHT : colors.TEXT_PRIMARY,
        backgroundColor = mode === 'contained' ? colors.GREEN : colors.GREEN,
        disabled,
        onPress,
        onLongPress } = props;
    
    const borderColor = (mode !== 'contained' && props.borderColor) || color;
    const textStyle = StyleSheet.flatten<TextStyle>(props.textStyle);
    const containerStyle = StyleSheet.flatten<ViewStyle>(props.containerStyle);
    
    const activeBackgroundColor = useMemo<string>(() => setAlpha(darkenColor(backgroundColor), mode === 'contained' ? 1 : 0.16), [backgroundColor]);
    const animatedBackgroundColor = useAnimated<string>(
        mode === 'contained' ? backgroundColor : colors.TRANSPARENT,
        activeBackgroundColor
    );
    
    return (
        <Animated.View
            style={[
                styles.wrapper,
                containerStyle,
                styles.wrapper_property_padding,
                {
                    backgroundColor: animatedBackgroundColor.current,
                    borderColor,
                },
                mode === 'contained' && styles.wrapper_mode_contained,
                disabled && styles.wrapper_state_disabled,
            ]}
        >
            <Pressable
                style={[
                    styles.wrapper__content,
                    !!containerStyle?.width && { width: '100%' },
                    !!containerStyle?.height && { height: '100%' },
                ]}
                onPress={onPress ?? onPress}
                onLongPress={onLongPress ?? onLongPress}
                onPressIn={() => animatedBackgroundColor.animateToEnd(durations.VERY_SHORT)}
                onPressOut={() => animatedBackgroundColor.animateToStart(durations.VERY_SHORT)}
                disabled={disabled}
            >
                <Text style={[styles.content__text, textStyle, { color }]}>{title}</Text>
                {!!title && icon && <Space mode={'vertical'} size={8} />}
                {icon &&
                <Image
                    source={icon}
                    style={[
                        styles.content__icon,
                        !!iconSize && { width: iconSize }
                    ]}
                />
                }
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 20,
        borderWidth: 2,
    },
    wrapper_property_padding: {
        padding: 0,
        paddingStart: 0,
        paddingLeft: 0,
        paddingTop: 0,
        paddingEnd: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    wrapper_mode_contained: {
        borderWidth: undefined
    },
    wrapper_state_disabled: {
        opacity: 0.56,
    },
    wrapper__content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 24,
        paddingTop: 16,
        paddingRight: 24,
        paddingBottom: 16,
    },
    content__text: {
        fontSize: sizes.TEXT_MEDIUM,
        textAlign: 'center',
    },
    content__icon: {
        width: 24,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
});

export default Button;