import React, { useState, useEffect, Component } from 'react';
import { Button, ScrollView, Text, View, StyleSheet } from 'react-native';

import DirectoryCard from './DirectoryCard';
// import RegistrationRequest from './RegistrationRequests';

const CONFIG = require('../../config/app.config.js');
const handlePress = require('../GlobalFunctions/HandlePress') 

const Directory = (props) => {  

    const formContentType = CONFIG.formContentType;
    const [directoryItems, setDirectoryItems] = useState([]);


    const handlePressDirectory = (op, method = '', params = {}) => {
        if (method != '')
            params.method = method;
        fetch(CONFIG.url + '/'+op, params)
            .then((response) => response.json()) // response.json()
            .then((responseText) => { 
                console.log(responseText);
                setDirectoryItems(responseText);
            })
            .catch((error) => { console.error(error);});}
    
    useEffect(() => {
        handlePressDirectory('users','GET');
    }, []);

    const deleteALL = async () => {
        //
        //
        const ret = await handlePress('child', 'DELETE', {
            headers: {"Content-type": formContentType}, body: `cid=${10000011}`});

    }

    const showAllChildren = async () => {
        const children = await handlePress('child', 'GET', {
            headers: {"Content-type": formContentType}});
        
        console.log(children);
    }
    const showAllRElationship = async () => {
        const children = await handlePress('relationship', 'GET', {
            headers: {"Content-type": formContentType}});
        
        console.log(children);
    }
    

    return( 
        <View style={styles.container}>
            <Text style={{fontSize: 20}}>USER DIRECTORY</Text>  
            <ScrollView style={{width: '100%'}}>
                { directoryItems.map((item, index) => {
                    return <DirectoryCard key={index} user={item}/> }) } 
            </ScrollView>
            <Button title='Registration Requests' onPress={()=>props.navigation.navigate('RegistrationRequests')}/>
            <Button title="Delete all children"
                onPress={()=>{deleteALL();}}/>
            <Button title='Show all children' onPress={()=>{showAllChildren()}}/>
            <Button title='Show all relationsips' onPress={()=>{showAllRElationship()}}/>
            <View style= {{height: 30}}></View>
        </View> );
}

export default Directory;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: 50,
    },
});