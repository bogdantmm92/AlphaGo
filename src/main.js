import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import io from 'socket.io-client';

import Board from './board';
import CONST from './const';

export default class Main extends Component {
  constructor(props) {
    super(props)

    this.socket = io(CONST.SERVER_URL, {
      jsonp: false,
      transports: ['websocket']
    });
    this.socket.connect();

    this.socket.on('connect', () => {
      console.log('connected!');
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
