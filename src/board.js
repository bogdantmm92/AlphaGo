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

export default class Board extends Component {
  constructor(){
    super();
    this.state = {
      moves: [],
      currentColor: 1,
      handPicker: {
        xy: new Animated.ValueXY(),
        scale: new Animated.Value(1),
        opacity: new Animated.Value(0)
      },
      stone: {
        xy: new Animated.ValueXY(),
        scale: new Animated.Value(1),
        opacity: new Animated.Value(0)
      }
    }
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
        this.state.handPicker.xy.setOffset({
          x: handPickerCoordinates.x,
          y: handPickerCoordinates.y
        });
        const stoneCoordinates = this.stoneCoordinates(handPickerCoordinates);
        const closestCellCoordinates = this.closestCellCoordinates(stoneCoordinates);

        this.state.stone.xy.setValue({
          x: closestCellCoordinates.x,
          y: closestCellCoordinates.y
        });
        Animated.parallel([
          Animated.spring(
            this.state.stone.scale, {
              toValue: 1.1,
              friction: 3
            }
          ),
          Animated.timing(
            this.state.stone.opacity, {
              toValue: 1,
              duration: 200
            }
          ),
          Animated.spring(
            this.state.handPicker.scale, {
              toValue: 1.1,
              friction: 3
            }
          ),
          Animated.timing(
            this.state.handPicker.opacity, {
              toValue: 1,
              duration: 200
            }
          )
        ]).start();
      },
      onPanResponderMove: (evt, gestureState) => {
        const closestCellCoordinates = this.closestCellCoordinatesFromNativeEvent(evt.nativeEvent);

        this.state.stone.xy.setValue({
          x: closestCellCoordinates.x,
          y: closestCellCoordinates.y
        });

        Animated.event([null, {
          dx: this.state.handPicker.xy.x,
          dy: this.state.handPicker.xy.y
        }])(evt, gestureState);
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.onDropStone(evt.nativeEvent);
        this.state.handPicker.xy.flattenOffset();
        this.state.stone.xy.flattenOffset();
        Animated.parallel([
          Animated.spring(
            this.state.stone.scale, {
              toValue: 1,
              friction: 3
            }
          ),
          Animated.timing(
            this.state.stone.opacity, {
              toValue: 0,
              duration: 200
            }
          ),
          Animated.spring(
            this.state.handPicker.scale, {
              toValue: 1,
              friction: 3
            }
          ),
          Animated.timing(
            this.state.handPicker.opacity, {
              toValue: 0,
              duration: 200
            }
          )
        ]).start();
      },
    });
  }

  onDropStone(nativeEvent) {
    var stoneCoordinates = this.closestCellCoordinatesFromNativeEvent(nativeEvent);
    var index = this.closestCellIndex(stoneCoordinates);
    var moves = this.state.moves.slice();
    moves.push({
      x: index.x,
      y: index.y,
      color: this.state.currentColor
    });
    this.setState({moves: moves, currentColor: this.state.currentColor === 1 ? -1 : 1});
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
      y: handPickerCoordinates.y - stoneHeight * 0.4
    }
  }

  stoneCoordinatesFromIndex(index) {
    let spaceBetweenLines = (this.props.width - this.props.size * lineHeight - 2 * padding) / (this.props.size - 1);
    return {
      x: padding + index.x * (lineHeight + spaceBetweenLines) - stoneWidth / 2,
      y: padding + index.y * (lineHeight + spaceBetweenLines) - stoneHeight / 2
    }
  }

  closestCellIndex(coordinates) {
    let spaceBetweenLines = (this.props.width - this.props.size * lineHeight - 2 * padding) / (this.props.size - 1);
    return {
      x: Math.round((coordinates.x - padding + stoneWidth / 2) / (lineHeight + spaceBetweenLines)),
      y: Math.round((coordinates.y - padding + stoneHeight / 2) / (lineHeight + spaceBetweenLines))
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
      height: this.props.height - 2 * padding,
      left: padding + index * (lineHeight + spaceBetweenLines),
      backgroundColor: 'black'}}
      key={"v" + index} />);
  }

  renderLines() {
    let spaceBetweenLines = (this.props.height - this.props.size * lineHeight - 2 * padding) / (this.props.size - 1);
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

  renderHandPicker() {
    let { xy, scale, opacity }  = this.state.handPicker;
    let [translateX, translateY] = [xy.x, xy.y];

    var imageStyle = [styles.handPicker, {
      transform: [{translateX}, {translateY}, {scale}]
    }, {opacity}];
    return <Animated.Image style={imageStyle} source={require('./img/hand_picker.png')} />
  }

  renderStones() {
    var stones = []
    for (var i = 0; i < this.state.moves.length; i ++) {
      var move = this.state.moves[i];
      var index = {
        x: move.x,
        y: move.y
      };
      let xy = this.stoneCoordinatesFromIndex(index);
      let imageStyle = [styles.stone, {transform: [{translateX: xy.x}, {translateY: xy.y}]}];
      stones.push(this.renderNormalStone(imageStyle, move.color));
    }
    return stones;
  }

  renderNormalStone(imageStyle, stoneColor) {
    if (stoneColor === 1) {
      return <Animated.Image style={imageStyle} source={require('./img/black_stone.png')} />
    } else {
      return <Animated.Image style={imageStyle} source={require('./img/white_stone.png')} />
    }
  }
  renderStone() {
    let { xy, scale, opacity }  = this.state.stone;
    let [translateX, translateY] = [xy.x, xy.y];

    var imageStyle = [styles.stone, {
      transform: [{translateX}, {translateY}, {scale}]
    }, {opacity}];
    return this.renderNormalStone(imageStyle, this.state.currentColor);
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
        {this.renderLines()}
        {this.renderStones()}
        {this.renderStone()}
        {this.renderHandPicker()}
      </View>
    );
  }
}

const handPickerWidth = 60;
const handPickerHeight = 60;
const stoneWidth = 16;
const stoneHeight = 16;

const lineHeight = 2;
const padding = 10;

const styles = StyleSheet.create({
  handPicker: {
    position: 'absolute',
    width: handPickerWidth,
    height: handPickerHeight
  },
  stone: {
    position: 'absolute',
    width: stoneWidth,
    height: stoneHeight
  }
});
