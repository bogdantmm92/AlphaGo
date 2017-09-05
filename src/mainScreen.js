import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Dimensions,
  Button,
  TouchableNativeFeedback,
  TouchableOpacity
} from 'react-native';

import io from 'socket.io-client';

import Game from './game';
import {SERVER_URL} from './const';

var {height, width} = Dimensions.get('window');

export default class MainScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  constructor(props) {
    super(props);
    this.state = {user: null};
    this.setupSocket();
  }

  setupSocket() {
    this.socket = io(SERVER_URL);

    this.socket.on('connect', this.handleConnect.bind(this));
    this.socket.on('disconnect', this.handleDisconnect.bind(this));
    this.socket.on('joined:live_room', this.handlePendingGame.bind(this));
  }

  handlePendingGame() {
    console.log('joined:live_room');
  }

  handleDisconnect() {
    console.log('disconnected');
  }
  handleConnect() {
    console.log('connected!');
    this.loginOrCreateUser().then((user) => {
      this.setState({user});
    });
  }

  createUser() {
    return new Promise((resolve, reject) => {
      this.socket.emit('create_user', (user) => {
        console.log("user created");
        AsyncStorage.setItem('user', JSON.stringify(user));
        resolve(user);
      });
    });
  }

  loginUser(user) {
    return new Promise((resolve, reject) => {
      this.socket.emit('login_user', user, (user) => {
        console.log("user login");
        AsyncStorage.setItem('user', JSON.stringify(user));
        resolve(user);
      });
    });
  }
  loginOrCreateUser() {
    console.log('loginOrCreateUser');
    return AsyncStorage.getItem('user')
      .then((user) => {
        if (user) {
          return loginUser(JSON.parse(user));
        } else {
          return createUser();
        }
    });
  }
  handlePress(){
    return;
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttons}>
          <Button
            title="Actual score"
            containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:20, backgroundColor: 'white'}}
            onPress={() => this.handlePress()}
            color='yellow'
          />
          <Button title="Estimate score" margin="10" style={{margin: 10, height: 10, widht: 20, borderRadius: 2}} onPress={() => this.handlePress()}/>
        </View>
        <Game />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 50,
  }
});
