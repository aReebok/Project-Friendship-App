import React, { Component, useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button } from 'react-native';
import { Icon } from 'react-native-elements'

function EventCard (props) {
    const logo_colors = {
        logo_red: '#E6000C',
        logo_blue: '#00ABEB',
        logo_yellow: '#FF8D10' }

    const url='http://192.168.1.214:3001';  
    const formContentType = "application/x-www-form-urlencoded;charset=UTF-8";
    
    const handlePress = async (op, method = '', params = {}) => {
        if (method != '')
            params.method = method;
        console.log('handlePress '+method+' '+ url+'/'+op);
        var ret_val = await fetch(url + '/'+op, params)
            .then((response) => response.text())
            .then((responseText) => {
              try { return JSON.parse(responseText);} 
              catch (error) { return responseText; }})
            .catch((error) => { console.error(error); });
        return ret_val; }

    
    const [creator, setCreator] = useState(null); 
    const [confirmText, setConfirmText] = useState('Event request pending');
    const [confirmed, setConfirmed] = useState(false);

    useEffect( async ()=> {
        var { fname, lname } = await handlePress('users', 'PUT', {
            headers: {"Content-type": formContentType}, body: `email=${props.author}`});
        setCreator(`${fname} ${lname}`);

        if (props.stat === 'approved') { 
            setConfirmText('Approved');
            setConfirmed(true);
        } else {
            setConfirmText('Pending approval')
        }
    }, []);

    const {author, participant, desc, title, email, eid, eventCreated, eventDate, stat} = props;
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
            body: `author=${author}&participant=${participant}&stat=${'approved'}&title=${title}&descrip=${desc}&eventDate=${eventDate}&eventCreated=${eventCreated}`}); 
        setConfirmText('Approved');
        setConfirmed(true);
    }


    console.log(props);

    return(
        <View style={styles.eventcontainer}>
            <Text>Event Title: {title} ({eid})</Text> 
            <Text style={styles.subtitle}>Requested by {creator}. </Text>
            <Text style={styles.subtitle}>Description: {desc} </Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button title='edit'/>
                {(author===email || confirmed) && <Text>{confirmText}</Text> || 
                    <Button title='confirm' onPress={confirm}/>}
            </View>
        </View> 
        // <View style={styles.notifContainer}>
        //     <View style={styles.notifCard_event}>
        //         <View style={{flex: 2.5, flexDirection:'row', }}>
        //             <View style={{justifyContent: 'center', alignContent: 'center'}}>
        //                 <Icon name='event' size={45} opacity='0.8'/>
        //             </View>
        //             <View style={{flex:1}}>
        //                 <Text style={styles.title}>{title}</Text>
        //                 <Text style={styles.subtitle}>Requested by {creator}. </Text>
        //                 <Text style={styles.subtitle}>Suggested date: 5/27/2022 at 3:00 PM </Text>
        //             </View>
        //         </View>
                
        //         <View style={{justifyContent: 'end'}}>
        //             <View style={{paddingRight: 3}}> 
        //                 <Text>6hr ago</Text>
        //             </View>
        //             <View style={{paddingTop: 10, flexDirection:'row', justifyContent: 'space-around'}}>
        //                 <Icon name='done' color='green' size={25}/>
        //                 <Icon name='edit' color={logo_colors.logo_red} size={25}/>
        //             </View>
        //         </View>
        //     </View>
        // </View>
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
        borderRadius: 11,
        width: '90%',
        backgroundColor: '#E6000C'
    },

    notifCard_event: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        borderBottomRightRadius: 15,
        borderTopRightRadius: 20,
        backgroundColor: '#f3f3f3', 
        padding: 5,
        marginLeft: 6,
        justifyContent:'space-between',
    },
    title: {
        paddingTop: 10,
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

