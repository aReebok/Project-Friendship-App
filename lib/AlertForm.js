import React, {Component, useState}  from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, TouchableOpacity, Keyboard } from 'react-native';
import { Button } from '@rneui/base';
import { TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
// import logo from './src/pf_logo.jpg';

const logo_colors = {
    logo_red: '#E6000C',
    logo_blue: '#00ABEB',
    logo_yellow: '#FF8D10' 
  }

const  AlertForm = (props) => {  
    // states
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [email, setEmail] = useState("khan6@gmail.com");
    const [phone, setPhone] = useState("123-456-9234");
    // const [checked, setChecked] = React.useState(false);

    //drop down

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('all');
    const [items, setItems] = useState([
      {label: 'Carleton Students', value: 'carleton'},
      {label: 'St. Olaf Students', value: 'stolaf'},
      {label: 'All', value: 'all'},
    ]);

    return (
    <View style={styles.container}
    keyboardShouldPersistTaps='handled'>
      <Text style={{fontSize: 40, color: `${logo_colors.logo_red}`}}>Send ALERT</Text>
      <Text>NOTE: This alert push will send a notification to all indicated audiences. Your phone number or email will also be publicly displayed for others to contact you.

          To exit keyboard mode, press on title and press return. 
      </Text>
      <Text></Text>

      <TextInput 
        mode="outlined"
        label="Title*"
        activeOutlineColor={logo_colors.logo_red}
        value={title}
        
        onChangeText={title => setTitle(title)}/>
            <Text></Text>
      <TextInput
        mode="outlined"
        label="Description*"
        multiline
        activeOutlineColor={logo_colors.logo_red}
        value={desc}
        onChangeText={desc => setDesc(desc)}/>
              <Text></Text>
      <TextInput
        mode="outlined"
        label="Email"
        activeOutlineColor={logo_colors.logo_red}
        // activeOutlineColor='pink'
        disabled
        value={email}
        onChangeText={email => setEmail(email)}/>
            <Text></Text>   
      <TextInput
        mode="outlined"
        label="Phone"
        activeOutlineColor={logo_colors.logo_red}
        value={phone}
        disabled
        onChangeText={phone => setPhone(phone)}/>
        <Text></Text>
        <Text>Send to:</Text>
      <DropDownPicker
        text="Select audience"
        style={{marginTop:1, backgroundColor:'#f3f3f3', borderColor: 'grey'}}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}/> 
        <Text></Text>
        <TouchableOpacity
          style={styles.button}
        >
          <Text style={{fontWeight:'bold', color:'white'}}>PUSH ALERT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}
        onPress={()=>props.navigation.navigate('LoginScreen')}>
          <Text>EXIT</Text>
        </TouchableOpacity>

      <StatusBar style="auto" />  
    </View>
  );
}

export default AlertForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  register:{
    flexDirection: "row",
    alignItems: 'center',
  },
  button: {
    alignItems: "center",
    backgroundColor: logo_colors.logo_red,
    padding: 10
  },
  button2: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    marginHorizontal: 150
  },
});