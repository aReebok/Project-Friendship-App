import React, { Component, useState, useEffect } from 'react';
import { View, Text, 
    StyleSheet, Button, Pressable, Modal, Alert } from 'react-native';
import { TextInput } from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker';
import { logo } from '../../config/app.config';

const EditUserModal = (props) => {  

    const {modalVisible, setModalVisible, saveChanges, updateCard} = props;
    let { email, fname, lname, role, phone, pronouns } = props.user;
    // console.log(pnouns)

    const [mail, setMail] = useState(email);
    const [first, setFirst] = useState(fname);
    const [last, setLast] = useState(lname);
    const [pnum, setPNum] = useState(phone);
    const [pnouns, setPnouns] = useState(pronouns);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(role);
    const [items, setItems] = useState([
      {label: 'Mentor', value: 'mentor'},
      {label: 'Parent', value: 'parent'},
      {label: 'Admin', value: 'admin'},
    ]);

    const resetStates = () => {
        setMail(email); setFirst(fname); setLast(lname); setPNum(phone); setValue(role); setPnouns(pronouns);
    }
    const updateStates = () => {
        email = mail; fname = first; lname = last; role = value; phone = pnum; pronouns = pnouns;
        updateCard(mail, first, last, value, pnum, pnouns);
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
                    await saveChanges (email, mail, first, last, value, pnum, pnouns); //update user profile
                    setModalVisible(false);
                    updateStates();
                },
                style: 'save'
            }

        ])
    }

    return( 
        <Modal animationType="slide" transparent={true} visible={modalVisible} 
            onRequestClose={() => { Alert.alert("Modal has been closed.");setModalVisible(!modalVisible);}}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{fontSize: 30, paddingBottom: 10, color: logo.blue}}>Edit User</Text>
                        <TextInput 
                            style={styles.input}
                            mode="outlined"
                            label="First Name*"
                            activeOutlineColor={logo.blue}
                            value={first}
                            onChangeText={fname => setFirst(fname)}/>
                        <TextInput
                            style={styles.input}
                            mode="outlined"
                            label="Last Name*"
                            activeOutlineColor={logo.blue}
                            value={last}
                            onChangeText={lname => setLast(lname)}/>
                        <TextInput 
                            style={styles.input}
                            mode="outlined"
                            label="Email*"
                            activeOutlineColor={logo.blue}
                            // activeOutlineColor='pink'
                            value={mail}
                            onChangeText={email => setMail(email)}/>
                        <TextInput 
                            style={styles.input}
                            mode="outlined"
                            label="Pronouns (format: She/her/hers)*"
                            activeOutlineColor={logo.blue}
                            value={pnouns}
                            onChangeText={pnouns => setPnouns(pnouns)}/>
                        <TextInput
                            style={styles.input}
                            mode="outlined"
                            label="Phone*"
                            activeOutlineColor={logo.blue}
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
        
        );
}

export default EditUserModal;

const styles = StyleSheet.create({
    
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
});