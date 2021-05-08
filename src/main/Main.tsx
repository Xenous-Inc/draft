import React, {useCallback, useRef, useMemo, useState} from 'react';
import {StyleSheet, Text, Button, Pressable, Image, TextInput} from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { View, useAnimationState, } from 'moti'

const Main = () => {
    // hooks
    const sheetRef = useRef<BottomSheet>(null);

    // variables
    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            name: 'Лондон (Великобритания)',
            imageSource: 'london',
            title: 'В прошлом Лондон носил названия Лондиниум, Августа, Лунденвик и Лунденбурх',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            name: 'Нью-Йорк (США)',
            imageSource: 'new_york',
            title: 'Интересен факт, что местный аэропорт Кеннеди считается наибольшим на земле. Нью-Йорк носит название танцевальной столицы мира.',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e292d72',
            name: 'Люксембург',
            imageSource: 'new_york',
            title: 'Территория Люксембурга неоднократно становилась ареной борьбы между сильными европейскими государствами',
        },
    ];

    const snapPoints = useMemo(() => [90, '90%'], []);

    const handleSnapPress = useCallback(index => {
        sheetRef.current?.snapTo(index);
    }, []);
    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
    }, []);

    // render
    const renderItem = useCallback(
        ({ item }) => (
            <View style={styles.itemContainer}>
                <Image style={styles.image} source={require('../images/london.png')}/>
                <Text style={styles.itemTextName}>{item.name}</Text>
                <Text style={styles.itemText}>{item.title}</Text>
            </View>
        ),
        []
    );

    const animationView = useAnimationState({
        from: {
            opacity: 1
        },
        to: {
            opacity: 0
        },
    })
    const animationViewInput = useAnimationState({
        from: {
            scale: 1
        },
        to: {
            scale: 0
        },
    })
    const animationViewMain = useAnimationState({
        from: {
            scale: 0
        },
        to: {
            scale: 1
        },
    })

    const [height, setHeight] = useState(0);
    const [heightMain, setHeightMain] = useState(70);

    return (
        <Pressable style={styles.container}>
            <View style={styles.questionView} state={animationView}>
                <Text style={[styles.questionText, {color: '#1D2027'}]}>
                    Укажите расположение
                </Text>
                <Text style={[styles.questionText]}>
                    Норвегия
                </Text>
            </View>
            <View style={styles.scoreView} state={animationView}>
                <Text style={styles.scoreText}>
                    7/10
                </Text>
            </View>
            <View style={styles.buttonDone} onTouchEnd={() => {console.log('123'); handleSnapPress(0); animationView.transitionTo('to')}} state={animationView}>
                <Image source={require('../images/done.png')} style={styles.imageDone}/>
            </View>
            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
            >
                <View style={{flexDirection: 'row', height: heightMain, justifyContent: 'space-evenly', borderRadius: 35, marginBottom: 10}} state={animationViewMain}>
                    <Pressable style={styles.pressable} onPress={() => {handleClosePress(); animationView.transitionTo('from')}}>
                        <Text style={styles.text}>
                            Начать
                        </Text>
                    </Pressable>
                    <Pressable style={styles.pressable} onPress={() => {animationViewInput.transitionTo('from'); setHeight(70); setHeightMain(0); animationViewMain.transitionTo('from')}}>
                        <Text style={styles.text}>
                            Вступить
                        </Text>
                    </Pressable>
                </View>
                <View style={{height: height,  width: '100%', flexDirection: 'row', justifyContent: 'space-around'}} state={animationViewInput}>
                    <View style={{height: height, width: '80%', alignItems: 'center'}} state={animationViewInput}>
                        <TextInput style={{height: height, width: '95%', borderRadius: 25, backgroundColor: '#2ED184', fontSize: 20, paddingLeft: 20, color: '#ffffff'}} placeholder={'Код'}/>
                    </View>
                    <View style={{height: height, width: '20%', alignItems: 'center', borderRadius: 25, backgroundColor: '#2ED184', justifyContent: 'center', marginRight: 10}} state={animationViewInput}
                          onTouchEnd={() => {setHeightMain(70); setHeight(0); animationViewInput.transitionTo('to'); animationViewMain.transitionTo('to')}}
                    >
                        <Image source={require('../images/done.png')} style={styles.imageDone}/>
                    </View>
                </View>
                <BottomSheetFlatList
                    data={DATA}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.contentContainer}
                />
            </BottomSheet>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d03f3f',
    },
    image: {
        width: 350,
        height: 190,
        borderRadius: 25
    },
    contentContainer: {
        alignItems: 'center',
        borderRadius: 35,
        marginTop: 10,
    },
    itemContainer: {
        width: 370,
        height: 'auto',
        backgroundColor: '#fff8f8',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        marginVertical: 10,
    },
    pressable: {
        width: '45%',
        height: 70,
        borderRadius: 25,
        backgroundColor: '#2ED184',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        color: '#ffffff',
    },
    itemText: {
        width: 330,
        fontSize: 15,
        color: '#4E4E4E',
        marginVertical: 5,
    },
    itemTextName: {
        width: 330,
        fontSize: 20,
        color: '#1D2027',
        marginVertical: 5
    },
    buttonDone: {
        height: 75,
        width: 75,
        borderRadius: 25,
        backgroundColor: '#2ED184',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "flex-end",
        marginTop: 650,
        marginRight: 20,
    },
    imageDone: {
        height: 40,
        width: 40,
    },
    questionView: {
        width: '90%',
        marginTop: 40,
        height: 'auto',
        padding: 12,
        borderRadius: 25,
        backgroundColor: '#ffffff',
        alignSelf: 'center',
    },
    scoreView: {
        width: '15%',
        marginTop: 10,
        marginRight: 20,
        height: 'auto',
        padding: 12,
        borderRadius: 25,
        backgroundColor: '#ffffff',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionText: {
        fontSize: 18,
        color: '#2ED184'
    },
    scoreText: {
        fontSize: 15,
        color: '#1D2027'
    }
});

export default Main;

