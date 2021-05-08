import React, {useMemo} from 'react';
import {
    GestureResponderEvent,
    ImageSourcePropType,
    StyleProp,
    ViewStyle,
    Animated,
    StyleSheet,
    Pressable,
    Image,
} from "react-native";
import colors from "../../styles/colors";
import {darkenColor, setAlpha} from "../../utils/colors";
import {useAnimated} from "../../utils/hooks/animations";
import durations from "../../styles/durations";

type TMode = 'contained' | 'blank';

export interface IIconButtonProp {
    mode: TMode;
    icon: ImageSourcePropType;
    iconSize?: number;
    backgroundColor?: string;
    disabled?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    onPress?(event: GestureResponderEvent): void;
    onLongPress?(event: GestureResponderEvent): void;
}

const IconButton: React.FC<IIconButtonProp> = props => {
    const { mode, icon, iconSize, disabled, onPress, onLongPress } = props;
    
    const backgroundColor = props.backgroundColor || (mode === 'contained' ? colors.WHITE : colors.BLUE_SHADOWED);
    const containerStyle = StyleSheet.flatten(props.containerStyle);
    
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
    },
    !!iconSize && { borderRadius: iconSize },
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
    <Image
        source={icon}
    style={[
            styles.content__icon,
    !!iconSize && { height: iconSize }
]}
    />
    </Pressable>
    </Animated.View>
);
};

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 32,
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
    wrapper_state_disabled: {
        opacity: 0.56,
    },
    wrapper__content: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
    },
    wrapper__content_margin: {
        margin: 0,
        marginStart: 0,
        marginLeft: 0,
        marginTop: 0,
        marginEnd: 0,
        marginRight: 0,
        marginBottom: 0,
        marginHorizontal: 0,
        marginVertical: 0,
    },
    content__icon: {
        height: 32,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
});

export default IconButton;