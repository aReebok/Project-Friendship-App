import React, { Component, useState, useEffect } from 'react';
import { Linking, TouchableOpacity, View, Text, StyleSheet, Button } from 'react-native';
import { Icon } from 'react-native-elements'
import { createUserProfile, deleteRegistrationRequest, updateRegistrationRequest } from '../GlobalFunctions/APICalls.js';
import EditUserModal from './EditUserModal.js';

function RegistrationRequestCard (props) {

    let { email, fname, lname, role, phone, pronouns } = props.user;
    const [mail, setMail] = useState(email);
    const [first, setFirst] = useState(fname);
    const [last, setLast] = useState(lname);
    const [pnum, setPNum] = useState(phone);
    const [value, setValue] = useState(role);


    const updateCard = (m, f, l, v, ph) => {
        email = m; fname = f; lname = l; role = v; phone = ph;
        setMail(m); setFirst(f); setLast(l); setValue(v), setPNum(ph);
    }

    const [modalVisible, setModalVisible] = useState(false);    
    const [hide, setHide] = useState(false);

    const addToProfiles = async () => {
        await createUserProfile(email, fname, lname, role, phone)
        await deleteRegistrationRequest(email);
        setHide(true);
    }

    if (email) {
        return(
            <View style={styles.container}>
                <EditUserModal modalVisible={modalVisible} setModalVisible={setModalVisible} user={props.user} 
                    saveChanges={updateRegistrationRequest} updateCard={updateCard}/>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.name}>{first} {last}</Text>
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
                        {hide || <TouchableOpacity style={styles.checkButton}
                            onPress={()=>{addToProfiles()}}>
                            <Icon name='check'/>
                        </TouchableOpacity>}
                        {hide && <Text>User added to DB</Text> || <TouchableOpacity onPress={()=> setModalVisible(true)} style={styles.editButton}>
                            <Icon name='edit'/>
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