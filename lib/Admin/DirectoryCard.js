import React, { Component, useState, useEffect } from 'react';
import { Linking, TouchableOpacity, View, Text, 
    StyleSheet, Button, Pressable, Modal, Alert } from 'react-native';
import { Icon } from 'react-native-elements'
import { TextInput } from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker';
import { updateUserProfile, deleteUserProfile } from '../GlobalFunctions/APICalls.js';
import EditUserModal from './EditUserModal.js';

const CONFIG = require('../../config/app.config.js');

function DirectoryCard (props) {
    let { email, fname, lname, role, phone } = props.user;
    const [mail, setMail] = useState(email);
    const [first, setFirst] = useState(fname);
    const [last, setLast] = useState(lname);
    const [pnum, setPNum] = useState(phone);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(role);
    const [items, setItems] = useState([
      {label: 'Mentor', value: 'mentor'},
      {label: 'Parent', value: 'parent'},
      {label: 'Admin', value: 'admin'},
    ]);

    const [modalVisible, setModalVisible] = useState(false);    
    const [hide, setHide] = useState(false);    

    const updateCard = (mail, first, last, value, pnum) => {
        email = mail; fname = first; lname = last; role = value; phone = pnum;
        setMail(mail); setFirst(first); setLast(last); setValue(value), setPNum(pnum);
    }

    const deleteUser = async () => {
        Alert.alert("Delete this user?", `Would you like to delete user: ${fname} ${lname} from the database?`,
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
                    await deleteUserProfile(email);
                    setHide(true);
                },
                style: 'delete'
            }
        ])
        return;
    }

    if (email) {
        return(
            <View style={styles.container}>
                
                <EditUserModal modalVisible={modalVisible} setModalVisible={setModalVisible} user={props.user} 
                    saveChanges={updateUserProfile} updateCard={updateCard}/>
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
                        {hide || <TouchableOpacity style={styles.checkButton}>
                            <Icon name='edit' onPress={()=>{ console.log("editing user: " + fname);setModalVisible(true)}}/>
                        </TouchableOpacity>}
                        {hide && <Text>User deleted from DB</Text> 
                            || <TouchableOpacity style={[styles.editButton, {backgroundColor: 'pink'}]}
                            onPress={()=>{deleteUser()}}>
                            <Icon name='delete'/>
                        </TouchableOpacity>}
                    </View>
                </View>
            </View>);
    }
    
    return( <View><Text>No registration requests.</Text></View>);
}

export default DirectoryCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
        borderRadius: 7.5,
        width: '96%',
        padding: 10,
        margin: 7.5,
    },
    input: {
        height: 40,
        width: '100%',
        marginBottom: 5,
        // borderWidth: 1,
        padding: 0,
      }, 
    centeredView: {
        flex: 1,
        marginTop: 25,
      },
      modalView: {
        margin: 50,
        marginHorizontal: 30,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        height: 700,
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