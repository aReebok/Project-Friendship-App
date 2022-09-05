import React, {useState}  from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { CheckBox } from "@rneui/themed";
import { TextInput, } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { createRegistrationRequest, updateUserRegistrationRequest } from './src/GlobalFunctions/API/APICalls.js';
// import {  } from 'react-native';

const  {logo, formContentType} = require('../config/app.config.js');
const handlePress = require('./src/GlobalFunctions/API/HandlePress');

var deviceHeight = Dimensions.get('window').height

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
        if (value === 'mentor') { // check to make sure that it's either a stolaf.edu or carleton.edu email
          if (!email.includes("@stolaf.edu") && !email.includes("@carleton.edu")) 
            return Alert.alert("Invalid Mentor Email", "Email must be a St. Olaf or Carleton email if signing up as a mentor.")
        }
        /* TEST CASES */
        //check if email already in users table
        var user = await handlePress('users', 'PUT', {  
          headers: {"Content-type": formContentType}, body: `email=${email}&`});
        if (user.email) return alert("An account already exists by this username.");          
        
        //check if email already in register request table 
        var request = await handlePress('register', 'PUT', {  
          headers: {"Content-type": formContentType}, body: `email=${email}`});
        if (request.email) return alert("This email has already requested registration. Please wait 2-3 days to have this request processed.");

        // send to DB table registerRequests\
        await createRegistrationRequest(fname, lname, email, phone, value, pronouns);
        Alert.alert(`Account Request Sent for ${email}`,"Your request has been sent to the Project Friendship Database. Your account may take up to 2-3 days to activate.")
        setFname(""); setLname(""); setEmail(""); setPhone(""), setPronouns(""), setChecked(false); setValue(null);
        return props.navigation.navigate('LoginScreen');
      } else {
        if (!value) Alert.alert("Role Not Selected","Make sure to select a role."); 
        else if (!checked) Alert.alert("Agreement Not Read","Make sure to read and check the agreement.")
        else Alert.alert("Incomplete Input","Please try again: ensure every field is complete.")
      };
    }

    return (
        <View style={styles.container}>
        <Text style={{fontSize: 40, color: `${logo.blue}`}}>Create Account</Text>
        <Text>Note: It may take a few days to approve registration.</Text>
        <Text></Text>
        
        <TextInput 
            mode="outlined"
            label="First Name*"
            style={styles.input}
            activeOutlineColor={logo.blue}
            value={fname}
            onChangeText={fname => setFname(fname)}/>
        <TextInput
            mode="outlined"
            label="Last Name*"
            style={styles.input}
            activeOutlineColor={logo.blue}
            value={lname}
            onChangeText={lname => setLname(lname)}/>
        <TextInput
            mode="outlined"
            label="Email*"
            style={styles.input}
            activeOutlineColor={logo.blue}
            // activeOutlineColor='pink'
            value={email}
            onChangeText={email => setEmail(email)}/>
          <TextInput
            mode="outlined"
            label="Pronouns (format: She/her/hers)*"
            style={styles.input}
            activeOutlineColor={logo.blue}
            value={pronouns}
            onChangeText={pronouns => setPronouns(pronouns)}/> 

        <TextInput
            mode="outlined"
            label="Phone*"
            style={styles.input}
            activeOutlineColor={logo.blue}
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
            checkedColor={logo.red}
            onPress={ () => setChecked(!checked)}
            />
            <TouchableOpacity style={styles.button}
              onPress={() => handleRegister()}>
            <Text style={{fontWeight:'bold', color:'white'}}>REGISTER</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2}
            onPress={()=>props.navigation.navigate('LoginScreen')}>
            <Text>RETURN TO LOGIN</Text>
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
    marginTop: 20,
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
    padding: 12.5,
    marginHorizontal: 10
  },
  input: {
    height: deviceHeight * 0.07
  }
});
