import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Site } from '../../types';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';

interface SiteCardProps {
  site: Site;
  onPress: () => void;
  onMenuPress?: () => void;
}

export const SiteCard: React.FC<SiteCardProps> = ({
  site,
  onPress,
  onMenuPress,
}) => {
  const [expanded, setExpanded] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return num.toLocaleString('en-US', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      });
    }
    return num.toFixed(4);
  };

  const getStatusColor = (status: Site['status']) => {
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

  return (
    <Card className="mb-4" onPress={onPress}>
      {/* Header Row */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center flex-1">
          {/* Status Indicator */}
          <View className={`w-2 h-2 rounded-full ${getStatusColor(site.status)} mr-3`} />

          {/* Site Icon */}
          <Text className="text-xl mr-2">🏭</Text>

          {/* Site Name */}
          <View className="flex-1">
            <Text className="text-text-primary text-base font-semibold" numberOfLines={1}>
              {site.name}
            </Text>
            <Text className="text-text-muted text-xs">
              {site.lastUpdated}
            </Text>
          </View>
        </View>

        {/* Menu Button */}
        <TouchableOpacity
          onPress={onMenuPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          className="p-2"
        >
          <Text className="text-text-secondary text-lg">⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Power Metrics Grid */}
      <View className="flex-row justify-between mb-4">
        {/* Solar */}
        <View className="items-center flex-1">
          <Text className="text-lg mb-1">☀️</Text>
          <Text className="text-text-primary text-sm font-semibold">
            {formatNumber(site.powerMetrics.solar)}
          </Text>
          <Text className="text-text-muted text-xs">kWp</Text>
        </View>

        {/* Wind */}
        <View className="items-center flex-1">
          <Text className="text-lg mb-1">💨</Text>
          <Text className="text-text-primary text-sm font-semibold">
            {formatNumber(site.powerMetrics.wind)}
          </Text>
          <Text className="text-text-muted text-xs">kWp</Text>
        </View>

        {/* Grid */}
        <View className="items-center flex-1">
          <Text className="text-lg mb-1">⚡</Text>
          <Text className="text-text-primary text-sm font-semibold">
            {formatNumber(site.powerMetrics.grid)}
          </Text>
          <Text className="text-text-muted text-xs">kWp</Text>
        </View>

        {/* PV Size (if available) */}
        {site.powerMetrics.pvSize && (
          <View className="items-center flex-1">
            <Text className="text-lg mb-1">📊</Text>
            <Text className="text-text-primary text-sm font-semibold">
              {formatNumber(site.powerMetrics.pvSize)}
            </Text>
            <Text className="text-text-muted text-xs">kWp</Text>
          </View>
        )}
      </View>

      {/* Efficiency Bar */}
      <View className="mb-3">
        <View className="flex-row justify-between mb-2">
          <Text className="text-text-secondary text-sm">Power Output Efficiency</Text>
          <Text className="text-brand-primary text-sm font-semibold">
            {site.efficiency.toFixed(2)}%
          </Text>
        </View>
        <ProgressBar progress={site.efficiency} showPercentage={false} />
      </View>

      {/* Expand Button */}
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        className="items-center py-2"
      >
        <Text className="text-text-secondary text-sm">
          {expanded ? 'Collapse View ▲' : 'Expand View ▼'}
        </Text>
      </TouchableOpacity>

      {/* Expanded Content */}
      {expanded && (
        <View className="mt-3 pt-3 border-t border-border">
          {/* Alarm Count */}
          {site.alarmCount !== undefined && site.alarmCount > 0 && (
            <View className="flex-row items-center mb-2">
              <Text className="text-status-warning mr-2">⚠️</Text>
              <Text className="text-text-secondary text-sm">
                {site.alarmCount} active alarm{site.alarmCount > 1 ? 's' : ''}
              </Text>
            </View>
          )}

          {/* Quick Actions */}
          <View className="flex-row gap-2 mt-2">
            <TouchableOpacity
              className="flex-1 bg-background-tertiary rounded-lg py-2 items-center"
              onPress={onPress}
            >
              <Text className="text-text-primary text-sm">View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Card>
  );
};

export default SiteCard;
