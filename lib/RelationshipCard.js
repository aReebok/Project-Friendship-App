import React, { Component, useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button } from 'react-native';
import { Icon } from 'react-native-elements'

const CONFIG = require('../config/app.config.js');
const handlePress = require('./GlobalFunctions/HandlePress') 

function RelationshipCard (props) {
    const { person, role, hasMentor, cid, mentorInfo } = props.child;
    const { isParent } = props;
    console.log("IS PARENT: "+isParent);

    const formContentType = CONFIG.formContentType;

    const displayQRCode = async () => {
        console.log("QR CODE PRESSED");
        props.modalVisible(false);
        props.generateQRCode(`${cid}`);
    }
    
    return( 
        <View style={{backgroundColor: '#f0f0f0', padding: 10, marginBottom: 5, borderRadius: 5}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                    {isParent && <Text style={{fontWeight: '500'}}>{person}, <Text style={{fontWeight:'300'}}>{role}.</Text></Text>}
                    {!isParent && <Text style={{fontWeight: '500'}}>{person}, <Text style={{fontWeight:'300'}}>mentee.</Text></Text>}
                    {hasMentor ? <Text style={{fontWeight: '400'}}>Mentor: {mentorInfo.first} {mentorInfo.last}</Text> : 
                        <Text style={{fontWeight: '400'}}>Mentor:  <Text style={{fontWeight:'300'}}>none.</Text></Text> }
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