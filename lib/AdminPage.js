import React, { useState, useEffect, Component } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

import AdminPageCard from './AdminPageCard';

const  AdminPage = (props) => {  

    const url='http://192.168.1.214:3001';  
    const formContentType = "application/x-www-form-urlencoded;charset=UTF-8";

    const [requestItems, setRequestItems] = useState([]);
    const handlePressRequests = (op, method = '', params = {}) => {
        if (method != '')
            params.method = method;
        fetch(url + '/'+op, params)
            .then((response) => response.json()) // response.json()
            .then((responseText) => { setRequestItems(responseText);})
            .catch((error) => { console.error(error);});
    }

    useEffect(() => {
        handlePressRequests('register/request','GET');
    }, []);
    
    return( 
        <View style={styles.container}>
            <Text style={{fontSize: 20}}>REGISTRATION REQUESTS</Text>  
            <ScrollView style={{width: '100%'}}>
                { requestItems.map((item, index) => {
                        return <AdminPageCard key={index} user={item}/> })} 
            </ScrollView>
             
        </View>
    );
}

export default AdminPage;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: 50,
    //   justifyContent: 'center',
    },
  });