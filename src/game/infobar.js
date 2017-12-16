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
        <Image style={styles.avatar} source={{uri: this.props.userAvatarUrl}} />
        <Text style={styles.name}>{this.props.userName}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderUserInfo()}
        <CountDown running={true} seconds={14} onTimeout={() => {}}/>
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
    marginLeft: 4,
    marginRight: 4
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
  name: {
    fontWeight: 'bold',
    color: '#545454',
  },
});
