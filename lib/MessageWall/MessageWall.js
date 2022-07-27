import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView , Image, Modal, TouchableOpacity, TouchableHighlight} from 'react-native';
//adding new
import { Picker } from '@react-native-picker/picker';
import { Icon } from '@rneui/themed';

//npm install react-native-popup-menu --save


export default class MessageWall extends Component {
  constructor(props) {
    super(props);
    // adding new
    let today = new Date()
    // adding new
    this.state = {
      url: "http://10.42.39.157:3001",
      isLoaded: false,    // checks to see if messages are loaded
      messages: '',       //pulled data from database after handlepress

      //adding new
      VisibleModal1: null,
      formContentType: "application/x-www-form-urlencoded;charset=UTF-8", 
      name: 'hello2',
      pid: 1,
      title: '',
      type: 'Unknown',
      audience: 'Unknown',
      timePosted: today.toString().substring(0, today.toString().length - 15),
      file: '',
      location: '',
      description: '',
      timeReply: today.toString().substring(0, today.toString().length - 15),
      replies: '',
      reply: '',
      shouldShow: false,
      doc: ''
      // adding new
    }
  }

  //Possible way of grabbing retrieving data without button
  componentDidMount() {
    console.log('start');
    // fetch(this.state.url + '/message/return', {method: 'GET'})
    //     .then((response) => response.json())
    //     .then((responseObj) => {
    //       console.log(responseObj)
    //       this.setState({isLoaded: true, messages: responseObj})
    //       this.setState({pid: this.state.messages[0].pid + 1})
    //       })
    //     .catch((error) => {
    //         console.error(error);
    //     });
  }
  
  // adding new
    // reply_render = (pid) => {
    // }
  // adding new

