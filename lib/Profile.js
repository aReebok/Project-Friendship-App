import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Modal, Image, Button, 
  StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Icon } from '@rneui/themed'
import { TextInput } from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker';


function Profile ({ route, navigation }) {
  const url='http://192.168.1.214:3001';  
  const formContentType = "application/x-www-form-urlencoded;charset=UTF-8";
  
  const handlePress = async (op, method = '', params = {}) => {
    if (method != '')
        params.method = method;
    console.log('handlePress '+method+' '+ url+'/'+op);
    var ret_val = await fetch(url + '/'+op, params)
        .then((response) => response.text())
        .then((responseText) => {
          return JSON.parse(responseText);
        })
        .catch((error) => {
            console.error(error); 
        });
    return ret_val;
}

  // display QR CODE
  const imageUrl = "https://i.imgur.com/fHyEMsl.jpg";
  const [img, setImg] = useState();
  const [qrInput, setQRInput] = useState("null");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleScanner, setModalVisibleScanner] = useState(false);
  const [modalVisibleProfile, setModalVisibleProfile] = useState(false);
  const [modalVisibleRelations, setModalVisibleRelations] = useState(false);

  // scan qr code
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const fetchImage = async () => {
    const res = await fetch(imageUrl);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
  };


  const scanQRCode = async () =>  {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    setModalVisibleScanner(true);
  }

  const handleBarCodeScanned = async ({ type, data }) => {
    await setScanned(true);
    const sid = data;
    console.log("Passing in sid by a put request: " + sid)
    var user = await handlePress('session', 'PUT', { // adds into votes. 
      headers: {"Content-type": formContentType}, body: `sid=${sid}&`});
      // var name = 'fefoiehof';
    //" would you like ot send request to user: NAME"
    // yes, no
    if (user.email) { await alert(`Would you like to friend ${user.email}`);
    } else {
      await Alert.alert('Failed Scan', 
      'Please scan again. No account found for that QR code.', [
        { text: 'Scan again', onPress: () => setScanned(false) }, ]) ;
    }  
  };

  const [mail, setMail] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [pnum, setPNum] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Mentor', value: 'mentor'},
    {label: 'Parent', value: 'parent'},
    {label: 'Mentee', value: 'mentee'},
  ]);

  const [isParent, setIsParent] = useState(false);

  const [rs, setRS] = useState([]);

  const pushRSToArray = (arr, p, r) => {
    arr.push({
      person: p,
      role: r,
    })
  } 

  const fetchUserRelationships = async (email) => {
    var relations = await handlePress('relationship', 'PUT', {
      headers: {"Content-type": formContentType}, body: `email=${email}&`});
    var arr = [];
    for(let i = 0; i < relations.length; i++) {
      if (relations[i].person1 === email) 
        pushRSToArray(arr, relations[i].person2, relations[i].role2);
      else  pushRSToArray(arr, relations[i].person1, relations[i].role1);
    }
    setRS(arr)
  }

  const fetchUserInfo = async () => {
    var { email } = await handlePress('session', 'PUT', {
      headers: {"Content-type": formContentType}, body: `sid=${sid}&`});
    var {email, fname, lname, phone, role} = await handlePress('users', 'PUT', {
      headers: {"Content-type": formContentType}, body: `email=${email}&`});
    setMail(email); setFirst(fname); setLast(lname); setPNum(phone); setValue(role);

    if (role === 'parent') {
      setIsParent(true);
    }
    
    await fetchUserRelationships(email);
  }

  useEffect( async () => {
    fetchImage();
    fetchUserInfo();
  }, []);

  const { sid } = route.params;

  const generateQRCode = async () => {
    console.log("recieved sid: " + sid)
    var parametersJson = {
      "size": 250,
      "backgroundColor": "38-38-38", 
      "qrColor": "255-255-255", 
      "padding": 2, 
      "data": `${imageUrl}`
    };

    parametersJson.data = sid;
    var parameters = `size=${parametersJson.size}&bgcolor=${parametersJson.backgroundColor}&color=${parametersJson.qrColor}&qzone=${parametersJson.padding}&data=${parametersJson.data}` // Stitch Together all Paramenters
    var img_resp = `https://api.qrserver.com/v1/create-qr-code/?${parameters}` // Set Image URL To Link
    await setQRInput(img_resp);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      {/* This is modal for QR code generator */}  
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }} >
          <View style={styles.modalView}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={{uri:qrInput}}/>
          </View>
          <Button title='close' onPress={() => setModalVisible(false)}/>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleRelations}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!setModalVisibleRelations);
        }} >
          <View style={styles.modalView}>
            <Text> You have {rs.length} relationships. </Text>
            { rs.map((item, index) => {
                    return  <Text key={index}>{item.person}, {item.role}</Text>})} 
                    {/* <RegistrationRequestCard key={index} user={item}/> */}
          </View>
          <Button title='close' onPress={() => setModalVisibleRelations(false)}/>
      </Modal>

      {/* This is modal for QR code scanner */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleScanner}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleScanner(!modalVisibleScanner);
          setModalVisibleScanner(false);
            setHasPermission(null);
            setScanned(false);}}>
          <View style={styles.modalView}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
              />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
          </View>
          <Button title='close' onPress={() => {
            setModalVisibleScanner(false);
            setHasPermission(null);
            setScanned(false);
            }}/>
      </Modal>

      {/* This is modal for profile editing */}
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleProfile}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisibleProfile);
        }} >
          <View style={styles.modalView}>
            <Text>My Profile</Text>
            <TextInput 
              style={styles.input}
              mode="outlined"
              disabled='true'
              label="First Name*"
              activeOutlineColor={'blue'}
              value={first}
              onChangeText={fname => setFirst(fname)}/>
            <TextInput
              style={styles.input}
              mode="outlined"
              disabled='true'
              label="Last Name*"
              activeOutlineColor={'blue'}
              value={last}
              onChangeText={lname => setLast(lname)}/>
            <TextInput 
              style={styles.input}
              mode="outlined"
              label="Email*"
              disabled='true'
              activeOutlineColor={'blue'}
              value={mail}
              onChangeText={email => setMail(email)}/>
            <TextInput
              style={styles.input}
              mode="outlined"
              disabled='true'
              label="Phone*"
              activeOutlineColor={'blue'}
              value={pnum}
              onChangeText={phone => setPNum(phone)}/>
              <DropDownPicker
                  style={{ backgroundColor:'#f3f3f3', borderColor: 'grey'}}
                  disabled='true'
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
              />
              <View style={{flexDirection: 'row', paddingTop: 35}}>
                  <Button title="Close" onPress={() => setModalVisibleProfile(false)}/>
              </View>
          </View>
      </Modal>
            
      <View style={{flex: 12.5, justifyContent: "center" }}>
        <Button title='View Profile' onPress={()=> {setModalVisibleProfile(true)}}/>
        <Button title='View Relationships' onPress={()=> {setModalVisibleRelations(true)}}/>
        {isParent && <Button title='add Child'/>}
        <Button title='Generate my QR code' onPress={()=> generateQRCode()}/>
        <Button title='Scan a QR code' onPress={()=> scanQRCode()}/>
      </View> 

      <View style={styles.navigation_bar}>
        <TouchableOpacity onPress={()=> console.log("Pressed Chat")}>
            <Icon name='chat' size={50} color='white'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> {            
            return navigation.navigate('Event', { sid });}}>
            <Icon name='event' size={50} color='white'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> {
                return navigation.navigate('Home', { sid });}}>
            <Icon name='home' size={50} color='white'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> {
            return navigation.navigate('AlertForm', { sid });
        }}>
            <Icon name='warning' size={50} color='white'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> {
            return navigation.navigate('Profile', { sid });
        }}>
            <Icon name='face' size={50} color='white'/>
        </TouchableOpacity>
    </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: 100,
  },
  modalView: {
    margin: 20,
    marginTop: 250,
    backgroundColor: "white",
    borderRadius: 20,
    padding: '10%',
    height: 400,
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
  navigation_bar: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',

    backgroundColor: '#00ABEB',
    height: 10,
    width: '100%'
  }, 
  input: {
    height: 40,
    width: '100%',
    marginBottom: 5,
    // borderWidth: 1,
    padding: 0,
  }, 
});

export default Profile;