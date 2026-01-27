import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import { SiteStackParamList } from './types';

// Placeholder screens - will be replaced with actual implementations
const SiteDetailScreen = ({ route }: any) => (
  <View className="flex-1 bg-background-primary items-center justify-center">
    <Text className="text-text-primary text-2xl">Site Detail</Text>
    <Text className="text-text-secondary mt-2">{route.params?.siteName}</Text>
  </View>
);

const LiveParametersScreen = ({ route }: any) => (
  <View className="flex-1 bg-background-primary items-center justify-center">
    <Text className="text-text-primary text-2xl">Live Parameters</Text>
    <Text className="text-text-secondary mt-2">{route.params?.siteName}</Text>
  </View>
);

const DevicesScreen = ({ route }: any) => (
  <View className="flex-1 bg-background-primary items-center justify-center">
    <Text className="text-text-primary text-2xl">Devices</Text>
    <Text className="text-text-secondary mt-2">{route.params?.siteName}</Text>
  </View>
);

const AlarmManagementScreen = ({ route }: any) => (
  <View className="flex-1 bg-background-primary items-center justify-center">
    <Text className="text-text-primary text-2xl">Alarm Management</Text>
    <Text className="text-text-secondary mt-2">{route.params?.siteName}</Text>
  </View>
);

const Stack = createNativeStackNavigator<SiteStackParamList>();

export const SiteNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#0D0D0D',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '600',
        },
        contentStyle: { backgroundColor: '#0D0D0D' },
      }}
    >
      <Stack.Screen
        name="SiteDetail"
        component={SiteDetailScreen}
        options={({ route }) => ({
          title: route.params?.siteName || 'Site Detail',
        })}
      />
      <Stack.Screen
        name="LiveParameters"
        component={LiveParametersScreen}
        options={{ title: 'Live Parameters' }}
      />
      <Stack.Screen
        name="Devices"
        component={DevicesScreen}
        options={{ title: 'Devices' }}
      />
      <Stack.Screen
        name="AlarmManagement"
        component={AlarmManagementScreen}
        options={{ title: 'Alarm Management' }}
      />
    </Stack.Navigator>
  );
};

export default SiteNavigator;
