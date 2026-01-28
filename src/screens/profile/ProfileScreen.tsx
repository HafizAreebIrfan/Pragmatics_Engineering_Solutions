import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card } from '../../components/ui/Card';
import { useAuthStore } from '../../store';

type ProfileStackParamList = {
  ProfileMain: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  DeactivateAccount: undefined;
};

type NavigationProp = NativeStackNavigationProp<ProfileStackParamList>;

interface MenuItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  danger?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  danger = false,
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center py-4 border-b border-border"
    activeOpacity={0.7}
  >
    <Text className="text-2xl mr-4">{icon}</Text>
    <View className="flex-1">
      <Text className={`text-base font-medium ${danger ? 'text-status-error' : 'text-text-primary'}`}>
        {title}
      </Text>
      {subtitle && (
        <Text className="text-text-muted text-sm mt-1">{subtitle}</Text>
      )}
    </View>
    <Text className="text-text-muted text-lg">›</Text>
  </TouchableOpacity>
);

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  const handleLogout = () => {
    logout();
  };

  return (
    <SafeAreaView className="flex-1 bg-background-primary" edges={['top']}>
      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <Card className="mb-6">
          <View className="items-center py-4">
            {/* Avatar */}
            <View className="w-24 h-24 rounded-full bg-background-tertiary items-center justify-center mb-4">
              <Text className="text-4xl">👤</Text>
            </View>

            {/* User Info */}
            <Text className="text-text-primary text-xl font-semibold">
              {user?.name || 'Guest User'}
            </Text>
            <Text className="text-text-secondary text-base mt-1">
              {user?.email || 'guest@example.com'}
            </Text>

            {/* Edit Profile Button */}
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}
              className="mt-4 bg-brand-primary px-6 py-2 rounded-full"
              activeOpacity={0.7}
            >
              <Text className="text-background-primary font-semibold">Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Account Settings */}
        <Text className="text-text-secondary text-sm font-medium mb-3 ml-1">
          ACCOUNT SETTINGS
        </Text>
        <Card className="mb-6">
          <MenuItem
            icon="👤"
            title="Edit Profile"
            subtitle="Update your personal information"
            onPress={() => navigation.navigate('EditProfile')}
          />
          <MenuItem
            icon="🔒"
            title="Change Password"
            subtitle="Update your password"
            onPress={() => navigation.navigate('ChangePassword')}
          />
          <MenuItem
            icon="🔔"
            title="Notifications"
            subtitle="Manage notification preferences"
            onPress={() => console.warn('Notifications')}
          />
        </Card>

        {/* Security */}
        <Text className="text-text-secondary text-sm font-medium mb-3 ml-1">
          SECURITY
        </Text>
        <Card className="mb-6">
          <MenuItem
            icon="🛡️"
            title="Two-Factor Authentication"
            subtitle="Add extra security to your account"
            onPress={() => console.warn('2FA')}
          />
          <MenuItem
            icon="📱"
            title="Active Sessions"
            subtitle="Manage your logged in devices"
            onPress={() => console.warn('Sessions')}
          />
        </Card>

        {/* Danger Zone */}
        <Text className="text-text-secondary text-sm font-medium mb-3 ml-1">
          DANGER ZONE
        </Text>
        <Card className="mb-6">
          <MenuItem
            icon="⚠️"
            title="Deactivate Account"
            subtitle="Temporarily disable your account"
            onPress={() => navigation.navigate('DeactivateAccount')}
            danger
          />
        </Card>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center justify-center py-4 bg-status-error/10 rounded-xl"
          activeOpacity={0.7}
        >
          <Text className="text-xl mr-3">🚪</Text>
          <Text className="text-status-error text-base font-semibold">Logout</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text className="text-text-muted text-sm text-center mt-6">
          PES Mobile App v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
