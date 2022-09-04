import React, {Component, useState}  from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from '@rneui/base';

import { CheckBox } from "@rneui/themed";
import { SocialIcon } from 'react-native-elements'
import { TextInput, HelperText, 
    Modal, Portal, Provider} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { createRegistrationRequest, updateUserRegistrationRequest } from './GlobalFunctions/APICalls.js';

const CONFIG = require('../config/app.config.js');
const handlePress = require('./GlobalFunctions/HandlePress') 
const formContentType = CONFIG.formContentType;

const logo_colors = {
    logo_red: '#E6000C',
    logo_blue: '#00ABEB',
    logo_yellow: '#FF8D10' 
  }

const  RegisterScreen = (props) => {    
    // states
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [pronouns, setPronouns] = useState("");
    const [checked, setChecked] = React.useState(false);

    //drop down
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Mentor', value: 'mentor'},
      {label: 'Parent', value: 'parent'},
      {label: 'Admin', value: 'admin'},
    ]);

    const handleRegister = async () => {
      // check all fields are complete
      if (checked && fname && lname && email && phone && value && pronouns) {
        /* TEST CASES */
        //check if email already in users table
        var user = await handlePress('users', 'PUT', { // adds into votes. 
          headers: {"Content-type": formContentType}, body: `email=${email}&`});
        if (user.email) return alert("An account already exists by this username.");          
        
        //check if email already in register request table 
        var request = await handlePress('register', 'PUT', { // adds into votes. 
          headers: {"Content-type": formContentType}, body: `email=${email}`});
        if (request.email) return alert("This email has already requested registration. Please wait 2-3 days to have this request processed.");
        //check if email already in pre register table

        // send to DB table registerRequests\
        await createRegistrationRequest(fname, lname, email, phone, value, pronouns);
        // await handlePress('register', 'POST', { // adds into votes. 
        //   headers: {"Content-type": formContentType}, 
        //   body: `fname=${fname}&lname=${lname}&email=${email.toLowerCase()}&phone=${phone}&role=${value}`});
          alert("Your request has been sent to the Project Friendship Database. Your account may take up to 2-3 days to activate.")
          setFname(""); setLname(""); setEmail(""); setPhone(""), setPronouns(""), setChecked(false); setValue(null);
      } else {
        if (!value) alert("Make sure to select a role."); 
        else if (!checked) alert("Make sure to read and check the agreement.")
        else alert("Please try again: ensure every field is complete.")
      };
    }

    return (
        <View style={styles.container}>
        <Text style={{fontSize: 40, color: `${logo_colors.logo_blue}`}}>Create Account</Text>
        <Text>Note: It may take a few days to approve registration.</Text>
        <Text></Text>

        <TextInput 
            mode="outlined"
            label="First Name*"
            style={styles.input}
            activeOutlineColor={logo_colors.logo_blue}
            value={fname}
            onChangeText={fname => setFname(fname)}/>
                <Text></Text>
        <TextInput
            mode="outlined"
            label="Last Name*"
            style={styles.input}
            activeOutlineColor={logo_colors.logo_blue}
            value={lname}
            onChangeText={lname => setLname(lname)}/>
                <Text></Text>
        <TextInput
            mode="outlined"
            label="Email*"
            style={styles.input}
            activeOutlineColor={logo_colors.logo_blue}
            // activeOutlineColor='pink'
            value={email}
            onChangeText={email => setEmail(email)}/>
                <Text></Text>   
          <TextInput
            mode="outlined"
            label="Pronouns (format: She/her/hers)*"
            style={styles.input}
            activeOutlineColor={logo_colors.logo_blue}
            value={pronouns}
            onChangeText={pronouns => setPronouns(pronouns)}/> 
          <Text></Text>   

        <TextInput
            mode="outlined"
            label="Phone*"
            style={styles.input}
            activeOutlineColor={logo_colors.logo_blue}
            value={phone}
            onChangeText={phone => setPhone(phone)}/>
        <Text style={{marginVertical: 10}}>Select a role*:</Text>
        <DropDownPicker
            style={{ backgroundColor:'#f3f3f3', borderColor: 'grey'}}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
        />

        <CheckBox 
            title='I agree that all of the information above is correct and I am a part of the Project Friendship Program.*'
            checked={checked}
            checkedColor={logo_colors.logo_red}
            onPress={ () => setChecked(!checked)}
            />
            <TouchableOpacity style={styles.button}
              onPress={() => handleRegister()}>
            <Text style={{fontWeight:'bold', color:'white'}}>REGISTER</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2}
            onPress={()=>props.navigation.navigate('LoginScreen')}>
            <Text>LOGIN</Text>
            </TouchableOpacity>

        <StatusBar style="auto" />  
        </View>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // gap: 10,
    backgroundColor: 'white',
    paddingHorizontal: 25,
    marginTop: 40,
  },
  register:{
    flexDirection: "row",
    alignItems: 'center',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#00ABEB",
    padding: 10
  },
  button2: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    marginHorizontal: 150
  },
  input: {
    height: 45
  }
});
