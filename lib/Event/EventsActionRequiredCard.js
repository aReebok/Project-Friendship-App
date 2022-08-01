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

    const  timeSince = (date) => {
        // code from https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = seconds / 31536000;
    
        if (interval > 1) {
          return Math.floor(interval) + "yr ago";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
          return Math.floor(interval) + "mo ago";
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return Math.floor(interval) + "d ago";
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return Math.floor(interval) + "hr ago";
        }
        interval = seconds / 60;
        if (interval > 1) {
          return Math.floor(interval) + "m ago";
        }

        return Math.floor(seconds) + "s ago";
      }
      

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

    const { email, isEventAuthor, event, bannerStyle } = props;
    const eventDate = new Date(event.eventdate);
    const cDate = new Date(event.eventcreated);
    const createdDate = timeSince(cDate);

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

    const pressConfirm = async () => {
        console.log("Confirm pressed.")
    }
    const pressEdit = async () => {
        console.log("Edit pressed.");
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
                        {/* <Text style={styles.subtitle}>For {event.title} with. </Text> */}
                        <Text style={styles.subtitle}>Description: {event.descrip}.</Text>
                        {!isEventAuthor && <Text style={styles.subtitle}>Created by {bannerStyle.authorStr}. </Text>}
                        <Text style={styles.subtitle}>Suggested: <Text style={{fontWeight: '500'}}>{eventDate.toLocaleDateString('en-US', optionsDate)} at {eventDate.toLocaleTimeString('en-US', optionsTime)}</Text> </Text>
                    </View>
                </View>
                
                <View style={{flex: 0.5, paddingRight: 4, alignItems: 'flex-end', justifyContent: 'space-between',}}>
                    <View style={{paddingRight: 3,}}> 
                        <Text>{createdDate}</Text>
                    </View>
                    <View style={{paddingTop: 10, flexDirection:'row', justifyContent: 'space-around'}}>
                        <TouchableOpacity style={{paddingRight: 5}} onPress={()=>{ pressConfirm() }}>
                            {bannerStyle.checkButton && <Icon name='done' color='green' size={25}/>}
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={()=>{ pressEdit() }}>
                            <Icon name='edit' color={logo.red} size={25}/>
                        </TouchableOpacity>
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