  render(){

    const {isLoaded, messages} = this.state;

    if(!isLoaded) { //Empty view when messages are not loaded
      return (
        <View style={styles.container}>
          
          <View style={styles.topBar}>
            <Button style = {styles.home} title = "Reload Message" color="teal" onPress={()=>this.props.navigation.replace("MessageWall")}/>
            <View style = {{flex: 6, backgroundColor: "lightblue", justifyContent: "center"}}>
              <Text style = {styles.pfTitle}>Project Friendship</Text>
            </View>
          </View>

          <View style={styles.mainView}>
            <View style = {{height: "92%", width: "100%", backgroundColor: "lightgrey"}}>
              <ScrollView>
                
              </ScrollView>
            </View>

            <View style = {styles.newPostView}>
              <Button title = "New Post +" color = "teal"
              onPress={() => this.setState({VisibleModal1: 1})}/>
            </View>
          </View>
        </View>
      );
    } else { //if messages are loaded, map and display the array of messages
        return (
          
        <View style={styles.container}>
            {/* Adding new */}
        <Modal visible={this.state.VisibleModal1 === 1}
        animationIn={'slideInLeft'}
        animationOut={'slideOutRight'}
        transparent={true}>
          <ScrollView style={{flex: 1, borderRadius: 10, padding: 10, alignSelf: 'center', marginBottom: 65, marginTop: 50, width: 325, backgroundColor: 'white', borderColor: 'deepskyblue', borderWidth: 10, elevation: 10 }}>
            <Text style={{textAlign: 'center'}}>New Post</Text>
            <Text style={{paddingTop: 20, fontSize: 20}}>Title:</Text>
            <TextInput
              style={{height: 50, borderWidth: 2, paddingLeft: 5, marginTop: 5}}
              placeholderTextColor = 'black'
              placeholder="Title of the Post..."
              onChangeText={(text) => this.setState({title: text})}
              value={this.state.title}
            />
            <Text style={{paddingTop: 20, fontSize: 20}}>Type of Post: </Text>
            <View style={{borderWidth: 2}}>
            <Picker
            selectedValue={this.state.type}
            onValueChange={(value, index) => this.setState({type: value})}
            style={{color: 'red'}}
          >
            <Picker.Item label= "Select Type of Post" value="Unknown" />
            <Picker.Item label="Request for help" value="Request for Help" />
            <Picker.Item label="Training annoucement" value="Training Announcement" />
            <Picker.Item label="Meeting announcement" value="Meeting Announcement" />
          </Picker>
          </View>
          <Text style={{paddingTop: 20, fontSize: 20}}>Audience: </Text>
          <View style={{borderWidth: 2}}>
          <Picker
            selectedValue={this.state.audience}
            onValueChange={(value, index) => this.setState({audience: value})}
            style={{color: 'red'}}
          >
            <Picker.Item label="To whom" value="Unknown" />
            <Picker.Item label="St. Olaf mentors" value="St. Olaf Mentor" />
            <Picker.Item label="Carleton mentors" value="Carleton Mentor" />
            <Picker.Item label="Everyone" value="Everyone" />
          </Picker>
          </View>


          <Text style={{paddingTop: 20, fontSize: 20}}>Description:</Text>
          <TextInput
              style={{height: 50, borderWidth: 2, paddingLeft: 20}}
              placeholder="Description..."
              placeholderTextColor='black'
              onChangeText={(text) => this.setState({description: text})}
              value={this.state.description}
          />

          <View style ={{paddingTop: 10, paddingBottom: 100, width: '100%', alignSelf: 'flex-end', backgroundColor: 'white', flexDirection: 'row'}}> 
            <TouchableOpacity 
            style = {{flex: 1, backgroundColor: 'deepskyblue', height: 50, margin: 5, alignItems: 'center', justifyContent: 'center', borderRadius:5}}
            onPress = {() => this.props.navigation.replace('MessageWall')}>
              <Text style = {{color: 'white', fontWeight: 'bold'}}>Cancel</Text>
              </TouchableOpacity>
            <TouchableOpacity 
            style = {{flex: 2, backgroundColor: 'deepskyblue', height: 50, margin: 5 , alignItems: 'center', justifyContent: 'center', borderRadius: 5}}>
              <Text style = {{color: 'white', fontWeight: 'bold'}}>Post</Text>
              </TouchableOpacity>


          </View>


        </ScrollView>
      </Modal>
      {/* Adding new */}   
            <View style={styles.topBar}>
              <TouchableOpacity 
              style = {{flex: 2, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 5}}
              onPress = {() => this.props.navigation.replace("MessageWall")}>
                <Text style = {{color: 'deepskyblue', fontWeight: 'bold'}}>Reload</Text>
                </TouchableOpacity>
                <View style ={{flex: 4, backgroundColor: 'deepskyblue'}}/>
              <View style = {{flex: 6, backgroundColor: "white", justifyContent: "center", borderRadius: 5}}>
                <Text style = {styles.pfTitle}>Project<Text style = {{color: 'red', fontWeight: 'bold'}}>Friendship</Text></Text>
              </View>
            </View>

            <View style={styles.mainView}>
              <View style = {{flex: 20, width: "100%", backgroundColor: "lightgrey"}}>
                <ScrollView>
                    {this.state.messages.map((item, index) => (
                      <View style = {{marginTop: 5, padding: 20, backgroundColor: "white"}}>
                        <Text>
                          <Text style={{fontWeight:'bold'}}>Author: </Text> {item.name}
                          <Text>{'\n'}</Text>
                          <Text style={{fontWeight:'bold'}}>Date posted: </Text> {item.timeposted}
                        </Text>
                        <View style = {styles.messageDetails}>
                            <Text><Text style={{fontWeight:'bold'}}>Title: </Text> {item.title} </Text>
                            <Text><Text style={{fontWeight:'bold'}}>Type: </Text> {item.type} </Text>
                            <Text><Text style={{fontWeight:'bold'}}>Description: </Text> {item.description}</Text>
                        </View>
                        <View style={{marginTop: 10, flex: 1, flexDirection: 'row'}}>
                          <TouchableOpacity 
                          style={{width: 100, height: 50, backgroundColor: 'deepskyblue', justifyContent: 'center', alignItems: 'center', borderRadius: 5}}
                          onPress = {() => {
                            this.setState({pid: item.pid})
                            this.setState({VisibleModal1: 2})
                            this.setState({ind: index})
                            // this.getReply(item.pid)
                            alert('You selected Post Number: '+ item.pid+ '\nYou can now see comments and post options for this post.')
                          }}>
                            <Text style = {{color: 'white', fontWeight: 'bold'}}>Select Post</Text>

                          </TouchableOpacity>
                          <TouchableOpacity 
                            style={{marginLeft: 10, width: 100, height: 50, backgroundColor: 'deepskyblue', justifyContent: 'center', alignItems: 'center', borderRadius: 5}}
                            onPress = {() => this.props.navigation.replace('SeeMedia', {pid: item.pid})}>
                              <Text style = {{color: 'white', fontWeight: 'bold'}}>View Media</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}  

                </ScrollView>
              </View>
              
              <View style = {{flex: 2, backgroundColor: 'deepskyblue', flexDirection: 'row', padding: 5}}>
                <TouchableOpacity 
                style = {{flex: 2, padding: 3, backgroundColor: 'white', borderRadius: 5, margin: 5, justifyContent: 'center', alignItems: 'center'}}
                onPress = {() => this.setState({VisibleModal1: 1})}>
                  <Text style = {{color: 'deepskyblue', fontWeight: 'bold'}}>New Post +</Text>
                  </TouchableOpacity>
                <View style = {{flex: 1, padding: 3, backgroundColor: 'deepskyblue', borderRadius: 5, margin: 5, justifyContent: 'center', alignItems: 'center'}}></View>
                <TouchableOpacity 
                style = {{flex: 2, padding: 3, backgroundColor: 'white', borderRadius: 5, margin: 5, justifyContent: 'center', alignItems: 'center'}}
                onPress = {() => {
                  console.log(this.state.replies)
                  this.props.navigation.navigate('SeeReply', {replies: this.state.replies})
                }}>
                  <Text style = {{color: 'deepskyblue', fontWeight: 'bold'}}>Comments</Text>
                  </TouchableOpacity>
                <TouchableOpacity 
                style = {{flex: 3, padding: 3, backgroundColor: 'white', borderRadius: 5, margin: 5, justifyContent: 'center', alignItems: 'center'}}
                onPress = {() => {
                  console.log(this.state.replies)
                  this.props.navigation.replace('Options', {pid: this.state.pid})
                }}>
                  <Text style = {{color: 'deepskyblue', fontWeight: 'bold'}}>Post Options</Text></TouchableOpacity>
              </View>

              <Modal visible={this.state.VisibleModal1 === 3}
              animationIn={'slideInLeft'}
              animationOut={'slideOutRight'}
              transparent={true}>
                <View style={{flex: 0.85, borderRadius: 10, alignSelf: 'center', marginTop: 50,justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow', width: '90%', height: '90%', borderColor: 'black', borderWidth: 1, elevation: 10 }}>
                    <View>
                      <Text>For post {this.state.pid}</Text>
                    </View>
                    <View style={{margin: 50}}>
                    <TextInput
                      style={{height: 50, width: 200, borderWidth: 2, paddingLeft: 20}}
                      placeholder="Enter your reply"
                      onChangeText={(text) => this.setState({reply: text})}
                      value={this.state.reply}
                    />
                    </View>
                    <View>
                    <Button title='Post' />
                    </View>
                  </View>
              </Modal>
              <View style={styles.navigation_bar}>
                <TouchableOpacity onPress={()=> console.log("Pressed Chat")}>
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
      
            </View>
      )
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  topBar: {
    flex: 2, 
    backgroundColor: "deepskyblue", 
    flexDirection: "row", 
    padding: 10
  },
  home: {
    flex: 1,
    backgroundColor: "teal", 
    justifyContent: "center", 
    borderRadius: 2,
  },
  pfTitle: {
    textAlign: "center", 
    color: "orange", 
    fontSize: 20,
    fontWeight: 'bold',
    // borderRadius: 5,
    // borderWidth: 2,
    // borderColor: 'black'
  },
  mainView: { 
    flex: 20, 
    backgroundColor: "lightblue" 
  },
  profilePic: {
    width: 25, 
    height: 25, 
    borderRadius: 25, 
    borderWidth: 1, 
    borderColor: "black"
  },
  messageDetails: {
    marginTop: 10, 
    padding: 10, 
    backgroundColor: "white", 
    borderWidth: 3, 
    borderColor: "black"
  },
  newPostView: {
    flex: 1,
    flexDirection: 'row',
    position: "absolute", 
    bottom: 0, 
    height: "8%", 
    width: "75%", 
    backgroundColor: "deepskyblue", 
    padding: 5
  },

  navigation_bar: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',

    backgroundColor: '#FF8D10',
    height: 20,
    width: '100%'
}   

});
