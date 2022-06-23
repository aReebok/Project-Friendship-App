import React, { Component, useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button } from 'react-native';
import { Icon } from 'react-native-elements'

function EventCard (props) {
    const logo_colors = {
        logo_red: '#E6000C',
        logo_blue: '#00ABEB',
        logo_yellow: '#FF8D10' }

    const url='http://192.168.1.214:3001';  
    const formContentType = "application/x-www-form-urlencoded;charset=UTF-8";
    
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
        await handlePress('users/add', 'POST', { // adds into votes. 
            headers: {"Content-type": formContentType}, 
            body: `email=${email}&fname=${fname}&lname=${lname}&role=${role}&phone=${phone}`});
        await handlePress('register/request', 'DELETE', { // adds into votes. 
            headers: {"Content-type": formContentType}, 
            body: `email=${email}`});
        setHide(true);
    }

    return(
        <View style={styles.notifContainer}>
            <View style={styles.notifCard_event}>
                <View style={{flex: 2.5, flexDirection:'row', }}>
                    <View style={{justifyContent: 'center', alignContent: 'center'}}>
                        <Icon name='event' size={45} opacity='0.8'/>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={styles.title}>Clay Pottery at St. Olaf College</Text>
                        <Text style={styles.subtitle}>Requested by Sarah's Mom. </Text>
                        <Text style={styles.subtitle}>Suggested date: 5/27/2022 at 3:00 PM </Text>
                    </View>
                </View>
                
                <View style={{justifyContent: 'end'}}>
                    <View style={{paddingRight: 3}}> 
                        <Text>6hr ago</Text>
                    </View>
                    <View style={{paddingTop: 10, flexDirection:'row', justifyContent: 'space-around'}}>
                        <Icon name='done' color='green' size={25}/>
                        <Icon name='edit' color={logo_colors.logo_red} size={25}/>
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
    event_container:{
        flex:1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        // alignContent: 'stretch',
        justifyContent: 'space-around',
        marginBottom: 100
    },
});



{/*  */}

