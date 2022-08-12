import React, { Component, useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button } from 'react-native';
import { Icon } from 'react-native-elements'
import { createUserProfile, deleteRegistrationRequest } from '../GlobalFunctions/APICalls.js';

function RegistrationRequestCard (props) {
    const { email, fname, lname, role, phone } = props.user;
    const [hide, setHide] = useState(false);

    const addToProfiles = async () => {
        await createUserProfile(email, fname, lname, role, phone)
        await deleteRegistrationRequest(email);
        setHide(true);
    }

    if (email) {
        return(
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.name}>{fname} {lname}</Text>
                    <Text style={{}}>{role}</Text>
                </View>
                
                <View style={styles.spaceBetween}>
                    <View>
                        <Text>{email}</Text> 
                        <Text>{phone}</Text>
                    </View>
                    <View style={styles.spaceBetween}>
                        {hide || <TouchableOpacity style={styles.checkButton}
                            onPress={()=>{addToProfiles()}}>
                            <Icon name='check'/>
                        </TouchableOpacity>}
                        {hide && <Text>User added to DB</Text> || <TouchableOpacity style={styles.editButton}>
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