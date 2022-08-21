import * as React from 'react';
import { Dimensions, Button, View, StyleSheet, ScrollView } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { Icon } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { logo } from '../config/app.config';

const Home = (props) => {
    const { sid, role } = props.route.params;
    console.log("Navigated to home! ")

    return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={{fontSize: 30, color: 'white'}}>
                DASHBOARD</Text>
            <Text style={{fontSize: 25, color: 'white'}}>
                Welcome, Areeba!</Text>
            {/* <Icon name='assessment' color='white'/> */}
        </View>
        
        <View style={{flex: 16}}> 
            <View style={styles.card}> 
                
                <View style={{flexDirection: 'row'}}> 
                    <Text style={{fontSize: 25,}}>
                    Notifications</Text>
                    <View style={styles.circle}><Text style={{fontSize: 15, color: 'white'}}>4</Text></View>
                    </View>
                <ScrollView>
                </ScrollView>    
            </View>
            
            <View style={styles.card}>
                <View style={styles.upcomingBox}> 
                    <Text style={{fontSize: 25, }}>
                    Upcoming Events</Text>
                    { true && <Text style={{}}>No upcoming events</Text>}

                    <ScrollView style={{marginBottom: 35}}></ScrollView>
                </View>
            </View>
        </View>

        
        <View style={styles.navigation_bar}>
            <TouchableOpacity onPress={()=> { return;     
                return props.navigation.navigate('MessageWall', { sid }); }}>
                <Icon name='chat' size={50} color='white'/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> { 
                return props.navigation.navigate('Event', { sid }); }}>
                <Icon name='event' size={50} color='white'/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> { 
                return props.navigation.navigate('Home', { sid });}}>
                <Icon name='home' size={50} color='white'/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> { 
                return props.navigation.navigate('AlertForm', { sid });}}>
                <Icon name='warning' size={50} color='white'/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> { 
                return props.navigation.navigate('Profile', { sid, role });}}>
                <Icon name='face' size={50} color='white'/>
            </TouchableOpacity>
        </View>
    </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F0F5FF',
    },

    header: { 
        padding: 10,
        flex: 2,
        backgroundColor: '#00ABEB'
    },
    
    card: {
        margin:10,
        marginTop: 10,
        backgroundColor: '#FFFFFF',
        padding: 5,
        height: 302,

        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        borderBottomWidth: 2,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.20,
        shadowRadius: 10,
    
    },

    notifContainer: {
        // paddingTop:5,
        borderRadius: 5.1,
        backgroundColor: '#E6000C'
    },

    notifCard_event: {
        flex: 1,
        flexDirection: 'row',
        
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: '#f3f3f3', 
        padding: 5,
        marginLeft: 6,
        justifyContent:'space-between',
    },
    title: {
        paddingLeft:5,
        fontWeight: 'bold',
        fontSize: 16,
    },
    subtitle: {
        paddingLeft:5,
        fontSize: 13,

    }, 
    event_container:{
        flex:1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        // alignContent: 'stretch',
        justifyContent: 'space-around',
        marginBottom: 100
    },

    upcoming_event: {
        backgroundColor: 'pink',
        width: 175,
        height: 110,
        marginTop: 6,
        backgroundColor: '#f3f3f3', 
        padding: 2,
    }, 
    
    upcoming_event_container: {
        backgroundColor: logo.blue,
        borderRadius: 5,
        marginTop: 6
    }, 

    circle: {
        backgroundColor: 'red',
        alignContent: 'center',
        justifyContent: 'center',
        marginLeft: 7,
        padding: 5,
        paddingHorizontal:10,
        borderRadius: 20
    },

    navigation_bar: {
        flex: 1.5,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',

        backgroundColor: '#00ABEB',
        height: '100%',
        width: '100%'
    }   
    
  });
  