import React from 'react';
import {StyleSheet, View, Text, Pressable, TextInput} from 'react-native';

const NameScreen = ({navigation}) => {
    return (
        <View style={styles.mainView}>
            <Text style={styles.text}>
                Введите свое Имя
            </Text>
            <TextInput style={styles.content__input}/>
            <Pressable style={styles.button}
                       onPress={() => {navigation.navigate('Main')}}
            >
                <Text style={styles.textInsideButton }>
                    Завершить
                </Text>
            </Pressable>
        </View>
    );
};
const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        marginVertical: 10
    },
    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content__input: {
        backgroundColor: '#ffd2d2',
        width: 300,
        height: 80,
        borderRadius: 25,
        padding: 10,
        fontSize: 20,
    },
    button: {
        width: 300,
        height: 80,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2ED184',
        marginTop: 150,
    },
    textInsideButton: {
        fontSize: 20,
        color: '#ffffff',
        marginVertical: 10,
    }
})

export default NameScreen;
