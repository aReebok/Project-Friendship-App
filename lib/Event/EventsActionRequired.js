import React, { useState, useEffect } from 'react';
import { Dimensions, Button, View, StyleSheet, ScrollView, Modal, Alert } from 'react-native';
import { Divider, Text, TextInput } from 'react-native-paper';
import { Icon } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import EventsActionRequiredCard from './EventsActionRequiredCard.js';

const  { logo } = require('../../config/app.config.js');
const APICalls = require('../GlobalFunctions/APICalls');

function EventsRequests(props) {
    const { email, role, eventsArray, 
        approvedAndPastEvents, arrlen, fetchInfo } = props;

    const totalEvents = approvedAndPastEvents.concat(eventsArray);
    // console.log(totalEvents)
    return (<View style={styles.card}> 
        <View style={{flexDirection: 'row'}}> 
            <Text style={{fontSize: 25,}}>
            Pending Actions</Text>
            {arrlen ? <View style={styles.circle}><Text style={{fontSize: 15, color: 'white'}}>{arrlen}</Text></View>
            : <View></View>}
        </View>
            { !arrlen && <Text style={{fontSize: 16}}>You have 0 pending actions.</Text>}
        <ScrollView showsVerticalScrollIndicator={false}>
            {totalEvents.lenght && <Text>No pending event requests.</Text>}
            {totalEvents.map((item, index) => {
                var bannerStyle = {
                    title:'', color:'', checkButton: false, authorStr: 'me', iconTitle: 'event', editButton: true, buttonTitle: 'edit'}
                var isEventAuthor = false;
                // REPETITIVE CODE
                bannerStyle.title = `${item.title} at ${item.eventlocation}`;
                if (item.stat === 'pending') {
                    if (item.author === email) {
                        isEventAuthor = true;
                        bannerStyle.color = logo.blue;
                        bannerStyle.checkButton = false;
                        if (item.authorRole === "mentor") {
                            bannerStyle.authorStr = `${item.childName}'s parent`;
                        } else if (item.authorRole === 'parent') {
                            bannerStyle.authorStr = `${item.childName}'s mentor`;
                        } else {}
                    } else {
                        // bannerStyle.title = "New Event Request";
                        bannerStyle.checkButton = true;
                        bannerStyle.color = logo.red;
                    }
                } else if (item.stat === 'edited') {
                    console.log("EDITED ITEM PENDING")
                    bannerStyle.color = logo.yellow;
                    if (item.author === email) {
                        isEventAuthor = true;
                        bannerStyle.title = "You Sent A New Time Suggestion";
                        bannerStyle.checkButton = false;
                        if (item.authorRole === "mentor") {
                            bannerStyle.authorStr = `${item.childName}'s parent`;
                        } else if (item.authorRole === 'parent') {
                            bannerStyle.authorStr = `${item.childName}'s mentor`;
                        } else {}
                    } else {
                        bannerStyle.title = "New Time Suggestion";
                        
                    }
                } else if (item.stat === 'approved') {
                    bannerStyle.color = logo.blue;
                    bannerStyle.iconTitle = 'check';
                    bannerStyle.buttonTitle = 'close';
                    bannerStyle.editButton = false ;
                    bannerStyle.checkButton = false;
                    bannerStyle.title = "Did you complete this event?"
                    
                    // return false;
                } else  {
                    console.log(item.author + " | line 79")                    
                }

                return <EventsActionRequiredCard key={index} 
                    email={email} isEventAuthor={isEventAuthor} event={item} bannerStyle={bannerStyle}/>
            })}

        {/* <View style={{padding: 3}}></View>
            <View style={[styles.notifContainer, {backgroundColor: logo.blue}]}>
                <View style={styles.notifCard_event}>
                    <View style={{flex: 2.5, flexDirection:'row', }}>
                        <View style={{justifyContent: 'center', alignContent: 'center'}}>
                            <Icon name='check' size={45} opacity='0.8'/>
                        </View>
                        <View style={{flex:2}}>
                            <Text style={styles.title}>Did you complete this event?</Text>
                            <Text style={styles.subtitle}>Math tutoring for Sam E. </Text>
                            <Text style={styles.subtitle}>Date: 5/24/2022 at 1:00 PM </Text>
                        </View>
                    </View>
                    
                    <View style={{flex: 0.5, justifyContent: 'end'}}>
                        <View style={{paddingRight: 3,}}> 
                            <Text>19hr ago</Text>
                        </View>
                        <View style={{paddingTop: 10, flexDirection:'row', justifyContent: 'space-around'}}>
                            <Icon name='done' color='green' size={25}/>
                            <Icon name='close' color={logo.red} size={25}/>
                        </View>
                    </View>
                </View>
            </View> */}
        </ScrollView>    
    </View>
)
}

export default EventsRequests;

const styles = StyleSheet.create({    
    container: {
      flex: 1,
      backgroundColor: '#F0F5FF',
    },

    header: { 
        padding: 10,
        backgroundColor: '#FF8D10'
    },

    card: {
        margin:10,
        marginTop: 10,
        backgroundColor: '#FFFFFF',
        padding: 5,
        height: 350,

        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        borderBottomWidth: 2,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.20,
        shadowRadius: 10,
    
    },

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

    circle: {
        backgroundColor: 'red',
        alignContent: 'center',
        justifyContent: 'center',
        marginLeft: 7,
        padding: 5,
        paddingHorizontal:11.5,
        borderRadius: 20
    },
    
  });
  