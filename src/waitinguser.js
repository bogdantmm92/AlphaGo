import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

export default class WaitingUser extends Component {
  constructor(props) {
    super(props);
  }
  renderPicture(){
    return(
      <View style={styles.picture}>
        <Image source={require('./img/Icon-user.png')} style={styles.avatar}/>
      </View>
    );
  }
  renderWait(){
    return(
        <Text style={styles.nume}>Waiting for a user...</Text>
    );
  }
  render() {
    return (
      <View style={styles.userInfo}>
        {this.renderPicture()}
        {this.renderWait()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  userInfo: {
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 30/2,
  },
  wait: {
    padding: 2,
  },
  picture: {
    padding: 2,
  }
});
