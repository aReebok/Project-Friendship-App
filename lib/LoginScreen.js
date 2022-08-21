import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Image, TextInput, Button, StyleSheet, Text, View } from 'react-native';
import * as Google from "expo-google-app-auth";
import { SocialIcon } from 'react-native-elements'

import 'react-native-get-random-values';
import { NIL as NIL_UUID } from 'uuid';
import logo from './src/pf_logo.jpg'

import Profile from './Profile'
import RegistrationRequests from "./Admin/RegistrationRequests";
import RegisterScreen from "./RegisterScreen";
import Home from "./Home";

const CONFIG = require('../config/app.config.js');
const handlePress = require('./GlobalFunctions/HandlePress') 

const { v4: uuidv4 } = require('uuid');

export default function LoginScreen(props) {
    const formContentType = CONFIG.formContentType;

    const [username, setUsername] = useState(""); 
    const [sessionID, setSessionID] = useState(NIL_UUID);
    const [requestItems, setRequestItems] = useState([]);

    const navigateHome = () => { 
      console.log("Sign in successfull: navigating to new page...")
      return props.navigation.navigate('Home', { sid: sessionID }); }

    const navigateRegister = () => { return props.navigation.navigate('RegisterScreen'); }
    
    
    const getRequests = async () => {
        setRequestItems([{}]);
        var ret = await handlePress('register', 'GET', { // adds into votes. 
            headers: {"Content-type": formContentType} });
        return await ret;
    }
    
    const navigateAdmin = async () => { 
      var output = await getRequests('register','GET');
      var users = [];
      await output.forEach(async(request) => {
        users.push(request);
      })
      setRequestItems(users);
    }

    const handleLogin = async (email) => {
      setSessionID(uuidv4());
      if (email.includes("@")) {
        //check if it's in database
        var user = await handlePress('users', 'PUT', {  
            headers: {"Content-type": formContentType}, body: `email=${email}&`});
        // console.log("user: line 51: "  + user  + " || user.emaiL: " + user.email);
        if (user.email) {
          // add to session table 
          await handlePress('sessions', 'DELETE', {  
            headers: {"Content-type": formContentType}, body: `sid=${sessionID}&email=${email}`});
          await handlePress('sessions', 'POST', {  
            headers: {"Content-type": formContentType}, body: `sid=${sessionID}&email=${email}`});  
            return 200;
        } else {
          alert("User does not exist in the database.");
          return 404;
        }
      } else {
        return 404;
      }
      // navigate to home.js
    }

    /*
    * This function allows for google oauth and checks if user is 
    * in the database -- if not return error, if is navigate to Home.js
    */
    const signInAsync = async () => {
      console.log("LoginScreen.js 6 | loggin in");
      try {
        const { type, user } = await Google.logInAsync({
	        iosClientId: `83414050974-8ekpa872o804mkbrbdpi0bo8nle9ckav.apps.googleusercontent.com`,
          androidClientId: `537101146129-776h84lg07qtg1v1hdaiupkk8e43ru2s.apps.googleusercontent.com`,
          androidStandaloneAppClientId: `83414050974-hla7fl5u5pn210ahhiv6i08avb512e1e.apps.googleusercontent.com`
        });
        console.log(user);
        if (type === "success") {
          console.log("User.email is : " + user.email);
          var ret = await handleLogin(user.email);
          if (ret === 200) {
            const { role } = await handlePress('users', 'PUT', {  
                        headers: {"Content-type": formContentType}, 
                        body: `email=${user.email}`});
            // Then you can use the Google REST API
            console.log("LoginScreen.js 17 | success, navigating to profile");
            if (role === 'admin') {
              await navigateAdmin();
              console.log("Admin login successful: navigating...")
              return props.navigation.navigate('RegistrationRequests', {users: requestItems});
            } else {
              return navigateHome();
            }

            // check if admin, else navigate to home...
          } else {
            console.log("Unsuccessful Login...");
            return 404;
          }
        }
      } catch (error) {
        console.log("LoginScreen.js 19 | error with login", error);
      }
    };

    return (
        <View style={styles.container}>
          <Image source={logo} style={{ width: 200, height: 160, marginBottom: 75}} />
          <Text></Text> 
            <View style={styles.buttons}>
              <SocialIcon button iconSize={25} iconType="font-awesome"
                onPress={() => {console.log("onPress() google");
                  signInAsync()}}
                style={{ paddingHorizontal: 15}}
                title="Sign In With Google" type="google"/>

              <SocialIcon button iconSize={25}
                iconType="font-awesome"
                style={{ paddingHorizontal: 15}}
                title="Sign In With Facebook" type="facebook"/>
          </View>
            <Button title="Register with Gmail" onPress={navigateRegister} />
            {/* <Button title="Admin Login" onPress={navigateAdmin}/> */}
        <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 100,
  },
});
