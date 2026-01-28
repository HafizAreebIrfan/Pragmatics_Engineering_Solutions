import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SiteStackParamList } from '../../navigation/types';
import { Card } from '../../components/ui/Card';
import { SearchBar } from '../../components/ui/SearchBar';
import { Device } from '../../types';

type RouteProps = RouteProp<SiteStackParamList, 'Devices'>;

// Mock devices
const MOCK_DEVICES: Device[] = [
  {
    id: '1',
    name: 'Solar Panel Array 1',
    type: 'solar',
    status: 'online',
    output: 145.2,
    unit: 'kW',
  },
  {
    id: '2',
    name: 'Solar Panel Array 2',
    type: 'solar',
    status: 'online',
    output: 132.8,
    unit: 'kW',
  },
  {
    id: '3',
    name: 'Wind Turbine 1',
    type: 'wind',
    status: 'online',
    output: 89.5,
    unit: 'kW',
  },
  {
    id: '4',
    name: 'Wind Turbine 2',
    type: 'wind',
    status: 'warning',
    output: 45.2,
    unit: 'kW',
  },
  {
    id: '5',
    name: 'Grid Connection',
    type: 'grid',
    status: 'online',
    output: 80.74,
    unit: 'kW',
  },
  {
    id: '6',
    name: 'PCS Unit 1',
    type: 'pcs',
    status: 'online',
    output: 250.0,
    unit: 'kVA',
  },
  {
    id: '7',
    name: 'Inverter 1',
    type: 'inverter',
    status: 'offline',
    output: 0,
    unit: 'kW',
  },
  {
    id: '8',
    name: 'Smart Meter',
    type: 'meter',
    status: 'online',
    output: 315.44,
    unit: 'kW',
  },
];

export const DevicesScreen: React.FC = () => {
  const route = useRoute<RouteProps>();
  const { siteName } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const getDeviceIcon = (type: Device['type']) => {
    switch (type) {
      case 'solar':
        return '☀️';
      case 'wind':
        return '💨';
      case 'grid':
        return '⚡';
      case 'pcs':
        return '🔋';
      case 'inverter':
        return '🔌';
      case 'meter':
        return '📊';
      default:
        return '📦';
    }
  };

  const getStatusColor = (status: Device['status']) => {
    switch (status) {
      case 'online':
        return 'bg-status-success';
      case 'offline':
        return 'bg-status-error';
      case 'warning':
        return 'bg-status-warning';
      default:
        return 'bg-text-muted';
    }
  };

  const getStatusText = (status: Device['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const deviceTypes = ['All', ...new Set(MOCK_DEVICES.map(d => d.type))];

  const filteredDevices = MOCK_DEVICES.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || selectedType === 'All' || device.type === selectedType;
    return matchesSearch && matchesType;
  });

  const renderDevice = ({ item }: { item: Device }) => (
    <Card className="mb-3">
      <View className="flex-row items-center">
        {/* Device Icon */}
        <View className="w-12 h-12 bg-background-tertiary rounded-lg items-center justify-center mr-3">
          <Text className="text-2xl">{getDeviceIcon(item.type)}</Text>
        </View>

        {/* Device Info */}
        <View className="flex-1">
          <Text className="text-text-primary text-base font-medium" numberOfLines={1}>
            {item.name}
          </Text>
          <View className="flex-row items-center mt-1">
            <View className={`w-2 h-2 rounded-full ${getStatusColor(item.status)} mr-2`} />
            <Text className="text-text-secondary text-sm">
              {getStatusText(item.status)}
            </Text>
          </View>
        </View>

        {/* Output Value */}
        <View className="items-end">
          <Text className="text-text-primary text-lg font-bold">
            {item.output.toFixed(1)}
          </Text>
          <Text className="text-text-muted text-sm">{item.unit}</Text>
        </View>
      </View>
    </Card>
  );

  const renderTypeFilter = () => (
    <View className="flex-row mb-4">
      {deviceTypes.map(type => {
        const isSelected = type === (selectedType || 'All');
        return (
          <TouchableOpacity
            key={type}
            onPress={() => setSelectedType(type === 'All' ? null : type)}
            className={`px-4 py-2 rounded-full mr-2 ${
              isSelected ? 'bg-brand-primary' : 'bg-background-tertiary'
            }`}
          >
            <Text
              className={`text-sm capitalize ${
                isSelected ? 'text-background-primary font-semibold' : 'text-text-secondary'
              }`}
            >
              {type}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderHeader = () => (
    <View>
      {/* Search */}
      <SearchBar
        onSearch={setSearchQuery}
        placeholder="Search devices..."
        showFilter={false}
        className="mb-4"
      />

      {/* Type Filters */}
      {renderTypeFilter()}

      {/* Device Count */}
      <View className="flex-row justify-between mb-3">
        <Text className="text-text-secondary text-sm">
          {filteredDevices.length} device{filteredDevices.length !== 1 ? 's' : ''}
        </Text>
        <Text className="text-text-muted text-sm">{siteName}</Text>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View className="items-center py-12">
      <Text className="text-4xl mb-4">🔍</Text>
      <Text className="text-text-secondary text-lg">No devices found</Text>
      <Text className="text-text-muted text-sm">
        {searchQuery ? `No devices match "${searchQuery}"` : 'No devices available'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background-primary" edges={['bottom']}>
      <FlatList
        data={filteredDevices}
        renderItem={renderDevice}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default DevicesScreen;
