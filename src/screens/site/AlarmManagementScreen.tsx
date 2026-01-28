import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SiteStackParamList } from '../../navigation/types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Alarm } from '../../types';

type RouteProps = RouteProp<SiteStackParamList, 'AlarmManagement'>;

// Mock alarms
const MOCK_ALARMS: Alarm[] = [
  {
    id: '1',
    title: 'High Voltage Warning',
    description: 'Voltage exceeded threshold on Phase A',
    severity: 'warning',
    deviceName: 'Solar Panel Array 1',
    timestamp: '17/12/2025, 07:45 PM',
    acknowledged: false,
  },
  {
    id: '2',
    title: 'Communication Lost',
    description: 'Lost connection to device',
    severity: 'critical',
    deviceName: 'Wind Turbine 2',
    timestamp: '17/12/2025, 07:30 PM',
    acknowledged: false,
  },
  {
    id: '3',
    title: 'Low Power Output',
    description: 'Power output below expected range',
    severity: 'warning',
    deviceName: 'Solar Panel Array 2',
    timestamp: '17/12/2025, 07:15 PM',
    acknowledged: true,
  },
  {
    id: '4',
    title: 'Power Restored',
    description: 'Grid connection restored after outage',
    severity: 'resolved',
    deviceName: 'Grid Connection',
    timestamp: '17/12/2025, 07:00 PM',
    acknowledged: true,
  },
  {
    id: '5',
    title: 'Temperature Warning',
    description: 'Inverter temperature above normal',
    severity: 'info',
    deviceName: 'Inverter 1',
    timestamp: '17/12/2025, 06:45 PM',
    acknowledged: false,
  },
];

type FilterType = 'all' | 'active' | 'acknowledged' | 'resolved';

export const AlarmManagementScreen: React.FC = () => {
  const route = useRoute<RouteProps>();
  const { siteName } = route.params;
  const [alarms, setAlarms] = useState(MOCK_ALARMS);
  const [filter, setFilter] = useState<FilterType>('all');

  const getSeverityIcon = (severity: Alarm['severity']) => {
    switch (severity) {
      case 'critical':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      case 'resolved':
        return '✅';
      default:
        return '🔔';
    }
  };

  const getSeverityColor = (severity: Alarm['severity']) => {
    switch (severity) {
      case 'critical':
        return 'border-l-status-error';
      case 'warning':
        return 'border-l-status-warning';
      case 'info':
        return 'border-l-status-info';
      case 'resolved':
        return 'border-l-status-success';
      default:
        return 'border-l-text-muted';
    }
  };

  const handleAcknowledge = (alarmId: string) => {
    setAlarms(prev =>
      prev.map(alarm =>
        alarm.id === alarmId ? { ...alarm, acknowledged: true } : alarm
      )
    );
    Alert.alert('Acknowledged', 'Alarm has been acknowledged');
  };

  const handleAcknowledgeAll = () => {
    Alert.alert(
      'Acknowledge All',
      'Are you sure you want to acknowledge all active alarms?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Acknowledge',
          onPress: () => {
            setAlarms(prev =>
              prev.map(alarm => ({ ...alarm, acknowledged: true }))
            );
          },
        },
      ]
    );
  };

  const filteredAlarms = alarms.filter(alarm => {
    switch (filter) {
      case 'active':
        return !alarm.acknowledged && alarm.severity !== 'resolved';
      case 'acknowledged':
        return alarm.acknowledged;
      case 'resolved':
        return alarm.severity === 'resolved';
      default:
        return true;
    }
  });

  const activeCount = alarms.filter(
    a => !a.acknowledged && a.severity !== 'resolved'
  ).length;

  const renderAlarm = ({ item }: { item: Alarm }) => (
    <Card className={`mb-3 border-l-4 ${getSeverityColor(item.severity)}`}>
      <View className="flex-row items-start">
        {/* Severity Icon */}
        <Text className="text-2xl mr-3">{getSeverityIcon(item.severity)}</Text>

        {/* Alarm Details */}
        <View className="flex-1">
          <Text className="text-text-primary text-base font-semibold">
            {item.title}
          </Text>
          <Text className="text-text-secondary text-sm mt-1">
            {item.description}
          </Text>
          <View className="flex-row items-center mt-2">
            <Text className="text-text-muted text-xs">
              {item.deviceName} • {item.timestamp}
            </Text>
          </View>

          {/* Acknowledge Button */}
          {!item.acknowledged && item.severity !== 'resolved' && (
            <TouchableOpacity
              onPress={() => handleAcknowledge(item.id)}
              className="mt-3 self-start bg-background-tertiary px-4 py-2 rounded-lg"
            >
              <Text className="text-text-primary text-sm">Acknowledge</Text>
            </TouchableOpacity>
          )}

          {/* Acknowledged Badge */}
          {item.acknowledged && item.severity !== 'resolved' && (
            <View className="mt-3 self-start bg-status-info/20 px-3 py-1 rounded-full">
              <Text className="text-status-info text-xs">Acknowledged</Text>
            </View>
          )}
        </View>
      </View>
    </Card>
  );

  const renderFilters = () => (
    <View className="flex-row mb-4">
      {(['all', 'active', 'acknowledged', 'resolved'] as FilterType[]).map(f => {
        const isSelected = filter === f;
        const label = f.charAt(0).toUpperCase() + f.slice(1);
        return (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            className={`px-4 py-2 rounded-full mr-2 ${
              isSelected ? 'bg-brand-primary' : 'bg-background-tertiary'
            }`}
          >
            <Text
              className={`text-sm ${
                isSelected ? 'text-background-primary font-semibold' : 'text-text-secondary'
              }`}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderHeader = () => (
    <View>
      {/* Stats Bar */}
      <View className="flex-row justify-between items-center mb-4 p-4 bg-background-secondary rounded-lg">
        <View>
          <Text className="text-text-muted text-sm">Active Alarms</Text>
          <Text className="text-text-primary text-2xl font-bold">{activeCount}</Text>
        </View>
        {activeCount > 0 && (
          <Button
            title="Acknowledge All"
            variant="outline"
            size="sm"
            onPress={handleAcknowledgeAll}
          />
        )}
      </View>

      {/* Filters */}
      {renderFilters()}

      {/* Count */}
      <Text className="text-text-secondary text-sm mb-3">
        {filteredAlarms.length} alarm{filteredAlarms.length !== 1 ? 's' : ''}
      </Text>
    </View>
  );

  const renderEmpty = () => (
    <View className="items-center py-12">
      <Text className="text-4xl mb-4">✅</Text>
      <Text className="text-text-secondary text-lg">No alarms</Text>
      <Text className="text-text-muted text-sm">
        {filter === 'all' ? 'All systems operational' : `No ${filter} alarms`}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background-primary" edges={['bottom']}>
      <FlatList
        data={filteredAlarms}
        renderItem={renderAlarm}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default AlarmManagementScreen;
