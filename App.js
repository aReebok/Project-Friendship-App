import React, { Component } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './lib/Home';
import LoginScreen from './lib/LoginScreen';

// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};


export default class NavExample extends Component {
    render() {
        return (
            <NavigationContainer theme={navTheme}>
              <Stack.Navigator initialRouteName="LoginScreen">
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="LoginScreen" component={LoginScreen}/>
              </Stack.Navigator>
            </NavigationContainer>
        );
    }
}