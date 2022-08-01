import React, { useState, useEffect } from 'react';
import { Dimensions, Button, View, StyleSheet, ScrollView, Modal, Alert } from 'react-native';
import { Divider, Text, TextInput } from 'react-native-paper';
import { Icon } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import EventRequestCard from './EventRequestCard';
import PastEventCard from './PastEventCard'
import EventForm from './EventForm';
import EventsActionRequired from './EventsActionRequired';

const CONFIG = require('../../config/app.config.js');
const handlePress = require('../GlobalFunctions/HandlePress') 

const {width: windowWidth} = Dimensions.get('window');

const logo_colors = {
    logo_red: '#E6000C',
    logo_blue: '#00ABEB',
    logo_yellow: '#FF8D10' }
      
const Event = (props) => {

    const formContentType = CONFIG.formContentType;
    const { sid } = props.route.params;

    const [notification, setNotification] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const [email, setEmail] = useState('');
    const [items, setItems] = useState([]);
    const [date, setDate] = useState(new Date(Date.now()));

    const [eventsArray, setEventsArray] = useState([]);


    const pushRSToArray = (arr, l, p) => {
        arr.push({
          label: l,
          value: p,
        })
      } 

      const fetchInfo = async () => {
        var { email } = await handlePress('sessions', 'PUT', {
            headers: {"Content-type": formContentType}, body: `sid=${sid}&`});
        setEmail(email);

        var { role } = await handlePress('users', 'PUT', {
                    headers: {"Content-type": formContentType}, body: `email=${email}`});

        var relations = await handlePress('child/childrs', 'PUT', {
            headers: {"Content-type": formContentType}, body: `email=${email}&`});
        var arr = [];

        for (let i = 0; i < relations.length; i++) {     
            console.log("--------------------------------------------")       
            let cid = relations[i].cid;
            let mentor = await handlePress('child/childrs/findMentorEmail', 'PUT', {
                headers: {"Content-type": formContentType}, body: `cid=${cid}&`});
            let child = await handlePress('child', 'PUT', { 
                headers: {"Content-type": formContentType}, body: `cid=${cid}&`});
            
            let childEvents = await handlePress('events/pending', 'PUT', { 
                headers: {"Content-type": formContentType}, body: `cid=${cid}&`});
        
            let totalEvents = eventsArray.concat(childEvents);
            setEventsArray(totalEvents);
                // console.log(eventsArray);
            if (mentor[0]) { // if mentor exists
                let mentorEmail = mentor[0].email;
                let user = await handlePress('users', 'PUT', {
                    headers: {"Content-type": formContentType}, body: `email=${mentorEmail}&`});
                let givenLabel = '';
                if(role==='parent') {
                    givenLabel = `${user.fname} (${child.fname}'s mentor)`;
                } else if(role==='mentor') {
                    givenLabel = `${child.fname}`;
                } else {}
                pushRSToArray(arr, givenLabel, cid);
            }
        }
    
        setItems(arr)

        // fetch notifs
        // var notifs = await handlePress('events', 'PUT', { // adds into votes. 
        //     headers: {"Content-type": formContentType}, body: `email=${email}&`});
        // console.log(notifs);
        // var n = [];
        // for (let i = 0; i < notifs.length; i++) 
        //     n.push(notifs[i]);

        // setNotification(n);        

    } 


    useEffect( async () => {
        fetchInfo();
    }, []);

  
return ( <View style={styles.container}>
    <EventForm modalVisible={modalVisible} setModalVisible={setModalVisible} 
        setNotification={setNotification} setItems={setItems} items={items}
        setDate={setDate} date={date} sid={sid}/>

    {false && <View style={{backgroundColor: 'red', padding: 10,}}>
        <ScrollView
        horizontal={true}   showsHorizontalScrollIndicator={false}>
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
            <Icon name='edit' color={logo_colors.logo_blue} size={30}/>
            <Text style={{textAlign: 'center',}}>CREATE</Text>
        </TouchableOpacity>
    </View>

    <EventsActionRequired notification={notification} setNotification={setNotification}
        eventsArray={eventsArray}/>

    <View style={[styles.card, {marginBottom: 18, height: 200}]}> 
        
        <View style={{flexDirection: 'row'}}> 
            <Text style={{fontSize: 25,}}>
            Past Events</Text>
            {false && <View style={styles.circle}><Text style={{fontSize: 15, color: 'white'}}>2</Text></View>}
            </View>
        <ScrollView>
            <PastEventCard/>
            {/* <View style={{padding: 3}}></View>
            <View style={[styles.notifContainer, {backgroundColor: 'grey'}]}>
                <View style={styles.notifCard_event}>
                    <View style={{flex: 2.5, flexDirection:'row', }}>
                        <View style={{flex:2}}>
                            <Text style={styles.title}>Northfield Fair</Text>
                            <Text style={styles.subtitle}>With Sams for 1 hrs. </Text>
                        </View>
                    </View>
                    
                    <View style={{justifyContent: 'end'}}>
                        <View style={{paddingRight: 3}}> 
                            <Text>12d ago</Text>
                        </View>
                    </View>
                </View>
            </View> */}
            {/* <View style={{padding: 3}}></View>
            <View style={[styles.notifContainer, {backgroundColor: 'grey'}]}>
                <View style={styles.notifCard_event}>
                    <View style={{flex: 2.5, flexDirection:'row', }}>
                        <View style={{flex:2}}>
                            <Text style={styles.title}>Library Homework</Text>
                            <Text style={styles.subtitle}>With Sarah for 1 hrs. </Text>
                        </View>
                    </View>
                    
                    <View style={{justifyContent: 'end'}}>
                        <View style={{paddingRight: 3}}> 
                            <Text>12d ago</Text>
                        </View>
                    </View>
                </View>
            </View>
             */}
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
  