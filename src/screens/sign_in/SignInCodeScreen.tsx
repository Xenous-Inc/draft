import React, {useEffect} from 'react';
import {View, Text, Pressable, TextInput, StyleSheet} from 'react-native';
import {useCredentials, useSignIn} from "./SignIn.hooks";
import Space from "../../components/atoms/Space";
import colors from "../../styles/colors";
import {setAlpha} from "../../utils/colors";
import Button from "../../components/atoms/Button";
import sizes from "../../styles/sizes";
import CodeNumberInput from "../../components/moolecules/CodeNumberInput";
import {saveToken} from "../../utils/storage";

const SignInCodeScreen = ({route, navigation}) => {
    const { phone, setPhone, code, setCode } = useCredentials();
    const { isLoading, token, error, signIn } = useSignIn();
    
    useEffect(() => {
        setPhone(route.params.phone);
    }, [route]);
    
    useEffect(() => {
        if(token && !error) {
            saveToken(token).then(() => {
                navigation.navigate('LoadingScreen');
            })
        }
    }, [token]);
    
    return (
        <View style={styles.content}>
            <Text style={styles.content__title}>Ещё немного...</Text>
            <Space mode={'horizontal'} size={12} />
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.content__text}>Введите  </Text>
                <Text style={[styles.content__text, { color: colors.GREEN, fontWeight: 'bold' }]}>последние цифры</Text>
            </View>
            <Space mode={'horizontal'} size={48} />
            <CodeNumberInput length={4} onChangeValue={setCode} />
            <Space mode={'horizontal'} size={24} />
            <Button mode={'contained'} title={isLoading ? 'Почти готово ...' : 'Продолжить'} onPress={() => signIn(phone, code)} disabled={isLoading} />
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
    content__text: {
        fontSize: sizes.TEXT_MEDIUM,
        color: colors.TEXT_PRIMARY,
    },
    text: {
        fontSize: 18,
        marginVertical: 10
    },
    content__input: {
        backgroundColor: colors.BACKGROUND_ACCENT,
        borderColor: colors.GREEN,
        borderWidth: 1.5,
        color: colors.GREEN,
        width: 248,
        height: 64,
        borderRadius: 24,
        padding: 10,
        fontSize: 20,
    },
})

export default SignInCodeScreen;
