import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity
} from 'react-native';

export default class FacebookSection extends Component {
  render() {
    return(
      <View style={styles.container} >
        <View style={styles.titleContainer}>
          <View style={styles.titleLine}/>
          <Text style={styles.titleText}>Play with Facebook friends</Text>
          <View style={styles.titleLine}/>
        </View>

        <TouchableOpacity style={styles.facebookButton} onPress={() => {}} activeOpacity={0.7}>
          <View style={styles.facebookButtonWrapper}>
            <Image style={styles.facebookImage} source={require('./img/facebook.png')} />
            <Text style={styles.facebookText}>Connect with Facebook</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  titleContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5F2FF'
  },
  titleText: {
    marginLeft: 10,
    marginRight: 10,
    color: '#3CB2E2',
    fontWeight: 'bold',
    fontSize: 13
  },
  facebookButton: {
    backgroundColor: '#3B5998',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#0E285E',
    borderRadius: 6,
    borderWidth: 1,
  },
  facebookText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16
  },
  facebookButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  facebookImage: {
    width: 12,
    height: 28,
    marginRight: 16
  }
});
