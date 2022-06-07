import React, { Component, useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button } from 'react-native';
import { Icon } from 'react-native-elements'

function AdminPageCard (props) {
    const user = props.user;
    return(
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.name}>{user.fname} {user.lname}</Text>
                <Text style={{}}>{user.role}</Text>
            </View>
            
            <View style={styles.spaceBetween}>
                <View>
                    <Text>{user.email}</Text> 
                    <Text>{user.phone}</Text>
                </View>
                <View style={styles.spaceBetween}>
                    <TouchableOpacity style={styles.checkButton}>
                        <Icon name='check'/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editButton}>
                        <Icon name='edit'/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default AdminPageCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
        borderRadius: 7.5,
        width: '90%',
        padding: 10,
        margin: 7.5,
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