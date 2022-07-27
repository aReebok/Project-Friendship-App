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

const { v4: uuidv4 } = require('uuid');

const logo_colors = {
  logo_red: 'E6000C',
  logo_blue: '00ABEB',
  logo_yellow: 'FF8D10' 
}

export default function LoginScreen(props) {
    const url= CONFIG.url;  
    const formContentType = CONFIG.formContentType;

    const [username, setUsername] = useState(""); 
    const [sessionID, setSessionID] = useState(NIL_UUID);

    const [requestItems, setRequestItems] = useState([]);

    /* 
    * This function handles api request to the RESTful api we create
    * in express: See BarcodeServer app.js file
    */
    const handlePress = async (op, method = '', params = {}) => {
      if (method != '')
          params.method = method;
      console.log('handlePress '+method+' '+ url+'/'+op);
      var ret_val = await fetch(url + '/'+op, params)
          .then((response) => response.text())
          .then((responseText) => {
            // if (typeof responseText === 'object')
            // console.log(responseText);
            try {
              return JSON.parse(responseText);
            } catch (error) {
              return responseText;
            }
          })
          .catch((error) => {
              console.error(error); 
          });
      return ret_val;
    }

    const navigateHome = () => { return props.navigation.navigate('Home', { sid: sessionID }); }
    const navigateRegister = () => { return props.navigation.navigate('RegisterScreen'); }
    
    
    const getRequests = async () => {
        setRequestItems([{}]);
        var ret = await handlePress('register', 'GET', { // adds into votes. 
            headers: {"Content-type": formContentType} });
        return await ret;
    }
    
    const navigateAdmin = async () => { 
      var output = await getRequests('register','GET')
      // console.log(requestItems);
      var users = [];
      await output.forEach(async(request) => {
        users.push(request);
      })
      setRequestItems(users);
      return props.navigation.navigate('RegistrationRequests', {users: requestItems});
    }

    const handleLogin = async (email) => {
      setSessionID(uuidv4());
      if (email.includes("@")) {
        //check if it's in database
        var user = await handlePress('users', 'PUT', { // adds into votes. 
            headers: {"Content-type": formContentType}, body: `email=${email}&`});
        console.log("user: line 51: "  + user  + " || user.emaiL: " + user.email);
        if (user.email) {
          // add to session table 
          await handlePress('sessions', 'DELETE', { // adds into votes. 
            headers: {"Content-type": formContentType}, body: `sid=${sessionID}&email=${email}`});
          await handlePress('sessions', 'POST', { // adds into votes. 
            headers: {"Content-type": formContentType}, body: `sid=${sessionID}&email=${email}`});  
            return 200;
        } else {
          alert("User does not exist in the database.");
          return 404;
        }
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
          androidClientId: `537101146129-776h84lg07qtg1v1hdaiupkk8e43ru2s.apps.googleusercontent.com`
	      });
        console.log(user);
        if (type === "success") {
          console.log("User.email is : " + user.email);
          var ret = await handleLogin(user.email);
          if (ret === 200) {
            // Then you can use the Google REST API
            console.log("LoginScreen.js 17 | success, navigating to profile");
            navigateHome();
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
          {/* <Text style={{fontWeight: "bold", fontSize: 20, paddingBottom: 20}}>PROJECT FRIENDSHIP APP DEMO</Text> */}
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
            {/* <Button title="Sign in with Google" onPress={signInAsync}/> */}
            <Button title="Register with Gmail" onPress={navigateRegister} />
            <Button title="Admin Login" onPress={navigateAdmin}/>
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
    // justifyContent: 'center',
  },
});
