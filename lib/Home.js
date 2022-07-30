import * as React from 'react';
import { Dimensions, Button, View, StyleSheet, ScrollView } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { Icon } from '@rneui/themed'
import { TouchableOpacity } from 'react-native-gesture-handler';

const handlePress = require('./GlobalFunctions/HandlePress') 

const NO_WIDTH_SPACE = '​';
const highlight = (string, color) =>
    string.split(' ').map((word, i) => (
      <Text key={i}>
        <Text style={{backgroundColor: color}}>{word} </Text>
        {NO_WIDTH_SPACE}
      </Text>
    ));
    const {width: windowWidth} = Dimensions.get('window');

    const logo_colors = {
        logo_red: '#E6000C',
        logo_blue: '#00ABEB',
        logo_yellow: '#FF8D10' 
      }
      

const Home = (props) => {
    const { sid } = props.route.params;
    return (
    <View style={styles.container}>
        {false && <View style={{backgroundColor: 'red', padding: 10,}}>
            <ScrollView
            horizontal={true}   showsHorizontalScrollIndicator={false}>
                        <Text style={{color: 'white', fontWeight:'bold'}}>
                ALERT: GREEN iPHONE 11 LOST. CALL 234567890. This is a longer notice. 
            </Text>
            </ScrollView>
            </View>}
        <View style={styles.header}>
            <Text style={{fontSize: 30, color: 'white'}}>
                DASHBOARD</Text>
            <Text style={{fontSize: 25, color: 'white'}}>
                Welcome, Areeba!</Text>
            {/* <Icon name='assessment' color='white'/> */}
        </View>

        <View style={styles.card}> 
            
            <View style={{flexDirection: 'row'}}> 
                <Text style={{fontSize: 25,}}>
                Notifications</Text>
                <View style={styles.circle}><Text style={{fontSize: 15, color: 'white'}}>4</Text></View>
                </View>
            <ScrollView>
                <View style={styles.notifContainer}>
                    <View style={styles.notifCard_event}>
                        <View style={{flex: 2.5, flexDirection:'row', }}>
                            <View style={{justifyContent: 'center', alignContent: 'center'}}>
                                <Icon name='event' size={45} opacity='0.8'/>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={styles.title}>Clay Pottery at St. Olaf College</Text>
                                <Text style={styles.subtitle}>Requested by Sarah's Mom. </Text>
                                <Text style={styles.subtitle}>Suggested date: 5/27/2022 at 3:00 PM </Text>
                            </View>
                        </View>
                        
                        <View style={{justifyContent: 'end'}}>
                            <View style={{paddingRight: 3}}> 
                                <Text>6hr ago</Text>
                            </View>
                            <View style={{paddingTop: 10, flexDirection:'row', justifyContent: 'space-around'}}>
                                <Icon name='done' color='green' size={25}/>
                                <Icon name='edit' color={logo_colors.logo_red} size={25}/>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{padding: 3}}></View>
                <View style={[styles.notifContainer, {backgroundColor: logo_colors.logo_yellow}]}>
                    <View style={styles.notifCard_event}>
                        <View style={{flex: 2.5, flexDirection:'row', }}>
                            <View style={{justifyContent: 'center', alignContent: 'center'}}>
                                <Icon name='event' size={45} opacity='0.8'/>
                            </View>
                            <View style={{flex:2}}>
                                <Text style={styles.title}>New Time Suggestion</Text>
                                <Text style={styles.subtitle}>For Ice Cream Social by Sams's Dad. </Text>
                                <Text style={styles.subtitle}>Suggested date: 5/26/2022 at 12:00 PM </Text>
                            </View>
                        </View>
                        
                        <View style={{flex: 0.5, justifyContent: 'end'}}>
                            <View style={{paddingRight: 3,}}> 
                                <Text>12hr ago</Text>
                            </View>
                            <View style={{paddingTop: 10, flexDirection:'row', justifyContent: 'space-around'}}>
                                <Icon name='done' color='green' size={25}/>
                                <Icon name='edit' color={logo_colors.logo_red} size={25}/>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{padding: 3}}></View>
                <View style={[styles.notifContainer, {backgroundColor: logo_colors.logo_blue}]}>
                    <View style={styles.notifCard_event}>
                        <View style={{flex: 2.5, flexDirection:'row', }}>
                            <View style={{justifyContent: 'center', alignContent: 'center'}}>
                                <Icon name='check' size={45} opacity='0.8'/>
                            </View>
                            <View style={{flex:2}}>
                                <Text style={styles.title}>Did you complete this event?</Text>
                                <Text style={styles.subtitle}>Math tutoring for Sam E. </Text>
                                <Text style={styles.subtitle}>Date: 5/24/2022 at 1:00 PM </Text>
                            </View>
                        </View>
                        
                        <View style={{flex: 0.5, justifyContent: 'end'}}>
                            <View style={{paddingRight: 3,}}> 
                                <Text>19hr ago</Text>
                            </View>
                            <View style={{paddingTop: 10, flexDirection:'row', justifyContent: 'space-around'}}>
                                <Icon name='done' color='green' size={25}/>
                                <Icon name='close' color={logo_colors.logo_red} size={25}/>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{padding: 3}}></View>
                <View style={[styles.notifContainer, {backgroundColor: logo_colors.logo_yellow}]}>
                    <View style={styles.notifCard_event}>
                        <View style={{flex: 2.5, flexDirection:'row', }}>
                            <View style={{justifyContent: 'center', alignContent: 'center'}}>
                                <Icon name='event' size={45} opacity='0.8'/>
                            </View>
                            <View style={{flex:2}}>
                                <Text style={styles.title}>New Time Suggestion</Text>
                                <Text style={styles.subtitle}>For Ice Cream Social by Sams's Dad. </Text>
                                <Text style={styles.subtitle}>Suggested date: 5/26/2022 at 12:00 PM </Text>
                            </View>
                        </View>
                        
                        <View style={{flex: 0.5, justifyContent: 'end'}}>
                            <View style={{paddingRight: 3,}}> 
                                <Text>1d ago</Text>
                            </View>
                            <View style={{paddingTop: 10, flexDirection:'row', justifyContent: 'space-around'}}>
                                <Icon name='done' color='green' size={25}/>
                                <Icon name='edit' color={logo_colors.logo_red} size={25}/>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>    
        </View>
        
        <View style={styles.card}>
            <View style={styles.upcomingBox}> 
                <Text style={{fontSize: 25, }}>
                Upcoming Events</Text>
                { false && <Text style={{}}>No upcoming events</Text>}
                <ScrollView style={{marginBottom: 35}}>
                    <View style={styles.event_container}>
                        <View style={styles.upcoming_event_container}>
                            <View style={styles.upcoming_event}>
                                <Text style={styles.title}>Chess Tournament</Text>
                                <Text style={styles.subtitle}>Taking place at St. Olaf College from 12PM-5PM, Tuesday May 31.   </Text>
                                <View style={{flexDirection:'row', justifyContent: 'flex-end', alignSelf: 'flex-end'}}>                                
                                    <View style={{flexDirection: 'row'}}>
                                        <Icon name='link' size={40}/>
                                        <Icon name='place' size={40}/></View>
                                </View> 
                                
                            </View>
                            
                        </View>
                        <View style={[styles.upcoming_event_container, {backgroundColor: 'orange'}]}>
                            <View style={styles.upcoming_event}>
                                <Text style={styles.title}>Northfield Fair</Text>
                                <Text style={styles.subtitle}>Taking place at St. Olaf College from 12PM-5PM, Tuesday May 31.   </Text>
                                <View style={{flexDirection:'row', justifyContent: 'flex-end', alignSelf: 'flex-end'}}>                                
                                    <View style={{flexDirection: 'row'}}>
                                        <Icon name='link' size={40}/>
                                        <Icon name='place' size={40}/></View>
                                </View> 
                            </View>
                        </View>
                        <View style={[styles.upcoming_event_container, {backgroundColor: 'lightgreen'}]}>
                            <View style={styles.upcoming_event}>
                                <Text style={styles.title}>Library Tour</Text>
                                <Text style={styles.subtitle}>Taking place at St. Olaf College from 12PM-5PM, Tuesday May 31.   </Text>
                                <View style={{flexDirection:'row', justifyContent: 'flex-end', alignSelf: 'flex-end'}}>                                
                                    <View style={{flexDirection: 'row'}}>
                                        <Icon name='link' size={40}/>
                                        <Icon name='place' size={40}/></View>
                                </View> 
                            </View>
                        </View>
                        <View style={[styles.upcoming_event_container, {backgroundColor: logo_colors.logo_red}]}>
                            <View style={styles.upcoming_event}>
                                <Text style={styles.title}>Trip to Twin Cities</Text>
                                <Text style={styles.subtitle}>Taking place at St. Olaf College from 12PM-5PM, Tuesday May 31.   </Text>
                                <View style={{flexDirection:'row', justifyContent: 'flex-end', alignSelf: 'flex-end'}}>                                
                                    <View style={{flexDirection: 'row'}}>
                                        <Icon name='link' size={40}/>
                                        <Icon name='place' size={40}/></View>
                            </View> 
                            </View>
                        </View>
                    </View>
                    
                </ScrollView>
            </View>
        </View>
        <View style={styles.navigation_bar}>
            <TouchableOpacity onPress={()=> {            
                return props.navigation.navigate('MessageWall', { sid });}}>
                <Icon name='chat' size={50} color='white'/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> {            
                return props.navigation.navigate('Event', { sid });}}>
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
                return props.navigation.navigate('Profile', { sid });}}>
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
        backgroundColor: logo_colors.logo_blue,
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
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',

        backgroundColor: '#00ABEB',
        height: '100%',
        width: '100%'
    }   
    
  });
  