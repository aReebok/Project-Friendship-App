import React, { Component, useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button } from 'react-native';
import { Icon } from 'react-native-elements'

const CONFIG = require('../../config/app.config.js');
const handlePress = require('../GlobalFunctions/HandlePress') 

function EventCard (props) {
    const logo_colors = {
        logo_red: '#E6000C',
        logo_blue: '#00ABEB',
        logo_yellow: '#FF8D10' }

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

    const {author, cid, desc, title, email, eid, 
        eventCreated, eventDate, eventLocation, stat} = props;
    console.log(props);
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


    console.log(props);

    return(
        // <View style={styles.eventcontainer}>
        //     <Text>Event Title: {title} ({eid})</Text> 
        //     <Text style={styles.subtitle}>Requested by {creator}. </Text>
        //     <Text style={styles.subtitle}>Description: {desc} </Text>
        //     <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        //         <Button title='edit'/>
        //         {(author===email || confirmed) && <Text>{confirmText}</Text> || 
        //             <Button title='confirm' onPress={confirm}/>}
        //     </View>
        // </View> 
            <View style={[styles.notifContainer, {backgroundColor: logo_colors.logo_yellow}]}>
                <View style={styles.notifCard_event}>
                    <View style={{flex: 2.5, flexDirection:'row', }}>
                        <View style={{paddingTop:5, alignItems: 'center'}}>
                            <Icon name='event' size={45} opacity='0.8'/>
                        </View>
                        <View style={{flex:2}}>
                            <Text style={styles.title}>New Time Suggestion</Text>
                            <Text style={styles.subtitle}>For Ice Cream SocialFor IceFor Ice Cream Social by Sams's Dad Cream Social by Sams's Dad by Sams's Dad. </Text>
                            <Text style={styles.subtitle}>Suggested date: 5/26/2022 at 12:00 PM </Text>
                        </View>
                    </View>
                    
                    <View style={{flex: 0.5, justifyContent: 'end'}}>
                        <View style={{paddingRight: 3,}}> 
                            <Text>12hr ago</Text>
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
    
    eventcontainer: {
        backgroundColor: 'lightpink',
        padding: 10,
        marginRight: 30,
        width: '100%',
        borderRadius: 5,
        paddingBottom: -20,
    },

    notifContainer: {
        // paddingTop:5,
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

