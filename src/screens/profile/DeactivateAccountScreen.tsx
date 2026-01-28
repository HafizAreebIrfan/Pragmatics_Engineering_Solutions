import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Checkbox } from '../../components/ui/Checkbox';
import { useAuthStore } from '../../store';

const deactivateSchema = z.object({
  password: z.string().min(1, 'Password is required to deactivate account'),
  reason: z.string().optional(),
});

type DeactivateFormData = z.infer<typeof deactivateSchema>;

export const DeactivateAccountScreen: React.FC = () => {
  const navigation = useNavigation();
  const logout = useAuthStore(state => state.logout);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DeactivateFormData>({
    resolver: zodResolver(deactivateSchema),
    defaultValues: {
      password: '',
      reason: '',
    },
  });

  const onSubmit = async (data: DeactivateFormData) => {
    if (!confirmed) {
      Alert.alert('Confirmation Required', 'Please confirm that you want to deactivate your account.');
      return;
    }

    Alert.alert(
      'Deactivate Account',
      'Are you sure you want to deactivate your account? This action can be reversed by contacting support.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Deactivate',
          style: 'destructive',
          onPress: async () => {
            setIsLoading(true);
            try {
              // TODO: Call API to deactivate account
              await new Promise(resolve => setTimeout(resolve, 1500));

              Alert.alert(
                'Account Deactivated',
                'Your account has been deactivated. You will be logged out.',
                [
                  {
                    text: 'OK',
                    onPress: () => logout(),
                  },
                ]
              );
            } catch (error) {
              Alert.alert('Error', 'Failed to deactivate account. Please try again.');
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background-primary" edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Warning Card */}
          <Card className="mb-6 border-l-4 border-l-status-warning">
            <View className="flex-row items-start">
              <Text className="text-2xl mr-3">⚠️</Text>
              <View className="flex-1">
                <Text className="text-text-primary text-base font-semibold mb-2">
                  Deactivate Your Account
                </Text>
                <Text className="text-text-secondary text-sm">
                  Deactivating your account will:{'\n\n'}
                  • Disable access to your account{'\n'}
                  • Hide your profile from other users{'\n'}
                  • Pause all notifications{'\n\n'}
                  Your data will be retained for 30 days. You can reactivate your account by logging in again within this period.
                </Text>
              </View>
            </View>
          </Card>

          {/* What happens section */}
          <Text className="text-text-secondary text-sm font-medium mb-3 ml-1">
            WHAT HAPPENS WHEN YOU DEACTIVATE
          </Text>
          <Card className="mb-6">
            <View className="gap-4">
              <View className="flex-row items-center">
                <View className="w-8 h-8 rounded-full bg-status-info/20 items-center justify-center mr-3">
                  <Text>📊</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-text-primary text-sm font-medium">Data Preserved</Text>
                  <Text className="text-text-muted text-xs">Your data is saved for 30 days</Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <View className="w-8 h-8 rounded-full bg-status-warning/20 items-center justify-center mr-3">
                  <Text>🔔</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-text-primary text-sm font-medium">Notifications Paused</Text>
                  <Text className="text-text-muted text-xs">No emails or push notifications</Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <View className="w-8 h-8 rounded-full bg-status-success/20 items-center justify-center mr-3">
                  <Text>🔄</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-text-primary text-sm font-medium">Reactivation</Text>
                  <Text className="text-text-muted text-xs">Log in anytime to reactivate</Text>
                </View>
              </View>
            </View>
          </Card>

          {/* Form Fields */}
          <Text className="text-text-secondary text-sm font-medium mb-3 ml-1">
            CONFIRM DEACTIVATION
          </Text>
          <Card className="mb-6">
            <View className="gap-4">
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Enter your password to confirm"
                    placeholder="Your current password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.password?.message}
                    secureTextEntry
                    autoCapitalize="none"
                    leftIcon={<Text className="text-text-muted">🔒</Text>}
                  />
                )}
              />

              <Controller
                control={control}
                name="reason"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Reason for leaving (optional)"
                    placeholder="Help us improve..."
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    multiline
                    numberOfLines={3}
                    leftIcon={<Text className="text-text-muted">📝</Text>}
                  />
                )}
              />

              <Checkbox
                checked={confirmed}
                onChange={setConfirmed}
                label="I understand that my account will be deactivated"
              />
            </View>
          </Card>

          {/* Deactivate Button */}
          <Button
            title="Deactivate Account"
            variant="outline"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            disabled={isLoading || !confirmed}
            className="border-status-error"
          />

          {/* Cancel Link */}
          <View className="mt-4 items-center">
            <Text className="text-text-muted text-sm">Changed your mind?</Text>
            <Button
              title="Keep my account"
              variant="ghost"
              onPress={() => navigation.goBack()}
              className="mt-2"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DeactivateAccountScreen;
