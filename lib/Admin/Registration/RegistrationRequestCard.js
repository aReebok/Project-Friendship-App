import React, { Component, useState, useEffect } from 'react';
import { Alert, Linking, TouchableOpacity, View, Text, StyleSheet, Button } from 'react-native';
import { Icon } from 'react-native-elements'
import { createUserProfile, deleteRegistrationRequest, updateRegistrationRequest } from '../../src/GlobalFunctions/API/APICalls.js';
import EditUserModal from '../EditUserModal.js';

function RegistrationRequestCard (props) {

    let { email, fname, lname, role, phone, pronouns } = props.user;
    const [mail, setMail] = useState(email);
    const [first, setFirst] = useState(fname);
    const [last, setLast] = useState(lname);
    const [pnum, setPNum] = useState(phone);
    const [pnouns, setPnouns] = useState(pronouns);
    const [value, setValue] = useState(role);


    const updateCard = (m, f, l, v, ph, pn) => {
        email = m.toLowerCase(); fname = f; lname = l; role = v; phone = ph; pronouns = pn;
        setMail(m.toLowerCase()); setFirst(f); setLast(l); setValue(v), setPNum(ph); setPnouns(pn);
    }

    const [modalVisible, setModalVisible] = useState(false);    
    const [hide, setHide] = useState(false);
    const [displayText, setDisplayText] = useState("Accepted to Project Friendship");

    const deleteRegistrationReq = async () => {
        Alert.alert("Delete this user's registration request?", `Would you like to delete user: ${fname} ${lname}'s registration request from the database?`,
        [
            {
                text: 'Cancel',
                onPress: () => console.log("Cancel Pressed"),
                style: 'cancel'
            },
            { 
                text: "Delete", 
                onPress: async () => {
                    console.log("delete Pressed")
                    await deleteRegistrationRequest(email);
                    setDisplayText("Request denied.")
                    setHide(true);
                },
                style: 'delete'
            }
        ])
        return;
    }


    const addToProfiles = async () => {
        

        Alert.alert("Add this user profile?", `Would you like to add user: ${first} ${last}'s to the Project Friendship database?`,
        [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            { 
                text: "Add User", 
                onPress: async () => {
                    await createUserProfile(mail.toLowerCase(), first, last, value, pnum, pnouns);
                    await deleteRegistrationRequest(email);
                    setDisplayText("User request accepted.");
                    setHide(true);
                },
                style: 'confirm'
            }
        ])
        return;
    }

    if (email) {
        return(
            <View style={styles.container}>
                <EditUserModal modalVisible={modalVisible} setModalVisible={setModalVisible} user={props.user} 
                    saveChanges={updateRegistrationRequest} updateCard={updateCard}/>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.name}>{first} {last} ({pnouns})</Text>
                    <Text style={{}}>{value}</Text>
                </View>
                
                <View style={styles.spaceBetween}>
                    <View>
                        <TouchableOpacity onPress={() => Linking.openURL(`mailto:${mail}`)}>
                            <Text style={{color: 'blue', textDecorationLine: 'underline'}}>{mail}</Text> 
                        </TouchableOpacity>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity onPress={() => Linking.openURL(`tel:${pnum}`)}>
                                <Text style={{color: 'blue', textDecorationLine: 'underline'}}>{pnum}</Text> 
                            </TouchableOpacity>  
                            <TouchableOpacity style={{paddingLeft: 5, marginBottom: -13}} onPress={() => Linking.openURL(`sms:${pnum}`)}>
                                <Icon name='mail' size={20}></Icon>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.spaceBetween}>
                        {hide ||  <TouchableOpacity onPress={()=> addToProfiles()} style={styles.checkButton}>
                            <Icon name='check'/>
                        </TouchableOpacity>}
                        {hide ||  <TouchableOpacity onPress={()=> setModalVisible(true)} style={styles.editButton}>
                            <Icon name='edit'/>
                        </TouchableOpacity>}
                        {hide && <Text>{displayText}</Text> 
                            || <TouchableOpacity style={[styles.editButton, {marginLeft: 3, backgroundColor: 'pink'}]}
                            onPress={()=>{deleteRegistrationReq()}}>
                            <Icon name='delete'/>
                        </TouchableOpacity>}
                    </View>
                </View>
            </View>);
    }
    
    return( <View><Text>No registration requests.</Text></View>);
}

export default RegistrationRequestCard;

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
        fontSize: 18
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