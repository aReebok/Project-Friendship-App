import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import {ScrollView, Button, Text, View, StyleSheet } from 'react-native';
import RegistrationRequestCard from './RegistrationRequestCard';
const { url } = require('../../../config/app.config.js');

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
            
            {!requestItems.length && <ScrollView style={{width: '100%', paddingHorizontal: 20}}><Text>No registration requests pending.</Text></ScrollView>||  
                <ScrollView style={{width: '100%'}}>
                { requestItems.map((item, index) => {
                    return <RegistrationRequestCard key={index} user={item}/> })} 
            </ScrollView> }
            <Button title='Return to Home' onPress={()=>props.navigation.navigate('AdminHome')}/>
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
    },
});