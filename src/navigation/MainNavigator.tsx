import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { MainDrawerParamList } from './types';
import { DashboardScreen } from '../screens/main';
import { ProfileNavigator } from './ProfileNavigator';
import { TermsScreen } from '../screens/TermsScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { useAuthStore } from '../store';

// Custom Drawer Content
const CustomDrawerContent = ({ navigation }: any) => {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  const menuItems = [
    { name: 'Dashboard', label: 'Dashboard', icon: '🏠' },
    { name: 'Profile', label: 'Profile', icon: '👤' },
    { name: 'Terms', label: 'Terms & Conditions', icon: '📄' },
    { name: 'About', label: 'About Us', icon: 'ℹ️' },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <SafeAreaView className="flex-1 bg-background-secondary">
      {/* Profile Header */}
      <TouchableOpacity
        className="p-6 border-b border-border"
        onPress={() => navigation.navigate('Profile')}
        activeOpacity={0.7}
      >
        <View className="w-16 h-16 rounded-full bg-background-tertiary items-center justify-center mb-4">
          <Text className="text-2xl">👤</Text>
        </View>
        <Text className="text-text-primary text-lg font-semibold">
          {user?.name || 'Guest User'}
        </Text>
        <Text className="text-text-secondary text-sm">
          {user?.email || 'guest@example.com'}
        </Text>
        <Text className="text-brand-primary text-xs mt-2">View Profile →</Text>
      </TouchableOpacity>

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
            <Text className="text-text-muted ml-auto">›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* App Version */}
      <View className="px-6 py-2">
        <Text className="text-text-muted text-xs">PES v1.0.0</Text>
      </View>

      {/* Logout Button */}
      <View className="p-6 border-t border-border">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Text className="text-xl mr-4">🚪</Text>
          <Text className="text-status-error text-base font-medium">Logout</Text>
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
      <Drawer.Screen name="Profile" component={ProfileNavigator} />
      <Drawer.Screen name="Terms" component={TermsScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
};

export default MainNavigator;
