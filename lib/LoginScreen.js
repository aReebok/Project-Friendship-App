import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Image, TextInput, Button, StyleSheet, Text, View } from 'react-native';
import * as Google from "expo-google-app-auth";

import 'react-native-get-random-values';
import { NIL as NIL_UUID } from 'uuid';

import Profile from './Profile'
import AdminPage from "./AdminPage";
import RegisterScreen from "./RegisterScreen";


const { v4: uuidv4 } = require('uuid');

export default function LoginScreen(props) {
    const url='http://192.168.1.214:3001';  
    const formContentType = "application/x-www-form-urlencoded;charset=UTF-8";

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

    const navigateHome = () => { return props.navigation.navigate('Profile', { sid: sessionID }); }
    const navigateRegister = () => { return props.navigation.navigate('RegisterScreen'); }
    
    
    const getRequests = async () => {
        setRequestItems([{}]);
        var ret = await handlePress('register/request', 'GET', { // adds into votes. 
            headers: {"Content-type": formContentType} });
        return await ret;
    }
    
    const navigateAdmin = async () => { 
      var output = await getRequests('register/','GET')
      // console.log(requestItems);
      var users = [];
      await output.forEach(async(request) => {
        users.push(request);
      })
      setRequestItems(users);
      return props.navigation.navigate('AdminPage', {users: requestItems});
    
      // console.log(requestItems)
    }

    const handleLogin = async (email) => {
      await setSessionID(uuidv4());
      if (sessionID === "") await setSessionID(uuidv4());
      if (email.includes("@")) {
        //check if it's in database
        var user = await handlePress('users/get', 'PUT', { // adds into votes. 
            headers: {"Content-type": formContentType}, body: `email=${email}&`});
        console.log("user: line 51: "  + user  + " || user.emaiL: " + user.email);
        if (user.email) {
          // add to session table 
          await handlePress('sessions/delete', 'DELETE', { // adds into votes. 
            headers: {"Content-type": formContentType}, body: `sid=${sessionID}&email=${email}`});
          await handlePress('sessions/add', 'POST', { // adds into votes. 
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
          <Text style={{fontWeight: "bold", fontSize: 20, paddingBottom: 20}}>PROJECT FRIENSHIP APP</Text>
            <Button title="Sign in with Google" onPress={signInAsync}/>
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
