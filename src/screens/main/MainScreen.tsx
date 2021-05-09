import React, {useCallback, useRef, useMemo, useState, useEffect} from 'react';
import {StyleSheet, View, Text, Pressable, Image} from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import MapboxGL from "@react-native-mapbox-gl/maps";
import Button from "../../components/atoms/Button";
import Space from "../../components/atoms/Space";
import {useGetTests} from "./MainScreen.hooks";

MapboxGL.setAccessToken(process.env.MAPBOX_PUBLIC_TOKEN);

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

const MainScreen = () => {
    const [isTesting, setIsTesting] = useState(false);
    const bottomSheetRef = useRef<BottomSheet>(null);
    
    const { isLoading, tests, error, get, getAll } = useGetTests();

    const snapPoints = [68, '90%'];

    const handleSnapPress = (index: number) => {
        bottomSheetRef.current?.snapTo(index);
    };
    const handleClosePress = () => {
        bottomSheetRef.current?.close();
    };
    
    useEffect(() => {
        getAll();
    }, []);
    
    useEffect(() => {
        if(!isLoading && !!tests) {
            console.log('GET ALL TESTS', tests);
        }
    }, [tests, isLoading])

    const renderItem = useCallback(
        ({ item }) => (
            <View style={styles.itemContainer}>
                <Image style={styles.image} source={require('../../images/london.png')}/>
                <Text style={styles.itemTextName}>{item.name}</Text>
                <Text style={styles.itemText}>{item.title}</Text>
            </View>
        ),
        []
    );
    
    return (
        <View style={styles.content}>
            <MapboxGL.MapView
                styleURL={isTesting ? 'mapbox://styles/xenous-developer/cko066lkz0sy118nsx0d2vl5a' : 'mapbox://styles/xenous-developer/ckoe4kqk43o5717qpr6tdu4u3'}
                style={styles.content__map}
            />
    
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapPoints}
            >
                {/*<View style={{flexDirection: 'row', justifyContent: 'space-evenly', borderRadius: 35, marginBottom: 10}}>
                    <Pressable style={styles.pressable} onPress={() => {handleClosePress()}}>
                        <Text style={styles.text}>
                            Начать
                        </Text>
                    </Pressable>
                    <Pressable style={styles.pressable} onPress={() => {handleSnapPress(1)}}>
                        <Text style={styles.text}>
                            Вступить
                        </Text>
                    </Pressable>
                    <Button mode={'contained'} title={'Начать'} containerStyle={styles.sheet__button} />
                    <Button mode={'contained'} title={'Встпуить'} containerStyle={styles.sheet__button} />
                </View>*/}
                <Button onPress={() => setIsTesting(!isTesting)} mode={'contained'} title={'Начать случайный тест'} containerStyle={styles.sheet__button} />
                <Space mode={'horizontal'} size={16} />
                {/*<Button mode={'contained'} title={'Присоединиться'} containerStyle={styles.sheet__button} />*/}
                <BottomSheetFlatList
                    data={DATA}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.content__sheet}
                />
            </BottomSheet>
        </View>
        /*<Pressable style={styles.container}>
            <View style={styles.questionView}>
                <Text style={[styles.questionText, {color: '#1D2027'}]}>
                    Укажите расположение
                </Text>
                <Text style={[styles.questionText]}>
                    Норвегия
                </Text>
            </View>
            <View style={styles.scoreView}>
                <Text style={styles.scoreText}>
                    7/10
                </Text>
            </View>
            <Pressable style={styles.buttonDone} onPress={() => { handleSnapPress(0) }}>
                <Image source={require('../../images/done.png')} style={styles.imageDone}/>
            </Pressable>
            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
            >
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', borderRadius: 35, marginBottom: 10}}>
                    <Pressable style={styles.pressable} onPress={() => {handleClosePress()}}>
                        <Text style={styles.text}>
                            Начать
                        </Text>
                    </Pressable>
                    <Pressable style={styles.pressable} onPress={() => {handleSnapPress(1)}}>
                        <Text style={styles.text}>
                            Вступить
                        </Text>
                    </Pressable>
                </View>
                <BottomSheetFlatList
                    data={DATA}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.contentContainer}
                />
            </BottomSheet>
        </Pressable>*/
    );
};

const styles = StyleSheet.create({
    content: {
        width: '100%',
        height: '100%',
    },
    content__map: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    content__sheet: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 48,
        marginTop: 10,
    },
    sheet__button: {
        width: '88%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    image: {
        width: 350,
        height: 190,
        borderRadius: 25
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

export default MainScreen;
