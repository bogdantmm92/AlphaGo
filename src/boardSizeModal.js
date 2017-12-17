import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Animated,
  Text,
  Image,
  View,
  TouchableOpacity
} from 'react-native';

export default class BoardSizeModal extends Component {
  constructor() {
    super();
    this.state = {
      scale: new Animated.Value(0.3),
      opacity: new Animated.Value(0.1)
    }
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.state.opacity, {
        duration: 100,
        toValue: 1
      }),
      Animated.timing(this.state.scale, {
        duration: 100,
        toValue: 1
      })
    ]).start();
  }

  closeModal() {
    Animated.parallel([
      Animated.timing(this.state.opacity, {
        duration: 100,
        toValue: 0.1
      }),
      Animated.timing(this.state.scale, {
        duration: 100,
        toValue: 0.3
      })
    ]).start(this.props.closeModal);
  }

  onBoardSizeSelected(size) {
    this.closeModal();
    this.props.onBoardSizeSelected(size);
  }

  render() {
    let transformOpacity = {
      opacity: this.state.opacity
    };
    let transformScale = {
      transform: [{
        scaleX: this.state.scale
      }, {
        scaleY: this.state.scale
      }]
    };
    return (
      <Animated.View style={[styles.modal, styles.flexCenter, transformOpacity]} onStartShouldSetResponder={(evt) => true} onResponderRelease={this.closeModal}>
        <Animated.View style={[styles.modalBody, transformScale]} onStartShouldSetResponder={(evt) => true}>
          <TouchableOpacity style={styles.closeButton} onPress={this.closeModal} activeOpacity={0.7}>
            <Image style={styles.closeButtonImage} source={require('./img/close.png')} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Select board size</Text>
          <TouchableOpacity style={styles.sizeButton} onPress={() => this.onBoardSizeSelected(9)} activeOpacity={0.7}>
            <Text style={styles.sizeButtonText}>9x9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sizeButton} onPress={() => this.onBoardSizeSelected(13)} activeOpacity={0.7}>
            <Text style={styles.sizeButtonText}>13x13</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sizeButton} onPress={() => this.onBoardSizeSelected(19)} activeOpacity={0.7}>
            <Text style={styles.sizeButtonText}>19x19</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sizeButton} onPress={() => this.onBoardSizeSelected(0)} activeOpacity={0.7}>
            <Text style={styles.sizeButtonText}>Any size</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,.7)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  modalBody: {
    paddingTop: 30,
    paddingBottom: 10,
    paddingLeft: 60,
    paddingRight: 60,
    borderRadius: 6,
    backgroundColor: 'white'
  },
  sizeButton: {
    alignItems: 'center',
    backgroundColor: '#EF5350',
    paddingRight: 40,
    paddingLeft: 40,
    paddingTop: 4,
    paddingBottom: 4,
    marginBottom: 20,
    borderColor: '#DD2C00',
    borderRadius: 6,
    borderWidth: 3
  },
  sizeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 24
  },
  modalTitle: {
    color: '#EF5350',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 30,
  },
  closeButton: {
    position: 'absolute',
    padding: 10,
    right: 0,
    top: 0,
  },
  closeButtonImage: {
    width: 15,
    height: 15
  }
});
