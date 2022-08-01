import React, { useState, useEffect } from 'react';
import { Dimensions, Button, View, StyleSheet, ScrollView, Modal, Alert } from 'react-native';
import { Divider, Text, TextInput } from 'react-native-paper';
import { Icon } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import EventsActionRequiredCard from './EventsActionRequiredCard.js';

const CONFIG = require('../../config/app.config.js');
const handlePress = require('../GlobalFunctions/HandlePress') 
const logo = {
    red: '#E6000C',
    blue: '#00ABEB',
    yellow: '#FF8D10' }

function EventsRequests(props) {
    const { email, role, eventsArray, setEventEditingFormModalVisible } = props;
    // console.log(eventsArray);

    return (<View style={styles.card}> 
        <View style={{flexDirection: 'row'}}> 
            <Text style={{fontSize: 25,}}>
            Pending Actions</Text>
            {!eventsArray.lenght && <View style={styles.circle}><Text style={{fontSize: 15, color: 'white'}}>{eventsArray.length}</Text></View>}
            
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
            {eventsArray.lenght && <Text>No pending event requests.</Text>}
            {eventsArray.map((item, index)=>{
                var bannerStyle = {
                    title:'', color:'', checkButton: true, authorStr: 'Sams mentor/parent' }
                var isEventAuthor = false;
                // REPETITIVE CODE
                bannerStyle.title = `${item.title} at ${item.eventlocation}`;
                if (item.stat === 'pending') {
                    if (item.author === email) {
                        isEventAuthor = true;
                        // bannerStyle.title = "Your Event Request Sent";
                        bannerStyle.color = logo.blue;
                        bannerStyle.checkButton = false;
                        bannerStyle.authorStr = 'me';
                    } else {
                        // bannerStyle.title = "New Event Request";
                        bannerStyle.color = logo.red;
                    }
                } else if (item.stat === 'edited') {
                    // new time suggestion 
                    bannerStyle.color = logo.yellow;
                    if (item.author === email) {
                        isEventAuthor = true;
                        bannerStyle.title = "New Time Suggestion";
                        bannerStyle.checkButton = false;
                        bannerStyle.authorStr = 'me';
                    } else {
                        bannerStyle.title = "New Time Suggestion";
                    }
                } else if (item.stat === 'completed') {}
                return <EventsActionRequiredCard key={index} setEventEditingFormModalVisible={setEventEditingFormModalVisible}
                    email={email} isEventAuthor={isEventAuthor} event={item} bannerStyle={bannerStyle}/>
            })}

        <View style={{padding: 3}}></View>
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
            </View>
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
        height: 405,

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
        paddingHorizontal:10,
        borderRadius: 20
    },

    navigation_bar: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',

        backgroundColor: '#FF8D10',
        height: 20,
        width: '100%'
    }   
    
  });
  