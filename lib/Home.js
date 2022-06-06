import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Modal, Image, TextInput, Button, StyleSheet, Text, View } from 'react-native';


function Home ({ route, navigation }) {
  const url='http://192.168.1.214:3001';  
  const formContentType = "application/x-www-form-urlencoded;charset=UTF-8";

  const imageUrl = "https://i.imgur.com/fHyEMsl.jpg";
  const [img, setImg] = useState();
  const [qrInput, setQRInput] = useState("null");
  const [modalVisible, setModalVisible] = useState(false);

  const fetchImage = async () => {
    const res = await fetch(imageUrl);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
  };


  useEffect(() => {
    fetchImage();
  }, []);

  const generateQRCode = async () => {
    const { sid } = route.params;
    console.log("recieved sid: " + sid)
    var parametersJson = {
      "size": 250, // Size of Qr Code
      "backgroundColor": "38-38-38", // Background Color Of Qr Code (In RGB)
      "qrColor": "255-255-255", // Color of Qr Code (In RGB)
      "padding": 2, // Padding 
      "data": "dev.to"
    };

    parametersJson.data = sid || "dev.to";
    var parameters = `size=${parametersJson.size}&bgcolor=${parametersJson.backgroundColor}&color=${parametersJson.qrColor}&qzone=${parametersJson.padding}&data=${parametersJson.data}` // Stitch Together all Paramenters
    var img_resp = `https://api.qrserver.com/v1/create-qr-code/?${parameters}` // Set Image URL To Link
    await setQRInput(img_resp);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        // presentationStyle='fullScreen'
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
    
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      {/* <TextInput style={{width: '75%', borderWidth:1, padding: 10, margin: 10}} 
          placeholder="input QR value here"
          onChangeText={(value) => setQRInput(value)}/> */}
      <Button title='Generate my QR code' onPress={()=> generateQRCode()}/>
      <Button title='Scan a QR code' onPress={()=> generateQRCode()}/>
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

});

export default Home;