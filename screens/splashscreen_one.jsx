import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import Eclipseshapetop from '../components/eclipseshapetop';
import Eclipseshapebottom from '../components/eclipseshapebottom';

const SplashScreenone = () => {
  return (
    <View style={styles.splashview}>
      <Eclipseshapetop />
      <View style={styles.gifloader}>
        <LottieView
          style={styles.gif}
          source={require('../assets/LOADINGLINH.json')}
          autoPlay
          loop
          speed={0.9}
        />
      </View>
      <Eclipseshapebottom />
    </View>
  );
};

const styles = StyleSheet.create({
  splashview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#151314',
  },
  gifloader: {
    zIndex: 1,
  },
  gif: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },
});

export default SplashScreenone;
