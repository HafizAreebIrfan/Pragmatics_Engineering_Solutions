import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'SplashLoading'>;
};

const DOT_SIZE = 12;
const DOT_SPACING = 8;

export const SplashLoadingScreen: React.FC<Props> = ({ navigation }) => {
  const dot1Opacity = useRef(new Animated.Value(0.3)).current;
  const dot2Opacity = useRef(new Animated.Value(0.3)).current;
  const dot3Opacity = useRef(new Animated.Value(0.3)).current;

  const dot1Scale = useRef(new Animated.Value(1)).current;
  const dot2Scale = useRef(new Animated.Value(1)).current;
  const dot3Scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animateDot = (
      opacity: Animated.Value,
      scale: Animated.Value,
      delay: number
    ) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(opacity, {
              toValue: 1,
              duration: 400,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 1.2,
              duration: 400,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(opacity, {
              toValue: 0.3,
              duration: 400,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 1,
              duration: 400,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
          ]),
          Animated.delay(600 - delay),
        ])
      );
    };

    const animation1 = animateDot(dot1Opacity, dot1Scale, 0);
    const animation2 = animateDot(dot2Opacity, dot2Scale, 200);
    const animation3 = animateDot(dot3Opacity, dot3Scale, 400);

    animation1.start();
    animation2.start();
    animation3.start();

    // Navigate to brand screen after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('SplashBrand');
    }, 2000);

    return () => {
      animation1.stop();
      animation2.stop();
      animation3.stop();
      clearTimeout(timer);
    };
  }, [navigation, dot1Opacity, dot2Opacity, dot3Opacity, dot1Scale, dot2Scale, dot3Scale]);

  const renderDot = (opacity: Animated.Value, scale: Animated.Value) => (
    <Animated.View
      style={{
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        backgroundColor: '#00D26A',
        marginHorizontal: DOT_SPACING / 2,
        opacity,
        transform: [{ scale }],
      }}
    />
  );

  return (
    <View className="flex-1 bg-background-primary items-center justify-center">
      <View className="flex-row items-center">
        {renderDot(dot1Opacity, dot1Scale)}
        {renderDot(dot2Opacity, dot2Scale)}
        {renderDot(dot3Opacity, dot3Scale)}
      </View>
    </View>
  );
};

export default SplashLoadingScreen;
