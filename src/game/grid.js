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
import {selectionInAnimation, selectionOutAnimation} from './animations';

export default class Grid extends PureComponent {
  constructor() {
    super();
    var dots9 = [ {x: 2, y: 2}, {x: 2, y: 6}, {x: 4, y: 4}, {x: 6, y: 2}, {x: 6, y: 6} ];
    var dots13 = [ {x: 3, y: 3}, {x: 3, y: 9}, {x: 6, y: 6}, {x: 9, y: 3}, {x: 9, y: 9} ];
    var dots19 = [ {x: 3, y: 3}, {x: 3, y: 9}, {x: 3, y: 15}, {x: 9, y: 3}, {x: 9, y: 9}, {x: 9, y: 15}, {x: 15, y: 3}, {x: 15, y: 9}, {x: 15, y: 15} ];
    this.dots = [];
    this.dots[9] = dots9;
    this.dots[13] = dots13;
    this.dots[19] = dots19;
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

  renderDot(id, xx, yy, spaceBetweenLines) {
    let dotSize = 8;
    return(<View style={{
      position: 'absolute',
      top: padding + yy * (lineHeight + spaceBetweenLines) - dotSize / 2 + lineHeight / 2,
      width: dotSize,
      height: dotSize,
      left: padding + xx * (lineHeight + spaceBetweenLines) - dotSize / 2 + lineHeight / 2,
      borderRadius: dotSize / 2,
      backgroundColor: 'black'}}
      key={"d" + id} />);
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


  renderDots() {
    let spaceBetweenLines = (this.props.width - this.props.size * lineHeight - 2 * padding) / (this.props.size - 1);
    var dots = [];
    var size = this.dots[this.props.size].length;
    _.each(this.dots[this.props.size], (dot, i) => {
      dots.push(this.renderDot(i, dot.x, dot.y, spaceBetweenLines));
    });
    return dots;
  }

  render() {
    return (
      <View>
        {this.renderLines()}
        {this.renderDots()}
      </View>
    );
  }
}
