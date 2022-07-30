import React, { Component, useState, useEffect } from 'react';
import { Linking, TouchableOpacity, View, Text, StyleSheet, Button, Touchable } from 'react-native';
import { Icon } from 'react-native-elements'

const CONFIG = require('../config/app.config.js');

function RelationshipCard (props) {
    // const { email, fname, lname, role, phone } = props.user;
    const { person, role, hasMentor, cid, mentorInfo } = props.child;
    const { isParent } = props;
    console.log("IS PARENT: "+isParent);


    const url=CONFIG.url;  
    const formContentType = CONFIG.formContentType;

    const displayQRCode = async () => {
        props.modalVisible(false);
        props.generateQRCode(`${cid}`);
    }

    if (hasMentor) {
        /*
            If isParent, display mentor's name (pronouns) and phone number. 
            If !isParent, display parent's name (pronnouns) and phone number (HTTP request).
        */
       if(isParent) {
            return (
                // display mentor's name
                <View style={{backgroundColor: '#f0f0f0', padding: 10, marginBottom: 5, borderRadius: 5}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flex:3}}>
                            <Text style={{fontWeight: '500'}}>{person}, <Text style={{fontWeight:'300'}}>child.</Text></Text>
                            <Text>Mentor:  <Text style={{fontWeight:'300'}}>{mentorInfo.first} {mentorInfo.last[0]}. (Pronouns)</Text></Text> 
                            <View style={{flexDirection: 'row'}}>
                                <Text>Phone Number: </Text>
                                <TouchableOpacity onPress={()=> {Linking.openURL(`tel:${mentorInfo.phone}`);}}>
                                    <Text style={{fontWeight:'300', color: 'blue', textDecorationLine: 'underline'}}>{mentorInfo.phone}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginLeft: 5}}
                                    onPress={()=> {Linking.openURL(`sms:${mentorInfo.phone}`);}}>
                                    <Icon name='mail' size={20}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity>
                                    <Icon name='edit' size={17}/>
                                </TouchableOpacity>
                                <Text> Notes: My child has penuts alergies. </Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={()=> {displayQRCode()}}>
                            <Icon name='qr-code' size={40} opacity='0.8'/>
                        </TouchableOpacity>
                    </View>
                </View>
            );
       } else { // is mentor
            // display parents names (pnouns) and phone number 
       }
        
    } // else 
    
    return( 
        <View style={{backgroundColor: '#f0f0f0', padding: 10, marginBottom: 5, borderRadius: 5}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                    {isParent && <Text style={{fontWeight: '500'}}>{person}, <Text style={{fontWeight:'300'}}>{role}.</Text></Text>}
                    {!isParent && <Text style={{fontWeight: '500'}}>{person}, <Text style={{fontWeight:'300'}}>mentee.</Text></Text>}
                        <Text style={{fontWeight: '400'}}>Mentor:  <Text style={{fontWeight:'300'}}>none.</Text></Text> 
                </View>
                {isParent && <TouchableOpacity onPress={()=> {displayQRCode()}}>
                    <Icon name='qr-code' size={40} opacity='0.8'/>
                </TouchableOpacity>}
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