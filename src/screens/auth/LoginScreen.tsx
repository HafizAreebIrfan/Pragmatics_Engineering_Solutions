import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import { useAuthStore } from '../../store';

// Validation schema - email only
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginScreen: React.FC = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const login = useAuthStore(state => state.login);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // TODO: Replace with AWS Cognito authentication
      // For now, simulate a login with mock user data
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock user for development
      const mockUser = {
        id: '1',
        email: data.email,
        name: 'John Doe',
      };

      // Login with mock user (this will trigger navigation to Main)
      login(mockUser);
    } catch (error) {
      Alert.alert('Error', 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-center px-6 py-8"
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo Section */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-brand-primary rounded-2xl items-center justify-center mb-4">
              <Text className="text-3xl">🏗️</Text>
            </View>
            <Text className="text-brand-primary text-2xl font-bold tracking-widest">
              PES
            </Text>
          </View>

          {/* Welcome Text */}
          <View className="items-center mb-8">
            <Text className="text-text-primary text-2xl font-semibold mb-2">
              Welcome
            </Text>
            <Text className="text-text-secondary text-base text-center">
              Please enter your email{'\n'}to access your account
            </Text>
          </View>

          {/* Login Form */}
          <View className="gap-4">
            {/* Email Input */}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  leftIcon={<Text className="text-text-muted">✉️</Text>}
                />
              )}
            />

            {/* Password Input */}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  leftIcon={<Text className="text-text-muted">🔒</Text>}
                  rightIcon={
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Text className="text-text-muted">
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                      </Text>
                    </TouchableOpacity>
                  }
                />
              )}
            />

            {/* Remember Me */}
            <Checkbox
              checked={rememberMe}
              onChange={setRememberMe}
              label="Remember Me"
            />

            {/* Login Button */}
            <Button
              title="Login"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
              disabled={isLoading}
              className="mt-4"
            />
          </View>

          {/* Terms and Privacy */}
          <View className="mt-8 items-center">
            <Text className="text-text-muted text-sm text-center">
              By clicking Login, you agree to our
            </Text>
            <View className="flex-row items-center">
              <TouchableOpacity>
                <Text className="text-brand-primary text-sm">Terms of Use</Text>
              </TouchableOpacity>
              <Text className="text-text-muted text-sm"> and </Text>
              <TouchableOpacity>
                <Text className="text-brand-primary text-sm">Privacy Policy</Text>
              </TouchableOpacity>
              <Text className="text-text-muted text-sm">.</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
