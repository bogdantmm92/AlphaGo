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
      time: {},
      seconds: 180,
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }
  secondsToTime(secs){
    let minutes = Math.floor(secs / 60);

    let divisor_for_seconds = secs % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      m: minutes,
      s: seconds
    };
    return obj;
  }
  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }
  startTimer() {
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }
  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    if (seconds == 0) {
      clearInterval(this.timer);
    }
  }
  render() {
    if(this.state.time.s < 10)
      return(
        <View>
          <Text>
            {this.state.time.m}:0{this.state.time.s}
          </Text>
        </View>
    );
    else
      return(
        <View>
          {this.startTimer}
          <Text>
            {this.state.time.m}:{this.state.time.s}
          </Text>
        </View>
    );
  }
}
