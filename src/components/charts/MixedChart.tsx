/**
 * MixedChart component using ECharts
 * Combines line and bar charts for displaying related metrics
 * (e.g., power generation bars + efficiency line)
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
import type { MixedChartProps } from './types';

export const MixedChart: React.FC<MixedChartProps> = ({
  xAxisData,
  lineSeries = [],
  barSeries = [],
  height = 200,
  loading = false,
  style,
  showLegend = true,
  leftYAxisUnit = '',
  rightYAxisUnit = '',
  onChartReady,
}) => {
  const chartOption = useMemo(() => {
    const allSeriesNames = [
      ...barSeries.map((s) => s.name),
      ...lineSeries.map((s) => s.name),
    ];

    // Bar series configuration
    const barSeriesData = barSeries.map((s, index) => ({
      type: 'bar' as const,
      name: s.name,
      data: s.data,
      yAxisIndex: 0,
      barWidth: barSeries.length > 1 ? '30%' : '50%',
      itemStyle: {
        borderRadius: [4, 4, 0, 0],
        color: s.color || seriesColors[index % seriesColors.length],
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    }));

    // Line series configuration
    const lineSeriesData = lineSeries.map((s, index) => ({
      type: 'line' as const,
      name: s.name,
      data: s.data,
      yAxisIndex: 1,
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: {
        width: 2,
        color: s.color || seriesColors[(barSeries.length + index) % seriesColors.length],
      },
      itemStyle: {
        color: s.color || seriesColors[(barSeries.length + index) % seriesColors.length],
      },
      emphasis: {
        focus: 'series' as const,
      },
    }));

    return {
      ...baseChartOptions,
      grid: {
        ...gridConfig,
        right: lineSeries.length > 0 ? 50 : 20,
      },
      tooltip: {
        ...tooltipConfig,
        trigger: 'axis' as const,
        axisPointer: {
          type: 'cross' as const,
          crossStyle: {
            color: colors.text.muted,
          },
        },
      },
      legend: showLegend
        ? {
            ...legendConfig,
            data: allSeriesNames,
          }
        : { show: false },
      xAxis: {
        ...xAxisConfig,
        data: xAxisData,
        boundaryGap: true,
      },
      yAxis: [
        {
          ...yAxisConfig,
          position: 'left' as const,
          axisLabel: {
            ...yAxisConfig.axisLabel,
            formatter: leftYAxisUnit ? `{value} ${leftYAxisUnit}` : '{value}',
          },
        },
        ...(lineSeries.length > 0
          ? [
              {
                ...yAxisConfig,
                position: 'right' as const,
                axisLabel: {
                  ...yAxisConfig.axisLabel,
                  formatter: rightYAxisUnit ? `{value} ${rightYAxisUnit}` : '{value}',
                },
                splitLine: {
                  show: false,
                },
              },
            ]
          : []),
      ],
      series: [...barSeriesData, ...lineSeriesData],
    };
  }, [xAxisData, lineSeries, barSeries, showLegend, leftYAxisUnit, rightYAxisUnit]);

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

export default MixedChart;
