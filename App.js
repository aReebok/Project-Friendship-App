import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Image, TextInput, Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const imageUrl = "https://i.imgur.com/fHyEMsl.jpg";
  const [img, setImg] = useState();
  const [qrInput, setQRInput] = useState(imageUrl);

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
    var parametersJson = {
      "size": 250, // Size of Qr Code
      "backgroundColor": "38-38-38", // Background Color Of Qr Code (In RGB)
      "qrColor": "255-255-255", // Color of Qr Code (In RGB)
      "padding": 2, // Padding 
      "data": "dev.to"
    };

    parametersJson.data = qrInput || "dev.to";
    var parameters = `size=${parametersJson.size}&bgcolor=${parametersJson.backgroundColor}&color=${parametersJson.qrColor}&qzone=${parametersJson.padding}&data=${parametersJson.data}` // Stitch Together all Paramenters
    var img_resp = `https://api.qrserver.com/v1/create-qr-code/?${parameters}` // Set Image URL To Link
    setQRInput(img_resp);
    console.log(qrInput);
  }

  return (
    <View style={styles.container}>
    <Image
          style={{width: '50%', height: '25%'}}
          source={{uri:qrInput}}
      />
      <Text>Open up App.js to start working on your app!</Text>
      <TextInput style={{width: '75%', borderWidth:1, padding: 10, margin: 10}} 
          placeholder="input QR value here"
          onChangeText={(value) => setQRInput(value)}/>
      <Button title='Generate QR code' onPress={()=> generateQRCode()}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 100,
    // justifyContent: 'center',
  },
});
