import React, { useState, useEffect, Component } from 'react';
import { Button, ScrollView, Text, View, StyleSheet } from 'react-native';

import RegistrationRequestCard from './RegistrationRequestCard';
import Directory from './Directory';

const {url, formContentType} = require('../../config/app.config.js');

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
    
    return( 
        <View style={styles.container}>
            <Text style={{fontSize: 20, paddingBottom: 10}}>REGISTRATION REQUESTS</Text>  
            {!requestItems.length && <><Text>No registration requests pending.</Text></>||  <ScrollView style={{width: '100%'}}>
                { requestItems.map((item, index) => {
                    return <RegistrationRequestCard key={index} user={item}/> })} 
            </ScrollView> }
            <Button title='Open Directory' onPress={()=>props.navigation.navigate('Directory')}/>
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