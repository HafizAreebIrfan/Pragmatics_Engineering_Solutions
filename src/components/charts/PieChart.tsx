/**
 * PieChart/DonutChart component using ECharts
 * Used for displaying power distribution across sources
 */

import React, { useMemo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import RNEChartsPro from 'react-native-echarts-pro';
import { colors } from '../../theme/colors';
import { baseChartOptions, legendConfig, seriesColors } from './chartConfig';
import type { PieChartProps } from './types';

export const PieChart: React.FC<PieChartProps> = ({
  data,
  height = 200,
  loading = false,
  style,
  donut = true,
  showLegend = true,
  centerText = '',
  onChartReady,
}) => {
  const chartOption = useMemo(() => {
    const pieData = data.map((item, index) => ({
      name: item.name,
      value: item.value,
      itemStyle: {
        color: item.color || seriesColors[index % seriesColors.length],
      },
    }));

    return {
      ...baseChartOptions,
      tooltip: {
        trigger: 'item' as const,
        backgroundColor: colors.background.tertiary,
        borderColor: colors.border.default,
        borderWidth: 1,
        textStyle: {
          color: colors.text.primary,
          fontSize: 12,
        },
        formatter: '{b}: {c} ({d}%)',
      },
      legend: showLegend
        ? {
            ...legendConfig,
            orient: 'vertical' as const,
            left: 'left',
            top: 'center',
            data: data.map((d) => d.name),
          }
        : { show: false },
      series: [
        {
          type: 'pie' as const,
          radius: donut ? ['50%', '75%'] : ['0%', '75%'],
          center: showLegend ? ['65%', '50%'] : ['50%', '50%'],
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: donut ? 4 : 0,
            borderColor: colors.background.primary,
            borderWidth: 2,
          },
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: false,
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          labelLine: {
            show: false,
          },
          data: pieData,
        },
      ],
      // Center text for donut charts
      ...(donut &&
        centerText && {
          graphic: [
            {
              type: 'text' as const,
              left: showLegend ? '62%' : '47%',
              top: '45%',
              style: {
                text: centerText,
                textAlign: 'center' as const,
                fill: colors.text.primary,
                fontSize: 14,
                fontWeight: 'bold' as const,
              },
            },
          ],
        }),
    };
  }, [data, donut, showLegend, centerText]);

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

export default PieChart;
