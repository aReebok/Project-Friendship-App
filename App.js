import React, { Component } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './lib/LoginScreen';
import Profile from './lib/Users/Profile/Profile';
import RegisterScreen from './lib/RegisterScreen';
import Event from './lib/Users/Event/Event';
import RegistrationRequests from './lib/Admin/Registration/RegistrationRequest';
import AdminHome from './lib/Admin/AdminHome';
import Directory from './lib/Admin/Directory/Directory';
import Home from './lib/Users/Home/Home';
import AlertForm from './lib/Users/MentorOnly/Alert/AlertForm'
import MessageWall from './lib/Users/MentorOnly/MessageWall/MessageWall';

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
                <Stack.Screen name="MessageWall" component={MessageWall}/>
                <Stack.Screen name="AlertForm" component={AlertForm}/>
                <Stack.Screen name="Home" component={Home} options={{headerLeft: (props) => null }}  />
                <Stack.Screen name="Profile" component={Profile}/>
                <Stack.Screen name="Event" component={Event}/>
                <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
                <Stack.Screen name="AdminHome" component={AdminHome} options={{headerLeft: (props) => null , title:"Home"}}/>
                <Stack.Screen name="RegistrationRequests" component={RegistrationRequests}/>
                <Stack.Screen name="Directory" component={Directory}/>
              </Stack.Navigator>
            </NavigationContainer>
        );
    }
}