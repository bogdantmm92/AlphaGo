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
import {lineHeight, padding, handPickerWidth, handPickerHeight} from './const';
import {selectionInAnimation, selectionOutAnimation} from './animations';
import Grid from './grid';

export default class TerritoryHighlight extends PureComponent {
  territoryCellCoordinatesFromIndex(index) {
    let spaceBetweenLines = this.getSpaceBetweenLines();
    let territoryCellSize = this.getTerritoryCellSize();
    return {
      x: padding + index.x * (lineHeight + spaceBetweenLines) - territoryCellSize / 2 + lineHeight / 2,
      y: padding + index.y * (lineHeight + spaceBetweenLines) - territoryCellSize / 2 + lineHeight / 2
    }
  }

  getSpaceBetweenLines() {
    return (this.props.width - this.props.size * lineHeight - 2 * padding) / (this.props.size - 1);
  }

  getTerritoryCellSize() {
    return 0.5 * this.getSpaceBetweenLines();
  }

  renderTerritory() {
    let territoryCellSize = this.getTerritoryCellSize();

    let territoryCells = _.map(this.props.territory, (cell, key) => {
      var index = {
        x: cell.x,
        y: cell.y
      };
      let xy = this.territoryCellCoordinatesFromIndex(index);
      let cellStyle = [styles.stone, {
        width: territoryCellSize,
        height: territoryCellSize,
        backgroundColor: cell.color,
        transform: [{translateX: xy.x}, {translateY: xy.y}]
      }];
      return <View key={"th" + key}style={cellStyle} />;
    });
    return territoryCells;
  }

  render() {
    return (
      <View>
        {this.renderTerritory()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stone: {
    position: 'absolute'
  }
});
