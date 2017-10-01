import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Dimensions
} from 'react-native';

import io from 'socket.io-client';

import Game from './game';
import {SERVER_URL} from './const';

var {height, width} = Dimensions.get('window');

export default class MainScreen extends Component {
  static navigationOptions = (props) => {
    return {
      headerTitle: 'Alpha Go',
      headerTitleStyle: {
        color: 'white'
      },
      headerStyle: {
        backgroundColor: '#3CB2E2'
      }
    };
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

  startGame() {
    const {navigate} = this.props.navigation;
    navigate('Game');
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.startGame.bind(this)} activeOpacity={0.7}>
          <Text style={styles.playNowButton}>PLAY NOW</Text>
        </TouchableOpacity>
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
  playNowButton: {
    backgroundColor: '#C0DB99',
    paddingRight: 40,
    paddingLeft: 40,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#545454',
    fontWeight: 'bold',
    fontSize: 24,
    borderColor: '#88AB4E',
    borderRadius: 6,
    borderWidth: 3,
  }
});
