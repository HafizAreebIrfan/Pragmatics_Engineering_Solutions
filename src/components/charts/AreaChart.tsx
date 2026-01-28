/**
 * AreaChart component using ECharts
 * Used for displaying stacked power generation data (solar, wind, grid)
 */

import React, { useMemo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import RNEChartsPro from 'react-native-echarts-pro';
import { colors } from '../../theme/colors';
import {
  baseChartOptions,
  gridConfig,
  xAxisConfig,
  yAxisConfig,
  tooltipConfig,
  legendConfig,
  seriesColors,
} from './chartConfig';
import type { AreaChartProps } from './types';

export const AreaChart: React.FC<AreaChartProps> = ({
  xAxisData,
  series,
  height = 200,
  loading = false,
  style,
  smooth = true,
  yAxisUnit = '',
  showLegend = true,
  stacked = true,
  onChartReady,
}) => {
  const chartOption = useMemo(() => {
    const seriesData = series.map((s, index) => {
      const seriesColor = s.color || seriesColors[index % seriesColors.length];

      return {
        type: 'line' as const,
        name: s.name,
        data: s.data,
        smooth,
        symbol: 'none',
        lineStyle: {
          width: stacked ? 0 : 2,
          color: seriesColor,
        },
        itemStyle: {
          color: seriesColor,
        },
        areaStyle: {
          opacity: stacked ? 0.8 : 0.3,
          color: seriesColor,
        },
        ...(stacked && { stack: 'Total' }),
        emphasis: {
          focus: 'series' as const,
        },
      };
    });

    return {
      ...baseChartOptions,
      grid: gridConfig,
      tooltip: {
        ...tooltipConfig,
        trigger: 'axis' as const,
        axisPointer: {
          type: 'cross' as const,
          label: {
            backgroundColor: colors.background.tertiary,
          },
        },
      },
      legend: showLegend
        ? {
            ...legendConfig,
            data: series.map((s) => s.name),
          }
        : { show: false },
      xAxis: {
        ...xAxisConfig,
        data: xAxisData,
        boundaryGap: false,
      },
      yAxis: {
        ...yAxisConfig,
        axisLabel: {
          ...yAxisConfig.axisLabel,
          formatter: yAxisUnit ? `{value} ${yAxisUnit}` : '{value}',
        },
      },
      series: seriesData,
    };
  }, [xAxisData, series, smooth, yAxisUnit, showLegend, stacked]);

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

export default AreaChart;
