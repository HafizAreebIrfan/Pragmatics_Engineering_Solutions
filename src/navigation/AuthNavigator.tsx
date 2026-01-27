import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';

// Placeholder screens - will be replaced with actual implementations
import { View, Text } from 'react-native';

const SplashLoadingScreen = () => (
  <View className="flex-1 bg-background-primary items-center justify-center">
    <Text className="text-brand-primary text-2xl">Loading...</Text>
  </View>
);

const SplashBrandScreen = () => (
  <View className="flex-1 bg-background-primary items-center justify-center">
    <Text className="text-brand-primary text-3xl font-bold">PES</Text>
    <Text className="text-text-primary mt-4">Pragmatics Engineering Solution</Text>
  </View>
);

const LoginScreen = () => (
  <View className="flex-1 bg-background-primary items-center justify-center">
    <Text className="text-text-primary text-2xl">Login Screen</Text>
  </View>
);

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0D0D0D' },
        animation: 'fade',
      }}
    >
      <Stack.Screen name="SplashLoading" component={SplashLoadingScreen} />
      <Stack.Screen name="SplashBrand" component={SplashBrandScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
