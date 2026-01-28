import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SiteStackParamList } from '../../navigation/types';
import { Card } from '../../components/ui/Card';
import { LiveParameter } from '../../types';

type RouteProps = RouteProp<SiteStackParamList, 'LiveParameters'>;

// Mock live parameters
const MOCK_PARAMETERS: LiveParameter[] = [
  { name: 'Active Power', value: 315.44, unit: 'kW', trend: 'up' },
  { name: 'Reactive Power', value: 58.95, unit: 'kVAR', trend: 'stable' },
  { name: 'Power Factor', value: 0.95, unit: '', trend: 'stable' },
  { name: 'Voltage (L-L)', value: 415, unit: 'V', trend: 'stable' },
  { name: 'Voltage (L-N)', value: 240, unit: 'V', trend: 'stable' },
  { name: 'Current', value: 125.8, unit: 'A', trend: 'down' },
  { name: 'Frequency', value: 50.02, unit: 'Hz', trend: 'stable' },
  { name: 'Energy Today', value: 2456.7, unit: 'kWh', trend: 'up' },
  { name: 'Total Energy', value: 1234567, unit: 'kWh', trend: 'up' },
];

export const LiveParametersScreen: React.FC = () => {
  const route = useRoute<RouteProps>();
  const { siteName } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [parameters, setParameters] = useState(MOCK_PARAMETERS);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const onRefresh = async () => {
    setRefreshing(true);
    // TODO: Fetch real-time data from PubSub
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
    setRefreshing(false);
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setParameters(prev =>
        prev.map(param => ({
          ...param,
          value: param.value + (Math.random() - 0.5) * (param.value * 0.01),
        }))
      );
      setLastUpdated(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      default:
        return '→';
    }
  };

  const getTrendColor = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-status-success';
      case 'down':
        return 'text-status-error';
      default:
        return 'text-text-muted';
    }
  };

  const formatValue = (value: number, unit: string) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)}M`;
    }
    if (value >= 1000) {
      return value.toLocaleString('en-US', { maximumFractionDigits: 1 });
    }
    return value.toFixed(2);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-primary" edges={['bottom']}>
      {/* Status Bar */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-background-secondary border-b border-border">
        <View className="flex-row items-center">
          <View className="w-2 h-2 rounded-full bg-status-success mr-2" />
          <Text className="text-text-secondary text-sm">Live</Text>
        </View>
        <Text className="text-text-muted text-sm">
          Updated: {lastUpdated.toLocaleTimeString()}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#00D26A"
            colors={['#00D26A']}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Site Header */}
        <View className="mb-4">
          <Text className="text-text-primary text-lg font-semibold">{siteName}</Text>
          <Text className="text-text-muted text-sm">Real-time power metrics</Text>
        </View>

        {/* Parameters Grid */}
        <View className="flex-row flex-wrap -mx-1">
          {parameters.map((param, index) => (
            <View key={param.name} className="w-1/2 px-1 mb-2">
              <Card>
                <View className="flex-row items-start justify-between">
                  <View className="flex-1">
                    <Text className="text-text-muted text-xs mb-1" numberOfLines={1}>
                      {param.name}
                    </Text>
                    <Text className="text-text-primary text-xl font-bold">
                      {formatValue(param.value, param.unit)}
                    </Text>
                    {param.unit && (
                      <Text className="text-text-secondary text-sm">{param.unit}</Text>
                    )}
                  </View>
                  <Text className={`text-lg ${getTrendColor(param.trend)}`}>
                    {getTrendIcon(param.trend)}
                  </Text>
                </View>
              </Card>
            </View>
          ))}
        </View>

        {/* PubSub Status */}
        <Card className="mt-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="text-xl mr-3">📡</Text>
              <View>
                <Text className="text-text-primary text-base font-medium">
                  AWS IoT PubSub
                </Text>
                <Text className="text-text-muted text-sm">
                  Real-time data streaming
                </Text>
              </View>
            </View>
            <View className="bg-status-success/20 px-3 py-1 rounded-full">
              <Text className="text-status-success text-sm">Connected</Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LiveParametersScreen;
