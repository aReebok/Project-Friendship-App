import React, { Component } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './lib/LoginScreen';
import Profile from './lib/Profile';
import RegisterScreen from './lib/RegisterScreen';
import AdminPage from './lib/AdminPage';

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
                <Stack.Screen name="LoginScreen" component={LoginScreen}/>
                <Stack.Screen name="Profile" component={Profile}/>
                <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
                <Stack.Screen name="AdminPage" component={AdminPage}/>
              </Stack.Navigator>
            </NavigationContainer>
        );
    }
}