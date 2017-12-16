import React, { Component, PureComponent } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  PanResponder,
  Animated
} from 'react-native';

import _ from 'lodash';
import {lineHeight, padding} from '../const';
import Grid from './grid';

export default class Stones extends PureComponent {
  stoneCoordinatesFromIndex(index) {
    let spaceBetweenLines = this.getSpaceBetweenLines();
    let stoneSize = this.getStoneSize();
    return {
      x: padding + index.x * (lineHeight + spaceBetweenLines) - stoneSize / 2 + lineHeight / 2,
      y: padding + index.y * (lineHeight + spaceBetweenLines) - stoneSize / 2 + lineHeight / 2
    }
  }

  getSpaceBetweenLines() {
    return (this.props.width - this.props.size * lineHeight - 2 * padding) / (this.props.size - 1);
  }

  getStoneSize() {
    return 0.95 * this.getSpaceBetweenLines();
  }

  renderStones() {
    let stoneSize = this.getStoneSize();

    let stones = _.map(this.props.moves, (move, key) => {
      var index = {
        x: move.x,
        y: move.y
      };
      let xy = this.stoneCoordinatesFromIndex(index);
      let imageStyle = [styles.stone, {
        width: stoneSize,
        height: stoneSize,
        transform: [{translateX: xy.x}, {translateY: xy.y
      }]}];
      return Stones.renderNormalStone(imageStyle, move.color, key);
    });
    return stones;
  }

  static renderNormalStone(imageStyle, stoneColor, key) {
    if (stoneColor === 1) {
      return <Animated.Image key={"s" + key} style={imageStyle} source={require('../img/black_stone.png')} />
    } else {
      return <Animated.Image key={"s" + key} style={imageStyle} source={require('../img/white_stone.png')} />
    }
  }

  render() {
    return (
      <View>
        {this.renderStones()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stone: {
    position: 'absolute'
  }
});
