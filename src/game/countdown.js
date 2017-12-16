import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  Button
} from 'react-native';

export default class CountDown extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 10,
      running: false
    };
  }

  componentDidMount() {
    this.restartCountdown(this.props.running, this.props.seconds);
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.running) {
      this.restartCountdown(nextProps.running, nextProps.seconds)
    } else {
      this.stopTimer();
    }
  }

  restartCountdown(running, seconds) {
    this.setState({
      running: running,
      seconds: seconds
    });
    this.startTimer();
  }
  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  startTimer() {
    this.stopTimer();
    this.timer = setInterval(this.onTick.bind(this), 1000);
  }

  onTick() {
    let seconds = this.state.seconds - 1;
    this.setState({
      seconds: seconds
    });
    if (seconds == 0) {
      this.stopTimer();
      this.props.onTimeout();
    }
  }

  secondsToTime() {
    let minutes = Math.floor(this.state.seconds / 60);
    let seconds = this.state.seconds % 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  }

  render() {
    return(
      <View style={styles.container} >
        <Text style={styles.time} >
          {this.secondsToTime()}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 4,
    paddingBottom:4,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 50,
    backgroundColor: '#545454'
  },
  time: {
    fontSize: 14,
    color: '#FFFFFF',
  }
});
