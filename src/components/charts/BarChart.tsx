/**
 * BarChart component using ECharts
 * Used for displaying categorical data like power comparison, alarm counts
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
  barSeriesConfig,
  seriesColors,
} from './chartConfig';
import type { BarChartProps } from './types';

export const BarChart: React.FC<BarChartProps> = ({
  xAxisData,
  series,
  height = 200,
  loading = false,
  style,
  yAxisUnit = '',
  showLegend = true,
  stacked = false,
  horizontal = false,
  onChartReady,
}) => {
  const chartOption = useMemo(() => {
    const seriesData = series.map((s, index) => ({
      ...barSeriesConfig,
      name: s.name,
      data: s.data,
      itemStyle: {
        ...barSeriesConfig.itemStyle,
        color: s.color || seriesColors[index % seriesColors.length],
      },
      ...(stacked && { stack: 'total' }),
    }));

    const xAxisOptions = horizontal
      ? {
          ...yAxisConfig,
          axisLabel: {
            ...yAxisConfig.axisLabel,
            formatter: yAxisUnit ? `{value} ${yAxisUnit}` : '{value}',
          },
        }
      : {
          ...xAxisConfig,
          data: xAxisData,
          boundaryGap: true, // Bars need gap
        };

    const yAxisOptions = horizontal
      ? {
          ...xAxisConfig,
          data: xAxisData,
          boundaryGap: true,
        }
      : {
          ...yAxisConfig,
          axisLabel: {
            ...yAxisConfig.axisLabel,
            formatter: yAxisUnit ? `{value} ${yAxisUnit}` : '{value}',
          },
        };

    return {
      ...baseChartOptions,
      grid: gridConfig,
      tooltip: {
        ...tooltipConfig,
        trigger: 'axis' as const,
        axisPointer: {
          type: 'shadow' as const,
        },
      },
      legend: showLegend
        ? {
            ...legendConfig,
            data: series.map((s) => s.name),
          }
        : { show: false },
      xAxis: xAxisOptions,
      yAxis: yAxisOptions,
      series: seriesData,
    };
  }, [xAxisData, series, yAxisUnit, showLegend, stacked, horizontal]);

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

export default BarChart;
