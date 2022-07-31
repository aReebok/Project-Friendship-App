import React, { useState, useEffect } from 'react';
import { Dimensions, Button, View, StyleSheet, ScrollView, Modal, Alert } from 'react-native';
import { Divider, Text, TextInput } from 'react-native-paper';
import { Icon } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const CONFIG = require('../../config/app.config.js');
const handlePress = require('../GlobalFunctions/HandlePress') 
const logo_colors = {
    logo_red: '#E6000C',
    logo_blue: '#00ABEB',
    logo_yellow: '#FF8D10' }


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
    
    const {date, setDate, 
        notification, setNotification, 
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
        var { email } = await handlePress('sessions', 'PUT', {
            headers: {"Content-type": formContentType}, body: `sid=${sid}&`});

        // add to notifications
        setNotification([{
            'author' : `${email}`,
            'participant': `${value}`,
            'stat' : "pending",
            'title' : `${eventTitle}`,
            'descrip' : `${eventDesc}`,
            'eventDate' : `${date}`,
            'eventCreated' : `${new Date(Date.now())}`,
            'eventLocation': eventLocation,
            },...notification])

        console.log("Sending Event...")
        await handlePress('events', 'POST', { // adds into votes. 
            headers: {"Content-type": formContentType},
            body: `author=${email}&participant=${value}&stat=${'pending'}&title=${eventTitle}&descrip=${eventDesc}&eventDate=${date}&eventCreated=${new Date(Date.now())}&eventLocation=${eventLocation}`});  
        // reset values
        setEventTitle(''); setEventDesc(''); setValue(null); setDate(new Date(Date.now())); setEventLocation('');
        alert("Your created event was shared!");
        setModalVisible(false);
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
                    fontWeight: 'bold', color: logo_colors.logo_blue, marginTop: 10}}>CREATE EVENT</Text>
                
                <TextInput style={styles.input} 
                    mode="outlined"
                    label="Title*"
                    activeOutlineColor={logo_colors.logo_blue}
                    value={eventTitle}
                    onChangeText={eventTitle => setEventTitle(eventTitle)}
                    />

                <TextInput style={styles.input} 
                    mode="outlined"
                    label="Description*"
                    activeOutlineColor={logo_colors.logo_blue}
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
                    activeOutlineColor={logo_colors.logo_blue}
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
    pickedDateContainer: {
        paddingTop: 20,
        borderRadius: 10,
      },
      pickedDate: {
        paddingTop: 7,
        fontSize: 20,
        color: 'black',
      },
      btnContainer: {
        paddingBottom: 0,
      },
      // This only works on iOS
      datePicker: {
        width: 320,
        height: 260,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
    
    input: {
        height: 50,
        width: '100%',
        marginBottom: 5,
        padding: 0,
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
      button2: {
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
        marginHorizontal: 150
      },

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

    upcoming_event: {
        backgroundColor: 'pink',
        // width: '50%',
        width: 175,
        height: 110,
        marginTop: 6,
        backgroundColor: '#f3f3f3', 
        padding: 2,
    }, 
    
    upcoming_event_container: {
        backgroundColor: logo_colors.logo_blue,
        borderRadius: 5,
        marginTop: 6
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
  