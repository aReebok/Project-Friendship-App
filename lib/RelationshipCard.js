import React, { Component, useState, useEffect } from 'react';
import { Linking, TouchableOpacity, View, Text, StyleSheet, Button, Touchable } from 'react-native';
import { Icon } from 'react-native-elements'

const CONFIG = require('../config/app.config.js');

function RelationshipCard (props) {
    // const { email, fname, lname, role, phone } = props.user;
    const { person, role, hasMentor, cid, dob,
        mentorInfo, parentsInfo, notes, pronouns } = props.child;
    const { isParent } = props;


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
                            <Text>Mentor:  <Text style={{fontWeight:'300'}}>{mentorInfo.first} {mentorInfo.last[0]}. ({mentorInfo.pronouns})</Text></Text> 
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
                                {/* <TouchableOpacity> */}
                                <Icon name='edit' size={17}/>
                                {/* </TouchableOpacity> */}
                                <Text> Notes: {notes}.</Text>
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

    if (!isParent) {

        return(<View style={{backgroundColor: '#f0f0f0', padding: 10, marginBottom: 5, borderRadius: 5}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                    <Text style={{fontWeight: '500', fontSize:15,}}>{person}, ({pronouns})<Text style={{fontWeight:'300'}}> my mentee.</Text></Text>
                    <View style={{flexDirection: 'row'}}>
                        <Icon name='edit' size={15}/>
                        <Text> Parent's Notes: <Text style={{fontWeight:'300'}}>{notes}.</Text></Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Icon name='cake' size={15}/>
                        <Text> {person.split(" ")[0]}'s Birthday: <Text style={{fontWeight:'300'}}>{dob}.</Text></Text>
                    </View>
                                {/* <Text style={{fontWeight: '500'}}>Notes: <Text style={{fontWeight:'300'}}> Henry has nut alergies.</Text></Text> */}

                </View>
            </View>
            <View style = {styles.lineStyle} />
            <Text style={{paddingTop: 5, fontWeight: '500', fontSize: 15,}}>Parents Contacts:</Text>
            { parentsInfo.map((item, index) => {
                return <View key={index} style={{backgroundColor: '#f0f0f0'}}>
                            <Text style={{fontWeight: '500', fontSize: 15,}}>  {item.first} {item.last[0]}. <Text style={{fontWeight:'300'}}>({item.pronouns})</Text></Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text>  Phone Number: </Text>
                                <TouchableOpacity onPress={()=> {Linking.openURL(`tel:${item.phone}`);}}>
                                    <Text style={{fontWeight:'300', color: 'blue', textDecorationLine: 'underline'}}>{item.phone}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginLeft: 5, paddingBottom: 0,}}
                                    onPress={()=> {Linking.openURL(`sms:${item.phone}`);}}>
                                    <Icon name='mail' size={20}/>
                                </TouchableOpacity>
                            </View>
                            <View style = {[styles.lineStyle,{marginTop:5, width: '85%'}]} />
                        </View> })}
            
            </View>);
    }
    
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
            <View style={{flexDirection: 'row'}}>
                {/* <TouchableOpacity> */}
                <Icon name='edit' size={17}/>
                {/* </TouchableOpacity> */}
                <Text> Notes: {notes}.</Text>
            </View>
        </View>
      );
}

export default RelationshipCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
        borderRadius: 7.5,
        width: '100%',
        padding: 10,
        margin: 7.5,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 17
    },
    lineStyle:{
        borderWidth: 0.5,
        borderColor:'black',
        margin:10,
        marginBottom: 7,
   }
});