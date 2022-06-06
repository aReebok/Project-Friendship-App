import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Image, TextInput, Button, StyleSheet, Text, View } from 'react-native';
import 'react-native-get-random-values';
import { NIL as NIL_UUID } from 'uuid';
import Home from './Home'

const { v4: uuidv4 } = require('uuid');

export default function LoginScreen(props) {
    const url='http://192.168.1.214:3001';  
    const formContentType = "application/x-www-form-urlencoded;charset=UTF-8";

    const [username, setUsername] = useState(""); 
    const [sessionID, setSessionID] = useState(NIL_UUID);

    const handlePress = (op, method = '', params = {}) => {
      if (method != '')
          params.method = method;
      fetch(url + '/'+op, params)
          .then((response) => response.text())
          .then((responseText) => {
              console.log(`response text: ${responseText}`);
          })
          .catch((error) => {
              console.error(error);
          });
  }

    const handleLogin = async () => {
      await setSessionID(uuidv4());
      await console.log(sessionID);
      if (sessionID === "") {
        await setSessionID(uuidv4());
      }
      await handlePress('sessions/delete', 'DELETE', { // adds into votes. 
          headers: {"Content-type": formContentType}, body: `sid=${sessionID}&email=${username}`});
      await handlePress('sessions/add', 'POST', { // adds into votes. 
        headers: {"Content-type": formContentType}, body: `sid=${sessionID}&email=${username}`});    
      //navigate to home.js
      props.navigation.navigate('Home', { sid: sessionID });
    }

    return (
        <View style={styles.container}>
        <Text>Log in to the QR code matching demo!</Text>
        <TextInput style={{width: '75%', borderWidth:1, padding: 10, margin: 10}} 
            placeholder="Enter username"
            onChangeText={(value) => setUsername(value)}/>
            <Button title="Login" onPress={() => handleLogin()}/>
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
