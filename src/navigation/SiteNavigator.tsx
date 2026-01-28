import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SiteStackParamList } from './types';
import {
  SiteDetailScreen,
  LiveParametersScreen,
  DevicesScreen,
  AlarmManagementScreen,
} from '../screens/site';

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
