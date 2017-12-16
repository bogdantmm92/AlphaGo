import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Platform,
  StatusBar } from 'react-native';

import { StackNavigator } from 'react-navigation';

import MainScreen from './src/mainScreen.js'
import GameScreen from './src/game/gameScreen.js'

GameScreen.navigationOptions = MainScreen.navigationOptions = (props) => {
  const { state, setParams } = props.navigation;
  const { params } = state;
  return {
    headerTitle: 'Alpha Go',
    headerTitleStyle: {
      color: 'white'
    },
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#3CB2E2'
    },
    headerRight: (
      <TouchableHighlight style={styles.loginButtonContainer}
        activeOpacity={0.8}
        underlayColor='#4CC2F2'
        onPress={() => {console.log("on logg in")}}>
        <Image
          style={styles.loginButton}
          source={require('./src/img/avatar_login.png')} />
      </TouchableHighlight>
    ),
  };
};

const App = StackNavigator({
  Main: { screen: MainScreen },
  Game: { screen: GameScreen }
}, {
  initialRouteName: 'Main',
  cardStyle: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  }
});

const styles = StyleSheet.create({
  loginButtonContainer: {
    marginRight: 6
  },
  loginButton: {
    width: 22,
    height: 22,
    margin: 10,
  }
});
export default App;
