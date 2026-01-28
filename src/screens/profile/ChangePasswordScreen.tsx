import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
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

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(1, 'New password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

export const ChangePasswordScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPassword = watch('newPassword');

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) return { strength, label: 'Weak', color: 'bg-status-error' };
    if (strength <= 3) return { strength, label: 'Medium', color: 'bg-status-warning' };
    return { strength, label: 'Strong', color: 'bg-status-success' };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  const onSubmit = async (data: PasswordFormData) => {
    setIsLoading(true);
    try {
      // TODO: Update password via Cognito
      await new Promise(resolve => setTimeout(resolve, 1500));

      Alert.alert(
        'Success',
        'Your password has been changed successfully',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to change password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderPasswordToggle = (show: boolean, setShow: (value: boolean) => void) => (
    <TouchableOpacity
      onPress={() => setShow(!show)}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Text className="text-text-muted">{show ? '👁️' : '👁️‍🗨️'}</Text>
    </TouchableOpacity>
  );

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
          {/* Info Card */}
          <Card className="mb-6">
            <View className="flex-row items-start">
              <Text className="text-2xl mr-3">ℹ️</Text>
              <View className="flex-1">
                <Text className="text-text-primary text-base font-medium mb-1">
                  Password Requirements
                </Text>
                <Text className="text-text-secondary text-sm">
                  • At least 8 characters{'\n'}
                  • One uppercase letter{'\n'}
                  • One lowercase letter{'\n'}
                  • One number
                </Text>
              </View>
            </View>
          </Card>

          {/* Form Fields */}
          <View className="gap-4">
            <Controller
              control={control}
              name="currentPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Current Password"
                  placeholder="Enter your current password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.currentPassword?.message}
                  secureTextEntry={!showCurrentPassword}
                  autoCapitalize="none"
                  leftIcon={<Text className="text-text-muted">🔒</Text>}
                  rightIcon={renderPasswordToggle(showCurrentPassword, setShowCurrentPassword)}
                />
              )}
            />

            <Controller
              control={control}
              name="newPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Input
                    label="New Password"
                    placeholder="Enter your new password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.newPassword?.message}
                    secureTextEntry={!showNewPassword}
                    autoCapitalize="none"
                    leftIcon={<Text className="text-text-muted">🔐</Text>}
                    rightIcon={renderPasswordToggle(showNewPassword, setShowNewPassword)}
                  />
                  {/* Password Strength Indicator */}
                  {newPassword && (
                    <View className="mt-2">
                      <View className="flex-row items-center justify-between mb-1">
                        <Text className="text-text-muted text-xs">Password Strength</Text>
                        <Text className={`text-xs ${
                          passwordStrength.label === 'Weak' ? 'text-status-error' :
                          passwordStrength.label === 'Medium' ? 'text-status-warning' :
                          'text-status-success'
                        }`}>
                          {passwordStrength.label}
                        </Text>
                      </View>
                      <View className="flex-row gap-1">
                        {[1, 2, 3, 4, 5].map(i => (
                          <View
                            key={i}
                            className={`flex-1 h-1 rounded-full ${
                              i <= passwordStrength.strength ? passwordStrength.color : 'bg-background-tertiary'
                            }`}
                          />
                        ))}
                      </View>
                    </View>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Confirm New Password"
                  placeholder="Confirm your new password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.confirmPassword?.message}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  leftIcon={<Text className="text-text-muted">🔐</Text>}
                  rightIcon={renderPasswordToggle(showConfirmPassword, setShowConfirmPassword)}
                />
              )}
            />
          </View>

          {/* Submit Button */}
          <View className="mt-8">
            <Button
              title="Update Password"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>

          {/* Forgot Password Link */}
          <TouchableOpacity className="mt-4 items-center">
            <Text className="text-brand-primary text-base">Forgot your current password?</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
