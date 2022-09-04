import React, { Component, useState, useEffect } from 'react';
import { Linking, TouchableOpacity, View, Text, 
    StyleSheet, Button, Pressable, Modal, Alert } from 'react-native';
import { Icon } from 'react-native-elements'


function LogCard (props) {
    // let { email, fname, lname, role, phone, pronouns} = props.user;
    const { log } = props;
    return (<View style={styles.container}>
        <Text>LOG---{log.duration} hrs</Text> 
    </View>);
}

export default LogCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
        borderRadius: 7.5,
        width: '96%',
        padding: 10,
        margin: 7.5,
    },
    input: {
        height: 40,
        width: '100%',
        marginBottom: 5,
        // borderWidth: 1,
        padding: 0,
      }, 
    centeredView: {
        flex: 1,
        marginTop: 25,
      },
      modalView: {
        margin: 50,
        marginHorizontal: 30,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        height: 700,
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
    name: {
        fontWeight: 'bold',
        fontSize: 17
    }, 
    spaceBetween: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    }, 
    checkButton: {
        backgroundColor: 'lightgreen', 
        padding: 3, 
        marginRight: 5,
        borderRadius: 3
    }, 
    editButton: {
        backgroundColor: 'yellow', 
        padding: 3,
        borderRadius: 3

    }
});