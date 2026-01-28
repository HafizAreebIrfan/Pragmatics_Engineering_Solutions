import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/ui/Card';

export const TermsScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-background-primary" edges={['bottom']}>
      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-6">
          <Text className="text-text-primary text-2xl font-bold mb-2">
            Terms & Conditions
          </Text>
          <Text className="text-text-muted text-sm">
            Last updated: January 2026
          </Text>
        </View>

        {/* Introduction */}
        <Card className="mb-4">
          <Text className="text-text-primary text-lg font-semibold mb-3">
            1. Introduction
          </Text>
          <Text className="text-text-secondary text-base leading-6">
            Welcome to PES (Pragmatics Engineering Solutions). By using our mobile application, you agree to be bound by these Terms and Conditions. Please read them carefully before using our services.
          </Text>
        </Card>

        {/* Acceptance */}
        <Card className="mb-4">
          <Text className="text-text-primary text-lg font-semibold mb-3">
            2. Acceptance of Terms
          </Text>
          <Text className="text-text-secondary text-base leading-6">
            By accessing or using the PES application, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree with any part of these terms, you may not use our services.
          </Text>
        </Card>

        {/* User Account */}
        <Card className="mb-4">
          <Text className="text-text-primary text-lg font-semibold mb-3">
            3. User Account
          </Text>
          <Text className="text-text-secondary text-base leading-6">
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to:{'\n\n'}
            • Provide accurate and complete information{'\n'}
            • Keep your password secure and confidential{'\n'}
            • Notify us immediately of any unauthorized access{'\n'}
            • Accept responsibility for all account activities
          </Text>
        </Card>

        {/* Use of Services */}
        <Card className="mb-4">
          <Text className="text-text-primary text-lg font-semibold mb-3">
            4. Use of Services
          </Text>
          <Text className="text-text-secondary text-base leading-6">
            Our services are designed for monitoring and managing energy systems. You agree to use the application only for its intended purpose and in compliance with all applicable laws and regulations.{'\n\n'}
            You must not:{'\n'}
            • Use the service for any illegal purpose{'\n'}
            • Attempt to gain unauthorized access{'\n'}
            • Interfere with the service's operation{'\n'}
            • Share your credentials with others
          </Text>
        </Card>

        {/* Data & Privacy */}
        <Card className="mb-4">
          <Text className="text-text-primary text-lg font-semibold mb-3">
            5. Data & Privacy
          </Text>
          <Text className="text-text-secondary text-base leading-6">
            We collect and process data in accordance with our Privacy Policy. By using our services, you consent to our data practices as described in the Privacy Policy.{'\n\n'}
            We use industry-standard security measures to protect your data, including:{'\n'}
            • Encrypted data transmission{'\n'}
            • Secure data storage{'\n'}
            • Regular security audits{'\n'}
            • Access controls and monitoring
          </Text>
        </Card>

        {/* Intellectual Property */}
        <Card className="mb-4">
          <Text className="text-text-primary text-lg font-semibold mb-3">
            6. Intellectual Property
          </Text>
          <Text className="text-text-secondary text-base leading-6">
            All content, features, and functionality of the PES application are owned by Pragmatics Engineering Solutions and are protected by international copyright, trademark, and other intellectual property laws.
          </Text>
        </Card>

        {/* Limitation of Liability */}
        <Card className="mb-4">
          <Text className="text-text-primary text-lg font-semibold mb-3">
            7. Limitation of Liability
          </Text>
          <Text className="text-text-secondary text-base leading-6">
            To the maximum extent permitted by law, PES shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
          </Text>
        </Card>

        {/* Termination */}
        <Card className="mb-4">
          <Text className="text-text-primary text-lg font-semibold mb-3">
            8. Termination
          </Text>
          <Text className="text-text-secondary text-base leading-6">
            We reserve the right to terminate or suspend your account at any time for any reason, including violation of these terms. Upon termination, your right to use the service will cease immediately.
          </Text>
        </Card>

        {/* Changes to Terms */}
        <Card className="mb-4">
          <Text className="text-text-primary text-lg font-semibold mb-3">
            9. Changes to Terms
          </Text>
          <Text className="text-text-secondary text-base leading-6">
            We may update these terms from time to time. We will notify you of any changes by posting the new terms on this page and updating the "Last updated" date.
          </Text>
        </Card>

        {/* Contact */}
        <Card className="mb-4">
          <Text className="text-text-primary text-lg font-semibold mb-3">
            10. Contact Us
          </Text>
          <Text className="text-text-secondary text-base leading-6">
            If you have any questions about these Terms and Conditions, please contact us at:{'\n\n'}
            Email: legal@pes.com{'\n'}
            Phone: +1 (555) 123-4567{'\n'}
            Address: 123 Energy Drive, Tech City, TC 12345
          </Text>
        </Card>

        {/* Footer */}
        <View className="items-center py-6">
          <Text className="text-text-muted text-sm text-center">
            By using PES, you agree to these terms.
          </Text>
          <Text className="text-text-muted text-sm mt-2">
            © 2026 Pragmatics Engineering Solutions
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsScreen;
