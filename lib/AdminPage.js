import React, { useState, useEffect, Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import AdminPageCard from './AdminPageCard';

const  AdminPage = (props) => {  

    const url='http://192.168.1.214:3001';  
    const formContentType = "application/x-www-form-urlencoded;charset=UTF-8";

    const handlePress = async (op, method = '', params = {}) => {
        if (method != '')
            params.method = method;
        console.log('handlePress '+method+' '+ url+'/'+op);
        var ret_val = await fetch(url + '/'+op, params)
            .then((response) => response.text())
            .then((responseText) => {
                try { return JSON.parse(responseText); } 
                catch (error) { return responseText; }
            }).catch((error) => {
                console.error(error); });
        return ret_val;
    }


    const [requestItems, setRequestItems] = useState([{}]);
    
    const getRequests = async () => {
        var ret = await handlePress('register/request', 'GET', { // adds into votes. 
            headers: {"Content-type": formContentType} });
        // console.log(ret);
        ret.forEach(request => {
            setRequestItems([...requestItems, request]);
        })
    }

    useEffect(() => {
        getRequests('register/','GET');
    }, []);

    return( 
        <View style={styles.container}>
            <Text>REGISTRATION REQUESTS</Text>  
            {
                requestItems.map((item, index) => {
                    console.log(item);
                    return <AdminPageCard key={index} user={item}/>
                })
            }  
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