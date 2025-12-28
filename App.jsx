import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import SplashScreenone from './screens/splashscreen_one'
import SplashScreentwo from './screens/splashscreen_two'
import Loginscreen from './auth/loginscreen'

const App = () => {

  return (
    <View style={styles.container}>
      <Loginscreen/>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
  }
});

export default App;
