import React from 'react';
import SignInPhoneScreen from "./screens/sign_in/SignInPhoneScreen";
import {createStackNavigator} from "@react-navigation/stack";
import NameScreen from "./screens/main/NameScreen";
import SignInCodeScreen from "./screens/sign_in/SignInCodeScreen";
import MainScreen from "./screens/main/MainScreen";
import {NavigationContainer} from "@react-navigation/native";
import {Provider} from "react-redux";
import store from "./store";
import LoadingScreen from "./screens/LoadingScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
      <Provider store={store}>
          <NavigationContainer>
              <Stack.Navigator initialRouteName="LoadingScreen" screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
                  <Stack.Screen name="SignInPhoneScreen" component={SignInPhoneScreen} />
                  <Stack.Screen name="NameScreen" component={NameScreen} />
                  <Stack.Screen name="SignInCodeScreen" component={SignInCodeScreen} />
                  <Stack.Screen name="MainScreen" component={MainScreen} />
              </Stack.Navigator>
          </NavigationContainer>
      </Provider>
  );
};
export default App;
