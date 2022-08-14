import React, { useState, useEffect } from 'react';
import { Dimensions, Button, View, StyleSheet, ScrollView, Modal, Alert } from 'react-native';
import { Divider, Text, TextInput } from 'react-native-paper';
import { Icon } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const CONFIG = require('../../config/app.config.js');
const handlePress = require('../GlobalFunctions/HandlePress') 
const logo = {
    red: '#E6000C',
    blue: '#00ABEB',
    yellow: '#FF8D10' }


function EventForm (props) {

    const formContentType = CONFIG.formContentType;

    const [eventTitle, setEventTitle] = useState("");
    const [eventDesc, setEventDesc] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('all');
    
    const [isPickerShow, setIsPickerShow] = useState(false);
    const [timePickerButtonText, setTimePickerButtonText] = useState('Select Time');

    const options = { weekday: 'short', hour: 'numeric', minute: 'numeric', month: 'long', day: 'numeric' };
    
    const {sid, date, setDate, 
        eventsArray, setEventsArray, 
        modalVisible, setModalVisible, 
        items, setItems} = props;

    const showPicker = () => {
        setIsPickerShow(!isPickerShow);
        if(isPickerShow) {
            setTimePickerButtonText('Select Time');
        } else {
            setTimePickerButtonText('Close Time Picker');
        }
    };

    const onChange = (event, value) => {
        setDate(value);
        if (Platform.OS === 'android') {
        setIsPickerShow(false);
        }
    };
    const sendEvent = async () => {
        // sends event to the db
        setModalVisible(false);
        
        var { email } = await handlePress('sessions', 'PUT', {
            headers: {"Content-type": formContentType}, body: `sid=${sid}&`});

        var user = await handlePress('users', 'PUT', {
            headers: {"Content-type": formContentType}, body: `email=${email}&`});
        
        if(user.role === 'parent') {
            // is parent, recipient is mentor
            var mentor = await handlePress('childrs/findMentorEmail', 'PUT', {
                headers: {"Content-type": formContentType}, body: `cid=${value}&`});

        } else if (user.role === 'mentor') {
            // recipient of event is all parents
            var parents = await handlePress('childrs/findParentEmail', 'PUT', {
                headers: {"Content-type": formContentType}, body: `cid=${value}&`});

        } else { }
        
        await handlePress('events', 'POST', { 
            headers: {"Content-type": formContentType},
            body: `author=${email}&cid=${value}&title=${eventTitle}&stat=${'pending'}&descrip=${eventDesc}&eventDate=${date}&eventCreated=${new Date(Date.now())}&eventLocation=${eventLocation}`});  
        
        const event = handlePress('events', 'PUT', {
            headers: {"Content-type": formContentType},
            body:`email=${email}`,
        });
        setEventsArray([{
            author : email,
            cid: value,
            stat : "pending",
            title : eventTitle,
            descrip : eventDesc,
            eventdate : date,
            eventcreated : new Date(Date.now()),
            eventlocation: eventLocation,
        }, ...eventsArray])
        
        // console.log("Sending Event...")
        // // reset values
        setEventTitle(''); setEventDesc(''); setValue(null); setDate(new Date(Date.now())); setEventLocation('');
        alert("Event Created!","Your created event was shared!");
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            etModalVisible(!modalVisible); }}>

            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={{fontSize: 30, paddingBottom: 10,
                    fontWeight: 'bold', color: logo.blue, marginTop: 10}}>CREATE EVENT</Text>
                
                <TextInput style={styles.input} 
                    mode="outlined"
                    label="Title*"
                    activeOutlineColor={logo.blue}
                    value={eventTitle}
                    onChangeText={eventTitle => setEventTitle(eventTitle)}
                    />

                <TextInput style={styles.input} 
                    mode="outlined"
                    label="Description*"
                    activeOutlineColor={logo.blue}
                    value={eventDesc}
                    onChangeText={eventDesc => setEventDesc(eventDesc)}
                    />

                <DropDownPicker
                    text="Select audience"
                    style={{marginVertical:4, backgroundColor:'#f3f3f3', borderColor: 'grey', }}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}/> 

                <TextInput style={styles.input} 
                    mode="outlined"
                    label="Location*"
                    activeOutlineColor={logo.blue}
                    value={eventLocation}
                    onChangeText={(eventLocation)=>{setEventLocation(eventLocation)}}
                    />

                {/* DATE AND TIME PICKER HERE */}

                <View style={{paddingTop: 40, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.pickedDate}>{date.toLocaleString('en-US', options)}</Text>
                </View>
                <Button title={timePickerButtonText} color="purple" onPress={showPicker} /> 

                {/* The date picker */}
                
                {isPickerShow && (
                <DateTimePicker
                    value={date}
                    mode={Platform.OS === 'ios' ? 'datetime' : 'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={true}
                    onChange={onChange}
                    style={styles.datePicker}
                />)}

                {/* The button that used to trigger the date picker */}
                                
                <TouchableOpacity
                    style={[styles.button, {marginTop: 30}]}
                    onPress={()=> {sendEvent();}}>
                    <Text style={{fontWeight:'bold', color:'white'}}>SEND EVENT REQUEST</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, {backgroundColor: 'white'}]}
                    onPress={()=>setModalVisible(false)}>
                    <Text>CLOSE</Text>
                </TouchableOpacity>
            </View>
            </View>
      </Modal>
    );
}

export default EventForm;

const styles = StyleSheet.create({
    pickedDate: {
        paddingTop: 7,
        fontSize: 20,
        color: 'black',
    },
      // This only works on iOS
    datePicker: {
        width: 320,
        height: 260,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      },

    modalView: {
        marginTop: 50,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        height: 900,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },

    button: {
        alignItems: "center",
        backgroundColor: "#00ABEB",
        padding: 10
    },
    
    container: {
      flex: 1,
      backgroundColor: '#F0F5FF',
    },
    input: {
        height: 50,
        width: '100%',
        marginBottom: 5,
        padding: 0,
      },    
  });