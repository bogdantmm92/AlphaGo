import React, { Component } from 'react';

import {
  Dimensions
} from 'react-native';

let SERVER_URL = "http://192.168.1.230:3000";

const SIZE = 9;
const lineHeight = 2;
const padding = 10;

var {height, width} = Dimensions.get('window');
let spaceBetweenLines = (width - SIZE * lineHeight - 2 * padding) / (SIZE - 1);
const stoneSize = 0.95 * spaceBetweenLines;

const handPickerWidth = 60;
const handPickerHeight = 60;

export {
	SERVER_URL,

	SIZE,
	handPickerWidth,
	handPickerHeight,
	stoneSize,
	lineHeight,
	padding
};
