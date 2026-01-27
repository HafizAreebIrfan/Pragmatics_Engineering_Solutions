import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { MainDrawerParamList } from './types';

// Placeholder screens - will be replaced with actual implementations
const DashboardScreen = () => (
  <View className="flex-1 bg-background-primary items-center justify-center">
    <Text className="text-text-primary text-2xl">Dashboard</Text>
  </View>
);

const ProfileScreen = () => (
  <View className="flex-1 bg-background-primary items-center justify-center">
    <Text className="text-text-primary text-2xl">Profile</Text>
  </View>
);

const TermsScreen = () => (
  <View className="flex-1 bg-background-primary items-center justify-center">
    <Text className="text-text-primary text-2xl">Terms & Conditions</Text>
  </View>
);

const AboutScreen = () => (
  <View className="flex-1 bg-background-primary items-center justify-center">
    <Text className="text-text-primary text-2xl">About Us</Text>
  </View>
);

// Custom Drawer Content
const CustomDrawerContent = ({ navigation }: any) => {
  const menuItems = [
    { name: 'Dashboard', label: 'Dashboard', icon: '🏠' },
    { name: 'Profile', label: 'Profile', icon: '👤' },
    { name: 'Terms', label: 'Terms & Conditions', icon: '📄' },
    { name: 'About', label: 'About Us', icon: 'ℹ️' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background-secondary">
      {/* Profile Header */}
      <View className="p-6 border-b border-border">
        <View className="w-16 h-16 rounded-full bg-background-tertiary items-center justify-center mb-4">
          <Text className="text-2xl">👤</Text>
        </View>
        <Text className="text-text-primary text-lg font-semibold">John Doe</Text>
        <Text className="text-text-secondary text-sm">john@example.com</Text>
      </View>

      {/* Menu Items */}
      <View className="flex-1 py-4">
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.name}
            className="flex-row items-center px-6 py-4"
            onPress={() => navigation.navigate(item.name)}
            activeOpacity={0.7}
          >
            <Text className="text-xl mr-4">{item.icon}</Text>
            <Text className="text-text-primary text-base">{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <View className="p-6 border-t border-border">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => console.log('Logout')}
          activeOpacity={0.7}
        >
          <Text className="text-xl mr-4">🚪</Text>
          <Text className="text-status-error text-base">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

export const MainNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#1A1A1A',
          width: 280,
        },
        drawerType: 'front',
        overlayColor: 'rgba(0, 0, 0, 0.7)',
      }}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Terms" component={TermsScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
};

export default MainNavigator;
