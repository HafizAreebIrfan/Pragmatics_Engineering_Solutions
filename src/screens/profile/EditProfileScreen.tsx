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
import { useAuthStore } from '../../store';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  phone: z.string().optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      company: '',
      jobTitle: '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      // TODO: Update profile via API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update local user state
      if (user) {
        setUser({
          ...user,
          name: data.name,
          email: data.email,
          phone: data.phone,
        });
      }

      Alert.alert('Success', 'Profile updated successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePhoto = () => {
    Alert.alert(
      'Change Photo',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: () => console.warn('Camera') },
        { text: 'Choose from Library', onPress: () => console.warn('Library') },
        { text: 'Remove Photo', onPress: () => console.warn('Remove'), style: 'destructive' },
        { text: 'Cancel', style: 'cancel' },
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
          {/* Avatar Section */}
          <View className="items-center mb-8">
            <View className="relative">
              <View className="w-28 h-28 rounded-full bg-background-tertiary items-center justify-center">
                <Text className="text-5xl">👤</Text>
              </View>
              <TouchableOpacity
                onPress={handleChangePhoto}
                className="absolute bottom-0 right-0 w-10 h-10 bg-brand-primary rounded-full items-center justify-center"
                activeOpacity={0.7}
              >
                <Text className="text-lg">📷</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleChangePhoto} className="mt-3">
              <Text className="text-brand-primary text-base">Change Photo</Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View className="gap-4">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.name?.message}
                  autoCapitalize="words"
                  leftIcon={<Text className="text-text-muted">👤</Text>}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Email Address"
                  placeholder="Enter your email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  leftIcon={<Text className="text-text-muted">✉️</Text>}
                />
              )}
            />

            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Phone Number (Optional)"
                  placeholder="Enter your phone number"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.phone?.message}
                  keyboardType="phone-pad"
                  leftIcon={<Text className="text-text-muted">📱</Text>}
                />
              )}
            />

            <Controller
              control={control}
              name="company"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Company (Optional)"
                  placeholder="Enter your company name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.company?.message}
                  autoCapitalize="words"
                  leftIcon={<Text className="text-text-muted">🏢</Text>}
                />
              )}
            />

            <Controller
              control={control}
              name="jobTitle"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Job Title (Optional)"
                  placeholder="Enter your job title"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.jobTitle?.message}
                  autoCapitalize="words"
                  leftIcon={<Text className="text-text-muted">💼</Text>}
                />
              )}
            />
          </View>

          {/* Save Button */}
          <View className="mt-8">
            <Button
              title="Save Changes"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
              disabled={isLoading || !isDirty}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
