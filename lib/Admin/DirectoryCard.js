import React, { Component, useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, 
    StyleSheet, Button, Pressable, Modal, Alert } from 'react-native';
import { Icon } from 'react-native-elements'
import { TextInput } from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker';

const CONFIG = require('../../config/app.config');

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
      {label: 'Mentee', value: 'mentee'},
    ]);

    const [modalVisible, setModalVisible] = useState(false);    
    const [hide, setHide] = useState(false);    

    const url='http://192.168.1.214:3001';  
    const formContentType = CONFIG.formContentType;
    const logo_colors = {
        logo_red: '#E6000C',
        logo_blue: '#00ABEB',
        logo_yellow: '#FF8D10' }

    
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
    


    const resetStates = () => {
        setMail(email); setFirst(fname); setLast(lname); setPNum(phone); setValue(role);
    }
    const updateStates = () => {
        email = mail; fname = first; lname = last; role = value; phone = pnum;
    }

    const close = () => {
        setModalVisible(false);
        resetStates();
    }

    const save = () => {
        Alert.alert("Apply changes?", "Are you sure you'd like to apply your changes?", 
        [
            {
                text: 'Cancel',
                onPress: () => { console.log( 'edit save cancled' ); },
                style: 'cancel',
            },
            {
                text: 'Save',
                onPress: async() => { 
                    console.log('Save changes to user profile');
                    await handlePress('users', 'DELETE', { // adds into votes. 
                        headers: {"Content-type": formContentType}, 
                        body: `email=${email}`});
                    await handlePress('users', 'POST', { // adds into votes. 
                        headers: {"Content-type": formContentType}, 
                        body: `email=${mail}&fname=${first}&lname=${last}&role=${value}&phone=${pnum}`});
                    
                    setModalVisible(false);
                    updateStates();
                },
                style: 'save'
            }

        ])
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
                    await handlePress('users', 'DELETE', { // adds into votes. 
                        headers: {"Content-type": formContentType}, 
                        body: `email=${email}`});
                    await handlePress('relationship', 'DELETE', { // adds into votes. 
                        headers: {"Content-type": formContentType}, 
                        body: `email=${email}`});
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
                
                <Modal animationType="slide" transparent={true} visible={modalVisible} 
                onRequestClose={() => { Alert.alert("Modal has been closed.");setModalVisible(!modalVisible);}}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={{fontSize: 30, paddingBottom: 10, color: logo_colors.logo_blue}}>Edit User</Text>
                                <TextInput 
                                    style={styles.input}
                                    mode="outlined"
                                    label="First Name*"
                                    activeOutlineColor={logo_colors.logo_blue}
                                    value={first}
                                    onChangeText={fname => setFirst(fname)}/>
                                <TextInput
                                    style={styles.input}
                                    mode="outlined"
                                    label="Last Name*"
                                    activeOutlineColor={logo_colors.logo_blue}
                                    value={last}
                                    onChangeText={lname => setLast(lname)}/>
                                <TextInput 
                                    style={styles.input}
                                    mode="outlined"
                                    label="Email*"
                                    activeOutlineColor={logo_colors.logo_blue}
                                    // activeOutlineColor='pink'
                                    value={mail}
                                    onChangeText={email => setMail(email)}/>
                                <TextInput
                                    style={styles.input}
                                    mode="outlined"
                                    label="Phone*"
                                    activeOutlineColor={logo_colors.logo_blue}
                                    value={pnum}
                                    onChangeText={phone => setPNum(phone)}/>
                                <DropDownPicker
                                    style={{ backgroundColor:'#f3f3f3', borderColor: 'grey'}}
                                    open={open}
                                    value={value}
                                    items={items}
                                    setOpen={setOpen}
                                    setValue={setValue}
                                    setItems={setItems}
                                />
                                <View style={{flexDirection: 'row'}}>
                                    <Button title="Save" onPress={save}/>
                                    <Button title="Close" onPress={close} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.name}>{first} {last}</Text>
                    <Text style={{}}>{value}</Text>
                </View>
                
                <View style={styles.spaceBetween}>
                    <View>
                        <Text>{mail}</Text> 
                        <Text>{pnum}</Text>
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