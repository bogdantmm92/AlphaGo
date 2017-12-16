import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

export default class WaitingUser extends Component {
  constructor() {
    super();
    this.state = {
      loadingDots: "."
    }
  }
  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer() {
    this.stopTimer();
    this.timer = setInterval(this.onTick.bind(this), 1000);
  }

  onTick() {
    var loadingDots = this.state.loadingDots;
    if (loadingDots.length > 2) {
      loadingDots = "";
    } else {
      loadingDots = loadingDots + ".";
    }
    this.setState({
      loadingDots: loadingDots
    });
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  render() {
    var waitingForUserText = "Waiting for a user" + this.state.loadingDots;
    return (
      <View style={styles.container}>
        <Image style={styles.avatar} source={require('../img/waiting_user_icon.png')} />
        <Text style={styles.waitingText}>{waitingForUserText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 30/2,
  },
  waitingText: {
    flex: 1,
    fontWeight: 'bold',
    color: '#878787',
  }
});
