import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
  Button,
  Image,
  TouchableNativeFeedback
} from 'react-native';

import io from 'socket.io-client';

import {SERVER_URL} from './const';

var {height, width} = Dimensions.get('window');

import Board from './game/board';

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
        <View style={styles.board}>
          <Board size={13} width={200} height={200} disabled/>
        </View>
        <TouchableOpacity style={styles.playNowButton} onPress={this.startGame.bind(this)} activeOpacity={0.7}>
          <Text style={styles.playNowText}>PLAY NOW</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.facebookButton} onPress={() => {}} activeOpacity={0.7}>
          <View style={styles.facebookButtonWrapper}>
            <Image style={styles.facebookImage} source={require('./img/facebook.png')} />
            <Text style={styles.facebookText}>Connect with Facebook</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  board: {
    marginTop: 40,
    marginBottom: 40
  },
  playNowButton: {
    backgroundColor: '#EF5350',
    paddingRight: 55,
    paddingLeft: 55,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#DD2C00',
    borderRadius: 6,
    borderWidth: 3,
  },
  playNowText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 24
  },
  facebookButton: {
    backgroundColor: '#3B5998',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#0E285E',
    borderRadius: 6,
    borderWidth: 1,
  },
  facebookText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16
  },
  facebookButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  facebookImage: {
    width: 12,
    height: 28,
    marginRight: 16
  }
});
