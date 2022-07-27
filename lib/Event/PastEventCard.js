import React, { Component, useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button } from 'react-native';
import { Icon } from 'react-native-elements'

const CONFIG = require('../../config/app.config.js');

function EventCard (props) {
    const url=CONFIG.url;  
    const formContentType = CONFIG.formContentType;
    
    const handlePress = async (op, method = '', params = {}) => {
        if (method != '')
            params.method = method;
        console.log('handlePress '+method+' '+ url+'/'+op);
        var ret_val = await fetch(url + '/'+op, params)
            .then((response) => response.text())
            .then((responseText) => {
              try { return JSON.parse(responseText);} 
              catch (error) { return responseText; }})
            .catch((error) => { console.error(error); });
        return ret_val; }

    const [hide, setHide] = useState(false);

    const addToProfiles = async () => {
        await handlePress('users', 'POST', { // adds into votes. 
            headers: {"Content-type": formContentType}, 
            body: `email=${email}&fname=${fname}&lname=${lname}&role=${role}&phone=${phone}`});
        await handlePress('register', 'DELETE', { // adds into votes. 
            headers: {"Content-type": formContentType}, 
            body: `email=${email}`});
        setHide(true);
    }

    return(
        <View style={[styles.notifContainer, {backgroundColor: 'grey'}]}>
                <View style={styles.notifCard_event}>
                    <View style={{flex: 2.5, flexDirection:'row', }}>
                        <View style={{flex:1}}>
                            <Text style={styles.title}>Chess Tournament</Text>
                            <Text style={styles.subtitle}>With Sarah for 2 hrs. </Text>
                        </View>
                    </View>
                    
                    <View style={{justifyContent: 'end'}}>
                        <View style={{paddingRight: 3}}> 
                            <Text>6d ago</Text>
                        </View>
                    </View>
                </View>
            </View>
    );
}

export default EventCard;

const styles = StyleSheet.create({
    
    notifContainer: {
        // paddingTop:5,
        borderRadius: 5,
        backgroundColor: '#E6000C'
    },

    notifCard_event: {
        flex: 1,
        flexDirection: 'row',
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: '#f3f3f3', 
        padding: 5,
        marginLeft: 6,
        justifyContent:'space-between',
    },
    title: {
        paddingLeft:5,
        fontWeight: 'bold',
        fontSize: 16,
    },
    subtitle: {
        paddingLeft:5,
        fontSize: 13,

    }, 
});
