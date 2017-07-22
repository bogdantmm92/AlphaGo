import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { StackNavigator } from 'react-navigation';

import MainScreen from './src/mainScreen.js'

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Main />
//       </View>
//     );
//   }
// }

const App = StackNavigator({
  Main: { screen: MainScreen },
});

export default App;
