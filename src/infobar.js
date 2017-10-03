import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
import CountDown from './countdown.js'

export default class InfoBar extends Component {
  constructor() {
    super();
  }
  renderPicture(){
    return(
      <View style={styles.picture}>
        <Image source={this.props.avatarUrl} style={styles.avatar}/>
      </View>
    );
  }
  renderName(){
    return(
        <Text style={styles.nume}>{this.props.UserName}</Text>
    );
  }
  renderUserInfo(){
    return(
      <View style={styles.userInfo}>
        {this.renderPicture()}
        {this.renderName()}
      </View>
    );
  }
  renderTime(){
    return(
      <View>
        <CountDown turn={true}/>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.bar}>
        {this.renderUserInfo()}
        {this.renderTime()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 30/2,
  },
  bar: {
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    padding: 3,
  },
  userInfo: {
    padding: 2,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nume: {
    padding: 2,
  },
  picture: {
    padding: 2,
  }
});
