/**
 * ECharts configuration and theme settings for the Pragmatics Engineering Solutions app
 * Uses dark theme to match the app's design
 */

import { colors } from '../../theme/colors';

// Chart color palette for multi-series charts
export const chartColors = {
  primary: colors.brand.primary, // #00D26A - Green
  secondary: '#3498DB', // Blue
  tertiary: '#FFB800', // Warning Yellow
  quaternary: '#9B59B6', // Purple
  quinary: '#E74C3C', // Red
  senary: '#1ABC9C', // Teal
};

// Default series colors for charts
export const seriesColors = [
  chartColors.primary,
  chartColors.secondary,
  chartColors.tertiary,
  chartColors.quaternary,
  chartColors.quinary,
  chartColors.senary,
];

// Base chart options that apply to all charts
export const baseChartOptions = {
  backgroundColor: 'transparent',
  textStyle: {
    color: colors.text.secondary,
    fontFamily: 'System',
  },
  animation: true,
  animationDuration: 500,
  animationEasing: 'cubicOut' as const,
};

// Grid configuration for consistent padding
export const gridConfig = {
  left: 45,
  right: 20,
  top: 30,
  bottom: 30,
  containLabel: false,
};

// X-axis default configuration
export const xAxisConfig = {
  type: 'category' as const,
  boundaryGap: false,
  axisLine: {
    lineStyle: {
      color: colors.border.default,
    },
  },
  axisTick: {
    show: false,
  },
  axisLabel: {
    color: colors.text.muted,
    fontSize: 10,
  },
  splitLine: {
    show: false,
  },
};

// Y-axis default configuration
export const yAxisConfig = {
  type: 'value' as const,
  axisLine: {
    show: false,
  },
  axisTick: {
    show: false,
  },
  axisLabel: {
    color: colors.text.muted,
    fontSize: 10,
  },
  splitLine: {
    lineStyle: {
      color: colors.border.default,
      type: 'dashed' as const,
    },
  },
};

// Tooltip configuration
export const tooltipConfig = {
  trigger: 'axis' as const,
  backgroundColor: colors.background.tertiary,
  borderColor: colors.border.default,
  borderWidth: 1,
  textStyle: {
    color: colors.text.primary,
    fontSize: 12,
  },
  axisPointer: {
    type: 'cross' as const,
    crossStyle: {
      color: colors.text.muted,
    },
    lineStyle: {
      color: colors.border.default,
      type: 'dashed' as const,
    },
  },
};

// Legend configuration
export const legendConfig = {
  show: true,
  top: 0,
  right: 0,
  textStyle: {
    color: colors.text.secondary,
    fontSize: 11,
  },
  icon: 'circle',
  itemWidth: 8,
  itemHeight: 8,
  itemGap: 15,
};

// Line series default configuration
export const lineSeriesConfig = {
  type: 'line' as const,
  smooth: true,
  symbolSize: 6,
  symbol: 'circle',
  lineStyle: {
    width: 2,
  },
  emphasis: {
    focus: 'series' as const,
    itemStyle: {
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
    },
  },
};

// Area series default configuration (line with fill)
export const areaSeriesConfig = {
  ...lineSeriesConfig,
  areaStyle: {
    opacity: 0.2,
  },
};

// Bar series default configuration
export const barSeriesConfig = {
  type: 'bar' as const,
  barWidth: '60%',
  itemStyle: {
    borderRadius: [4, 4, 0, 0],
  },
  emphasis: {
    itemStyle: {
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
    },
  },
};

// Helper function to format power values
export const formatPowerValue = (value: number): string => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)} MW`;
  }
  return `${value.toFixed(1)} kW`;
};

// Helper function to format percentage values
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

// Helper function to format time labels
export const formatTimeLabel = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Helper function to generate time series data for the last N hours
export const generateTimeLabels = (hours: number, interval: number = 1): string[] => {
  const labels: string[] = [];
  const now = new Date();

  for (let i = hours; i >= 0; i -= interval) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    labels.push(formatTimeLabel(time));
  }

  return labels;
};
