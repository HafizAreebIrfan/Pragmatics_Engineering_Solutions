import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/ui/Card';

export const AboutScreen: React.FC = () => {
  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch(err => console.warn('Error opening link:', err));
  };

  const features = [
    { icon: '☀️', title: 'Solar Monitoring', description: 'Track solar panel performance in real-time' },
    { icon: '💨', title: 'Wind Tracking', description: 'Monitor wind turbine efficiency and output' },
    { icon: '⚡', title: 'Grid Management', description: 'Manage grid connections and power flow' },
    { icon: '📊', title: 'Analytics', description: 'Comprehensive data analytics and reporting' },
    { icon: '🔔', title: 'Alerts', description: 'Instant notifications for critical events' },
    { icon: '📱', title: 'Mobile Access', description: 'Monitor your sites from anywhere' },
  ];

  const team = [
    { icon: '👨‍💼', name: 'Engineering Team', role: 'Core Development' },
    { icon: '👩‍🔬', name: 'Research Team', role: 'Innovation & R&D' },
    { icon: '👨‍💻', name: 'Support Team', role: '24/7 Customer Support' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background-primary" edges={['bottom']}>
      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo & Company Info */}
        <View className="items-center py-8">
          <View className="w-24 h-24 bg-brand-primary rounded-3xl items-center justify-center mb-4">
            <Text className="text-4xl">🏗️</Text>
          </View>
          <Text className="text-brand-primary text-3xl font-bold mb-1">PES</Text>
          <Text className="text-text-primary text-lg font-medium mb-2">
            Pragmatics Engineering Solutions
          </Text>
          <Text className="text-text-muted text-sm">Version 1.0.0</Text>
        </View>

        {/* Mission Statement */}
        <Card className="mb-6">
          <View className="items-center">
            <Text className="text-xl mb-3">🎯</Text>
            <Text className="text-text-primary text-lg font-semibold text-center mb-2">
              Our Mission
            </Text>
            <Text className="text-text-secondary text-base text-center leading-6">
              To empower industries with intelligent energy management solutions that optimize power consumption, reduce costs, and promote sustainable practices.
            </Text>
          </View>
        </Card>

        {/* Features */}
        <Text className="text-text-secondary text-sm font-medium mb-3 ml-1">
          FEATURES
        </Text>
        <Card className="mb-6">
          <View className="flex-row flex-wrap -mx-2">
            {features.map((feature, index) => (
              <View key={index} className="w-1/2 px-2 mb-4">
                <View className="items-center">
                  <View className="w-12 h-12 rounded-full bg-background-tertiary items-center justify-center mb-2">
                    <Text className="text-xl">{feature.icon}</Text>
                  </View>
                  <Text className="text-text-primary text-sm font-medium text-center">
                    {feature.title}
                  </Text>
                  <Text className="text-text-muted text-xs text-center mt-1">
                    {feature.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </Card>

        {/* Our Team */}
        <Text className="text-text-secondary text-sm font-medium mb-3 ml-1">
          OUR TEAM
        </Text>
        <Card className="mb-6">
          {team.map((member, index) => (
            <View
              key={index}
              className={`flex-row items-center py-3 ${
                index !== team.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <View className="w-12 h-12 rounded-full bg-background-tertiary items-center justify-center mr-3">
                <Text className="text-xl">{member.icon}</Text>
              </View>
              <View>
                <Text className="text-text-primary text-base font-medium">
                  {member.name}
                </Text>
                <Text className="text-text-muted text-sm">{member.role}</Text>
              </View>
            </View>
          ))}
        </Card>

        {/* Contact Information */}
        <Text className="text-text-secondary text-sm font-medium mb-3 ml-1">
          CONTACT US
        </Text>
        <Card className="mb-6">
          <TouchableOpacity
            className="flex-row items-center py-3 border-b border-border"
            onPress={() => handleOpenLink('mailto:support@pes.com')}
          >
            <Text className="text-xl mr-3">✉️</Text>
            <View className="flex-1">
              <Text className="text-text-muted text-xs">Email</Text>
              <Text className="text-text-primary text-base">support@pes.com</Text>
            </View>
            <Text className="text-text-muted">›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center py-3 border-b border-border"
            onPress={() => handleOpenLink('tel:+15551234567')}
          >
            <Text className="text-xl mr-3">📞</Text>
            <View className="flex-1">
              <Text className="text-text-muted text-xs">Phone</Text>
              <Text className="text-text-primary text-base">+1 (555) 123-4567</Text>
            </View>
            <Text className="text-text-muted">›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center py-3 border-b border-border"
            onPress={() => handleOpenLink('https://www.pes.com')}
          >
            <Text className="text-xl mr-3">🌐</Text>
            <View className="flex-1">
              <Text className="text-text-muted text-xs">Website</Text>
              <Text className="text-text-primary text-base">www.pes.com</Text>
            </View>
            <Text className="text-text-muted">›</Text>
          </TouchableOpacity>

          <View className="flex-row items-center py-3">
            <Text className="text-xl mr-3">📍</Text>
            <View className="flex-1">
              <Text className="text-text-muted text-xs">Address</Text>
              <Text className="text-text-primary text-base">
                123 Energy Drive{'\n'}Tech City, TC 12345
              </Text>
            </View>
          </View>
        </Card>

        {/* Social Links */}
        <Text className="text-text-secondary text-sm font-medium mb-3 ml-1">
          FOLLOW US
        </Text>
        <Card className="mb-6">
          <View className="flex-row justify-around py-4">
            <TouchableOpacity
              onPress={() => handleOpenLink('https://twitter.com/pes')}
              className="items-center"
            >
              <View className="w-12 h-12 rounded-full bg-background-tertiary items-center justify-center mb-2">
                <Text className="text-xl">🐦</Text>
              </View>
              <Text className="text-text-muted text-xs">Twitter</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleOpenLink('https://linkedin.com/company/pes')}
              className="items-center"
            >
              <View className="w-12 h-12 rounded-full bg-background-tertiary items-center justify-center mb-2">
                <Text className="text-xl">💼</Text>
              </View>
              <Text className="text-text-muted text-xs">LinkedIn</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleOpenLink('https://facebook.com/pes')}
              className="items-center"
            >
              <View className="w-12 h-12 rounded-full bg-background-tertiary items-center justify-center mb-2">
                <Text className="text-xl">📘</Text>
              </View>
              <Text className="text-text-muted text-xs">Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleOpenLink('https://instagram.com/pes')}
              className="items-center"
            >
              <View className="w-12 h-12 rounded-full bg-background-tertiary items-center justify-center mb-2">
                <Text className="text-xl">📷</Text>
              </View>
              <Text className="text-text-muted text-xs">Instagram</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Footer */}
        <View className="items-center py-6">
          <Text className="text-text-muted text-sm text-center">
            Made with 💚 by PES Team
          </Text>
          <Text className="text-text-muted text-sm mt-2">
            © 2026 Pragmatics Engineering Solutions
          </Text>
          <Text className="text-text-muted text-xs mt-1">
            All rights reserved
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;
