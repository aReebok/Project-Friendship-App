import React, { Component, useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button } from 'react-native';
import { Icon } from 'react-native-elements'
import { createEvent } from '../GlobalFunctions/APICalls.js';

import EventEditingForm from './EventEditingForm.js';

const {logo} = require('../../config/app.config.js');
const timeSince = require('../GlobalFunctions/TimeSince');

function EventCard (props) {

    const [creator, setCreator] = useState(null); 
    const [confirmed, setConfirmed] = useState(false);

    const { email, isEventAuthor, event, bannerStyle, fetchInfo } = props;
    const eventDate = new Date(event.eventdate);
    const cDate = new Date(event.eventcreated);
    const createdDate = timeSince(cDate);
    const [date, setDate] = useState(eventDate);

    const [eid, setEID] = useState(event.eid);

    const optionsTime = { hour: 'numeric', minute: 'numeric' };
    const optionsDate = { weekday: 'short', month: 'long', day: 'numeric' };

    const [eventEditingFormModalVisible, setEventEditingFormModalVisible] = useState(false);

    const pressConfirm = async () => {
        console.log("Confirm pressed.");
        setConfirmed(true);
        // delete event
        await deleteEventByEID(eid);
        // add it again as approved event
        await createEvent(event.author, event.cid, 'approved', event.title, 
        event.descrip, event.eventdate, event.eventcreated, event.eventlocation);
    }



    const pressEdit = async () => {
        console.log("Edit pressed.");
        setEventEditingFormModalVisible(true);
    }

    return(
        <View>
            <EventEditingForm eventEditingFormModalVisible={eventEditingFormModalVisible} setConfirmed={setConfirmed}
                setEventEditingFormModalVisible={setEventEditingFormModalVisible} setEID={setEID}
                email={email} value={event.cid} event={event} setDate={setDate} date={date}/>

            <View style={[styles.notifContainer, {backgroundColor: `${bannerStyle.color}`}]}>
                <View style={styles.notifCard_event}>
                    <View style={{flex: 2.5, flexDirection:'row', }}>
                        <View style={{paddingTop:5, alignItems: 'center'}}>
                            <Icon name='event' size={45} opacity='0.8'/>
                        </View>
                        <View style={{flex:2}}>
                            <Text style={styles.title}>{bannerStyle.title}</Text>
                            <Text style={[styles.subtitle, {fontWeight: '500'}]}>To {bannerStyle.authorStr}: <Text style={{fontWeight: '400'}}>{event.descrip}</Text></Text>
                            {!isEventAuthor && <Text style={styles.subtitle}>Created by {event.authorName}, ({event.childName}'s {event.authorRole}). </Text>}
                            <Text style={styles.subtitle}>Suggested: <Text style={{fontWeight: '500'}}>{date.toLocaleDateString('en-US', optionsDate)} at {eventDate.toLocaleTimeString('en-US', optionsTime)}</Text> </Text>
                        </View>
                    </View>
                
                    <View style={{flex: 0.5, paddingRight: 4, alignItems: 'flex-end', justifyContent: 'space-between',}}>
                        <View style={{paddingRight: 3,}}> 
                            <Text>{createdDate}</Text>
                        </View>
                        <View style={{paddingTop: 10, flexDirection:'row', justifyContent: 'space-around'}}>
                            {!confirmed && <TouchableOpacity style={{paddingRight: 5}} onPress={()=>{ pressConfirm() }}>
                                {bannerStyle.checkButton && <Icon name='done' color='green' size={25}/>}
                            </TouchableOpacity>}

                            {!confirmed && <TouchableOpacity style={{}} onPress={()=>{ pressEdit() }}>
                                <Icon name='edit' color={logo.red} size={25}/>
                            </TouchableOpacity>}
                            {confirmed && <Text></Text>}

                        </View>
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

