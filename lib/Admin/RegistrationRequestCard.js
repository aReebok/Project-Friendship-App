import React, { Component, useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button } from 'react-native';
import { Icon } from 'react-native-elements'

function RegistrationRequestCard (props) {
    const { email, fname, lname, role, phone } = props.user;

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

    const [hide, setHide] = useState(false);

    const addToProfiles = async () => {
        await handlePress('users/add', 'POST', { // adds into votes. 
            headers: {"Content-type": formContentType}, 
            body: `email=${email}&fname=${fname}&lname=${lname}&role=${role}&phone=${phone}`});
        await handlePress('register/request', 'DELETE', { // adds into votes. 
            headers: {"Content-type": formContentType}, 
            body: `email=${email}`});
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