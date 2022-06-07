import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Modal, Image, TextInput, Button, StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

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
    var sid = data;
    console.log("Passing in sid by a put request: " + sid)
    var user = await handlePress('session/get', 'PUT', { // adds into votes. 
      headers: {"Content-type": formContentType}, body: `sid=${sid}&`});
      // var name = 'fefoiehof';
    //" would you like ot send request to user: NAME"
    // yes, no
    await alert(`Would you like to friend ${user.email}`);
  };

  

  useEffect(() => {
    fetchImage();
  }, []);

  const generateQRCode = async () => {
    const { sid } = route.params;
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
        visible={modalVisibleScanner}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleScanner(!modalVisibleScanner);
          setModalVisibleScanner(false);
            setHasPermission(null);
            setScanned(false);
        }} >
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

      <Button title='Generate my QR code' onPress={()=> generateQRCode()}/>
      <Button title='Scan a QR code' onPress={()=> scanQRCode()}/>
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

export default Profile;