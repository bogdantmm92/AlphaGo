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
import FacebookSection from './facebookSection';
import BoardSizeModal from './boardSizeModal';

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
    this.state = {
      user: null,
      boardSizeModalShown: false
    };
    this.setupSocket();
    this.chooseBoardSize = this.chooseBoardSize.bind(this);
    this.startGame = this.startGame.bind(this);
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

  chooseBoardSize() {
    this.setState({boardSizeModalShown: true});
  }

  startGame(boardSize) {
    console.log(boardSize);
    const {navigate} = this.props.navigation;
    navigate('Game', {boardSize: boardSize});
  }

  renderBoardSizeModal() {
    return this.state.boardSizeModalShown ?
     <BoardSizeModal onBoardSizeSelected={this.startGame} closeModal={() => this.setState({boardSizeModalShown: false}) }/>
     : null;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.board}>
          <Board size={13} width={200} height={200} disabled/>
        </View>
        <TouchableOpacity style={styles.playNowButton} onPress={this.chooseBoardSize} activeOpacity={0.7}>
          <Text style={styles.playNowText}>PLAY NOW</Text>
        </TouchableOpacity>
        <View style={styles.facebookSection}>
          <FacebookSection />
        </View>
        {this.renderBoardSizeModal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  board: {
    marginTop: 30,
    marginBottom: 30
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
  facebookSection: {
    alignSelf: 'stretch',
    marginTop: 80,
  }
});
