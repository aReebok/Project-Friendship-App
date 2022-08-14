import React, { useState, useEffect } from 'react';
import { Dimensions, Button, View, StyleSheet, ScrollView, Modal, Alert } from 'react-native';
import { Divider, Text, TextInput } from 'react-native-paper';
import { Icon } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import PastEventCard from './PastEventCard'
import EventForm from './EventForm';
import EventEditingForm from './EventEditingForm';
import EventsActionRequired from './EventsActionRequired';
import EventsUpcomingCard from './EventsUpcomingCard';
// import EventsUpcomingCard from './EventsUpcomingCard';

const CONFIG = require('../../config/app.config.js');
const handlePress = require('../GlobalFunctions/HandlePress') 
const APICalls = require('../GlobalFunctions/APICalls') 

const {width: windowWidth} = Dimensions.get('window');

const logo = {
    red: '#E6000C',
    blue: '#00ABEB',
    yellow: '#FF8D10' }
      
const Event = (props) => {

    const formContentType = CONFIG.formContentType;
    const { sid } = props.route.params;

    const [notification, setNotification] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
 
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const [items, setItems] = useState([]);
    const [date, setDate] = useState(new Date(Date.now()));

    const [eventsArray, setEventsArray] = useState([]);
    const [upcomingEventsArray, setUpcomingEventsArray] = useState([]);


    const pushRSToArray = (arr, l, p) => {
        arr.push({
          label: l,
          value: p,
        })
      } 


    const updatePendingEvents = async (cid) => {
        let childEvents = await handlePress('events/pending', 'PUT', { 
            headers: {"Content-type": formContentType}, body: `cid=${cid}&`});
        let child = await APICalls.getChildProfileByChildID(cid);
        for (let i = 0; i < childEvents.length; i++) {
            childEvents[i].childName = `${child.fname}`;
            let author = await APICalls.getUserProfile(childEvents[i].author);
            childEvents[i].authorName = `${author.fname}`;
            childEvents[i].authorRole = author.role;            
        } 
        
        if(childEvents.length) {
            let totalEvents = eventsArray.concat(childEvents).reverse();
            setEventsArray(totalEvents);
        } 
    };

    const [approvedAndPastEvents, setApprovedAndPastEvents] = useState([]);

    const updateUpcomingEvents = async (cid) => {
        let childEvents = await handlePress('events/approved', 'PUT', { 
            headers: {"Content-type": formContentType}, body: `cid=${cid}&`});

        let child = await APICalls.getChildProfileByChildID(cid);
        for (let i = 0; i < childEvents.length; i++) {
            let currentDate = new Date();
            let eventDate = new Date(childEvents[i].eventdate);
            childEvents[i].childName = `${child.fname}`;
            let author = await APICalls.getUserProfile(childEvents[i].author);
            childEvents[i].authorName = `${author.fname}`;
            childEvents[i].authorRole = author.role;

            if (currentDate > eventDate) {
                // passedEvents.push(childEvents[i]);
                setApprovedAndPastEvents(childEvents.splice(i, 1),...approvedAndPastEvents)
            }
        } 
        
        if(childEvents.length) {
            let totalEvents = upcomingEventsArray.concat(childEvents).reverse();
            setUpcomingEventsArray(totalEvents);
        } 
    };

    const setDropDownItems = async (email, role, relations) => {
        var arr = [];

        for (let i = 0; i < relations.length; i++) {     
            let { cid } = relations[i];
            updatePendingEvents(cid);
            updateUpcomingEvents(cid);
            
            let mentor = await APICalls.getChildMentorEmailByChildID(cid);
            let child = await APICalls.getChildProfileByChildID(cid);

            if (mentor.length) { // if mentor exists
                let mentorEmail = mentor[0].email;
                let user = await APICalls.getUserProfile(mentorEmail);
                let givenLabel = '';
                if(role==='parent') {
                    givenLabel = `${user.fname} (${child.fname}'s mentor)`;
                } else if(role==='mentor') {
                    givenLabel = `${child.fname} ${child.lname[0]}.`;
                } else {}
                pushRSToArray(arr, givenLabel, cid);
            } else {
                console.log("MENTOR DOES NOT EXIST")
            }
        }
    
        setItems(arr);
    }

    const fetchInfo = async () => {
        const email = await APICalls.getEmailFromSessionID(sid);
        setEmail(email);

        var { role } = await APICalls.getUserProfile(email);
        setRole(role);

        var relations = await APICalls.getRelationsByEmail(email);
        await setDropDownItems(email, role, relations);
    } 


    useEffect( async () => {
        fetchInfo();
    }, []);

  
return ( <View style={styles.container}>
    <EventForm modalVisible={modalVisible} setModalVisible={setModalVisible} 
        eventsArray={eventsArray} setEventsArray={setEventsArray} 
        setItems={setItems} items={items}
        setDate={setDate} date={date} sid={sid}/>

    {false && <View style={{backgroundColor: 'red', padding: 10,}}>
        <ScrollView
            horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Text style={{color: 'white', fontWeight:'bold'}}>
            ALERT: GREEN iPHONE 11 LOST. CALL 234567890. This is a longer notice. 
        </Text>
        </ScrollView>
        </View>}
    <View style={[styles.header, {flexDirection: 'row', justifyContent: 'space-between'}]}>
        <View style={{flexDirection: 'row'}}> 
        <Icon name='event' color='white' size={58}/>
        <Text style={{fontSize: 45, color: 'white'}}>
        EVENTS</Text></View>
        <TouchableOpacity
            style={{backgroundColor: 'white', height: 55, width: 75, 
            alignContent: 'center', paddingTop: 4}}
            onPress={()=>{
                setDate(new Date(Date.now()));
                setModalVisible(true)
                }}>
            <Icon name='edit' color={logo.blue} size={30}/>
            <Text style={{textAlign: 'center',}}>CREATE</Text>
        </TouchableOpacity>
    </View>

    <EventsActionRequired fetchInfo={fetchInfo} approvedAndPastEvents={approvedAndPastEvents}
        email={email} role={role} eventsArray={eventsArray} arrlen={eventsArray.length + approvedAndPastEvents.length}/>

    <View style={[styles.card, {marginBottom: 18, height: 255}]}> 
        <View style={{flexDirection: 'row'}}> 
            <Text style={{fontSize: 25,}}>
            Upcoming Events</Text>
            {false && <View style={styles.circle}><Text style={{fontSize: 15, color: 'white'}}>2</Text></View>}
        </View>
            { !upcomingEventsArray.length && <Text style={{fontSize: 16}}>You have 0 upcoming events.</Text>}
        <ScrollView>
            { upcomingEventsArray.map ((item, index) => {
                return (<EventsUpcomingCard key={index} event={item}/>);
            })}
        </ScrollView>    
    </View>

    
    
    <View style={styles.navigation_bar}>
        <TouchableOpacity onPress={()=> console.log("Pressed Chat")}>
            <Icon name='chat' size={50} color='white'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> {            
            return props.navigation.navigate('Event', { sid });}}>
            <Icon name='event' size={50} color='white'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> {
            return props.navigation.navigate('Home', { sid });}}>
            <Icon name='home' size={50} color='white'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> {
            return props.navigation.navigate('AlertForm', { sid });}}>
            <Icon name='warning' size={50} color='white'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> {
            return props.navigation.navigate('Profile', { sid });}}>
            <Icon name='face' size={50} color='white'/>
        </TouchableOpacity>
    </View>
  </View>)
};

export default Event;

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