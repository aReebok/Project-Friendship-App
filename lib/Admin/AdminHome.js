import React, { useState, useEffect, Component } from 'react';
import {Alert, TouchableOpacity, Button, ScrollView, Text, View, StyleSheet, Touchable } from 'react-native';

import RegistrationRequestCard from './Registration/RegistrationRequestCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from '@rneui/themed'


const {url, formContentType, logo} = require('../../config/app.config.js');

const  RegistrationRequest = (props) => {  

    const [requestItems, setRequestItems] = useState([]);
    const handlePressRequests = (op, method = '', params = {}) => {
        if (method != '')
            params.method = method;
        fetch(url + '/'+op, params)
            .then((response) => response.json()) // response.json()
            .then((responseText) => { setRequestItems(responseText);})
            .catch((error) => { console.error(error);});}
    
    useEffect(() => {
        handlePressRequests('register','GET');
    }, []);

    
    _retrieveSessionID = async () => {
        try {
          return await AsyncStorage.getItem('SID');
        } catch (error) {
          // Error retrieving data
          console.log("There was an error in retriving given sid from AsyncStorage");
          return;
        }
      };

    const removeItemValue = async (key) => {
        try {
            await AsyncStorage.removeItem('SID');
            console.log("Session closed for sid: " + key);
            await APICalls.deleteSessionID(sid, mail);
            return 200;
        }
        catch(exception) {
            return false;
        }
      }  

    const onPressLogOut = async () => {
        console.log("wanting ot log out")
        Alert.alert("Sign Out of Project Friendship?", "You wont recieve any notifications",
        [{ 
            text: 'Log Out',
            onPress: async () => {
            const sid = await _retrieveSessionID();
            const code = await removeItemValue(sid);  
            if (code === 404) {
                return Alert.alert("Trouble Logging Out...")
            } 
            return props.navigation.navigate('LoginScreen');
            },
            style: 'confirm'
        },{ 
            text: 'Cancel',
            onPress: async () => {
                console.log('Logout cancled.')
            },
            style: 'cancel'
        }
    
        ]
        // ,

        // [{
        //   text: 'Log Out',
        //   onPress: async () => { 
        //     // console.log( `Account user with sid ${sid} logging out` );  
        //     // const code = await removeItemValue(sid);  
        //     // if (code === 404) {
        //     //   return Alert.alert("Trouble Logging Out...")
        //     // } 
        //     // return props.navigation.navigate('LoginScreen');
        //   },
        //   style: 'confirm',
        // },{
        //   text: 'Cancle',
        //   onPress: () => { console.log( 'Logout cancled' ); },
        //   style: 'cancel',
        // }]
        )
      }
    
    return( 
        <View style={styles.container}>
            <Text style={{fontSize: 20, paddingBottom: 10}}>ADMIN HOME PAGE</Text>  
            <View style={{flexDirection: 'row', paddingTop: 40}}>
                <TouchableOpacity onPress={()=>props.navigation.navigate('RegistrationRequests')}>
                    <Icon name='people' size={60} color={logo.blue}/>
                    <Text>REGISTER</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingLeft: 30}} onPress={()=>props.navigation.navigate('Directory')}>
                    <Icon name='book' size={60} color={logo.blue}/>
                    <Text>DIRECTORY</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingLeft: 30}} onPress={() => onPressLogOut()}>
                    <Icon name='logout' size={60} color={logo.red}/>
                    <Text>LOG OUT</Text>
                </TouchableOpacity>
            </View>
            <View style= {{height: 30}}></View>
        </View> );
}

export default RegistrationRequest;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: 50,
    //   justifyContent: 'center',
    },
  });