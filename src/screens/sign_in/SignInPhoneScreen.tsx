import React, {useEffect} from 'react';
import {StyleSheet, View, Text,  Pressable, TextInput} from 'react-native';
import CodeNumberInput from "../../components/moolecules/CodeNumberInput";
import sizes from "../../styles/sizes";
import colors from "../../styles/colors";
import Space from "../../components/atoms/Space";
import Button from "../../components/atoms/Button";
import {useCredentials, useSignIn} from "./SignIn.hooks";
import {setAlpha} from "../../utils/colors";

const SignInPhoneScreen = ({ navigation }) => {
    const { phone, setPhone } = useCredentials();
    const { isLoading, token, verificationRequired, error, signIn } = useSignIn();
    
    useEffect(() => {
        if(verificationRequired) navigation.navigate('SignInCodeScreen', { phone: phone || '+79136445550' });
    }, [verificationRequired])
    
    return (
        <View style={styles.content}>
            <Text style={styles.content__title}>Привет!</Text>
            <Space mode={'horizontal'} size={12} />
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.content__text}>Введите свой </Text>
                <Text style={[styles.content__text, { color: colors.GREEN, fontWeight: 'bold' }]}>номер телефона</Text>
            </View>
            <Space mode={'horizontal'} size={64} />
            <TextInput textContentType={'telephoneNumber'} keyboardType={'phone-pad'} placeholder={'+7'} placeholderTextColor={setAlpha(colors.GREEN, 0.4)} onChangeText={setPhone} style={styles.content__input}/>
            <Space mode={'horizontal'} size={24} />
            <Button mode={'contained'} title={isLoading ? 'Секундочку...' : 'Продолжить'} onPress={() => signIn(phone, undefined)} disabled={isLoading} />
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

export default SignInPhoneScreen;
