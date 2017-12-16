import {
  Animated
} from 'react-native';

function selectionInAnimation(stone, handPicker) {
  Animated.parallel([
    Animated.spring(
      stone.scale, {
        toValue: 1.1,
        friction: 3
      }
    ),
    Animated.timing(
      stone.opacity, {
        toValue: 1,
        duration: 200
      }
    ),
    Animated.spring(
      handPicker.scale, {
        toValue: 1.1,
        friction: 3
      }
    ),
    Animated.timing(
      handPicker.opacity, {
        toValue: 1,
        duration: 200
      }
    )
  ]).start();
}

function selectionOutAnimation(stone, handPicker) {
  Animated.parallel([
    Animated.spring(
      stone.scale, {
        toValue: 1,
        friction: 3
      }
    ),
    Animated.timing(
      stone.opacity, {
        toValue:1,
        duration: 200
      }
    ),
    Animated.spring(
      handPicker.scale, {
        toValue: 1,
        friction: 3
      }
    ),
    Animated.timing(
      handPicker.opacity, {
        toValue: 0,
        duration: 200
      }
    )
  ]).start();
}

export {
  selectionInAnimation,
  selectionOutAnimation
};
