import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Dimensions
} from 'react-native';

import io from 'socket.io-client';

import Game from './game';
import {SERVER_URL} from '../const';

var {height, width} = Dimensions.get('window');

export default class GameScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 50,
  }
});
