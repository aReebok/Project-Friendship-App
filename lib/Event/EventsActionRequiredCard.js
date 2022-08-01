import React, { Component, useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button } from 'react-native';
import { Icon } from 'react-native-elements'

const CONFIG = require('../../config/app.config.js');
const handlePress = require('../GlobalFunctions/HandlePress') 

function EventCard (props) {
    const logo = {
        red: '#E6000C',
        blue: '#00ABEB',
        yellow: '#FF8D10' }

    const formContentType = CONFIG.formContentType;
    

    const [creator, setCreator] = useState(null); 
    const [confirmText, setConfirmText] = useState('Event request pending');
    const [confirmed, setConfirmed] = useState(false);

    useEffect( async ()=> {
        // var { fname, lname } = await handlePress('users', 'PUT', {
        //     headers: {"Content-type": formContentType}, body: `email=${props.author}`});
        // setCreator(`${fname} ${lname}`);

        // if (props.stat === 'approved') { 
        //     setConfirmText('Approved');
        //     setConfirmed(true);
        // } else {
        //     setConfirmText('Pending approval')
        // }
    }, []);

    const { email, event, bannerStyle } = props;
    const eventDate = new Date(event.eventdate);
    const optionsTime = { hour: 'numeric', minute: 'numeric' };
    const optionsDate = { weekday: 'short', month: 'long', day: 'numeric' };

    const confirm = async() => {
        // send request to db -- pending to approved event. 
        console.log("event confirm")
        // query update events SET (stat) = ('approved') WHERE eid = 11;   
        await handlePress('events', 'DELETE', { // adds into votes. 
            headers: {"Content-type": formContentType},
            body: `eid=${eid}`});

        await handlePress('events', 'POST', { // adds into votes. 
            headers: {"Content-type": formContentType},
            body: `author=${author}&cid=${cid}&stat=${'approved'}&title=${title}&descrip=${desc}&eventDate=${eventDate}&eventCreated=${eventCreated}&eventLocation=${eventLocation}`}); 
        setConfirmText('Approved');
        setConfirmed(true);
    }
    
    return(
        <View style={[styles.notifContainer, {backgroundColor: `${bannerStyle.color}`}]}>
            <View style={styles.notifCard_event}>
                <View style={{flex: 2.5, flexDirection:'row', }}>
                    <View style={{paddingTop:5, alignItems: 'center'}}>
                        <Icon name='event' size={45} opacity='0.8'/>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={styles.title}>{bannerStyle.title}</Text>
                        <Text style={styles.subtitle}>For {event.title} by Sams's parent (). </Text>
                        <Text style={styles.subtitle}>Suggested: <Text style={{fontWeight: '500'}}>{eventDate.toLocaleDateString('en-US', optionsDate)} at {eventDate.toLocaleTimeString('en-US', optionsTime)}</Text> </Text>
                    </View>
                </View>
                
                <View style={{flex: 0.5, paddingRight: 3, alignItems: 'flex-end', justifyContent: 'space-between',}}>
                    <View style={{paddingRight: 3,}}> 
                        <Text>12hr ago</Text>
                    </View>
                    <View style={{paddingTop: 10, flexDirection:'row', justifyContent: 'space-around'}}>
                        {bannerStyle.checkButton && <Icon name='done' color='green' size={25}/>}
                        <Icon name='edit' color={logo.red} size={25}/>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default EventCard;

const styles = StyleSheet.create({
    
    eventcontainer: {
        backgroundColor: 'lightpink',
        padding: 10,
        marginRight: 30,
        width: '100%',
        borderRadius: 5,
        paddingBottom: -20,
    },

    notifContainer: {
        marginTop:7,
        borderRadius: 6,
        width: '100%',
        backgroundColor: '#E6000C'
    },

    notifCard_event: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        borderBottomRightRadius: 13.75,
        borderTopRightRadius: 13.75,
        backgroundColor: '#f3f3f3', 
        padding: 5,
        marginLeft: 6,
        justifyContent:'space-between',
    },
    title: {
        paddingTop: 0,
        paddingLeft:5,
        fontWeight: 'bold',
        fontSize: 16,
    },
    subtitle: {
        paddingLeft:5,
        fontSize: 13,

    }, 

});



{/*  */}

