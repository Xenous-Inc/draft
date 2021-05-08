import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from "../styles/colors";
import sizes from "../styles/sizes";
import {getToken} from "../utils/storage";

const LoadingScreen = ({navigation}) => {
    
    useEffect(() => {
        getToken().then(token => {
            navigation.navigate(token ? 'MainScreen' : 'SignInPhoneScreen');
        })
    })
    
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
