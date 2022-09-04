import React, { useState, useEffect, Component } from 'react';
import { Button, ScrollView, Text, View, StyleSheet } from 'react-native';
import DirectoryCard from './DirectoryCard';
const CONFIG = require('../../../config/app.config.js');

const Directory = (props) => {  
    const [directoryItems, setDirectoryItems] = useState([]);
    const handlePressDirectory = (op, method = '', params = {}) => {
        if (method != '')
            params.method = method;
        fetch(CONFIG.url + '/'+op, params)
            .then((response) => response.json()) // response.json()
            .then((responseText) => { 
                setDirectoryItems(responseText);
            })
            .catch((error) => { console.error(error);});}
    
    useEffect(() => {
        handlePressDirectory('users','GET');
    }, []);



    return( 
        <View style={styles.container}>
            <Text style={{fontSize: 20}}>USER DIRECTORY</Text>  
            <ScrollView style={{width: '100%'}}>
                { directoryItems.map((item, index) => {
                    if (item.email === 'null') return;
                    return <DirectoryCard key={index} user={item}/> }) } 
            </ScrollView>
            <Button title='Return to Home' onPress={()=>props.navigation.navigate('AdminHome')}/>

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