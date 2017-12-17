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
import InfoBar from './infobar';
import WaitingUser from './waitinguser';
import Board from './board';

var {height, width} = Dimensions.get('window');

export default class GameScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var boardSize = this.props.navigation.state.params.boardSize;
    if (boardSize == 0) {
      console.log("Any size chosed");
      boardSize = 13;
    }
    return (
      <View style={styles.container}>
        <WaitingUser />
        <Board size={boardSize} width={width} height={width} />
        <InfoBar userName="Olaru Bogdan" userAvatarUrl="https://scontent.fotp3-1.fna.fbcdn.net/v/t1.0-9/23754911_1686874304689488_466414949983210768_n.jpg?oh=9c98d1b54d9b4f8612b1eb40567442a5&oe=5ABE01C0"
          onTimeout={() => {}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 50,
  }
});
