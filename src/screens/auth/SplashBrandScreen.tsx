import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'SplashBrand'>;
};

export const SplashBrandScreen: React.FC<Props> = ({ navigation }) => {
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Animate logo entrance
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Animate text after logo
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }, 300);

    // Navigate to login screen after 2.5 seconds
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation, logoScale, logoOpacity, textOpacity, textTranslateY]);

  return (
    <View className="flex-1 bg-background-primary items-center justify-center px-8">
      {/* Logo Container */}
      <Animated.View
        style={{
          opacity: logoOpacity,
          transform: [{ scale: logoScale }],
        }}
        className="items-center"
      >
        {/* Logo Box */}
        <View className="w-24 h-24 bg-brand-primary rounded-2xl items-center justify-center mb-6">
          {/* Construction/Factory Icon */}
          <View className="items-center">
            <Text className="text-4xl">🏗️</Text>
          </View>
        </View>

        {/* PES Text */}
        <Text className="text-brand-primary text-3xl font-bold tracking-widest">
          PES
        </Text>
      </Animated.View>

      {/* Company Name */}
      <Animated.View
        style={{
          opacity: textOpacity,
          transform: [{ translateY: textTranslateY }],
        }}
        className="mt-6"
      >
        <Text className="text-text-primary text-lg text-center font-medium">
          Pragmatics Engineering
        </Text>
        <Text className="text-text-primary text-lg text-center font-medium">
          Solutions
        </Text>
      </Animated.View>
    </View>
  );
};

export default SplashBrandScreen;
