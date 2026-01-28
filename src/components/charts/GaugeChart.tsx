/**
 * GaugeChart component using ECharts
 * Used for displaying single value metrics like efficiency percentage
 */

import React, { useMemo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import RNEChartsPro from 'react-native-echarts-pro';
import { colors } from '../../theme/colors';
import { baseChartOptions } from './chartConfig';
import type { GaugeChartProps } from './types';

export const GaugeChart: React.FC<GaugeChartProps> = ({
  value,
  min = 0,
  max = 100,
  height = 180,
  loading = false,
  style,
  unit = '%',
  title = '',
  color = colors.brand.primary,
  onChartReady,
}) => {
  const chartOption = useMemo(() => {
    // Determine color based on value thresholds
    const getColor = () => {
      const percentage = ((value - min) / (max - min)) * 100;
      if (percentage >= 80) return colors.status.success;
      if (percentage >= 50) return colors.status.warning;
      return colors.status.error;
    };

    const gaugeColor = color === colors.brand.primary ? getColor() : color;

    return {
      ...baseChartOptions,
      series: [
        {
          type: 'gauge' as const,
          startAngle: 200,
          endAngle: -20,
          min,
          max,
          splitNumber: 5,
          center: ['50%', '60%'],
          radius: '90%',
          itemStyle: {
            color: gaugeColor,
          },
          progress: {
            show: true,
            width: 12,
            roundCap: true,
          },
          pointer: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              width: 12,
              color: [[1, colors.background.tertiary]],
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          title: {
            show: !!title,
            offsetCenter: [0, '90%'],
            fontSize: 12,
            color: colors.text.secondary,
          },
          detail: {
            valueAnimation: true,
            fontSize: 24,
            fontWeight: 'bold' as const,
            offsetCenter: [0, '10%'],
            formatter: `{value}${unit}`,
            color: colors.text.primary,
          },
          data: [
            {
              value,
              name: title,
            },
          ],
        },
      ],
    };
  }, [value, min, max, unit, title, color]);

  if (loading) {
    return (
      <View
        style={[
          {
            height,
            backgroundColor: colors.background.tertiary,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
          },
          style,
        ]}
      >
        <ActivityIndicator size="small" color={colors.brand.primary} />
        <Text style={{ color: colors.text.muted, marginTop: 8, fontSize: 12 }}>
          Loading chart...
        </Text>
      </View>
    );
  }

  return (
    <View style={[{ height }, style]} onLayout={onChartReady}>
      <RNEChartsPro
        height={height}
        option={chartOption}
        webViewSettings={{
          scrollEnabled: false,
          style: { backgroundColor: 'transparent' },
        }}
      />
    </View>
  );
};

export default GaugeChart;
