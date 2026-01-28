import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title?: string;
  showMenu?: boolean;
  showNotifications?: boolean;
  showBack?: boolean;
  onBackPress?: () => void;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showMenu = true,
  showNotifications = true,
  showBack = false,
  onBackPress,
  rightAction,
}) => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  const handleMenuPress = () => {
    navigation.openDrawer();
  };

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-background-primary border-b border-border">
      {/* Left Section */}
      <View className="flex-row items-center">
        {showBack ? (
          <TouchableOpacity
            onPress={handleBackPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            className="mr-3"
          >
            <Text className="text-text-primary text-xl">←</Text>
          </TouchableOpacity>
        ) : showMenu ? (
          <TouchableOpacity
            onPress={handleMenuPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            className="mr-3"
          >
            <Text className="text-text-primary text-xl">☰</Text>
          </TouchableOpacity>
        ) : null}

        {title ? (
          <Text className="text-text-primary text-lg font-semibold" numberOfLines={1}>
            {title}
          </Text>
        ) : null}
      </View>

      {/* Center - Logo (only when no title) */}
      {!title && (
        <View className="flex-row items-center">
          <View className="w-8 h-8 bg-brand-primary rounded items-center justify-center mr-2">
            <Text className="text-sm">🏗️</Text>
          </View>
          <Text className="text-brand-primary text-lg font-bold">PES</Text>
        </View>
      )}

      {/* Right Section */}
      <View className="flex-row items-center gap-3">
        {rightAction}
        {showNotifications && (
          <TouchableOpacity
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <View className="relative">
              <Text className="text-text-primary text-xl">🔔</Text>
              {/* Notification Badge */}
              <View className="absolute -top-1 -right-1 w-4 h-4 bg-status-error rounded-full items-center justify-center">
                <Text className="text-white text-xs font-bold">3</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;
