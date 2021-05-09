import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import colors from "../styles/colors";
import sizes from "../styles/sizes";
import {getToken} from "../utils/storage";

const LoadingScreen = ({ navigation }) => {
    const isFocused = useIsFocused();
    
    useEffect(() => {
        if(isFocused) {
            getToken().then(token => {
                if(token) navigation.navigate('MainScreen', { token });
                else navigation.navigate('SignInPhoneScreen');
            });
        }
    }, [isFocused]);
    
    return (
        <View style={styles.content}>
            <Text style={styles.content__title}>Загрузка...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.BACKGROUND_PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content__title: {
        fontSize: sizes.TEXT_LARGE,
        fontWeight: 'bold',
        color: colors.GREEN,
    },
})

export default LoadingScreen;
