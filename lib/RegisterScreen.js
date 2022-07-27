import React, {Component, useState}  from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from '@rneui/base';

import { CheckBox } from "@rneui/themed";
import { SocialIcon } from 'react-native-elements'
import { TextInput, HelperText, 
    Modal, Portal, Provider} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

const CONFIG = require('../config/app.config.js');

const url=CONFIG.url;  
const formContentType = CONFIG.formContentType;

const handlePress = async (op, method = '', params = {}) => {
  if (method != '')
      params.method = method;
  console.log('handlePress '+method+' '+ url+'/'+op);
  var ret_val = await fetch(url + '/'+op, params)
      .then((response) => response.text())
      .then((responseText) => {
        console.log(responseText);
        try { return JSON.parse(responseText); } 
        catch (error) { return responseText; }
      }).catch((error) => {
          console.error(error); });
          console.log("line 27 return val: "  + ret_val);
  return ret_val;
}



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
      if (checked && fname && lname && email && phone && value) {
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
        await handlePress('register', 'POST', { // adds into votes. 
          headers: {"Content-type": formContentType}, 
          body: `fname=${fname}&lname=${lname}&email=${email.toLowerCase()}&phone=${phone}&role=${value}`});
          alert("Your request has been sent to db. Since you're not preregistered, your accounr may take up to 2-3 days to activate.")
          setFname(""); setLname(""); setEmail(""); setPhone(""), setChecked(false); setValue(null);
      } else {
        if (!value) alert("Make sure to select a role."); 
        else if (!checked) alert("Make sure to read and check the agreement.")
        else alert("ERROR: ensure every field is complete.")
      };
    }

    return (
        <View style={styles.container}>
        <Text style={{fontSize: 40, color: `${logo_colors.logo_blue}`}}>Create Account</Text>
        <Text>Note: Unless you're preregistered in the database, the registration request will 
            take 2-3 business days to get accepted.</Text>
        <Text></Text>

        <TextInput 
            mode="outlined"
            label="First Name*"
            activeOutlineColor={logo_colors.logo_blue}
            value={fname}
            
            onChangeText={fname => setFname(fname)}/>
                <Text></Text>
        <TextInput
            mode="outlined"
            label="Last Name*"
            activeOutlineColor={logo_colors.logo_blue}
            value={lname}
            onChangeText={lname => setLname(lname)}/>
                <Text></Text>
        <TextInput
            mode="outlined"
            label="Email*"
            activeOutlineColor={logo_colors.logo_blue}
            // activeOutlineColor='pink'
            value={email}
            onChangeText={email => setEmail(email)}/>
                <Text></Text>   
        <TextInput
            mode="outlined"
            label="Phone*"
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
});
