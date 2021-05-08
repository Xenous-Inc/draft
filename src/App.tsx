import React from 'react';
import NumberScreen from "./auth/NumberScreen";
import {createStackNavigator} from "@react-navigation/stack";
import NameScreen from "./auth/NameScreen";
import CodeScreen from "./auth/CodeScreen";
import Main from "./main/Main";
import {NavigationContainer} from "@react-navigation/native";

const Stack = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="NumberScreen" component={NumberScreen} />
          <Stack.Screen name="NameScreen" component={NameScreen} />
          <Stack.Screen name="CodeScreen" component={CodeScreen} />
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};
export default App;

/*
<Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
        <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
        <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} />
        <Button title="Close" onPress={() => handleClosePress()} />
 */
