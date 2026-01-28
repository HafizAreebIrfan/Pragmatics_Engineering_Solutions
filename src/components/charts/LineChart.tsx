/**
 * LineChart component using ECharts
 * Used for displaying time series data like power trends, efficiency over time
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
  lineSeriesConfig,
  areaSeriesConfig,
  seriesColors,
} from './chartConfig';
import type { LineChartProps } from './types';

export const LineChart: React.FC<LineChartProps> = ({
  xAxisData,
  series,
  height = 200,
  loading = false,
  style,
  showArea = false,
  smooth = true,
  yAxisUnit = '',
  showLegend = true,
  onChartReady,
}) => {
  const chartOption = useMemo(() => {
    const seriesData = series.map((s, index) => ({
      ...(showArea ? areaSeriesConfig : lineSeriesConfig),
      name: s.name,
      data: s.data,
      smooth,
      itemStyle: {
        color: s.color || seriesColors[index % seriesColors.length],
      },
      lineStyle: {
        width: 2,
        color: s.color || seriesColors[index % seriesColors.length],
      },
      ...(showArea && {
        areaStyle: {
          opacity: 0.15,
          color: s.color || seriesColors[index % seriesColors.length],
        },
      }),
    }));

    return {
      ...baseChartOptions,
      grid: gridConfig,
      tooltip: tooltipConfig,
      legend: showLegend
        ? {
            ...legendConfig,
            data: series.map((s) => s.name),
          }
        : { show: false },
      xAxis: {
        ...xAxisConfig,
        data: xAxisData,
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
  }, [xAxisData, series, showArea, smooth, yAxisUnit, showLegend]);

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

export default LineChart;
