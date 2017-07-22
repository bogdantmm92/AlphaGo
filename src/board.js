import React, { Component } from 'react';
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
import {lineHeight, padding, handPickerWidth, handPickerHeight, stoneSize} from './const';
import {selectionInAnimation, selectionOutAnimation} from './animations';
import Grid from './grid';
import Stones from './stones';

export default class Board extends Component {
  constructor(){
    super();
    this.state = {
      moves: [],
      currentColor: 1
    };
    this.handPicker = {
      xy: new Animated.ValueXY(),
      scale: new Animated.Value(1),
      opacity: new Animated.Value(0)
    };
    this.selectionWhiteStone = {
      xy: new Animated.ValueXY(),
      scale: new Animated.Value(1),
      opacity: new Animated.Value(0)
    };
    this.selectionBlackStone = {
      xy: new Animated.ValueXY(),
      scale: new Animated.Value(1),
      opacity: new Animated.Value(0)
    };
  }

  componentWillMount() {
    this.createPandResponder();
  }

  createPandResponder() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (evt, gestureState) => {
        const handPickerCoordinates = this.handPickerCoordinates(evt.nativeEvent);
        this.handPicker.xy.setOffset({
          x: handPickerCoordinates.x,
          y: handPickerCoordinates.y
        });
        const stoneCoordinates = this.stoneCoordinates(handPickerCoordinates);
        this.selectedCellCoordinates = this.closestCellCoordinates(stoneCoordinates);

        this.selectedStoneState().xy.setValue({
          x: this.selectedCellCoordinates.x,
          y: this.selectedCellCoordinates.y
        });

        this.unselectedStoneState().opacity.setValue(0);


        selectionInAnimation(this.selectedStoneState(), this.handPicker);
      },
      onPanResponderMove: (evt, gestureState) => {
        let newSelectedCellCoordinates = this.closestCellCoordinatesFromNativeEvent(evt.nativeEvent);
        let index = this.closestCellIndex(newSelectedCellCoordinates);

        // If we transition from outside to inside, animate in the cursors
        if (this.selectedCellCoordinates.x === -1000 && this.indexInBounds(index)) {
          selectionInAnimation(this.selectedStoneState(), this.handPicker);
        }

        this.selectedCellCoordinates = newSelectedCellCoordinates;

        if (this.indexInBounds(index)) {
          this.selectedStoneState().xy.setValue({
            x: this.selectedCellCoordinates.x,
            y: this.selectedCellCoordinates.y
          });

          Animated.event([null, {
            dx: this.handPicker.xy.x,
            dy: this.handPicker.xy.y
          }])(evt, gestureState);
        } else {
          this.selectedStoneState().opacity.setValue(0);
          this.handPicker.opacity.setValue(0);
          this.selectedCellCoordinates = {x: -1000, y: -1000};
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.handPicker.xy.flattenOffset();
        this.selectedStoneState().xy.flattenOffset();

        this.onDropStone();
      },
    });
  }

  onDropStone() {
    let index = this.closestCellIndex(this.selectedCellCoordinates);
    // If index is in bounds
    if (this.indexInBounds(index)) {
      let moves = _.concat(this.state.moves, {
        x: index.x,
        y: index.y,
        color: this.state.currentColor
      });
      this.setState({moves: moves, currentColor: this.state.currentColor === 1 ? -1 : 1});
      selectionOutAnimation(this.selectedStoneState(), this.handPicker);
    }
  }

  indexInBounds(index) {
    return 0 <= index.x && index.x < this.props.size && 0 <= index.y && index.y < this.props.size;
  }

  selectedStoneState() {
    return this.state.currentColor === 1 ? this.selectionBlackStone : this.selectionWhiteStone;
  }

  unselectedStoneState() {
    return this.state.currentColor === -1 ? this.selectionBlackStone : this.selectionWhiteStone;
  }

  handPickerCoordinates(nativeEvent) {
    return {
      x: nativeEvent.pageX - handPickerWidth / 2,
      y: nativeEvent.pageY - this.props.height / 2 - handPickerHeight
    }
  }

  stoneCoordinates(handPickerCoordinates) {
    return {
      x: handPickerCoordinates.x + handPickerWidth * 0.25,
      y: handPickerCoordinates.y - stoneSize * 0.4
    }
  }

  stoneCoordinatesFromIndex(index) {
    let spaceBetweenLines = (this.props.width - this.props.size * lineHeight - 2 * padding) / (this.props.size - 1);
    return {
      x: padding + index.x * (lineHeight + spaceBetweenLines) - stoneSize / 2,
      y: padding + index.y * (lineHeight + spaceBetweenLines) - stoneSize / 2
    }
  }

  closestCellIndex(coordinates) {
    let spaceBetweenLines = (this.props.width - this.props.size * lineHeight - 2 * padding) / (this.props.size - 1);
    return {
      x: Math.round((coordinates.x - padding + stoneSize / 2) / (lineHeight + spaceBetweenLines)),
      y: Math.round((coordinates.y - padding + stoneSize / 2) / (lineHeight + spaceBetweenLines))
    }
  }
  closestCellCoordinates(coordinates) {
    let index = this.closestCellIndex(coordinates);
    return this.stoneCoordinatesFromIndex(index);
  }
  closestCellCoordinatesFromNativeEvent(nativeEvent) {
    const handPickerCoordinates = this.handPickerCoordinates(nativeEvent);
    const stoneCoordinates = this.stoneCoordinates(handPickerCoordinates);
    return this.closestCellCoordinates(stoneCoordinates);
  }

  renderHandPicker() {
    let { xy, scale, opacity }  = this.handPicker;
    let [translateX, translateY] = [xy.x, xy.y];

    var imageStyle = [styles.handPicker, {
      transform: [{translateX}, {translateY}, {scale}]
    }, {opacity}];
    return <Animated.Image style={imageStyle} source={require('./img/hand_picker.png')} />
  }

  renderSelectionStone(stone, color, key) {
    let { xy, scale, opacity }  = stone;
    let [translateX, translateY] = [xy.x, xy.y];

    var imageStyle = [styles.stone, {
      transform: [{translateX}, {translateY}, {scale}]
    }, {opacity}];
    return Stones.renderNormalStone(imageStyle, color, key);
  }

  renderSelectionStones() {
    return [this.renderSelectionStone(this.selectionBlackStone, 1, 's1'),
      this.renderSelectionStone(this.selectionWhiteStone, -1, 's-1')];
  }

  render() {
    return (
      <View style={{
        ...this.props.style,
        position: 'relative',
        width: this.props.width,
        height: this.props.height,
        backgroundColor: '#D9A664'
      }}
      {...this._panResponder.panHandlers}>
        <Grid width={this.props.width} size={this.props.size} />
        <Stones width={this.props.width} size={this.props.size} moves={this.state.moves} />
        {this.renderSelectionStones()}
        {this.renderHandPicker()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  handPicker: {
    position: 'absolute',
    width: handPickerWidth,
    height: handPickerHeight
  },
  stone: {
    position: 'absolute',
    width: stoneSize,
    height: stoneSize
  }
});
