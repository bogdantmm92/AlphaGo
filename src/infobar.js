import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

export default class InfoBar extends Component {
  constructor(props) {
    super(props);
  }
  renderPicture(){
    return(
      <View style={styles.picture}>
        <Image source={require('./img/bogdan.jpg')} style={{height: 30, width: 30, borderRadius: 30/2,}}/>
      </View>
    );
  }
  renderName(){
    return(
        <Text style={styles.nume}>Olaru Bogdan</Text>
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
      <Text style={styles.time}>
        2:30
      </Text>
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
