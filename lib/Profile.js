import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Modal, Image, Button, 
  StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Icon } from '@rneui/themed'
import { TextInput } from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker';
import RelationshipCard from "./RelationshipCard.js";

const CONFIG = require('../config/app.config.js');
const { v4: uuidv4 } = require('uuid');

const handlePress = require('./GlobalFunctions/HandlePress'); 
const APICalls = require('./GlobalFunctions/APICalls');

function Profile ({ route, navigation }) {
  const formContentType = CONFIG.formContentType;
  
  // display QR CODE
  const imageUrl = "https://i.imgur.com/fHyEMsl.jpg";
  const [img, setImg] = useState();
  const [qrInput, setQRInput] = useState("null");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleScanner, setModalVisibleScanner] = useState(false);
  const [modalVisibleProfile, setModalVisibleProfile] = useState(false);
  const [modalVisibleRelations, setModalVisibleRelations] = useState(false);
  const [modalVisibleAddChild, setModalVisibleAddChild] = useState(false);

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
    
    const cid = parseInt(data);
    if(isNaN(cid)) return alert("Invalid QR Code: does not contain a child's profile.");
    
    try {    // check if child exists. 
      var child = await handlePress('child', 'PUT', { // retrieves child profile. 
        headers: {"Content-type": formContentType}, body: `cid=${cid}&`});
    } catch (error) {
      return console.log(error);
    }
    
    if (child) {
      var duplicateRS = await handlePress('childrs/checkDuplicateRS', 'PUT', { // adds into votes. 
        headers: {"Content-type": formContentType}, body: `cid=${cid}&email=${mail}`});
      const {role} = await handlePress('users', 'PUT', {
          headers: {"Content-type": formContentType}, body: `email=${mail}&`});
      if (role === "mentor") {
        try {
          var rs = await handlePress('childrs', 'PUT', { 
            // checks if mentor already has a pair. 
            headers: {"Content-type": formContentType}, body: `email=${mail}&`});  
          if(rs.length) {
            return Alert.alert("You're already matched with a mentee.");
          } else {
            // create match between mentor and child
            Alert.alert("Match found!",
            `Are you sure you'd like to add ${child.fname} as your mentee? Note: You can only add one!`,
            [
              {
                  text: 'Cancel',
                  onPress: () => { console.log( 'child add cancled' ); },
                  style: 'cancel',
              },
              {
                  text: 'Confirm',
                  onPress: async() => { 
                    console.log('Add child and relationship to db');
                    await handlePress('childrs', 'POST', {
                      headers: {"Content-type": formContentType}, 
                      body: `cid=${cid}&email=${mail}&isParent=${0}`});
                    
                    // get child's parents
                    var parents = await handlePress('childrs/findParentEmail', 'PUT', {
                      headers: {"Content-type": formContentType}, body: `cid=${cid}&`});
                      
                    var parentsInfo = [];
                    var curParent = {};  
                    if(!isParent) {
                      for (let i = 0 ; i < parents.length; i++) {
                        var p = await handlePress('users', 'PUT', {
                          headers: {"Content-type": formContentType}, body: `email=${parents[i].email}&`});
                        curParent = {
                          first: p.fname,
                          last: p.lname,
                          phone: p.phone,
                          pronouns: p.pronouns,
                        };
                        parentsInfo.push(curParent);
                      }
                      // console.log(parentsInfo)
                    }

                    let newChild = ({
                      person: `${child.fname} ${child.lname}`,
                      role: 'child',
                      cid: cid,
                      notes: child.notes,
                      dob: child.dob,
                      pronouns: child.pronouns,
                      hasMentor: 0,
                      mentorInfo: null,
                      parentsInfo: parentsInfo,
                    })
  
                    setRS([newChild, ...rs]);

                      setModalVisibleScanner(false);
                  },
                  style: 'confirm'
              }
          ])
          }
        } catch (error) { console.log(error); }
      } else if (role === "parent"){ 
        // check if match already created...

        // if parent, then add relationship
        Alert.alert("Child Found!",`Are you sure you'd like to add ${child.fname} as a child?`,[
          {
              text: 'Cancel',
              onPress: () => { console.log( 'child add cancled' ); },
              style: 'cancel',
          },
          {
              text: 'Confirm',
              onPress: async() => { 
                  console.log('Add child and relationship to db');
                  await handlePress('childrs', 'POST', {
                    headers: {"Content-type": formContentType}, 
                    body: `cid=${cid}&email=${mail}&isParent=${1}`});
                  // github issue #3
                  setModalVisibleScanner(false);
              },
              style: 'confirm'
          }
      ]);

      }
    } else Alert.alert("Child Not Found!", `We we're unable to find a child under that QR code in the project friendship db.`);
    
  
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

  const [childFname, setChildFirst] = useState("");
  const [childLname, setChildLast] = useState("");
  const [childSchool, setChildSchool] = useState("");
  const [childDOB, setChildDOB] = useState("");
  const [childPronouns, setChildPronouns] = useState("");
  const [childNotes, setChildNotes] = useState("");

  const [isParent, setIsParent] = useState(false);

  const [rs, setRS] = useState([]);

  const fetchUserRelationships = async (email) => {
    var relations = await APICalls.getRelationsByEmail(email);
    var arr = [];
    console.log(relations);
    for(let i = 0; i < relations.length; i++) {
      var cid = relations[i].cid;
      const {fname, lname, notes, pronouns, dob} = await APICalls.getChildProfileByChildID(cid);

      // find mentor 
      let mentor = await APICalls.getChildMentorEmailByChildID(cid);

      // find parents
      var parents = await APICalls.getChildParentEmailByChildID(cid);

      var parentsInfo = [];
      var curParent = {};  
      if(!isParent) {
        for (let i = 0 ; i < parents.length; i++) {
          let parentEmail = parents[i].email;
          var p = await APICalls.getUserProfile(parentEmail);
            curParent = {
              first: p.fname,
              last: p.lname,
              phone: p.phone,
              pronouns: p.pronouns,
            };
            // console.log(curParent);
          parentsInfo.push(curParent);
        }
        console.log(parentsInfo);
      }

      let email = null;
      if(mentor[0]) {
        email = mentor[0].email;
      } 
      
      var hasMentor = 0;
      if (email) {
          console.log("Child has a mentor!"); 
          hasMentor = 1;
          // query for mentor name 
          const { fname, lname, phone, pronouns } = await APICalls.getUserProfile(email);
          // console.log(fname);
          var mentorInfo = {
            first: fname,
            last: lname,
            phone,
            email,
            pronouns
          }

        } else {
          mentorInfo = null;
          console.log("child does not have a mentor!"); }
          arr.push({
            person: `${fname} ${lname}`,
            role: 'child',
            cid: relations[i].cid,
            dob: dob,
            notes,
            pronouns,
            hasMentor: hasMentor,
            mentorInfo: mentorInfo,
            parentsInfo: parentsInfo,
          })
    }
    setRS(arr)
  }

  const fetchUserInfo = async () => {
    var email = await APICalls.getEmailFromSessionID(sid);
    var {fname, lname, phone, role} = await APICalls.getUserProfile(email);
    setMail(email); setFirst(fname); setLast(lname); setPNum(phone); setValue(role);

    if (role === 'parent') {
      setIsParent(true);
    } else {setIsParent(false);}
    
    await fetchUserRelationships(email);
  }

  useEffect( async () => {
    fetchImage();
    fetchUserInfo();
  }, []);

  const { sid } = route.params;

  const generateQRCode = async (data) => {
    // console.log("recieved sid: " + sid)
    var parametersJson = {
      "size": 250,
      "backgroundColor": "38-38-38", 
      "qrColor": "255-255-255", 
      "padding": 2, 
      "data": `${imageUrl}`
      
    };

    parametersJson.data = data;
    var parameters = `size=${parametersJson.size}&bgcolor=${parametersJson.backgroundColor}&color=${parametersJson.qrColor}&qzone=${parametersJson.padding}&data=${parametersJson.data}` // Stitch Together all Paramenters
    var img_resp = `https://api.qrserver.com/v1/create-qr-code/?${parameters}` // Set Image URL To Link
    setQRInput(img_resp);
    setModalVisible(true);
  }
  
  const createChild = async () => {
    Alert.alert("Add child?", "Are you sure you've entered all information correctly?", 
      [
          {
              text: 'Cancel',
              onPress: () => { console.log( 'child add cancled' ); },
              style: 'cancel',
          },
          {
              text: 'Confirm',
              onPress: async() => { 
                  console.log('Adding child profile and relationship to db for parent');

                  await handlePress('child', 'POST', {
                      headers: {"Content-type": formContentType}, 
                      body: `fname=${childFname}&lname=${childLname}&dob=${childDOB}&school=${childSchool}&pronouns=${childPronouns}&notes=${childNotes}`});

                  const {cid, fname, lname} = await handlePress('child/dobSearch', 'PUT', {
                    headers: {"Content-type": formContentType}, 
                    body: `lname=${childLname}&dob=${childDOB}`});

                  await handlePress('childrs', 'POST', {
                    headers: {"Content-type": formContentType}, 
                    body: `cid=${cid}&email=${mail}&isParent=${1}`});

                  // add child to rs state variable
                  let newChild = ({
                    person: `${childFname} ${childLname}`,
                    role: 'child',
                    cid: cid,
                    dob: childDOB,
                    notes: childNotes,
                    hasMentor: 0,
                    mentorInfo: null,
                    parentsInfo: null,
                  })

                  setRS([newChild, ...rs]);
                    
                  // reset all fields 
                  setChildFirst(""); setChildLast(""); setChildDOB(""); setChildSchool(""); setChildPronouns("");  setChildNotes("");
                  setModalVisibleAddChild(false);

              },
              style: 'confirm'
          }

      ])
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
          <View style={[styles.modalView, {height: 700, margin:0, marginTop: 50}]}>
            <Text> You have {rs.length} relationships. </Text>
            <ScrollView style={{borderRadius: 7, height: 525, width: 350, paddingVertical: 10}}>
              {/* <Text>Hello World</Text> */}
              { rs.map((item, index) => { //<Text key={index}>{item.person}, {item.role}</Text>
                      return  <RelationshipCard key={index} child={item} isParent={isParent} 
                      modalVisible={setModalVisibleRelations} generateQRCode={generateQRCode}/>
              })} 

            </ScrollView> 
            <View>
              
            </View>
            <View style={{flex: 1, flexDirection: "row", justifyContent:'space-between', alignContent: 'flex-end'}}>
                {isParent && 
                    <Button title='Add a Child'
                    onPress={()=> {
                      setModalVisibleRelations(false);
                      setModalVisibleAddChild(true);
                      }}/>}
                {!isParent && <Button title='My QR code'
                  onPress={()=> { 
                    setModalVisibleRelations(false); 
                    generateQRCode(sid)}}/>}
                <Button title='Scan QR to Add Child' onPress={()=> {
                    setModalVisibleRelations(false); 
                    scanQRCode()
                  }}/>  
              </View>   
          </View>
                <Button title='close' onPress={() => setModalVisibleRelations(false)}/>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleAddChild}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!setModalVisibleAddChild);
        }} >
          <View style={[styles.modalView, {marginTop: 180, height: 430}]}>
            <Text style={{fontWeight: 'bold'}}> Child Information </Text>
            <TextInput 
              style={styles.input}
              mode="outlined"
              placeholder="Enter your child's first name"
              label="First Name*"
              activeOutlineColor={'blue'}
              value={childFname}
              onChangeText={childFname => setChildFirst(childFname)}/>
            <TextInput 
              style={styles.input}
              mode="outlined"
              placeholder="Enter your child's last name"
              label="Last Name*"
              activeOutlineColor={'blue'}
              value={childLname}
              onChangeText={childLname => setChildLast(childLname)}/>
            <TextInput 
              style={styles.input}
              mode="outlined"
              placeholder="Enter your child's school name"
              label="School Name*"
              activeOutlineColor={'blue'}
              value={childSchool}
              onChangeText={childSchool => setChildSchool(childSchool)}/>
            <TextInput 
              style={styles.input}
              mode="outlined"
              placeholder="mm/dd/year"
              label="Child's Birthday*"
              activeOutlineColor={'blue'}
              value={childDOB}
              onChangeText={childDOB => setChildDOB(childDOB)}/>
            <TextInput 
              style={styles.input}
              mode="outlined"
              placeholder="I.e. she/her/hers"
              label="Child's Pronouns*"
              activeOutlineColor={'blue'}
              value={childPronouns }
              onChangeText={childPronouns => setChildPronouns(childPronouns)}/>
            <TextInput 
              style={styles.input}
              mode="outlined"
              placeholder="I.e alergies, preferences?"
              label="Additional Notes"
              activeOutlineColor={'blue'}
              value={childNotes}
              onChangeText={childNotes => setChildNotes(childNotes)}/>

            <Button title="Create Child"
            onPress={()=> {createChild();}}/>
          </View>
          <Button title='Discard' onPress={() => setModalVisibleAddChild(false)}/>
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
        <Button title='Profile Information' onPress={()=> {setModalVisibleProfile(true)}}/>
        <Button title= "Relationships/QR Codes" onPress={()=> {setModalVisibleRelations(true)}}/>
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
    marginTop: 230,
    backgroundColor: "white",
    borderRadius: 20,
    padding: '8%',
    paddingBottom: '5%',
    // paddingBottom: 5,
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