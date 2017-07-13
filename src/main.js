import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';

import io from 'socket.io-client';

import Board from './board';
import CONST from './const';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {user: null};
    this.setupSocket();
  }

  setupSocket() {
    this.socket = io(CONST.SERVER_URL);

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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Main Game
        </Text>
        <Board />
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 50,
  }
});
