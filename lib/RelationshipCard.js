import React, { Component, useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button } from 'react-native';
import { Icon } from 'react-native-elements'

const CONFIG = require('../config/app.config.js');

function RelationshipCard (props) {
    // const { email, fname, lname, role, phone } = props.user;
    const { person, role, hasMentor, cid } = props.child;

    if(hasMentor) {
        const { mentorInfo } = props.child;
    }

    const url=CONFIG.url;  
    const formContentType = CONFIG.formContentType;
    // const handlePress = async (op, method = '', params = {}) => {
    //     if (method != '')
    //         params.method = method;
    //     console.log('handlePress '+method+' '+ url+'/'+op);
    //     var ret_val = await fetch(url + '/'+op, params)
    //         .then((response) => response.text())
    //         .then((responseText) => {
    //           try { return JSON.parse(responseText);} 
    //           catch (error) { return responseText; }})
    //         .catch((error) => { console.error(error); });
    //     return ret_val; }

    // const [hide, setHide] = useState(false);

    // const addToProfiles = async () => {
    //     await handlePress('users', 'POST', { // adds into votes. 
    //         headers: {"Content-type": formContentType}, 
    //         body: `email=${email}&fname=${fname}&lname=${lname}&role=${role}&phone=${phone}`});
    //     await handlePress('register', 'DELETE', { // adds into votes. 
    //         headers: {"Content-type": formContentType}, 
    //         body: `email=${email}`});
    //     setHide(true);
    // }

    // const generateQRCode = async () => {
    //     // console.log("recieved sid: " + sid)
    //     var parametersJson = {
    //       "size": 250,
    //       "backgroundColor": "38-38-38", 
    //       "qrColor": "255-255-255", 
    //       "padding": 2, 
    //       "data": `${imageUrl}`
    //     };
    
    //     parametersJson.data = `PROJECTFRIENDHIPID@${cid}`;
    //     var parameters = `size=${parametersJson.size}&bgcolor=${parametersJson.backgroundColor}&color=${parametersJson.qrColor}&qzone=${parametersJson.padding}&data=${parametersJson.data}` // Stitch Together all Paramenters
    //     var img_resp = `https://api.qrserver.com/v1/create-qr-code/?${parameters}` // Set Image URL To Link
    //     await setQRInput(img_resp);
    //     setModalVisible(true);
    //   }
    const displayQRCode = async () => {
        console.log("QR CODE PRESSED");
        props.modalVisible(false);
        
    }
    
    return( 
        <View style={{backgroundColor: '#f0f0f0', padding: 10, marginBottom: 5, borderRadius: 5}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                    <Text style={{fontWeight: '500'}}>{person}, <Text style={{fontWeight:'300'}}>{role}</Text></Text>
                    {hasMentor ? <Text style={{fontWeight: '400'}}>Mentor: {mentorInfo.first} {mentorInfo.last}</Text> : 
                        <Text style={{fontWeight: '450'}}>Mentor:  <Text style={{fontWeight:'300'}}>none.</Text></Text> }
                </View>
                <TouchableOpacity onPress={()=> {displayQRCode()}}>
                    <Icon name='qr-code' size={40} opacity='0.8'/>
                </TouchableOpacity>
            </View>
        </View>
      );
}

export default RelationshipCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
        borderRadius: 7.5,
        width: '96%',
        padding: 10,
        margin: 7.5,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 17
    }, 
    spaceBetween: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    }, 
    checkButton: {
        backgroundColor: 'lightgreen', 
        padding: 3, 
        marginRight: 5,
        borderRadius: 3
    }, 
    editButton: {
        backgroundColor: 'yellow', 
        padding: 3,
        borderRadius: 3

    }
});