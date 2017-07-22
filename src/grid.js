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
import {lineHeight, padding} from './const';
import {selectionInAnimation, selectionOutAnimation} from './animations';

export default class Grid extends PureComponent {
  constructor(){
    super();
  }

  renderHorizontalLine(index, spaceBetweenLines) {
    return (<View style={{
      position: 'absolute',
      left: padding,
      width: this.props.width - 2 * padding,
      height: lineHeight,
      top: padding + index * (lineHeight + spaceBetweenLines),
      backgroundColor: 'black'}}
      key={"h" + index} />);
  }

  renderVerticalLine(index, spaceBetweenLines) {
    return (<View style={{
      position: 'absolute',
      top: padding,
      width: lineHeight,
      height: this.props.width - 2 * padding,
      left: padding + index * (lineHeight + spaceBetweenLines),
      backgroundColor: 'black'}}
      key={"v" + index} />);
  }

  renderLines() {
    let spaceBetweenLines = (this.props.width - this.props.size * lineHeight - 2 * padding) / (this.props.size - 1);
    var lines = [];
    // Vertical lines
    for (var i = 0; i < this.props.size; i ++) {
      lines.push(this.renderVerticalLine(i, spaceBetweenLines));
    }
    // Horizontal lines
    for (var i = 0; i < this.props.size; i ++) {
      lines.push(this.renderHorizontalLine(i, spaceBetweenLines));
    }
    return lines;
  }

  renderNormalStone(imageStyle, stoneColor, key) {
    if (stoneColor === 1) {
      return <Animated.Image key={"s" + key} style={imageStyle} source={require('./img/black_stone.png')} />
    } else {
      return <Animated.Image key={"s" + key} style={imageStyle} source={require('./img/white_stone.png')} />
    }
  }

  render() {
    return (
      <View>
        {this.renderLines()}
      </View>
    );
  }
}
